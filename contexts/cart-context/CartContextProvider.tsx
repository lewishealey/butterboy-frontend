import { createContext, useContext, FC, useState } from 'react';
import { ICartProduct, ICartTotal } from '../../models';

export interface ICartContext {
  products: ICartProduct[];
  setProducts(products: ICartProduct[]): void;
  total: ICartTotal;
  setTotal(products: any): void;
  deliveryType: string;
  setDeliveryType(type: any): void;
  pickupDate: string;
  setPickupDate(type: any): void;
  pickupTime: string;
  setPickupTime(type: any): void;
  deliveryPostcode: string;
  deliveryDay: any;
  setDeliveryDay(type: any): void;
  setDeliveryPostcode(type: any): void;
  orderMessage: string;
  setOrderMessage(type: any): void;
}

export interface DeliveryType {
  type: 'collect'| 'delivery';
}

const CartContext = createContext<ICartContext | undefined>(undefined);
const useCartContext = (): ICartContext => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }

  return context;
};

const totalInitialValues = {
  productQuantity: 0,
  totalPrice: 0,
};

const CartProvider: FC = (props) => {
  const [products, setProducts] = useState<ICartProduct[]>([]);
  const [total, setTotal] = useState<ICartTotal>(totalInitialValues);
  const [deliveryType, setDeliveryType] = useState("collect");
  const [pickupDate, setPickupDate] = useState(null);
  const [pickupTime, setPickupTime] = useState(null);
  const [deliveryPostcode, setDeliveryPostcode] = useState(null);
  const [deliveryDay, setDeliveryDay] = useState(null);
  const [orderMessage, setOrderMessage] = useState(null);

  const CartContextValue: ICartContext = {
    products,
    setProducts,
    deliveryType,
    setDeliveryType,
    pickupDate,
    setPickupDate,
    pickupTime,
    setPickupTime,
    deliveryPostcode,
    setDeliveryPostcode,
    deliveryDay,
    setDeliveryDay,
    orderMessage,
    setOrderMessage,
    total,
    setTotal,
  };

  return <CartContext.Provider value={CartContextValue} {...props} />;
};

export { CartProvider, useCartContext };
