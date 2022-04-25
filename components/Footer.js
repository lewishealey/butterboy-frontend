import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
    const navClasses = "text-vibrant text-xl font-body";

    return (
        <>
        <footer className='flex justify-between w-full px-12'>
            <div className='space-y-2'>
                <h2 className='text-vibrant uppercase text-2xl font-display'>JOIN THE TEAM</h2>
                <p className='text-xl font-body text-vibrant'>Send resumes to <br />hello@butterboy.com</p>
            </div>
            <div className='flex flex-col space-y-2 justify-end text-right'>
                <Link href="/"><a className={navClasses}>Home</a></Link>
                <Link href="/shop-cookies"><a className={navClasses}>Cookies</a></Link>
                <Link href="/merch"><a className={navClasses}>Merch</a></Link>
                <Link href="/wholesale"><a className={navClasses}>Wholesale</a></Link>
                <Link href="/location"><a className={navClasses}>Location</a></Link>
            </div>
        </footer>
            <Image src="/head.svg" width="100%" height={500} />
        </>
    )
}

export default Footer;

// https://codesandbox.io/s/eyes-follow-mouse-cursor-o577x