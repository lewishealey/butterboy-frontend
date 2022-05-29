export interface IProduct {
  id: number;
  sku: number;
  title: string;
  price: number;
  cookies: Cookies[];
}

export interface ICartProduct extends IProduct {
  image: any;
  quantity: number;
}

export interface Cookies {
  id: number;
  title: string;
  slug: string;
  quantity: number;
}

export interface ICartTotal {
  toFixed?(arg0: number): import("react").ReactNode;
  productQuantity: number;
  totalPrice: number;
}

export interface IGetProductsResponse {
  data: {
    // products: IProduct[];
  };
}
