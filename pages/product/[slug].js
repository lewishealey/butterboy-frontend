import Link from "next/link";
import { useRouter } from "next/router";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import RenderBody from "utils/body";
import Select from "react-select";
import Page from "components/Page";
import Cookie from "components/Cookie";
import { useCart } from "contexts/cart-context";
import client from "utils/sanity";
import { urlFor } from "helpers/sanity";
import { cookieListContainerStyles } from "../../utils/utils";

Modal.setAppElement("#__next");

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px solid #E50001",
    color: "#E50001",
    backgroundColor: state.isSelected ? "#f1f1f1" : "#FFFFFF",
    "&:hover": {
      backgroundColor: "#f1f1f1",
    },
    fontFamily: "bikoregular, Arial, sans-serif",
    padding: 20,
  }),
  control: (provided) => ({
    ...provided,
    border: "1px solid #E50001",
    height: 60,
    fontSize: 18,
    color: "#E50001",
    fontFamily: "bikoregular, Arial, sans-serif",
  }),
};

export default function SingleProduct({ settings, product, cookies }) {
  const router = useRouter();
  const [cookiesObject, setCookiesObject] = useState(cookies);
  const { addProduct } = useCart();
  const [count, setCount] = useState(0);
  const [maxCookies, setMaxCookies] = useState(6);
  const [price, setPrice] = useState(product?.price);
  const [title, setTitle] = useState(product?.title);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState("");
  const buttonClasses = "flex-1 text-xl text-vibrant text-center py-2";

  function renderCookieString(cookies) {
    let cook = [];
    cookies.forEach((c) => cook.push(`${c.quantity} X ${c.title}`));
    return cook.join(", ");
  }

  function addCookieToCart(cookie, math) {
    let newCookie = cookiesObject.find((c) => c._id === cookie._id);
    if (newCookie.quantity) {
      newCookie.quantity += math;
    } else {
      newCookie.quantity = 1;
    }

    const updatedCookies = cookiesObject.map((c) => {
      if (newCookie._id === c._id) return newCookie;
      return c;
    });

    let count = 0;
    updatedCookies.forEach((c) => {
      if (c.quantity) {
        count = count + c.quantity;
      }
    });

    setCount(count);
    setCookiesObject(updatedCookies);
  }

  function resetCookies() {
    const updatedCookies = cookiesObject.map((c) => {
      return {
        ...c,
        quantity: 0,
      };
    });

    setCount(0);
    setCookiesObject(updatedCookies);
  }

  function handleChange(total) {
    const quantity = total / 6;
    const totalPrice = quantity * product.price;
    const newTitle = product.title.replace("6", total);
    setTitle(newTitle);
    setPrice(totalPrice);
    if (total < maxCookies) {
      resetCookies();
    }
    setMaxCookies(total);
  }

  function handleCart() {
    if (count > maxCookies) {
      alert(
        `You can't add more cookies than you're allowed! Please remove ${
          count - maxCookies
        } cookie`
      );
    } else {
      const addedCookies = cookiesObject.filter((c) => c.quantity > 0);

      let changedCookies = [];
      addedCookies &&
        addedCookies.forEach((c) =>
          changedCookies.push({
            ...c,
            thumbnail: urlFor(c.thumbnail).url(),
          })
        );

      const productItem = {
        id: product?._id,
        title: title,
        price: price,
        cookies: changedCookies,
        cookiesString: renderCookieString(changedCookies),
        image: urlFor(product.thumbnail).url(),
        type: product?.details?.type,
        slug: product?.slug,
        quantity: 1,
        size: selectedSize ? selectedSize : product.details.sizing,
        selectedOption: selectedType ? selectedType : null,
        message: selectedMessage,
      };

      addProduct({ ...productItem, quantity: 1 });
      router.push("/cart");
    }
    // const cookieToPriceRatio = price / count;
    // if (
    //   product?.details?.type === "box" &&
    //   cookieToPriceRatio.toFixed(2) > 7.33
    // ) {
    //   return alert(
    //     "An error has occured, there seems to be too many cookies for the box selected. Please refresh and try again or notify Butterboy at manly@butterboy.com.au."
    //   );
    // }
  }

  if (!product) {
    return null;
  }

  const options = [];
  product.cookies &&
    product.cookies.forEach((c) => {
      options.push({
        label: c.title,
        value: c.title,
      });
    });

  let imageSize = "md:w-3/4";
  switch (product.image_size) {
    case "small":
      imageSize = "md:w-1/4";
      break;
    case "medium":
      imageSize = "md:w-1/2";
      break;
  }

  if (product.available) {
    return (
      <Page title={title} heading={title}>
        {product?.details?.type === "other" && (
          <div className="space-y-12 flex flex-col justify-center py-12">
            <div className="m-auto w-full max-w-5xl">
              <img
                src={urlFor(product.thumbnail).width(800)}
                className={`m-auto w-full ${imageSize}`}
              />
            </div>
            {options.length > 0 && (
              <div className="max-w-xl m-auto w-full">
                <Select
                  options={options}
                  onChange={(type) => setSelectedType(type)}
                  styles={customStyles}
                />
              </div>
            )}
            {selectedType && product.slug.current === "cookie-cake" && (
              <div className="max-w-xl m-auto w-full">
                <textarea
                  placeholder="Enter cake message"
                  onKeyDown={(e) => setSelectedMessage(e.target.value)}
                  onChange={(e) => setSelectedMessage(e.target.value)}
                  className="w-full bg-white border border-vibrant font-body p-3 text-xl"
                >
                  {selectedMessage}
                </textarea>
              </div>
            )}
            <div className="w-full flex justify-center">
              <span className="font-display text-vibrant px-8 py-4 text-4xl">
                ${price}
              </span>
              <button
                className={`font-display px-8 py-4 text-3xl ${
                  selectedType || options.length === 0
                    ? "hover:bg-red-700 bg-vibrant text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                onClick={handleCart}
                disabled={options && selectedType && selectedType.length === 0}
              >
                Add to cart
              </button>
            </div>
          </div>
        )}
        {product?.details?.type === "box" && (
          <>
            <div className={cookieListContainerStyles}>
              {cookiesObject.map((cookie, i) => {
                return (
                  <div
                    key={cookie.id + "-" + i}
                    className="flex flex-col space-y-4"
                  >
                    <Cookie cookie={cookie} />
                    <div className="flex border border-white bg-white">
                      <button
                        className={buttonClasses}
                        onClick={() => addCookieToCart(cookie, -1)}
                      >
                        -
                      </button>
                      <span className={buttonClasses}>
                        {cookie.quantity ? cookie.quantity : 0}
                      </span>
                      <button
                        className={buttonClasses}
                        onClick={() => addCookieToCart(cookie, +1)}
                        disabled={count === maxCookies}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="sticky space-y-4 md:space-y-0 flex-col md:flex-row bottom-0 md:bottom-12 left-0 w-full bg-vibrant font-display flex justify-between py-6 px-4 md:px-12 items-center z-20">
              <h2 className="text-white text-xl lg:text-3xl">
                {count}/{maxCookies} added to box
              </h2>
              <div className="flex flex-col lg:flex-row">
                {maxCookies > 6 && (
                  <button
                    className="hidden lg:flex font-display px-8 py-4 text-2xl text-center md:text-left bg-white text-vibrant  hover:bg-mauve"
                    onClick={() => handleChange(maxCookies - 6)}
                  >
                    -6 less
                  </button>
                )}
                <button
                  className={`absolute lg:hidden top-4 left-0 font-display px-4 py-2 text-2xl text-center md:text-left bg-white text-vibrant ${
                    maxCookies === 6 ? "opacity-50" : ""
                  }`}
                  onClick={() => handleChange(maxCookies - 6)}
                  disabled={maxCookies === 6}
                >
                  -6
                </button>

                <button
                  className="hidden lg:flex font-display px-8 py-4 text-2xl text-center md:text-left bg-white text-vibrant ml-2 hover:bg-mauve"
                  onClick={() => handleChange(maxCookies + 6)}
                >
                  +6 more
                </button>
                <button
                  className="absolute lg:hidden top-4 right-0 font-display px-4 py-2 text-2xl text-center md:text-left bg-white text-vibrant ml-2"
                  onClick={() => handleChange(maxCookies + 6)}
                >
                  +6
                </button>
                <span className="font-display text-white px-8 py-4 text-xl lg:text-4xl text-center md:text-left">
                  {maxCookies} cookies = ${price}
                </span>
                <button
                  className={`font-display bg-white text-vibrant px-8 py-4 text-2xl w-full lg:w-auto ${
                    count < maxCookies ? "opacity-50" : ""
                  }`}
                  disabled={count < maxCookies}
                  onClick={handleCart}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </>
        )}
        {product?.details?.type === "merch" && (
          <div className="space-y-12 flex flex-col justify-center py-12">
            <div className="m-auto w-full max-w-5xl">
              <img
                src={urlFor(product.thumbnail)}
                className={`m-auto ${imageSize}`}
              />
            </div>
            {product?.details?.sizing === "t-shirt" ? (
              <>
                <div className="w-full flex justify-center">
                  <button
                    className={`p-2 text-2xl font-body ${
                      selectedSize === "xs"
                        ? "bg-vibrant text-white"
                        : "bg-white hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedSize("xs")}
                  >
                    XS
                  </button>
                  <button
                    className={`p-2 text-2xl font-body ${
                      selectedSize === "s"
                        ? "bg-vibrant text-white"
                        : "bg-white hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedSize("s")}
                  >
                    S
                  </button>
                  <button
                    className={`p-2 text-2xl font-body ${
                      selectedSize === "m"
                        ? "bg-vibrant text-white"
                        : "bg-white hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedSize("m")}
                  >
                    M
                  </button>
                  <button
                    className={`p-2 text-2xl font-body ${
                      selectedSize === "l"
                        ? "bg-vibrant text-white"
                        : "bg-white hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedSize("l")}
                  >
                    L
                  </button>
                  <button
                    className={`p-2 text-2xl font-body ${
                      selectedSize === "xl"
                        ? "bg-vibrant text-white"
                        : "bg-white hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedSize("xl")}
                  >
                    XL
                  </button>
                  <button
                    className={`p-2 text-2xl font-body ${
                      selectedSize === "xxl"
                        ? "bg-vibrant text-white"
                        : "bg-white hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedSize("xxl")}
                  >
                    XXL
                  </button>
                </div>
                <div className="w-full flex flex-col md:flex-row justify-center px-3 md:px-0">
                  <span className="font-display text-vibrant px-8 py-4 text-4xl text-center md:text-left">
                    ${price}
                  </span>
                  <button
                    className={`font-display text-white px-8 py-4 text-3xl ${
                      selectedSize
                        ? "bg-vibrant hover:bg-red-700"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!selectedSize}
                    onClick={handleCart}
                  >
                    Add to cart
                  </button>
                </div>
              </>
            ) : (
              <div className="w-full flex flex-col md:flex-row justify-center px-3 md:px-0">
                <span className="font-display text-vibrant px-8 py-4 text-4xl text-center md:text-left">
                  ${price}
                </span>
                <button
                  className={`font-display bg-vibrant text-white px-8 py-4 text-3xl hover:bg-red-700`}
                  onClick={handleCart}
                >
                  Add to cart
                </button>
              </div>
            )}
          </div>
        )}
      </Page>
    );
  } else {
    return (
      <Page title={product.title} heading={product.title}>
        <div className="space-y-12 flex flex-col justify-center w-full items-center py-12 px-6 md:px-0">
          <div className="m-auto w-full max-w-5xl">
            {product.thumbnail && (
              <img
                src={urlFor(product.thumbnail).width(800)}
                className={`m-auto ${imageSize}`}
              />
            )}
          </div>
          <RenderBody
            body={settings?.product?.outOfStockText}
            className="text-xl md:text-2xl font-body text-vibrant max-w-2xl text-center"
          />
        </div>
      </Page>
    );
  }
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "product" && defined(slug.current)][].slug.current`
  );
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params;
  const product = await client.fetch(
    `
      *[_type == "product" && slug.current == $slug][0] {
        ...,
        cookies[]->{
            ...
        }
      }
    `,
    { slug }
  );
  const cookies = await client.fetch(`
        *[_type == "cookie" && type == "cookie"] | order(title)
    `);
  const settings = await client.fetch(`
        *[_type == "settings"]
    `);

  return {
    props: {
      product,
      cookies,
      settings: settings[0],
    },
  };
}
