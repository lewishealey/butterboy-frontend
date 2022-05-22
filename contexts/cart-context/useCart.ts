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
    assignDeliveryPostcode,
    assignOrderMessage,
    pickupDate,
    pickupTime,
    deliveryType,
    deliveryPostcode,
    clearCart,
    orderMessage
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
    assignDeliveryPostcode,
    assignOrderMessage,
    deliveryPostcode,
    pickupDate,
    pickupTime,
    deliveryType,
    orderMessage,
    total,
    updateCartTotal,
    clearCart
  };
};

export default useCart;
