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
            <footer className='flex flex-col md:flex-row space-y-4 justify-between w-full p-6 md:p-12'>
                <div className='space-y-2'>
                    <Link href="jobs"><h2 className='text-vibrant uppercase text-2xl font-display'>JOIN THE TEAM</h2></Link>
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
                <div id="left-eye" className="absolute z-20" style={{ bottom: "5%", left: "41%", width: "8%", height: "17%", transform: rotateLeftEye }}>
                    <div className="h-4 md:h-8 w-4 md:w-8 bg-cream rounded-full absolute right-0" />
                </div>
                <div id="right-eye" className="absolute z-20" style={{bottom: "4%", right: "35%", width: "5%", height: "16%", transform: rotateRightEye }}>
                    <div className="h-4 md:h-8 w-4 md:w-8 bg-cream rounded-full absolute right-0" />
                </div>
                <img src="/head.svg" className='w-full m-auto md:w-2/5' />
            </div>
        </>
    )
}

export default Footer;

// https://codesandbox.io/s/eyes-follow-mouse-cursor-o577x