import { useCartContext } from './CartContextProvider';
import useCartProducts from './useCartProducts';
import useCartTotal from './useCartTotal';

const useCart = () => {
  const {
    products,
    addProduct,
    removeProduct,
    increaseProductQuantity,
    decreaseProductQuantity,
    assignDeliveryType,
    deliveryType,
  } = useCartProducts();
  const { total, updateCartTotal } = useCartTotal();

  return {
    products,
    addProduct,
    removeProduct,
    increaseProductQuantity,
    decreaseProductQuantity,
    assignDeliveryType,
    deliveryType,
    total,
    updateCartTotal,
  };
};

export default useCart;
