import Page from "components/Page"
import Timer from "../components/Timer"
import Link from 'next/link'
import Head from 'next/head'

export default function Cart() {

    //<td>{moment(order.date).format("DD-MM-YYYY")}</td>

    return (
        <Page
            title="Your Cart"
            heading="Your Cart">

            <Timer initialMinute={60} initialSeconds={40} />

            <Link href="/shop-cookies"><a className="underline uppercase text-vibrant font-body text-xl text-center w-full flex">Continue Shopping</a></Link>
        </Page>
    )
}
