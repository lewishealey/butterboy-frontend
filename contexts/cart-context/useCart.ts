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
    assignPickupDate,
    assignPickupTime,
    pickupDate,
    pickupTime,
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
    assignPickupDate,
    assignPickupTime,
    pickupDate,
    pickupTime,
    deliveryType,
    total,
    updateCartTotal,
  };
};

export default useCart;
