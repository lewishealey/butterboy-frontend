import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from 'contexts/cart-context';

export default function Checkout() {
  const { products, total } = useCart();
  const inputClasses = "h-11 border border-vibrant px-3";


  return (
    <div>
      <Head>
        <title>Checkout</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex h-screen'>
        <div className='flex-1 bg-mauve py-8 px-16 flex justify-end'>
          <div className='flex flex-col w-full space-y-4 max-w-xl'>
            <h1 className="text-7xl text-white font-bold font-display uppercase">Checkout</h1>
            <fieldset className='flex flex-col space-y-4'>
              <label className='font-heading text-vibrant text-xl'>Contact information</label>
              <input className={inputClasses} placeholder="Email" name="email" />
            </fieldset>
            <fieldset className='flex flex-col space-y-4'>
              <label className='font-heading text-vibrant text-xl'>Shipping address</label>
              <input className={inputClasses} placeholder="First name" name="fname" />
              <input className={inputClasses} placeholder="Last name" name="lname" />
              <input className={inputClasses} placeholder="Address" name="address" />
              <input className={inputClasses} placeholder="Suburb" name="suburb" />
              <input className={inputClasses} placeholder="State" name="state" />
              <input className={inputClasses} placeholder="Postcode" name="postcode" />
              <input className={inputClasses} placeholder="Phone (optional)" name="phone" />
            </fieldset>
            <div className='flex space-x-4'>
              <button className='font-display uppercase text-white bg-mauve py-6 text-base bg-vibrant px-6 hover:bg-red-700'>Continue to shipping</button>
              <Link href="/cart"><button className='font-display uppercase py-6 text-base text-vibrant px-6 hover:bg-black hover:bg-opacity-10'>Return to cart</button></Link>
            </div>
          </div>
        </div>
        <div className='flex-1'>
          {products.map((product, i) =>
            <div className="border-b border-vibrant flex w-full" key={`product_${i}`}>
              <div className="border-r border-vibrant py-12 px-12">
                <div className="w-full flex space-x-2 items-center">
                  <Image src={product.image} width={170} height={150} />
                  <div className="flex flex-col text-lg font-body uppercase space-y-2 text-vibrant">
                    <h3 className="font-display text-xl text-vibrant mb-2 uppercase">{product.title}</h3>
                    {product.cookies && product.cookies.map(cookie =>
                      <div className="" key={cookie.id}>{cookie.quantity} X {cookie.title}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="font-body text-2xl text-vibrant px-8 py-4 text-center border-r border-vibrant flex items-center justify-center">
                ${product.price}
              </div>
              <div className="font-body text-2xl text-vibrant px-8 py-4 text-center border-r border-vibrant flex items-center justify-center">
                {product.quantity}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
