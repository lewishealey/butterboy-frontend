import Page from "components/Page"
import Timer from "../components/Timer"
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from 'contexts/cart-context';
import Marquee from "react-fast-marquee";

export default function Cart() {
    const { products, total } = useCart();

    //<td>{moment(order.date).format("DD-MM-YYYY")}</td>
    console.log(products);

    return (
        <Page
            title="Your Cart"
            heading="Your Cart">

            <div className="flex flex-col justify-center space-y-8 py-12">
                <Link href="/shop-cookies"><a className="underline uppercase text-vibrant font-body text-xl text-center w-full flex justify-center">Continue Shopping</a></Link>
                <Timer initialMinute={60} initialSeconds={40} />
                <div>
                    <div className="border-t border-b border-vibrant flex w-full">
                        <div className="font-display text-2xl text-vibrant px-8 py-4 border-r border-vibrant uppercase" style={{ width: "50%" }}>
                            Product
                        </div>
                        <div className="font-display text-2xl text-vibrant px-8 py-4 border-r border-vibrant uppercase" style={{ width: "10%" }}>
                            Price
                        </div>
                        <div className="font-display text-2xl text-vibrant px-8 py-4 border-r border-vibrant uppercase text-center" style={{ width: "15%" }}>
                            Quantity
                        </div>
                        <div className="font-display text-2xl text-vibrant px-8 py-4 uppercase text-center" style={{ width: "20%" }}>
                            Total
                        </div>
                    </div>
                    {products.map((product, i) =>
                        <div className="border-b border-vibrant flex w-full" key={`product_${i}`}>
                            <div className="border-r border-vibrant py-12 px-12" style={{ width: "50%" }}>
                                <h3 className="font-display text-3xl text-vibrant mb-6 uppercase">{product.title}</h3>
                                <div className="w-full flex space-x-2 items-center">
                                    <Image src={product.image} width={170} height={150} />
                                    <div className="flex flex-col text-lg font-body uppercase space-y-2 text-vibrant">
                                        {product.cookies && product.cookies.map(cookie =>
                                            <div className="">{cookie.quantity} X {cookie.title}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="font-body text-2xl text-vibrant px-8 py-4 text-center border-r border-vibrant flex items-center justify-center" style={{ width: "10%" }}>
                                ${product.price}
                            </div>
                            <div className="font-body text-2xl text-vibrant px-8 py-4 text-center border-r border-vibrant flex items-center justify-center" style={{ width: "15%" }}>
                                {product.quantity}
                            </div>
                            <div className="font-body text-2xl text-vibrant px-8 py-4 text-center flex items-center justify-center" style={{ width: "20%" }}>
                                Total
                            </div>
                        </div>
                    )}
                </div>
                <h2 className="text-7xl text-center text-mauve font-bold font-display uppercase">CLICK & COLLECT</h2>
                <h3 className="uppercase text-vibrant font-body text-xl text-center w-full flex justify-center">PLEASE CHOOSE A PICKUP LOCATION, DATE AND TIME.</h3>
                <div className="flex border-t border-vibrant flex w-full border-b border-vibrant">
                    <div className="flex space-x-4 border-r border-vibrant p-8 w-full">
                        <span className="h-4 w-4 border-4 border-vibrant bg-mauve rounded-full mt-2">&nbsp;</span>
                        <div>
                            <h3 className="font-display uppercase text-vibrant text-2xl font-body">BUTTERBOY MANLY</h3>
                            <span className="text-vibrant text-2xl font-body">74-78 The Corso<br />Manly, 2095</span>
                        </div>
                    </div>
                    <div className="flex w-full">
                        <input type="date" className="h-full flex-1 w-full p-4 text-3xl px-8" />
                        <input type="time" className="h-full flex-1 w-full p-4 text-3xl" />
                    </div>
                </div>
                <button className="font-display uppercase text-vibrant bg-mauve py-8 text-3xl hover:bg-vibrant hover:text-mauve">Check out</button>
                <Marquee className="bg-vibrant text-white font-body text-3xl py-6" gradient={false}>
                    BUTTERBOY'S FIRST RETAIL STORE OPENS LATE MAY - BUTTERBOY'S FIRST RETAIL STORE OPENS LATE MAY - BUTTERBOY'S FIRST RETAIL STORE OPENS LATE MAY
                </Marquee>
            </div>
        </Page>
    )
}
