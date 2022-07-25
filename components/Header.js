import { useCart } from '../contexts/cart-context';
import { NavLink } from './NavLink';

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
            <div className='flex md:hidden border-b border-vibrant w-full justify-between items-center pl-2'>
                <img src="mark_red.svg" className="square" style={{ width: "10%" }} />
                <div className='flex items-center'>
                    <div className='text-mauve uppercase p-3 border-r border-l border-vibrant font-display text-xl'>Order</div>
                    <div className='p-2'><img src="menu.png" className='h-6 w-6'/></div>
                </div>
            </div>
        </div>
    )
}

export default Header;