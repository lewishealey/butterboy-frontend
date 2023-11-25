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
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "jw8z67rq5c")`,
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
