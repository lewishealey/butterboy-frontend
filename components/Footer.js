import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import useMightyMouse from "react-hook-mighty-mouse";

const Footer = () => {
    const navClasses = "text-vibrant text-xl font-body";

    const {
        selectedElement: {
            position: { angle: angleLeftEye },
        },
    } = useMightyMouse(true, 'left-eye', { x: 20, y: 20 });
    const {
        selectedElement: {
            position: { angle: angleRightEye },
        },
    } = useMightyMouse(true, 'right-eye', { x: 20, y: 20 });

    const rotateLeftEye = `rotate(${-angleLeftEye}deg)`;
    const rotateRightEye = `rotate(${-angleRightEye}deg)`;

    return (
        <>
            <footer className='flex flex-col md:flex-row space-y-4 justify-between w-full px-12 py-12'>
                <div className='space-y-2'>
                    <h2 className='text-vibrant uppercase text-2xl font-display'>JOIN THE TEAM</h2>
                    <p className='text-xl font-body text-vibrant'>Send resumes to <br />hello@butterboy.com</p>
                </div>
                <div className='flex flex-col space-y-2 justify-start text-left md:text-right md:justify-end'>
                    <Link href="/"><a className={navClasses}>Home</a></Link>
                    <Link href="/shop-cookies"><a className={navClasses}>Cookies</a></Link>
                    <Link href="/merch"><a className={navClasses}>Merch</a></Link>
                    <Link href="/wholesale"><a className={navClasses}>Wholesale</a></Link>
                    <Link href="/location"><a className={navClasses}>Location</a></Link>
                </div>
            </footer>
            <div className="relative">
                <div id="left-eye" className="absolute z-20" style={{ bottom: "5%", left: "39%", width: "10%", height: "17%", transform: rotateLeftEye }}>
                    <div className="h-8 md:h-12 w-8 md:w-12 bg-cream rounded-full absolute right-0" />
                </div>
                <div id="right-eye" className="absolute z-20" style={{bottom: "4%", right: "32%", width: "7%", height: "16%", transform: rotateRightEye }}>
                    <div className="h-8 md:h-12 w-8 md:w-12 bg-cream rounded-full absolute right-0" />
                </div>
                <img src="/head.svg" className='w-full m-auto' style={{ width: "50%" }} />
            </div>
        </>
    )
}

export default Footer;

// https://codesandbox.io/s/eyes-follow-mouse-cursor-o577x