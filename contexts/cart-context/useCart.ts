import { useCartContext } from './CartContextProvider';
import useCartProducts from './useCartProducts';
import useCartTotal from './useCartTotal';

const useCart = () => {
  const { isOpen, setIsOpen } = useCartContext();
  const {
    products,
    addProduct,
    removeProduct,
    increaseProductQuantity,
    decreaseProductQuantity,
  } = useCartProducts();
  const { total, updateCartTotal } = useCartTotal();

  return {
    products,
    addProduct,
    removeProduct,
    increaseProductQuantity,
    decreaseProductQuantity,
    total,
    updateCartTotal,
  };
};

export default useCart;
