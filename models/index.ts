export interface IProduct {
  id: number;
  sku: number;
  title: string;
  price: number;
  cookies: Cookies[];
}

export interface ICartProduct extends IProduct {
  quantity: number;
}

export interface Cookies {
  id: number;
  title: string;
  slug: string;
  quantity: number;
}

export interface ICartTotal {
  productQuantity: number;
  totalPrice: number;
}

export interface IGetProductsResponse {
  data: {
    products: IProduct[];
  };
}
