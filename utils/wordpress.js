
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const BASE_URL = process.env.WOO_URL + 'wp-json/wp/v2';

const api = new WooCommerceRestApi({
    url: "https://butterboy.test/",
    consumerKey: "ck_cbcdfd631fe10a27c0985d772edd91706619111c",
    consumerSecret: "cs_32d1d362587694d3be00d262d7b5021d38567af4",
    version: "wc/v3",
    queryStringAuth: true,
});

export async function getProducts() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    try {
      const response = await api.get("products");
      return response;
    } catch (error) {
      throw new Error(error);
    }
}

export async function getProduct(slug) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    try {
      const response = await api.get(`products/?slug=${slug}`);
      return response.data[0];
    } catch (error) {
      throw new Error(error);
    }
}

export async function getCookies() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    try {
      const response = await api.get(`products?tag=${process.env.COOKIES_TAG}`);
      return response;
    } catch (error) {
      throw new Error(error);
    }
}

export async function getMerch() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    try {
      const response = await api.get(`products?tag=${process.env.MERCH_TAG}`);
      return response;
    } catch (error) {
      throw new Error(error);
    }
}

export async function getBoxes() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    try {
      const response = await api.get(`products?tag=${process.env.BOXES_TAG}`);
      console.log(response)
      return response;
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }
}

export async function getOther() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    try {
      const response = await api.get(`products?tag=${process.env.OTHER_TAG}`);
      return response;
    } catch (error) {
      throw new Error(error);
    }
}

/**
 * Get Formatted create order data.
 *
 * @param order
 * @param products
 * @return {{shipping: {country: *, city: *, phone: *, address_1: (string|*), address_2: (string|*), postcode: (string|*), last_name: (string|*), company: *, state: *, first_name: (string|*), email: *}, payment_method_title: string, line_items: (*[]|*), payment_method: string, billing: {country: *, city: *, phone: *, address_1: (string|*), address_2: (string|*), postcode: (string|*), last_name: (string|*), company: *, state: *, first_name: (string|*), email: *}}}
 */
 export const getCreateOrderData = (order, products) => {
  // Set the billing Data to shipping, if applicable.
  const billingData = order.billingDifferentThanShipping ? order.billing : order.shipping;

  // Checkout data.
  return {
      shipping: {
          first_name: order?.shipping?.firstName,
          last_name: order?.shipping?.lastName,
          address_1: order?.shipping?.address1,
          address_2: order?.shipping?.address2,
          city: order?.shipping?.city,
          country: order?.shipping?.country,
          state: order?.shipping?.state,
          postcode: order?.shipping?.postcode,
          email: order?.shipping?.email,
          phone: order?.shipping?.phone,
          company: order?.shipping?.company,
      },
      billing: {
          first_name: billingData?.firstName,
          last_name: billingData?.lastName,
          address_1: billingData?.address1,
          address_2: billingData?.address2,
          city: billingData?.city,
          country: billingData?.country,
          state: billingData?.state,
          postcode: billingData?.postcode,
          email: billingData?.email,
          phone: billingData?.phone,
          company: billingData?.company,
      },
      status: "completed",
      set_paid: "true",
      paid: "true",
      payment_method: 'stripe',
      payment_method_title: 'Stripe',
      line_items: products,
      meta_data: [
        {
          key: "delivery_type",
          value: order?.deliveryType
        },
        {
          key: "newsletter",
          value: order?.newsletter
        }
      ],
  };
}

export const createTheOrder = async ( orderData, setOrderFailedError, previousRequestError ) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  let response = {
      orderId: null,
      total: '',
      currency: '',
      error: ''
  };

  // Don't proceed if previous request has error.
  if ( previousRequestError ) {
      response.error = previousRequestError;
      return response;
  }

  console.log("send", JSON.stringify( orderData ))

  setOrderFailedError( '' );

  try {
      const request = await fetch( '/api/create-order', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify( orderData ),
      } );

      const result = await request.json();
      if ( result.error ) {
          response.error = result.error
          setOrderFailedError( 'Something went wrong. Order creation failed. Please try again' );
      }
      response.orderId = result?.orderId ?? '';
      response.total = result.total ?? '';
      response.currency = result.currency ?? '';

  } catch ( error ) {
      // @TODO to be handled later.
      console.warn( 'Handle create order error', error?.message );
  }

  return response;
}


// export async function getEvent(slug) {
//   const events = await getEvents();
//   const eventArray = events.filter((event) => event.slug == slug);
//   const event = eventArray.length > 0 ? eventArray[0] : null;
//   return event;
// }

export async function getSlugs(type) {
  let elements = [];
  switch (type) {
    case 'products':
      elements = await getProducts();
      break;
    case 'cookies':
      elements = await getCookies();
      break;
  }
  const elementsIds = elements.data.map((element) => {
    return {
      params: {
        slug: element.slug,
      },
    };
  });
  return elementsIds;
}