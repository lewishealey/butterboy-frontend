import Page from "../components/Page";
import Link from "next/link";
import { useCart } from "../contexts/cart-context";
import client from "../utils/sanity";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Modal from "react-modal";
import moment from "moment";
import { urlFor } from "../helpers/sanity";
import PickDateTime from "../components/PickDateTime";
import product from "../studio/schemas/product";
import { getDeliveryDates } from "../utils/utils";

Modal.setAppElement("#__next");

const customStyles = {
  background: {
    zIndex: "1000",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "40%",
    background: "#ffffff",
    padding: "0",
    overflow: "none",
    maxHeight: "75%",
  },
};

const buttonClasses =
  "border border-gray-400 rounded bg-white hover:bg-mauve px-4 py-2 w-full";

export default function Cart({ settings }) {
  const {
    products,
    total,
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProduct,
    deliveryType,
    assignDeliveryType,
    pickupDate,
    assignPickupDate,
    pickupTime,
    assignPickupTime,
    assignDeliveryPostcode,
    deliveryPostcode,
    assignDeliveryDay,
    deliveryDay,
    assignOrderMessage,
    orderMessage,
  } = useCart();
  const [postcodeModal, setPostcodeModal] = useState(false);
  const [date, setDate] = useState(null);
  const [dateModal, setDateModal] = useState(false);
  const [postcode, setPostcode] = useState("");
  const [message, setMessage] = useState("");
  const [selectDeliveryDay, setSelectDeliveryDay] = useState("");
  const allowedPostcodes = [settings?.cart?.allowedPostcodes];

  console.log("products", products);

  const activeDeliveryClasses =
    "flex-1 text-center bg-vibrant text-mauve font-display text-2xl md:text-6xl py-4 md:py-12 uppercase";
  const inActiveDeliveryClasses =
    "flex-1 text-center bg-cream text-mauve font-display text-2xl md:text-6xl py-4 md:py-12 uppercase";

  function openDateModal() {
    setDateModal(true);
  }

  function closeDateModal() {
    setDateModal(false);
  }

  function openPostcodeModal() {
    setPostcodeModal(true);
  }

  function closePostcodeModal() {
    setPostcodeModal(false);
  }

  function handleDate(date) {
    setDate(date);
  }

  function onSelectDeliveryDay() {
    setSelectDeliveryDay(true);
  }

  function handleSchedule(date, time) {
    assignPickupDate(date);
    assignPickupTime(time);
    closeDateModal();
  }

  function handlePostcodeChange(e) {
    setPostcode(e.target.value);
    if (e.target.value.length > 3) {
      if (allowedPostcodes[0].includes(e.target.value)) {
        setMessage(true);
        assignDeliveryPostcode(e.target.value);
      } else {
        setMessage(false);
      }
    } else {
      setMessage("");
    }
  }

  const hasCookes = products.filter(
    (x) => x.type === "box" || x.type === "other"
  );

  if (product && products.length === 0) {
    return (
      <Page title="Your Cart" heading="Your Cart">
        <div className="py-8 space-y-4">
          <h2 className="font-body text-2xl text-center text-vibrant">
            Please add some items to your cart
          </h2>
          <Link href="/shop-cookies">
            <a className="underline uppercase text-vibrant font-body text-lg md:text-xl text-center w-full flex justify-center">
              Continue Shopping
            </a>
          </Link>
        </div>
      </Page>
    );
  }

  if (!settings) {
    return <div>Loading settings</div>;
  }

  return (
    <Page title="Your Cart" heading="Your Cart">
      <Modal
        isOpen={postcodeModal}
        onRequestClose={closePostcodeModal}
        style={customStyles}
        contentLabel="Enter postcode"
      >
        {!selectDeliveryDay && (
          <div className="w-full h-full p-6 md:p-12 space-y-4">
            <h2 className="font-display text-3xl text-center text-vibrant uppercase">
              Enter postcode
            </h2>
            <input
              className="border border-vibrant h-20 px-6 p-4 w-full"
              type="number"
              placeholder="Only 15km radius of Manly allowed"
              name="postcode"
              onChange={handlePostcodeChange}
              defaultValue={postcode}
              autoFocus
            />
            {message === false && (
              <div className="space-y-4">
                <p className="font-body text-xl">
                  Postcode not available for delivery, sorry :(
                </p>
                <button
                  className="font-display uppercase text-vibrant bg-gray-100 py-4 text-2xl hover:bg-vibrant hover:text-mauve w-full"
                  onClick={closePostcodeModal}
                >
                  Close
                </button>
              </div>
            )}
            {message === true && (
              <button
                className="font-display uppercase text-vibrant bg-mauve py-4 md:py-6 text-2xl md:text-3xl hover:bg-vibrant hover:text-mauve w-full"
                onClick={onSelectDeliveryDay}
              >
                Next
              </button>
            )}
          </div>
        )}
        {selectDeliveryDay && (
          <div className="w-full h-full p-12 space-y-4">
            <h2 className="font-display text-3xl text-center text-vibrant uppercase">
              Select a delivery date
            </h2>
            <ul className="flex flex-col space-y-2 font-body text-xl w-full">
              {getDeliveryDates(settings.delivery).map((d) => {
                return (
                  <button
                    className={buttonClasses}
                    key={d}
                    onClick={() => {
                      assignDeliveryDay(moment(d).format("dddd, MMMM Do YYYY"));
                      closePostcodeModal();
                    }}
                  >
                    {moment(d).format("dddd, MMMM Do YYYY")}
                  </button>
                );
              })}
            </ul>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={dateModal}
        onRequestClose={closeDateModal}
        style={customStyles}
        contentLabel="Enter date"
      >
        <div className="mx-auto w-full p-1 bg-white text-dark text-center shadow">
          <div className="w-full h-full p-12 pt-4 space-y-8">
            <PickDateTime
              onSchedule={handleSchedule}
              settings={settings.delivery}
            />
          </div>
        </div>
      </Modal>

      <div className="flex flex-col justify-center space-y-0 md:space-y-8 py-4 md:py-8 md:pb-0 border-l border-r border-vibrant">
        <Link href="/shop-cookies">
          <a className="underline uppercase text-vibrant font-body text-lg md:text-xl text-center w-full flex justify-center pb-4 md:pb-0">
            Continue Shopping
          </a>
        </Link>
        {hasCookes && deliveryType === "local-delivery" && (
          <RenderDeliveryNotice settings={settings.delivery} />
        )}
        {deliveryType === "collect" && (
          <RenderCollectionNotice settings={settings.delivery} />
        )}
        <div>
          <div className="border-t border-b border-vibrant grid-cols-6 w-full hidden md:grid">
            <div className="font-display text-2xl text-vibrant px-8 py-4 border-r border-vibrant uppercase col-span-3">
              Product
            </div>
            <div className="font-display text-2xl text-vibrant px-8 py-4 border-r border-vibrant uppercase text-center">
              Price
            </div>
            <div className="font-display text-2xl text-vibrant px-8 py-4 border-r border-vibrant uppercase text-center">
              Quantity
            </div>
            <div className="font-display text-2xl text-vibrant px-8 py-4 uppercase text-center">
              Total
            </div>
          </div>
          {products.map((product, i) => {
            return (
              <div
                className="border-b border-vibrant grid grid-cols-1 md:grid-cols-6 w-full"
                key={`product_${i}`}
              >
                <div className="md:border-r border-vibrant pb-8 p-4 md:p-6 md:p-12 col-span-3 border-b md:border-b-0">
                  <Link href={`/product/${product.slug.current}`}>
                    <a className="font-display text-2xl text-xl text-vibrant mb-4 uppercase hover:underline">
                      {product.title}
                    </a>
                  </Link>
                  {product.size && (
                    <h4 className="font-body text-lg text-gray-800 mb-6 uppercase">
                      {product.size}
                    </h4>
                  )}
                  <div className="w-full flex space-x-2 items-center">
                    {product.cookies && (
                      <div className="flex flex-col text-lg font-body uppercase space-y-2 text-vibrant">
                        {product.cookies.map((cookie) => (
                          <div
                            className="flex space-x-4 items-center"
                            key={cookie._id}
                          >
                            <img src={cookie.thumbnail} className="w-8 h-8" />
                            <span>
                              {cookie.quantity} X {cookie.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    {product.selectedOption && (
                      <div className="flex flex-col text-lg font-body uppercase space-y-2 text-vibrant">
                        {product.selectedOption.label}
                      </div>
                    )}
                    {product.message && (
                      <div className="flex flex-col text-lg font-body uppercase space-y-2 text-vibrant">
                        {" "}
                        - "{product.message}"
                      </div>
                    )}
                  </div>
                </div>
                <div className="font-body text-2xl text-vibrant px-8 py-2 md:py-4 text-center border-r border-vibrant items-center justify-center hidden md:flex">
                  ${product.price.toFixed(2)}
                </div>
                <div className="font-body text-2xl text-vibrant px-8 py-2 md:py-4 text-center border-r border-vibrant flex items-center justify-center">
                  {product.quantity}
                  <div className="flex flex-col px-4">
                    <button onClick={() => increaseProductQuantity(product)}>
                      <ChevronUpIcon className="h-5 w-5 text-vibrant" />
                    </button>
                    {product.quantity === 1 ? (
                      <button onClick={() => removeProduct(product)}>
                        <ChevronDownIcon className="h-5 w-5 text-vibrant" />
                      </button>
                    ) : (
                      <button onClick={() => decreaseProductQuantity(product)}>
                        <ChevronDownIcon className="h-5 w-5 text-vibrant" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="font-body text-2xl text-vibrant px-8 py-4 text-center flex items-center justify-center">
                  ${product.quantity * product.price}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex md:border-t border-b border-vibrant">
          <div className="grid grid-cols-1 md:grid-cols-6 w-full">
            <label className="font-display uppercase flex items-center text-vibrant bg-cream text-xl hover:bg-gray-100 w-full md:border-r border-vibrant h-full md:justify-center col-span-1 p-4 md:p-0">
              ADD A MESSAGE
            </label>
            <textarea
              className="p-4 md:p-8 w-full h-full col-span-3 md:border-r border-vibrant border-b md:border-b-0 bg-cream"
              onChange={(e) => assignOrderMessage(e.target.value)}
              defaultValue={orderMessage}
            >
              {orderMessage}
            </textarea>
            <div className="col-span-2">
              <div className="flex items-center border-b border-vibrant w-full">
                <div className="font-display uppercase flex items-center text-vibrant bg-cream text-xl flex-1 py-4 md:border-r border-vibrant justify-center">
                  Subtotal
                </div>
                <div className="font-body text-xl text-vibrant flex-1 py-4 px-4">
                  {total.currencyFormat}
                  {total.totalPrice}
                </div>
              </div>
              <div className="font-body uppercase text-vibrant text-center text-xl flex justify-center items-center w-full py-4">
                {deliveryType === "delivery" &&
                  "SHIPPING CALCULATED AT CHECKOUT"}
              </div>
            </div>
          </div>
        </div>
        <section className="flex flex-col md:flex-row border-b border-t border-vibrant">
          <button
            className={
              deliveryType === "collect"
                ? activeDeliveryClasses
                : inActiveDeliveryClasses
            }
            onClick={() => assignDeliveryType("collect")}
          >
            Shop pick up
          </button>
          <button
            className={
              deliveryType === "local-delivery" ||
              deliveryType === "merch-delivery"
                ? activeDeliveryClasses
                : inActiveDeliveryClasses
            }
            onClick={() =>
              hasCookes.length > 0
                ? assignDeliveryType("local-delivery")
                : assignDeliveryType("merch-delivery")
            }
          >
            Shop delivery
          </button>
        </section>
        {deliveryType === "collect" && (
          <section>
            <div className="flex flex-col md:flex-row md:border-t border-vibrant w-full border-b border-vibrant">
              <div className="flex space-x-4 md:border-r border-b md:border-b-0 border-vibrant p-8 w-full items-center">
                <span className="h-4 w-4 border-4 border-vibrant bg-mauve rounded-full mt-2 hidden md:flex">
                  &nbsp;
                </span>
                <div>
                  <h3 className="font-display uppercase text-vibrant text-xl md:text-2xl font-body">
                    BUTTERBOY MANLY
                  </h3>
                  <span className="text-vibrant text-xl md:text-2xl font-body">
                    {settings?.homepage?.location}
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col">
                <div className="border-b border-vibrant flex w-full">
                  <button
                    className="font-display uppercase text-vibrant bg-cream py-4 text-md md:text-xl hover:bg-gray-100 w-full"
                    onClick={openDateModal}
                  >
                    {pickupDate && pickupTime
                      ? `${pickupDate} ${pickupTime}`
                      : `CHOOSE A DATE AND TIME`}
                  </button>
                  <button className="font-display uppercase text-vibrant bg-mauve py-3 md:py-6 text-xl md:text-xl hover:bg-vibrant hover:text-mauve border-l border-vibrant px-4 md:px-8">
                    <img src="/calendar.svg" className="w-8 md:w-12" />
                  </button>
                </div>
                <Link href="/checkout">
                  <button
                    className={`font-display uppercase text-vibrant bg-mauve py-4 md:py-8 text-xl md:text-3xl ${
                      !pickupDate && !pickupTime
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "hover:bg-vibrant hover:text-mauve"
                    }`}
                    disabled={!pickupDate && !pickupTime}
                  >
                    Check out
                  </button>
                </Link>
              </div>
            </div>
          </section>
        )}
        {deliveryType === "local-delivery" && (
          <section>
            <div className="flex border-t border-vibrant flex-col md:flex-row w-full border-b border-vibrant">
              <div className="flex space-x-4 border-r border-vibrant p-4 md:p-8 w-full items-center order-1 md:order-0">
                <span className="h-4 w-4 border-4 border-vibrant bg-mauve rounded-full mt-2 hidden md:flex">
                  &nbsp;
                </span>
                <div className="flex flex-col space-y-2">
                  <h3 className="font-display uppercase text-vibrant text-base md:text-2xl font-body">
                    Important delivery info
                  </h3>
                  <span className="text-vibrant text-base md:text-2xl font-body">
                    {settings?.cart?.localDeliveryInfo}
                  </span>
                  <span className="text-vibrant text-base md:text-2xl font-body">
                    {settings?.homepage?.location}
                  </span>
                  <span className="text-vibrant text-base md:text-2xl font-body">
                    {settings?.cart?.localDeliveryAvailability}
                  </span>
                </div>
              </div>
              {settings.delivery.allowLocalDelivery && (
                <div className="flex w-full flex-col order-0 md:order-1">
                  <div className="border-b border-vibrant flex w-full">
                    <button
                      className="font-display uppercase text-vibrant bg-cream py-4 text-base md:text-3xl hover:bg-gray-100 md:h-32 w-full px-4 border-t border-vibrant"
                      onClick={openPostcodeModal}
                    >
                      {message === true && postcode
                        ? `Delivery to ${postcode} - ${
                            deliveryDay ? deliveryDay : ""
                          }`
                        : "ENTER YOUR POSTCODE"}
                    </button>
                  </div>
                  <Link href="/checkout">
                    <button
                      className={`font-display uppercase text-vibrant bg-mauve py-6 md:py-8 text-2xl md:text-3xl border-b border-vibrant md:border-0 ${
                        !postcode &&
                        "bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-vibrant hover:text-mauve"
                      }`}
                      disabled={!postcode}
                    >
                      Check out
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}
        {deliveryType === "merch-delivery" && (
          <section>
            <div className="flex border-t border-vibrant flex flex-col md:flex-row w-full border-b border-vibrant">
              <div className="flex space-x-4 border-r border-vibrant p-8 w-full items-center">
                <span className="h-4 w-4 border-4 border-vibrant bg-mauve rounded-full mt-2 hidden md:flex">
                  &nbsp;
                </span>
                <div className="flex flex-col space-y-2">
                  <h3 className="font-display uppercase text-vibrant text-lg md:text-2xl font-body">
                    Important delivery info
                  </h3>
                  <span className="text-vibrant text-lg md:text-2xl font-body">
                    {settings?.cart?.merchDeliveryInfo}
                  </span>
                  <span className="text-vibrant text-lg md:text-2xl font-body">
                    {settings?.homepage?.location}
                  </span>
                  <span className="text-vibrant text-lg md:text-2xl font-body">
                    {settings?.cart?.merchDeliveryAvailability}
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col">
                <div className="border-b border-vibrant flex w-full">
                  <div className="font-display uppercase text-vibrant bg-cream py-4 text-base md:text-3xl md:h-32 w-full px-4 border-t border-vibrant"></div>
                </div>
                <Link href="/checkout">
                  <button
                    className={`font-display uppercase py-6 md:py-8 text-3xl bg-vibrant text-white bg-vibrant hover:text-mauve`}
                  >
                    Check out
                  </button>
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </Page>
  );
}
export async function getStaticProps() {
  const settings = await client.fetch(`
        *[_type == "settings"]
    `);

  return {
    props: {
      settings: settings[0],
    },
  };
}

const RenderCollectionNotice = () => {
  const bannerStyles =
    "font-body text-vibrant py-2 w-full text-xl text-center border-b border-t border-vibrant";
  return <div className={bannerStyles}>Order 2 days in advance</div>;
};

const RenderDeliveryNotice = ({ settings }) => {
  var date = moment().format("MM-DD-YYYY");
  var time = "09:00";
  var now = moment();
  var today = moment(date + " " + time);
  const nowPlus1 = moment(today).add(1, "days");
  const nowPlus2 = moment(today).add(2, "days");
  const nowPlus3 = moment(today).add(3, "days");
  const nowPlus4 = moment(today).add(4, "days");

  let deliveryDayNums = [];

  settings.deliveryDays &&
    settings.deliveryDays.forEach((delivery) =>
      deliveryDayNums.push(parseInt(delivery.value))
    );
  const bannerStyles =
    "font-body text-vibrant py-2 w-full text-xl text-center border-b border-t border-vibrant";

  if (nowPlus1.diff(now, "hours") >= settings.notice) {
    // Check to see if that day is a delivery day
    if (deliveryDayNums.includes(nowPlus1.day())) {
      return (
        <div className={bannerStyles}>
          📦 Order in the next {nowPlus1.diff(now, "hours") - settings.notice}{" "}
          hours to qualify for {nowPlus1.format("dddd")} delivery
        </div>
      );
    }
  }

  if (nowPlus2.diff(now, "hours") >= settings.notice) {
    // Check to see if that day is a delivery day
    if (deliveryDayNums.includes(nowPlus2.day())) {
      return (
        <div className={bannerStyles}>
          📦 Order in the next {nowPlus2.diff(now, "hours") - settings.notice}{" "}
          hours to qualify for {nowPlus2.format("dddd")} delivery
        </div>
      );
    }
  }

  if (nowPlus3.diff(now, "hours") >= settings.notice) {
    if (deliveryDayNums.includes(nowPlus3.day())) {
      return (
        <div className={bannerStyles}>
          📦 Order in the next {nowPlus3.diff(now, "hours") - settings.notice}{" "}
          hours to qualify for {nowPlus3.format("dddd")} delivery
        </div>
      );
    }
  }

  if (nowPlus4.diff(now, "hours") >= settings.notice) {
    if (deliveryDayNums.includes(nowPlus4.day())) {
      return (
        <div className={bannerStyles}>
          📦 Order in the next {nowPlus4.diff(now, "hours") - settings.notice}{" "}
          hours to qualify for {nowPlus4.format("dddd")} delivery
        </div>
      );
    }
  }
};
