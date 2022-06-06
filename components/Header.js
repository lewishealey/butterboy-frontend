import Link from 'next/link'
import { useCart } from 'contexts/cart-context';
import { NavLink } from 'components/NavLink';

const Header = () => {
    const { products } = useCart();

    return (
        <div className="flex justify-center items-center py-12">  
            <nav className="space-x-24 flex hidden md:visible">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/shop-cookies">Cookies</NavLink>
                <NavLink href="/merch">Merch</NavLink>
                <NavLink href="/wholesale">Wholesale</NavLink>
                <NavLink href="/location">Location</NavLink>
                <NavLink href="/jobs">Jobs</NavLink>
                <NavLink href="/cart">Cart ({products.length})</NavLink>
            </nav>
        </div>
    )
}

export default Header;