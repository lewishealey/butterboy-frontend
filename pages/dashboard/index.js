import Page from "components/Page";
import client from "utils/sanity";
import Protect from "components/Protect";
import { useState, useEffect } from "react";
import imageUrlBuilder from "@sanity/image-url";
import moment from "moment";
import Modal from "react-modal";
const builder = imageUrlBuilder(client);
import styled from "styled-components";
import { useRouter } from "next/router";

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
    width: "40%",
    background: "#F8F0E5",
    padding: "0",
    overflow: "none",
    maxHeight: "75%",
  },
};

const Container = styled.div`
  margin: 1em auto;
  width: 100%;
  padding: 1em;
  background-color: #F8F0E5;
  color: #333;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 2px 4px #00000018;
  @media (max-width: 520px) {
      width: 100%;
  }
]`;

export default function Dashboard() {
  const sortFormat = "YYYY-MM-DD";
  const [orderData, setOrderData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [orderId, setOrderId] = useState(null);
  const [trackingId, setTrackingId] = useState("");
  const router = useRouter();
  const [sortedDate, setSortedDate] = useState(
    moment().format(sortFormat).toString()
  );
  
  function getOrders() {
    fetch("/api/get-orders", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res)
          if (sortedDate) {
            setOrderData(
              res.filter(
                (x) =>
                  sortedDate ===
                  moment(x.sort_date).format(sortFormat).toString()
              )
            );
          } else {
            setOrderData(res);
          }
      })
      .catch((rejected) => {
        console.error(rejected);
      });
  }

  function sendDispatch(id, tracking) {
    const data = {
      id,
      tracking,
    };
    fetch("/api/dispatch-order", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res);
        if (res.status < 300) {
          getOrders();
          removeTracking();
        }
      })
      .catch((rejected) => {
        console.error(rejected);
      });
  }

  function filterOrderByDeliveryType(type) {
    setFilter(type);
    setSortedDate("");
    if (type === "all") {
      setOrderData(orders);
    } else {
      setOrderData(orders.filter((x) => x.deliveryType === type));
    }
  }

  function getTypeColour(type) {
    switch (type) {
      case "collect":
        return "bg-red-600";
      case "local-delivery":
        return "bg-blue-600";
      case "merch-delivery":
        return "bg-green-600";
    }
  }

  function onTrackingChange(e) {
    const stripped = e.target.value.replace(
      "https://track.sendle.com/tracking?ref=",
      ""
    );
    setTrackingId(stripped);
  }

  function removeTracking() {
    setOrderId(null);
  }

  function urlFor(source) {
    return builder.image(source);
  }

  const buttonClasses =
    "font-display text-xl uppercase text-gray-600 hover:text-gray-800";
  const activeButtonClasses = "font-display text-xl uppercase text-vibrant";
  const inputClasses =
    "h-14 border border-vibrant px-8 bg-cream font-body text-vibrant w-full";

  useEffect(() => {
    getOrders();
  }, [sortedDate]);

  return (
    <Protect>
      <Page title="Orders" heading="Orders" isAdmin>
        <Modal
          isOpen={orderId ? true : false}
          onRequestClose={removeTracking}
          style={customStyles}
          contentLabel="Enter date"
        >
          <div className="w-full h-full p-12 space-y-8">
            <form className="space-y-8">
              <label className="font-display text-3xl text-center text-vibrant uppercase">
                Tracking info
              </label>
              <fieldset className="space-y-2 flex justify-start flex-col">
                <input
                  placeholder="Add Sendle tracking ID"
                  onChange={onTrackingChange}
                  className={inputClasses}
                  required
                />
                <small className="text-xs text-left">
                  Should look something like <strong>SKVKBTZ</strong>
                </small>
              </fieldset>
              <button
                className="font-display uppercase text-vibrant bg-mauve py-6 text-3xl hover:bg-vibrant hover:text-mauve w-full"
                onClick={(e) => {
                  sendDispatch(orderId, trackingId);
                  e.preventDefault();
                }}
              >
                Send to customer
              </button>
            </form>
          </div>
        </Modal>
        <div className="max-w-7xl m-auto w-full space-y-4 py-8">
          <nav className="flex space-x-4">
            <button
              className={filter === "all" ? activeButtonClasses : buttonClasses}
              onClick={() => filterOrderByDeliveryType("all")}
            >
              All
            </button>
            <button
              className={
                filter === "collect" ? activeButtonClasses : buttonClasses
              }
              onClick={() => filterOrderByDeliveryType("collect")}
            >
              Collection
            </button>
            <button
              className={
                filter === "local-delivery"
                  ? activeButtonClasses
                  : buttonClasses
              }
              onClick={() => filterOrderByDeliveryType("local-delivery")}
            >
              Local delivery
            </button>
            <button
              className={
                filter === "merch-delivery"
                  ? activeButtonClasses
                  : buttonClasses
              }
              onClick={() => filterOrderByDeliveryType("merch-delivery")}
            >
              Merch delivery
            </button>
          </nav>
          <div className="flex space-x-2">
            <input
              type="date"
              value={sortedDate}
              onChange={(e) => setSortedDate(e.target.value)}
              className="bg-white px-4 py-2"
            />
            <button
              className="font-body hover:bg-white px-2"
              onClick={() => setSortedDate("")}
            >
              Show all orders
            </button>
          </div>
          {orderData && orderData.length > 0 ? (
            orderData.map((order, i) => (
              <div className="border border-vibrant" key={order.id + i}>
                <div
                  className={`flex text-white font-display uppercase py-3 px-4 justify-between items-center ${getTypeColour(
                    order.deliveryType
                  )}`}
                >
                  <span className="text-xl">
                    {order.deliveryType} order #{order.order_number}
                  </span>
                  {order.tracking && (
                    <div className="flex space-x-2 text-xl">
                      <span>Tracking: </span>
                      <span>{order.tracking}</span>
                    </div>
                  )}
                  {order.completed ? (
                    <span className="text-xl">Email sent</span>
                  ) : (
                    <>
                      {order.deliveryType === "local-delivery" && (
                        <button
                          className="bg-white font-display text-vibrant text-xl py-2 px-4 hover:bg-gray-100"
                          onClick={() => sendDispatch(order._id, null)}
                        >
                          Send delivery email
                        </button>
                      )}
                      {order.deliveryType === "collect" && (
                        <button
                          className="bg-white font-display text-vibrant text-xl py-2 px-4 hover:bg-gray-100"
                          onClick={() => sendDispatch(order._id, null)}
                        >
                          Ready for collection
                        </button>
                      )}
                      {order.deliveryType === "merch-delivery" && (
                        <button
                          className="bg-white font-display text-vibrant text-xl py-2 px-4 hover:bg-gray-100"
                          onClick={() => setOrderId(order._id)}
                        >
                          Send delivery email
                        </button>
                      )}
                    </>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <p className="font-body text-xl">
                    {order.billing.firstName} {order.billing.lastName}
                  </p>
                  <p className="font-body text-xl">{order.email}</p>
                  <p className="font-body text-xl">{order.phone}</p>
                </div>
                {order.deliveryType === "local-delivery" && (
                  <div className="border-t border-vibrant px-4 font-body  py-3 text-xl">
                    <span>Delivery {order.deliveryDay}</span>{" "}
                    <span className="text-base text-gray-800">
                      (Ordered on {order.date_created})
                    </span>
                    <p>{order.shipping.address1}</p>
                    <p>{order.shipping.address2}</p>
                    <p>{order.shipping.suburb}</p>
                    <p>{order.shipping.postcode}</p>
                    <p>{order.shipping.country}</p>
                  </div>
                )}
                {order.deliveryType === "merch-delivery" && (
                  <div className="border-t border-vibrant px-4 font-body py-3 text-xl">
                    <span className="text-lg text-gray-800">
                      Ordered on {order.date_created}
                    </span>
                  </div>
                )}
                {order.deliveryType === "collect" && (
                  <div className="border-t border-vibrant px-4 font-body py-3 text-xl">
                    <span>
                      Pick up {order.pick_up_date} {order.pick_up_time}
                    </span>{" "}
                    <span className="text-base text-gray-800">
                      (Ordered on {order.date_created})
                    </span>
                  </div>
                )}
                {order.deliveryType === "delivery" && (
                  <div className="font-body text-xl p-4 pt-0">
                    <div className="px-4 py-2">
                      <p className="font-body text-xl">
                        Ordered on {order.date_created}
                      </p>
                    </div>
                    <h4 className=" mb-2">Shipping address</h4>
                    <p>{order.shipping.address1}</p>
                    <p>{order.shipping.address2}</p>
                    <p>{order.shipping.suburb}</p>
                    <p>{order.shipping.postcode}</p>
                    <p>{order.shipping.country}</p>
                  </div>
                )}
                {order.items.map((product, i) => (
                  <div
                    key={`product_${i}-${order.id}`}
                    className="border-t border-vibrant pt-4 space-y-2"
                  >
                    <h3 className="text-xl px-4 font-display uppercase ">
                      {product.title} x {product.quantity}
                    </h3>
                    <div className="p-4 pt-0">
                      {product.cookies && (
                        <div className="space-y-2">
                          {product.cookies.map((cookie) => (
                            <div key={`${cookie._id}-product_${i}-${order.id}`} className="flex space-x-2">
                              <img
                                src={urlFor(cookie.thumbnail)}
                                className="w-8 h-8"
                              />
                              <span className="text-xl font-body">
                                {cookie.quantity} X {cookie.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      {product.size && (
                        <p className="font-body text-gray-800 text-xl">
                          {product.size}
                        </p>
                      )}
                      {product.selectedOption && (
                        <p className="font-body text-gray-800 text-xl">
                          {product.selectedOption.label}
                        </p>
                      )}
                      {product.message && (
                        <p className="font-body text-gray-800 text-xl">
                          Message: {product.message}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                {order.orderMessage && <div className="px-4 border-t border-vibrant py-4">
                  <h3 className="text-xl font-display uppercase ">Order message</h3>
                  <p className="font-body text-lg">{order.orderMessage}</p>
                  </div>}
              </div>
            ))
          ) : (
            <div className="flex space-x-2 items-center">
              <span>No orders for this date </span>
              <button
                className="bg-vibrant text-white px-4 py-2 font-body"
                onClick={() => setSortedDate("")}
              >
                Show all orders
              </button>
            </div>
          )}
        </div>
      </Page>
    </Protect>
  );
}