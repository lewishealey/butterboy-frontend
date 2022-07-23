import '../styles/globals.css'
import { CartProvider } from '../contexts/cart-context/CartContextProvider'

function MyApp({ Component, pageProps }) {
  return <CartProvider><Component {...pageProps} /></CartProvider>
}

export default MyApp
