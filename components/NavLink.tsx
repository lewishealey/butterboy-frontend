import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface NavLinkProps {
    href: string;
    as?: string;
    children: string;
}

// export class CounterDisplay extends React.PureComponent<CounterDisplayProps> {

export const NavLink: React.FC<NavLinkProps> = ({
    href,
    as,
    children
}) => {
    const { asPath } = useRouter();
    let activeClassName = "";
    if(asPath === href || asPath === as) {
        activeClassName = "underline";
    } else {
        activeClassName = "";
    }

    return (
        <Link href={href}>
            <a className={`block text-vibrant text-xl font-body ${activeClassName}`}>
                {children}
            </a>
      </Link>
    )
  }

  export default NavLink;
