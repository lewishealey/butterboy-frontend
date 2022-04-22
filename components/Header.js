import Link from 'next/link'

const Header = () => {
    const navClasses = "text-vibrant text-xl font-body";

    return (
        <div className="flex justify-center items-center py-12">  
            <nav className="space-x-24">
                <Link href="/"><a className={navClasses}>Home</a></Link>
                <Link href="/shop-cookies"><a className={navClasses}>Cookies</a></Link>
                <Link href="/merch"><a className={navClasses}>Merch</a></Link>
                <Link href="/wholesale"><a className={navClasses}>Wholesale</a></Link>
                <Link href="/location"><a className={navClasses}>Location</a></Link>
                <Link href="/jobs"><a className={navClasses}>Jobs</a></Link>
                <Link href="/cart"><a className={navClasses}>Cart (0)</a></Link>
            </nav>
        </div>
    )
}

export default Header;