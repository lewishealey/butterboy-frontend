import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from 'contexts/cart-context';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ChevronRightIcon, LockClosedIcon } from '@heroicons/react/solid';
import axios from 'axios';
import Page from "components/Page"
import client from 'utils/sanity';
import { Elements } from '@stripe/react-stripe-js'
import getStripe from '../utils/getstripejs'
import { fetchPostJSON } from 'utils/api-helpers'
import ElementsForm from '../components/ElementsForm'
import AddressBox from '../components/AddressBox'
import { PaymentIntent } from '@stripe/stripe-js'
import moment from 'moment';
import Dot from 'components/Dot';
import SectionLabel from 'components/SectionLabel';

interface EmailType {
  date: string;
  prettyDate: string;
}

const defaultCustomerInfo = {
  firstName: 'Lewis',
  lastName: 'Healey',
  address1: '88 Macleay Street',
  address2: '',
  city: 'Sydney',
  country: 'Australia',
  suburb: 'Greystanes',
  state: 'NSW',
  postcode: '2044',
  company: '',
  errors: null
}

const blankCustomerInfo = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  country: '',
  suburb: '',
  state: '',
  postcode: '',
  company: '',
  errors: null
}

export default function Checkout({ settings, discounts }) {
  const { products, deliveryType, pickupDate, pickupTime, total, deliveryPostcode, clearCart, orderMessage, deliveryDay } = useCart();
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null)
  const format = "dddd, MMMM Do YYYY";
  const timeFormat = "HH:mm:ss";
  const [shipping, setShipping] = useState(null);
  const [discountCode, setDiscountCode] = useState("");
  const [finalAmount, setFinalAmount] = useState(total.totalPrice);
  const [discount, setDiscount] = useState(null);
  const router = useRouter();

  const initialState = {
    email: 'hello@lewi.sh',
    phone: '0466154186',
    billing: {
      ...defaultCustomerInfo
    },
    shipping: {
      ...defaultCustomerInfo
    },
    items: products,
    stripe_id: null,
    pick_up_time: pickupTime,
    pick_up_date: pickupDate,
    deliveryType: deliveryType,
    deliveryDay: deliveryDay,
    sameAsShipping: true,
    newsletter: false,
    orderMessage: orderMessage,
    subtotal: total,
    paymentMethod: "stripe",
    payment_method_title: "Credit card",
  };

  const [input, setInput] = useState(initialState);
  const inputClasses = "h-14 border-b border-vibrant px-8 bg-cream font-body text-vibrant outline-0";
  const buttonClasses = "w-full bg-mauve font-display px-5 py-5 uppercase text-vibrant border-b border-t border-vibrant text-xl hover:bg-vibrant hover:text-mauve inline-flex";
  const [stage, setStage] = useState(1);

  const handleAddress = (name, value, type) => {
    const newState = {
      ...input, [type]: {
        ...input[type],
        [name]: value
      }
    };
    setInput(newState);
  };

  const handlePhone = (value) => {
    const newState = {
      ...input,
      phone: value
    };
    setInput(newState);
  };

  const getSortDate = () => {
    const sortFormat = "YYYY-MM-DD";

    // Assign collection date
    if(pickupDate) {
      return moment(pickupDate).format(sortFormat).toString();
    }

    // Assign collection date
    if(deliveryDay) {
      return moment(deliveryDay).format(sortFormat).toString();
    }
    
    if(!deliveryDay && !pickupDate) {
      // If normal order
      return moment().format(sortFormat).toString();
    }

  };

  const handleSignup = (event) => {
    const { target } = event || {};
    const newState = { ...input, newsletter: target.value };
    setInput(newState);
  };

  const changeDiscount = (event) => {
    const { target } = event || {};
    setDiscountCode(target.value.toUpperCase());
  };

  const handlePayment = () => {
    fetchPostJSON('/api/payment_intents', {
      amount: finalAmount,
    }).then((data) => {
      console.log(data)
      setStage(3);
      setPaymentIntent(data);
    });
  }

  const handleShipping = (type, price) => {
    setShipping({ type, price });
    if(discount) {
      if (discount.type === "percent") {
        setFinalAmount(total.totalPrice * (discount.amount / 100)) + price;
      } else {
        setFinalAmount(total.totalPrice - discount.amount + price);
      }
    } else {
      setFinalAmount(total.totalPrice + price);
    }
  }

  const applyDiscount = () => {
    const hasDiscount = discounts.find(d => d.title.toLowerCase() === discountCode.toLowerCase())
    if (hasDiscount) {
      if (discount) {
        alert("You can only apply the discount once!")
      } else {
        if (hasDiscount.type === "percent") {
          setFinalAmount(finalAmount - (total.totalPrice * (hasDiscount.amount / 100)));
          setDiscount({ ...hasDiscount, difference: (total.totalPrice * (hasDiscount.amount / 100)).toFixed(2) });
        } else {
          setFinalAmount(finalAmount - hasDiscount.amount);
          setDiscount({ ...hasDiscount, difference: (hasDiscount.amount).toFixed(2) });
        }
      }
    }
  };

  const clearDiscount = () => {
    setDiscount(null);
    setDiscountCode("");
    if (shipping) {
      setFinalAmount(total.totalPrice + shipping.price);
    } else {
      setFinalAmount(total.totalPrice);
    }
  };

  async function handleCheckout(paymentResolve) {
    var val = Math.floor(1000 + Math.random() * 9000);
    const newInput = {
      ...input,
      stripe_id: paymentResolve.id,
      stripe_secret: paymentResolve.client_secret,
      order_number: val,
      sort_date: getSortDate(),
      date_created: moment().format(format).toString(),
      date_created_unix: moment().unix(),
      time_created: moment().format(timeFormat).toString(),
      completed: false,
      shipped: false,
      ready: false,
      delivery: deliveryType !== "collect" ? shipping : false,
      discount: discount,
      total: finalAmount
    };

    fetch("api/create-order", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newInput)
    }).then(response => response.json())
      .then(data => {
        sendEmail(newInput, data.id);
      });
  }

  const sendEmail = (data, id) => {
    const emailData = data;
    fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    }).then(response => response.json())
      .then((res) => {
        console.log("Email sent")
        if (id) {
          router.push("/confirmed/" + id);
        }
      });
  };

  useEffect(() => {
    if(deliveryType === "local-delivery") {
      handleShipping("local", 10);
    }
  }, []);

  return (
    <Page
      title="Checkout"
      heading="Checkout">

      <div className='flex min-h-screen border-b border-vibrant flex-col md:flex-row'>
        <div className='w-full md:w-3/5 bg-cream flex justify-center border-r border-vibrant'>
          <div className='flex flex-col w-full'>
            {stage === 1 &&
              <>
                <fieldset className='flex flex-col'>
                  <SectionLabel>Contact information</SectionLabel>
                  <input className={inputClasses} placeholder="Email" name="email" defaultValue={input.email} />
                  <input className={inputClasses} placeholder="Phone (required for deliveries)" name="phone" onChange={(e) => handlePhone(e.target.value)} defaultValue={input.phone} />
                  <div className="flex space-x-2 items-center border-b border-vibrant py-4 px-8 cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 rounded border border-vibrant cursor-pointer" name="newsletter" id="newsletter" defaultChecked={input.newsletter} onChange={handleSignup} />
                    <label className="font-body text-vibrant cursor-pointer" htmlFor="newsletter">Email me with news, updates and offers</label>
                  </div>
                </fieldset>
                <fieldset className='flex flex-col'>
                  <SectionLabel>Shipping address</SectionLabel>
                  <AddressBox data={input.shipping} phone onChange={handleAddress} type="shipping" postcode={deliveryPostcode} />
                </fieldset>
                {deliveryType == "local-delivery" && <fieldset className='flex flex-col border-b border-vibrant'>
                  <SectionLabel>Shipping</SectionLabel>
                  <div className="border border-gray-300 bg-cream rounded w-full">
                    <button className={`flex justify-between px-8 py-4 w-full items-start text-left hover:bg-gray-100 
                    ${shipping && shipping.type === "standard" && "border-2 border-blue-500"}`}
                      onClick={() => {
                        handleShipping("standard", 10)
                      }}>
                      <div className="flex flex-col">
                        <div className="flex space-x-3 items-center">
                          <span className="text-vibrant text-lg font-body">Local delivery</span>
                        </div>
                        <span className="text-md text-vibrant font-body">{deliveryDay}</span>
                      </div>
                      <div className="hover:underline text-lg text-vibrant pt-1 font-body">$10.00</div>
                    </button>
                  </div>
                </fieldset>}
                <div className="flex flex-col">
                  {deliveryType === "local-delivery" ? <button
                    className="bg-mauve font-display px-5 py-4 uppercase text-vibrant border-b border-vibrant text-xl hover:bg-vibrant hover:text-mauve inline-flex"
                    onClick={handlePayment}
                  >
                    Proceed to payment
                  </button> : <button
                    className="bg-mauve font-display px-5 py-4 uppercase text-vibrant border-b border-vibrant text-xl hover:bg-vibrant hover:text-mauve inline-flex"
                    onClick={() => setStage(2)}
                  >
                    Proceed to {deliveryType == "collect" ? "collection summary" : "delivery options"}
                  </button>}
                  <Link href="/cart">
                    <button
                      className="hover:bg-white px-5 py-4 uppercase font-display text-vibrant border-b text-xl hover:bg-gray-200 inline-flex"
                    >
                      Back to cart
                    </button>
                  </Link>
                </div>
              </>}

            {stage > 1 &&
              <fieldset className='flex flex-col'>
                <SectionLabel>Information</SectionLabel>
                <div className="w-full">
                  {input.email && <button className="flex justify-between px-4 py-2 w-full h-14 items-center bg-cream border-b border-vibrant" onClick={() => setStage(1)}>
                    <div className="flex space-x-8">
                      <span className="font-body text-vibrant">Email</span>
                      <span className="text-vibrant font-body">
                        {input.email}
                      </span>
                    </div>
                    <div className="hover:underline text-base text-vibrant font-body">Change</div>
                  </button>}
                  {input.shipping && <button className="flex justify-between px-4 py-2 w-full border-b border-vibrant h-14 items-center" onClick={() => setStage(1)}>
                    <div className="flex space-x-8">
                      <span className="text-vibrant font-body">Address</span>
                      <span className="text-vibrant font-body">{input.shipping.address1}</span>
                    </div>
                    <div className="hover:underline text-base font-body text-vibrant">Change</div>
                  </button>}
                  {deliveryType === "local-delivery" &&
                    <div className="flex justify-between px-4 py-2 w-full border-b border-vibrant h-14 items-center">
                      <div className="flex space-x-8">
                        <span className="text-vibrant font-body">Delivery</span>
                        <span className="text-vibrant font-body">{deliveryDay}</span>
                      </div>
                    </div>}
                </div>
              </fieldset>
            }

            {stage >= 2 &&
              <>
                {(deliveryType == "collect" && pickupDate && pickupTime) && <fieldset className='flex flex-col'>
                  <SectionLabel>Collection</SectionLabel>
                  <div className="w-full">
                    {pickupDate && <Link href="/cart"><button className="flex justify-between px-4 py-2 w-full h-14 items-center">
                      <div className="flex space-x-8"><span className="text-vibrant font-body">Date</span><span className="text-vibrant font-body">
                        {pickupDate}</span></div>
                      <div className="hover:underline text-base text-vibrant font-body">Change</div>
                    </button></Link>}
                    {pickupTime && <Link href="/cart"><button className="flex justify-between px-4 py-2 w-full border-t bg-cream border-vibrant font-body h-14 items-center border-b">
                      <div className="flex space-x-8"><span className="text-vibrant">Time</span><span className="text-vibrant">{pickupTime}</span></div>
                      <div className="hover:underline text-base text-vibrant">Change</div>
                    </button></Link>}
                  </div>
                </fieldset>}
                {deliveryType == "merch-delivery" && <fieldset className='flex flex-col'>
                  <SectionLabel>{!shipping ? "Select a s" : "S"}hipping method</SectionLabel>
                  <div className="border border-gray-300 bg-cream rounded w-full">
                    <button className={`flex justify-between px-4 py-2 w-full items-start text-left hover:bg-gray-100 
                    ${shipping && shipping.type === "standard" && "border-2 border-blue-500"}`}
                      onClick={() => {
                        handleShipping("standard", 10)
                      }}>
                      <div className="flex flex-col">
                        <div className="flex space-x-3 items-center">
                          <Dot checked={shipping && shipping.type === "standard"} /><span className="text-vibrant text-lg font-body">Standard</span>
                        </div>
                        <span className="text-sm text-gray-500 font-body">3-8 business days, via Sendle</span>
                      </div>
                      <div className="hover:underline text-lg text-vibrant pt-1 font-body">$10.00</div>
                    </button>
                    <button
                      className={`flex justify-between px-4 py-2 w-full border-t border-vibrant items-center text-left hover:bg-gray-100 
                      ${shipping && shipping.type === "express" && "border-2 border-blue-500"}`}
                      onClick={() => {
                        handleShipping("express", 25)
                      }}>
                      <div className="flex flex-col">
                        <div className="flex space-x-3 items-center">
                          <Dot checked={shipping && shipping.type === "express"} /><span className="text-vibrant text-lg font-body">Express</span>
                        </div>
                        <span className="text-sm text-gray-500 font-body text-lg font-body">2-4 business days, via Auspost</span>
                      </div>
                      <div className="hover:underline text-lg text-vibrant font-body">$25.00</div>
                    </button>
                  </div>
                </fieldset>}
                {stage === 2 && <div>
                  {(deliveryType === "local-delivery" || deliveryType === "merch-delivery") && <button
                    className={buttonClasses + ` ${!shipping && ' bg-gray-200 text-gray-500 cursor-not-allowed hover:bg-gray-200 hover:text-gray-500'}`}
                    onClick={handlePayment}
                    disabled={!shipping}
                  >
                    Proceed to payment
                  </button>}
                  {deliveryType === "collect" && <button
                    className={buttonClasses}
                    onClick={handlePayment}
                  >
                    Proceed to payment
                  </button>}
                </div>}
              </>
            }
            {stage === 3 &&
              <>
                <fieldset className='flex flex-col'>
                  <SectionLabel>Billing address</SectionLabel>
                  <div className="w-full">
                    <button className={`flex justify-between px-4 py-2 w-full items-center hover:bg-gray-100 h-14 border-b border-vibrant`} onClick={() => { const newState = { ...input, billing: input.shipping, sameAsShipping: true }; setInput(newState); }}>
                      <div className="flex space-x-3 items-center">
                        <Dot checked={input.sameAsShipping} /><span className="text-vibrant font-body text-base">Same as shipping address</span>
                      </div>
                    </button>
                    <button className={`flex justify-between px-4 py-2 w-full items-center hover:bg-gray-100 border-b border-vibrant h-14`} onClick={() => { const newState = { ...input, billing: blankCustomerInfo, sameAsShipping: false }; setInput(newState); }}>
                      <div className="flex space-x-3 items-center">
                        <Dot checked={!input.sameAsShipping} /><span className="text-vibrant font-body">Use a different billing address</span>
                      </div>
                    </button>
                    {!input.sameAsShipping && <fieldset className='flex flex-col'>
                      <AddressBox data={input.billing} onChange={handleAddress} type="billing" />
                    </fieldset>}
                  </div>
                </fieldset>
                <fieldset className='flex flex-col'>
                  <SectionLabel>Payment</SectionLabel>
                  <div className="w-full">
                    <div className="flex justify-between px-4 py-2 w-full items-center">
                      <div className="flex flex-col">
                        <span className="text-vibrant font-body py-2">All transactions are secure and encrypted.</span>
                      </div>
                      <div className="hover:underline text-sm text-vibrant flex items-center"><LockClosedIcon className="h-5 w-5" /></div>
                    </div>
                    <div className="border-t border-vibrant flex flex-col space-y-3 bg-cream">
                      {paymentIntent && paymentIntent.client_secret ? (
                        <Elements
                          stripe={getStripe()}
                          options={{
                            appearance: {
                              variables: {
                                colorIcon: '#E50001',
                                fontFamily: 'bikoregular, sans-serif',
                                colorBackground: '#F8F0E5',
                                colorText: '#E50001',
                                borderRadius: '0',
                              },
                              rules: {
                                '.Input, .Block': {
                                  backgroundColor: '#F8F0E5',
                                  border: '1px solid #E50001'
                                }
                              }
                            },
                            clientSecret: paymentIntent.client_secret,
                          }}
                        >
                          <ElementsForm paymentIntent={paymentIntent} onPaymentResolve={handleCheckout} data={input} />
                        </Elements>
                      ) : (
                        <p>Loading...</p>
                      )}
                    </div>
                  </div>
                </fieldset>
              </>}
          </div>
        </div>
        <div className='w-full md:w-2/5'>
          <div className="top-0 sticky">
            {products && products.map((product, i) => {
              return <div className="flex w-full border-b border-vibrant px-6 h-20 pr-12" key={`product_${i}`}>
                <div className="w-full flex space-x-2 items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="relative h-12 w-12 bg-cream rounded-lg">
                      <div className="h-12 w-12 overflow-hidden">
                        <img src={product.image as any} />
                      </div>
                      <div className="h-5 w-5 bg-vibrant rounded-full text-xs text-center flex items-center text-white justify-center absolute -top-2 -right-2">{product.quantity}</div>
                    </div>
                    <h3 className="text-xl text-vibrant uppercase font-display">{product.title}</h3>
                  </div>
                  <span className="font-body text-xl text-vibrant">${product.price}</span>
                </div>
              </div>
            })}
            {stage < 3 &&
              <div className="flex">
                <input type="text" placeholder="Gift card or discount code" className={inputClasses + " w-full"} onChange={changeDiscount} value={discountCode} />
                <button className="bg-cream border-l border-vibrant px-4 inline-flex h-14 border-b items-center uppercase font-display text-vibrant h-full" onClick={applyDiscount}>Apply</button>
              </div>}
            <div className="flex flex-col justify-between py-6 border-b border-vibrant space-y-2 px-8">
              <div className="flex w-full justify-between">
                <div className="font-body text-xl text-vibrant">Subtotal</div>
                <div className="font-body text-xl font-body text-vibrant">${total.totalPrice.toFixed(2)}</div>
              </div>
              {discount &&
                <div className="flex w-full justify-between">
                  <div className="font-body text-xl text-vibrant">Discount ({discount.title}) {stage < 3 ? <button onClick={clearDiscount} className="underline">Clear</button> : <button onClick={() => setStage(2)} className="underline">Change</button>}</div>
                  <div className="font-body text-xl font-body text-vibrant">-${discount.difference}</div>
                </div>}
              {shipping && <div className="flex w-full justify-between">
                <div className="font-body text-xl text-vibrant">Shipping ({shipping.type})</div>
                {shipping.price && <div className="font-body text-xl text-vibrant">${shipping.price.toFixed(2)}</div>}
              </div>}
            </div>
            <div className="flex flex-col justify-between space-y-2 px-8 py-6">
              <div className="flex w-full justify-between">
                <div className="font-body text-xl text-vibrant">Total</div>
                <div className="font-body text-2xl space-x-2 items-center flex">
                  <span className="text-base text-vibrant">AUD</span>
                  <span className="text-3xl text-vibrant">${finalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export async function getStaticProps() {

  const settings = await client.fetch(`
      *[_type == "settings"]
  `);

  const discounts = await client.fetch(`
      *[_type == "discount" && live == true]
  `);

  return {
    props: {
      settings,
      discounts
    },
    revalidate: 10, // In seconds
  };
}