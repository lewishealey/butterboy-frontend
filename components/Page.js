import React from 'react'
import Head from 'next/head'
import Header from 'components/Header'
import Footer from 'components/Footer'

const Page = ({ title, heading, children, header = true, isAdmin = false }) => {
    return (
        <div className="bg-cream">
            <Head>
                {title && <title>{title} | Butterboy Bakery - Cookies baked in Manly</title>}
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {(header && !isAdmin) && <Header />}
            {heading && <h1 className="text-5xl md:text-9xl text-center text-mauve font-bold font-display uppercase border-t border-b border-vibrant py-6 md:py-12">{heading}</h1>}
            <div className="flex flex-col">
                {children}
            </div>
            {!isAdmin && <Footer />}
        </div>
    )
}

export default Page;

// https://codesandbox.io/s/eyes-follow-mouse-cursor-o577x