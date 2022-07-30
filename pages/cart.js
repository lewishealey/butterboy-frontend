import Page from "../components/Page"
import Timer from "../components/Timer"
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../contexts/cart-context';
import client from '../utils/sanity';
import Marquee from "react-fast-marquee";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { useState } from "react";
import Modal from 'react-modal';
import moment from 'moment';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';
import styled from 'styled-components';
import { urlFor } from "../helpers/sanity";
import PickDateTime from "../components/PickDateTime"
import product from "../studio/schemas/product";
import { getDeliveryDate, getDeliveryDates } from '../utils/utils'

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
        minWidth: '40%',
        background: "#ffffff",
        padding: "0",
        overflow: "none",
        maxHeight: "75%"
    },
};

const buttonClasses = "border border-gray-400 rounded bg-white hover:bg-mauve px-4 py-2 w-full";

export default function Cart({ settings }) {
    const { products, total, increaseProductQuantity, decreaseProductQuantity, removeProduct, deliveryType, assignDeliveryType, pickupDate, assignPickupDate, pickupTime, assignPickupTime, assignDeliveryPostcode, deliveryPostcode, assignDeliveryDay, deliveryDay, assignOrderMessage, orderMessage } = useCart();
    const [postcodeModal, setPostcodeModal] = useState(false);
    const [date, setDate] = useState(null);
    const [dateModal, setDateModal] = useState(false);
    const [postcode, setPostcode] = useState("");
    const [message, setMessage] = useState("");
    const [selectDeliveryDay, setSelectDeliveryDay] = useState("");
    const format = "dddd, MMMM Do YYYY";

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timezone = "en-AU";

    //<td>{moment(order.date).format("DD-MM-YYYY")}</td>
    const allowedPostcodes = ["2000","2007","2008","2008","2009","2010","2011","2015","2016","2017","2021","2060","2061","2062","2063","2064","2065","2066","2067","2068","2069","2086","2087","2088","2089","2090","2092","2093","2094","2095","2096","2097","2099","2100"];

    const activeDeliveryClasses = "flex-1 text-center bg-vibrant text-mauve font-display text-2xl md:text-6xl py-4 md:py-12 uppercase";
    const inActiveDeliveryClasses = "flex-1 text-center bg-cream text-mauve font-display text-2xl md:text-6xl py-4 md:py-12 uppercase";

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

    function onSelectDeliveryDay() {
        setSelectDeliveryDay(true);
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

    const hasCookes = products.filter(x => x.type === "box" || x.type === "other");
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
                <Link href="/shop-cookies"><a className="underline uppercase text-vibrant font-body text-lg md:text-xl text-center w-full flex justify-center">Continue Shopping</a></Link>
            </div>
        </Page>
    }

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
                {!selectDeliveryDay && <div className="w-full h-full p-6 md:p-12 space-y-4">
                    <h2 className="font-display text-3xl text-center text-vibrant uppercase">Enter postcode</h2>
                    <input className="border border-vibrant h-20 px-6 py-4 w-full" type="number" placeholder="Only 15km radius of Manly allowed" name="postcode" onChange={handlePostcodeChange} defaultValue={postcode} autoFocus />
                    {message === false && <div className="space-y-4"><p className="font-body text-xl">Postcode not available for delivery, sorry :(</p><button className="font-display uppercase text-vibrant bg-gray-100 py-4 text-2xl hover:bg-vibrant hover:text-mauve w-full" onClick={closePostcodeModal}>Close</button></div>}
                    {message === true && <button className="font-display uppercase text-vibrant bg-mauve py-4 md:py-6 text-2xl md:text-3xl hover:bg-vibrant hover:text-mauve w-full" onClick={onSelectDeliveryDay}>Next</button>}
                </div>}
                {selectDeliveryDay && <div className="w-full h-full p-12 space-y-4">
                    <h2 className="font-display text-3xl text-center text-vibrant uppercase">Select a delivery date</h2>
                    <ul className="flex flex-col space-y-2 font-body text-xl w-full">
                        {getDeliveryDates(settings).map(d => {
                            return <button className={buttonClasses} key={d} onClick={() => {
                                assignDeliveryDay(moment(d).format("dddd, MMMM Do YYYY"));
                                closePostcodeModal();
                            }}>{moment(d).format("dddd, MMMM Do YYYY")}</button>
                        })}
                    </ul>
                </div>}
            </Modal>

            <Modal
                isOpen={dateModal}
                onRequestClose={closeDateModal}
                style={customStyles}
                contentLabel="Enter date"
            >
                <Container>
                    <div className="w-full h-full p-12 pt-4 space-y-8">
                        <PickDateTime onSchedule={handleSchedule} settings={settings} />
                    </div>
                </Container>
            </Modal>

            <div className="flex flex-col justify-center space-y-0 md:space-y-8 py-4 md:py-8 md:pb-0 border-l border-r border-vibrant">
                <Link href="/shop-cookies"><a className="underline uppercase text-vibrant font-body text-lg md:text-xl text-center w-full flex justify-center pb-4 md:pb-0">Continue Shopping</a></Link>
                {(hasCookes && deliveryType === "local-delivery") && <RenderDeliveryNotice settings={settings[0]} />}
                {deliveryType === "collect" && <RenderCollectionNotice settings={settings[0]} />}
                <div>
                    <div className="border-t border-b border-vibrant grid-cols-6 w-full hidden md:grid">
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
                        return <div className="border-b border-vibrant grid grid-cols-1 md:grid-cols-6 w-full" key={`product_${i}`}>
                            <div className="border-r border-vibrant pb-8 p-4 md:p-6 md:p-12 col-span-3 border-b md:border-b-0">
                                <h3 className="font-display text-2xl text-xl text-vibrant mb-4 uppercase">{product.title}</h3>
                                {product.size && <h4 className="font-body text-lg text-gray-800 mb-6 uppercase">{product.size}</h4>}
                                <div className="w-full flex space-x-2 items-center">
                                    {product.cookies && <div className="flex flex-col text-lg font-body uppercase space-y-2 text-vibrant">
                                        {product.cookies.map(cookie =>
                                            <div className="flex space-x-4 items-center" key={cookie._id}>
                                                <img src={urlFor(cookie.thumbnail)} className="w-8 h-8" />
                                                <span>{cookie.quantity} X {cookie.title}</span>
                                            </div>
                                        )}
                                    </div>}
                                    {product.selectedOption && <div className="flex flex-col text-lg font-body uppercase space-y-2 text-vibrant">{product.selectedOption.label}</div>}
                                </div>
                            </div>
                            <div className="font-body text-2xl text-vibrant px-8 py-2 md:py-4 text-center border-r border-vibrant items-center justify-center hidden md:flex">
                                ${product.price}
                            </div>
                            <div className="font-body text-2xl text-vibrant px-8 py-2 md:py-4 text-center border-r border-vibrant flex items-center justify-center">
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
                <div className="flex md:border-t border-b border-vibrant">
                    <div className="grid grid-cols-1 md:grid-cols-6 w-full">
                        <label className="font-display uppercase flex items-center text-vibrant bg-cream text-xl hover:bg-gray-100 w-full border-r border-vibrant h-full md:justify-center col-span-1 p-4 md:p-0">ADD A MESSAGE</label>
                        <textarea className="p-4 md:p-8 w-full h-full col-span-3 border-r border-vibrant border-b md:border-b-0 bg-cream" onChange={(e) => assignOrderMessage(e.target.value)}>{orderMessage}</textarea>
                        <div className="col-span-2">
                            <div className="flex items-center border-b border-vibrant w-full">
                                <div className="font-display uppercase flex items-center text-vibrant bg-cream text-xl flex-1 py-4 border-r border-vibrant justify-center">Subtotal</div>
                                <div className="font-body text-xl text-vibrant flex-1 py-4 px-4">{total.currencyFormat}{total.totalPrice}</div>
                            </div>
                            <div className="font-body uppercase text-vibrant text-center text-xl flex justify-center items-center w-full py-4">{deliveryType === "delivery" && "SHIPPING CALCULATED AT CHECKOUT"}</div>
                        </div>
                    </div>
                </div>
                <section className="flex flex-col md:flex-row border-b border-t border-vibrant">
                    <button className={deliveryType === "collect" ? activeDeliveryClasses : inActiveDeliveryClasses} onClick={() => assignDeliveryType("collect")}>Shop pick up</button>
                    <button className={(deliveryType === "local-delivery" || deliveryType === "merch-delivery") ? activeDeliveryClasses : inActiveDeliveryClasses} onClick={() => hasCookes.length > 0 ? assignDeliveryType("local-delivery") : assignDeliveryType("merch-delivery")}>Shop delivery</button>
                </section>
                {deliveryType === "collect" && <section>
                    <div className="flex flex-col md:flex-row border-t border-vibrant w-full border-b border-vibrant">
                        <div className="flex space-x-4 border-r border-b md:border-b-0 border-vibrant p-8 w-full items-center">
                            <span className="h-4 w-4 border-4 border-vibrant bg-mauve rounded-full mt-2 hidden md:flex">&nbsp;</span>
                            <div>
                                <h3 className="font-display uppercase text-vibrant text-xl md:text-2xl font-body">BUTTERBOY MANLY</h3>
                                <span className="text-vibrant text-xl md:text-2xl font-body">74-78 The Corso<br />Manly, 2095</span>
                            </div>
                        </div>
                        <div className="flex w-full flex-col">
                            <div className="border-b border-vibrant flex w-full">
                                <button className="font-display uppercase text-vibrant bg-cream py-4 text-xl md:text-3xl hover:bg-gray-100 w-full" onClick={openDateModal}>{pickupDate && pickupTime ? `${pickupDate} ${pickupTime}` : `CHOOSE A DATE AND TIME`}</button>
                                <button className="font-display uppercase text-vibrant bg-mauve py-6 text-xl md:text-3xl hover:bg-vibrant hover:text-mauve border-l border-vibrant px-8">
                                    <img src="/calendar.svg" className='w-12' />
                                </button>
                            </div>
                            <Link href="/checkout"><button className={`font-display uppercase text-vibrant bg-mauve py-8 text-3xl ${!pickupDate && !pickupTime ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'hover:bg-vibrant hover:text-mauve'}`} disabled={!pickupDate && !pickupTime}>Check out</button></Link>
                        </div>
                    </div>
                </section>}
                {deliveryType === "local-delivery" && <section>
                    <div className="flex border-t border-vibrant flex-col md:flex-row w-full border-b border-vibrant">
                        <div className="flex space-x-4 border-r border-vibrant p-4 md:p-8 w-full items-center order-1 md:order-0">
                            <span className="h-4 w-4 border-4 border-vibrant bg-mauve rounded-full mt-2 hidden md:flex">&nbsp;</span>
                            <div className="flex flex-col space-y-2">
                                <h3 className="font-display uppercase text-vibrant text-base md:text-2xl font-body">Important delivery info</h3>
                                <span className="text-vibrant text-base md:text-2xl font-body">Delivery is only available within 15km radius of the store</span>
                                <span className="text-vibrant text-base md:text-2xl font-body">74-78 The Corso Manly, 2095</span>
                                <span className="text-vibrant text-base md:text-2xl font-body">Deliveries are only on Tues & Thurs and require 48hr notice</span>
                            </div>
                        </div>
                        <div className="flex w-full flex-col order-0 md:order-1">
                             <div className="border-b border-vibrant flex w-full">
                                <button className="font-display uppercase text-vibrant bg-cream py-4 text-base md:text-3xl hover:bg-gray-100 md:h-32 w-full px-4 border-t border-vibrant" onClick={openPostcodeModal}>{(message === true && postcode) ? `Delivery to ${postcode} - ${deliveryDay ? deliveryDay : ""}` : "ENTER YOUR POSTCODE"}</button>
                            </div>
                            <Link href="/checkout">
                                <button className={`font-display uppercase text-vibrant bg-mauve py-6 md:py-8 text-2xl md:text-3xl border-b border-vibrant md:border-0 ${!postcode && 'bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-vibrant hover:text-mauve'}`} disabled={!postcode}>Check out</button>
                            </Link>
                        </div>
                    </div>
                </section>}
                {deliveryType === "merch-delivery" && <section>
                    <div className="flex border-t border-vibrant flex flex-col md:flex-row w-full border-b border-vibrant">
                        <div className="flex space-x-4 border-r border-vibrant p-8 w-full items-center">
                            <span className="h-4 w-4 border-4 border-vibrant bg-mauve rounded-full mt-2 hidden md:flex">&nbsp;</span>
                            <div className="flex flex-col space-y-2">
                                <h3 className="font-display uppercase text-vibrant text-lg md:text-2xl font-body">Important delivery info</h3>
                                <span className="text-vibrant text-lg md:text-2xl font-body">Delivery is only available within 15km radius of the store</span>
                                <span className="text-vibrant text-lg md:text-2xl font-body">74-78 The Corso Manly, 2095</span>
                                <span className="text-vibrant text-lg md:text-2xl font-body">Deliveries are only on Tues & Thurs and require 48hr notice</span>
                            </div>
                        </div>
                        <div className="flex w-full flex-col">
                        <div className="border-b border-vibrant flex w-full">
                                <div className="font-display uppercase text-vibrant bg-cream py-4 text-base md:text-3xl md:h-32 w-full px-4 border-t border-vibrant"></div>
                            </div>
                            <Link href="/checkout">
                                <button className={`font-display uppercase py-8 text-3xl bg-vibrant text-white bg-vibrant hover:text-mauve`} >Check out</button>
                            </Link>
                        </div>
                    </div>
                </section>}
            </div>
        </Page>
    )
}
export async function getStaticProps() {

    const settings = await client.fetch(`
        *[_type == "settings"]
    `);

    return {
        props: {
            settings
        },
        revalidate: 10, // In seconds
    };
}

const RenderCollectionNotice = () => {
    const bannerStyles = "font-body text-vibrant py-2 w-full text-xl text-center border-b border-t border-vibrant";
    return <div className={bannerStyles}>Order before 8pm for next day pickup</div>
}


const RenderDeliveryNotice = ({ settings }) => {
    var date = moment().format("MM-DD-YYYY");
    var time = "09:00";
    var now = moment();
    var today = moment(date + ' ' + time);
    const nowPlus1 = moment(today).add(1, 'days');
    const nowPlus2 = moment(today).add(2, 'days');
    const nowPlus3 = moment(today).add(3, 'days');
    const nowPlus4 = moment(today).add(4, 'days');

    let deliveryDayNums = [];
    
    settings.deliveryDays.forEach(delivery =>
        deliveryDayNums.push(parseInt(delivery.value))
    )
    const bannerStyles = "font-body text-vibrant py-2 w-full text-xl text-center border-b border-t border-vibrant";

    if(nowPlus1.diff(now, 'hours') >= settings.notice) {
        // Check to see if that day is a delivery day
        if(deliveryDayNums.includes(nowPlus1.day())) {
            return <div className={bannerStyles}>📦 Order in the next {nowPlus1.diff(now, 'hours') - settings.notice} hours to qualify for {nowPlus1.format('dddd')} delivery</div>
        }
    }

    if(nowPlus2.diff(now, 'hours') >= settings.notice) {
        // Check to see if that day is a delivery day
        if(deliveryDayNums.includes(nowPlus2.day())) {
            return <div className={bannerStyles}>📦 Order in the next {nowPlus2.diff(now, 'hours') - settings.notice} hours to qualify for {nowPlus2.format('dddd')} delivery</div>
        }
    }

    if(nowPlus3.diff(now, 'hours') >= settings.notice) {
        if(deliveryDayNums.includes(nowPlus3.day())) {
            return <div className={bannerStyles}>📦 Order in the next {nowPlus3.diff(now, 'hours') - settings.notice} hours to qualify for {nowPlus3.format('dddd')} delivery</div>
        }
    }

    if(nowPlus4.diff(now, 'hours') >= settings.notice) {
        if(deliveryDayNums.includes(nowPlus4.day())) {
            return <div className={bannerStyles}>📦 Order in the next {nowPlus4.diff(now, 'hours') - settings.notice} hours to qualify for {nowPlus4.format('dddd')} delivery</div>
        }
    }

}