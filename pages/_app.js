import "../styles/globals.css";
import "../styles/mapbox.css";
import { CartProvider } from "../contexts/cart-context/CartContextProvider";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Script
        id="tag-manager"
        src="https://www.googletagmanager.com/gtag/js?id=G-S9RM03YZLZ"
        strategy="afterInteractive"
      ></Script>
      <Script
        strategy="afterInteractive"
        id="hotjar"
        dangerouslySetInnerHTML={{
          __html: `
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3087060,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')`,
        }}
      />

      <Script
        id="tag-manager-inject"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-S9RM03YZLZ')`,
        }}
      />
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
