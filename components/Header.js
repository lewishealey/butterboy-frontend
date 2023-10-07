import { useCart } from "../contexts/cart-context";
import { NavLink } from "./NavLink";
import React, { useState } from "react";
import Link from "next/link";

const Header = () => {
  const { products } = useCart();
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="flex justify-center items-center">
      <nav className="md:space-x-16 lg:space-x-32 hidden lg:flex py-12">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/shop-cookies">Cookies</NavLink>
        <NavLink href="/merch">Merch</NavLink>
        <NavLink href="/location">Location</NavLink>
        <NavLink href="/wholesale">Wholesale</NavLink>
        <NavLink href="/stockists">Stockists</NavLink>
        <NavLink href="/jobs">Jobs</NavLink>
        <NavLink href="/cart">Cart ({products.length})</NavLink>
      </nav>
      {showNav && (
        <nav className="flex flex-col lg:hidden py-12 fixed bg-white top-0 left-0 w-full h-full z-50 space-y-4 items-center">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/shop-cookies">Cookies</NavLink>
          <NavLink href="/merch">Merch</NavLink>
          <NavLink href="/location">Location</NavLink>
          <NavLink href="/wholesale">Wholesale</NavLink>
          <NavLink href="/stockists">Stockists</NavLink>
          <NavLink href="/jobs">Jobs</NavLink>
          <NavLink href="/cart">Cart ({products.length})</NavLink>
          <button
            className="p-2 pt-8 font-body text-vibrant text-lg"
            onClick={() => setShowNav(!showNav)}
          >
            Close menu
          </button>
        </nav>
      )}
      <div className="flex lg:hidden border-b border-vibrant w-full justify-between items-center pl-2 py-2">
        <Link href="/">
          <img src="/mark_red.svg" style={{ width: "15%" }} />
        </Link>
        <div className="flex items-center">
          <Link href="/shop-cookies">
            <a className="text-vibrant uppercase p-3 border-r border-vibrant font-display text-xl">
              Order
            </a>
          </Link>
          <button className="p-2 px-4" onClick={() => setShowNav(!showNav)}>
            <img src="/menu.png" className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
