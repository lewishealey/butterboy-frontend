import Link from 'next/link'
import { useCart } from 'contexts/cart-context';
import { NavLink } from 'components/NavLink';
import { MenuIcon } from '@heroicons/react/solid';

const Header = () => {
    const { products } = useCart();

    return (
        <div className="flex justify-center items-center">  
            <nav className="space-x-32 hidden md:flex py-12">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/shop-cookies">Cookies</NavLink>
                <NavLink href="/merch">Merch</NavLink>
                <NavLink href="/wholesale">Wholesale</NavLink>
                <NavLink href="/location">Location</NavLink>
                <NavLink href="/jobs">Jobs</NavLink>
                <NavLink href="/cart">Cart ({products.length})</NavLink>
            </nav>
            <button className='bg-vibrant p-2 flex md:hidden'>
                <MenuIcon className="h-7 w-7 text-white" />
            </button>
        </div>
    )
}

export default Header;