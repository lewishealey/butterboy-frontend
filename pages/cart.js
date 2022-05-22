import Page from "components/Page"
import Timer from "../components/Timer"
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from 'contexts/cart-context';
import Marquee from "react-fast-marquee";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { useState } from "react";
import Modal from 'react-modal';
import moment from 'moment';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';
import styled from 'styled-components';
import { urlFor } from "helpers/sanity";
import PickDateTime from "components/PickDateTime"
import product from "../studio/schemas/product";

Modal.setAppElement('#__next');

const customStyles = {
    background: {
        zIndex: "1000",
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        background: "#ffffff",
        padding: "0",
        overflowX: "auto"
    },
};

export default function Cart() {
    const { products, total, increaseProductQuantity, decreaseProductQuantity, removeProduct, deliveryType, assignDeliveryType, pickupDate, assignPickupDate, pickupTime, assignPickupTime, assignDeliveryPostcode, deliveryPostcode, assignOrderMessage, orderMessage } = useCart();
    const [postcodeModal, setPostcodeModal] = useState(false);
    const [date, setDate] = useState(null);
    const [dateModal, setDateModal] = useState(false);
    const [postcode, setPostcode] = useState("");
    const [message, setMessage] = useState("");
    const format = "dddd, MMMM Do YYYY";

    function timeSlotValidator(slotTime) {
        const eveningTime = new Date(
            slotTime.getFullYear(),
            slotTime.getMonth(),
            slotTime.getDate(),
            9,
            0,
            0
        );
        const isValid = slotTime.getTime() > eveningTime.getTime();
        return isValid;
    }


    //<td>{moment(order.date).format("DD-MM-YYYY")}</td>
    const allowedPostcodes = ["2000","2007","2008","2008","2009","2010","2011","2015","2016","2017","2021","2060","2061","2062","2063","2064","2065","2066","2067","2068","2069","2086","2087","2088","2089","2090","2092","2093","2094","2095","2096","2097","2099","2100"];

    const activeDeliveryClasses = "flex-1 text-center bg-vibrant text-mauve font-display text-6xl py-12 uppercase";
    const inActiveDeliveryClasses = "flex-1 text-center bg-white text-mauve font-display text-6xl py-12 uppercase";

    function openDateModal() {
        setDateModal(true);
    }

    function closeDateModal() {
        setDateModal(false);
    }

    function openPostcodeModal() {
        setPostcodeModal(true);
    }

    function closePostcodeModal() {
        setPostcodeModal(false);
    }

    function handleDate(date) {
        setDate(date);
    }

    function handleSchedule(date, time) {
        assignPickupDate(date);
        assignPickupTime(time);
        closeDateModal();
    }

    function handlePostcodeChange(e) {
        setPostcode(e.target.value);
        if (e.target.value.length > 3) {
            if (allowedPostcodes.includes(e.target.value)) {
                setMessage(true);
                assignDeliveryPostcode(e.target.value);
            } else {
                setMessage(false);
            }
        } else {
            setMessage("")
        }
    }

    const Container = styled.div`
        margin: 1em auto;
        width: 100%;
        padding: 1em;
        background-color: #fff;
        color: #333;
        border-radius: 5px;
        text-align: center;
        box-shadow: 0 2px 4px #00000018;
        @media (max-width: 520px) {
            width: 100%;
        }
    ]`;

    if (product && products.length === 0) {
        return <Page
            title="Your Cart"
            heading="Your Cart">
            <div className="py-8 space-y-4">
                <h2 className="font-body text-2xl text-center text-vibrant">Please add some items to your cart</h2>
                <Link href="/shop-cookies"><a className="underline uppercase text-vibrant font-body text-xl text-center w-full flex justify-center">Continue Shopping</a></Link>
            </div>
        </Page>
    }

    console.log(products)

    return (
        <Page
            title="Your Cart"
            heading="Your Cart">

            <Modal
                isOpen={postcodeModal}
                onRequestClose={closePostcodeModal}
                style={customStyles}
                contentLabel="Enter postcode"
            >
                <div className="w-full h-full p-12 space-y-4">
                    <h2 className="font-display text-5xl text-center text-vibrant uppercase">Enter postcode</h2>
                    <input className="border border-vibrant h-20 px-6 py-4 w-full" type="number" placeholder="Only 15km radius of Manly allowed" name="postcode" onChange={handlePostcodeChange} defaultValue={postcode} autoFocus />
                    {message === false && <div className="space-y-4"><p className="font-body text-xl">Postcode not available for delivery, sorry :(</p><button className="font-display uppercase text-vibrant bg-gray-100 py-4 text-2xl hover:bg-vibrant hover:text-mauve w-full" onClick={closePostcodeModal}>Close</button></div>}
                    {message === true && <button className="font-display uppercase text-vibrant bg-mauve py-8 text-3xl hover:bg-vibrant hover:text-mauve w-full" onClick={closePostcodeModal}>Proceed</button>}
                </div>
            </Modal>

            <Modal
                isOpen={dateModal}
                onRequestClose={closeDateModal}
                style={customStyles}
                contentLabel="Enter date"
            >
                <Container>
                    <div className="w-full h-full p-12 space-y-8">
                        <PickDateTime onSchedule={handleSchedule} />
                    </div>
                </Container>
            </Modal>

            <div className="flex flex-col justify-center space-y-8 py-12">
                <Link href="/shop-cookies"><a className="underline uppercase text-vibrant font-body text-xl text-center w-full flex justify-center">Continue Shopping</a></Link>
                <Timer initialMinute={60} initialSeconds={40} message={deliveryType === "collect" ? "until next-day collection cut off!" : "until Tuesday delivery cut off!"} />
                <div>
                    <div className="border-t border-b border-vibrant grid grid-cols-6 w-full">
                        <div className="font-display text-2xl text-vibrant px-8 py-4 border-r border-vibrant uppercase col-span-3">
                            Product
                        </div>
                        <div className="font-display text-2xl text-vibrant px-8 py-4 border-r border-vibrant uppercase text-center">
                            Price
                        </div>
                        <div className="font-display text-2xl text-vibrant px-8 py-4 border-r border-vibrant uppercase text-center">
                            Quantity
                        </div>
                        <div className="font-display text-2xl text-vibrant px-8 py-4 uppercase text-center">
                            Total
                        </div>
                    </div>
                    {products.map((product, i) => {
                        return <div className="border-b border-vibrant grid grid-cols-6 w-full" key={`product_${i}`}>
                            <div className="border-r border-vibrant py-12 px-12 col-span-3">
                                <h3 className="font-display text-3xl text-vibrant mb-4 uppercase">{product.title}</h3>
                                {product.size && <h4 className="font-body text-lg text-gray-800 mb-6 uppercase">{product.size}</h4>}
                                <div className="w-full flex space-x-2 items-center">
                                    {/* <img src={thumbnail} width={170} height={150} /> */}
                                    {product.cookies && <div className="flex flex-col text-lg font-body uppercase space-y-2 text-vibrant">
                                        {product.cookies.map(cookie =>
                                            <div className="flex space-x-4 items-center" key={cookie._id}>
                                                <img src={urlFor(cookie.thumbnail)} className="w-8 h-8" />
                                                <span>{cookie.quantity} X {cookie.title}</span>
                                            </div>
                                        )}
                                    </div>}
                                </div>
                            </div>
                            <div className="font-body text-2xl text-vibrant px-8 py-4 text-center border-r border-vibrant flex items-center justify-center">
                                ${product.price}
                            </div>
                            <div className="font-body text-2xl text-vibrant px-8 py-4 text-center border-r border-vibrant flex items-center justify-center">
                                {product.quantity}
                                <div className="flex flex-col px-4">
                                    <button onClick={() => increaseProductQuantity(product)}><ChevronUpIcon className="h-5 w-5 text-vibrant" /></button>
                                    {product.quantity === 1 ? <button onClick={() => removeProduct(product)}><ChevronDownIcon className="h-5 w-5 text-vibrant" /></button> : <button onClick={() => decreaseProductQuantity(product)}><ChevronDownIcon className="h-5 w-5 text-vibrant" /></button>}
                                </div>
                            </div>
                            <div className="font-body text-2xl text-vibrant px-8 py-4 text-center flex items-center justify-center">
                                ${product.quantity * product.price}
                            </div>
                        </div>
                    })}
                </div>
                <div className="flex border-t border-b border-vibrant">
                    <div className="grid grid-cols-6 w-full">
                        <label className="font-display uppercase flex items-center text-vibrant bg-white text-xl hover:bg-gray-100 w-full border-r border-vibrant h-full justify-center col-span-1">ADD A MESSAGE</label>
                        <textarea className="p-8 w-full h-full col-span-3 border-r border-vibrant" onChange={(e) => assignOrderMessage(e.target.value)}>{orderMessage}</textarea>
                        <div className="col-span-2">
                            <div className="flex items-center border-b border-vibrant w-full">
                                <div className="font-display uppercase flex items-center text-vibrant bg-white text-xl flex-1 py-4 border-r border-vibrant justify-center">Subtotal</div>
                                <div className="font-body text-xl text-vibrant flex-1 py-4 px-4">{total.currencyFormat}{total.totalPrice}</div>
                            </div>
                            <div className="font-body uppercase text-vibrant text-center text-xl flex justify-center items-center w-full py-4">{deliveryType === "delivery" && "SHIPPING CALCULATED AT CHECKOUT"}</div>
                        </div>
                    </div>
                </div>
                <section className="flex border-b border-t border-vibrant">
                    <button className={deliveryType === "collect" ? activeDeliveryClasses : inActiveDeliveryClasses} onClick={() => assignDeliveryType("collect")}>Shop pick up</button>
                    <button className={deliveryType === "delivery" ? activeDeliveryClasses : inActiveDeliveryClasses} onClick={() => assignDeliveryType("delivery")}>Shop delivery</button>
                </section>
                {deliveryType === "collect" && <section>
                    <div className="flex border-t border-vibrant flex w-full border-b border-vibrant">
                        <div className="flex space-x-4 border-r border-vibrant p-8 w-full items-center">
                            <span className="h-4 w-4 border-4 border-vibrant bg-mauve rounded-full mt-2 ">&nbsp;</span>
                            <div>
                                <h3 className="font-display uppercase text-vibrant text-2xl font-body">BUTTERBOY MANLY</h3>
                                <span className="text-vibrant text-2xl font-body">74-78 The Corso<br />Manly, 2095</span>
                            </div>
                        </div>
                        <div className="flex w-full flex-col">
                            <div className="border-b border-vibrant flex w-full">
                                <button className="font-display uppercase text-vibrant bg-white py-4 text-3xl hover:bg-gray-100 w-full" onClick={openDateModal}>{pickupDate && pickupTime ? `${moment(pickupDate).format(format).toString()} ${pickupTime}` : `CHOOSE A DATE AND TIME`}</button>
                                <button className="font-display uppercase text-vibrant bg-mauve py-6 text-3xl hover:bg-vibrant hover:text-mauve border-l border-vibrant px-8">
                                    <img src="/calendar.svg" className='w-12' />
                                </button>
                            </div>
                            <Link href="/checkout"><button className={`font-display uppercase text-vibrant bg-mauve py-8 text-3xl ${!pickupDate && !pickupTime ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'hover:bg-vibrant hover:text-mauve'}`} disabled={!pickupDate && !pickupTime}>Check out</button></Link>
                        </div>
                    </div>
                </section>}
                {deliveryType === "delivery" && <section>
                    <div className="flex border-t border-vibrant flex w-full border-b border-vibrant">
                        <div className="flex space-x-4 border-r border-vibrant p-8 w-full items-center">
                            <span className="h-4 w-4 border-4 border-vibrant bg-mauve rounded-full mt-2 ">&nbsp;</span>
                            <div className="flex flex-col space-y-2">
                                <h3 className="font-display uppercase text-vibrant text-2xl font-body">Important delivery info</h3>
                                <span className="text-vibrant text-2xl font-body">Delivery is only available within 15km radius of the store</span>
                                <span className="text-vibrant text-2xl font-body">74-78 The Corso Manly, 2095</span>
                                <span className="text-vibrant text-2xl font-body">Deliveries are only on Tues & Thurs and require 48hr notice</span>
                            </div>
                        </div>
                        <div className="flex w-full flex-col">
                            <div className="border-b border-vibrant flex w-full">
                                <button className="font-display uppercase text-vibrant bg-white py-4 text-3xl hover:bg-gray-100 h-32 w-full" onClick={openPostcodeModal}>{(message === true && postcode) ? `Delivery to ${postcode}` : "ENTER YOUR POSTCODE"}</button>
                            </div>
                            <Link href="/checkout"><button className={`font-display uppercase text-vibrant bg-mauve py-8 text-3xl ${!postcode ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'hover:bg-vibrant hover:text-mauve'}`} disabled={!postcode}>Check out</button></Link>
                        </div>
                    </div>
                </section>}
                {/* <Marquee className="bg-vibrant text-white font-body text-3xl py-6 z-10" gradient={false}>
                    BUTTERBOY'S FIRST RETAIL STORE OPENS LATE MAY - BUTTERBOY'S FIRST RETAIL STORE OPENS LATE MAY - BUTTERBOY'S FIRST RETAIL STORE OPENS LATE MAY
                </Marquee> */}
            </div>
        </Page>
    )
}
