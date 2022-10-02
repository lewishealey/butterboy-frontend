import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ButterHead from "./ButterHead";

const Footer = ({ settings }) => {
  const router = useRouter();
  const navClasses = "text-vibrant text-xl font-body underline uppercase";

  return (
    <>
      <footer className="flex flex-col md:flex-row space-y-4 justify-between w-full p-6 pb-12 md:p-12 container m-auto border-t mt-8 md:mt-24 border-vibrant">
        <div className="py-12 flex md:hidden">
          <img src="/face.png" className="m-auto" style={{ width: "50%" }} />
        </div>
        <div className="flex flex-row w-full justify-between">
          {settings && (
            <div className="flex flex-col space-y-2 justify-center text-center md:text-left md:justify-start w-full">
              {settings.footer.links.map((link) => (
                <Link href={link.url} key={link.url}>
                  <a className={navClasses}>{link.title}</a>
                </Link>
              ))}
            </div>
          )}
          <div className="flex flex-col space-y-2 justify-center text-center md:text-right md:justify-end w-full">
            <Link href="/">
              <a className={navClasses}>Home</a>
            </Link>
            <Link href="/shop-cookies">
              <a className={navClasses}>Cookies</a>
            </Link>
            <Link href="/merch">
              <a className={navClasses}>Merch</a>
            </Link>
            <Link href="/wholesale">
              <a className={navClasses}>Wholesale</a>
            </Link>
            <Link href="/location">
              <a className={navClasses}>Location</a>
            </Link>
          </div>
        </div>
      </footer>
      {router.asPath === "/" && <ButterHead />}
    </>
  );
};

export default Footer;

// https://codesandbox.io/s/eyes-follow-mouse-cursor-o577x
