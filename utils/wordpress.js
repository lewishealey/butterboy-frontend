
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const BASE_URL = 'https://butterboy.test/wp-json/wp/v2';

const api = new WooCommerceRestApi({
    url: process.env.WOO_URL,
    consumerKey: process.env.WOO_KEY,
    consumerSecret: process.env.WOO_SECRET,
    version: "wc/v3"
});

export async function getCookies() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const cookiesRes = await fetch(BASE_URL + '/cookies?_embed');
    const cookies = await cookiesRes.json();
    return cookies;
}

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

export async function getMerch() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    try {
      const response = await api.get(`products/tag/${process.env.MERCH_TAG}`);
      return response;
    } catch (error) {
      throw new Error(error);
    }
}

export async function getBoxes() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    try {
      const response = await api.get(`products/tag/${process.env.COOKIES_TAG}`);
      return response;
    } catch (error) {
      throw new Error(error);
    }
}

export async function getOther() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    try {
      const response = await api.get(`products/tag/${process.env.OTHER_TAG}`);
      return response;
    } catch (error) {
      throw new Error(error);
    }
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