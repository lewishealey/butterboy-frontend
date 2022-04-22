
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const BASE_URL = 'https://butterboy.test/wp-json/wp/v2';

const api = new WooCommerceRestApi({
    url: "https://butterboy.test/",
    consumerKey: "ck_cbcdfd631fe10a27c0985d772edd91706619111c",
    consumerSecret: "cs_32d1d362587694d3be00d262d7b5021d38567af4",
    version: "wc/v3"
  });

// export async function getPosts() {
//   const postsRes = await fetch(BASE_URL + '/posts?_embed');
//   const posts = await postsRes.json();
//   return posts;
// }

// export async function getPost(slug) {
//   const posts = await getPosts();
//   const postArray = posts.filter((post) => post.slug == slug);
//   const post = postArray.length > 0 ? postArray[0] : null;
//   return post;
// }

export async function getCookies() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const cookiesRes = await fetch(BASE_URL + '/cookies?_embed');
    const cookies = await cookiesRes.json();
    return cookies;
}

export async function getProducts() {
    try {
      const response = await api.get("products");
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

// export async function getSlugs(type) {
//   let elements = [];
//   switch (type) {
//     case 'posts':
//       elements = await getPosts();
//       break;
//     case 'events':
//       elements = await getEvents();
//       break;
//   }
//   const elementsIds = elements.map((element) => {
//     return {
//       params: {
//         slug: element.slug,
//       },
//     };
//   });
//   return elementsIds;
// }