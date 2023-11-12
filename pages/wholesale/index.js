import React, { useState } from "react";
import Page from "../../components/Page";
import client from "../../utils/sanity";
import { useFormspark } from "@formspark/use-formspark";
const FORMSPARK_FORM_ID = "650VxMLv";
import { useRouter } from "next/router";
import ProductWholesale from "../../components/ProductWholesale";
import imageUrlBuilder from "@sanity/image-url";
import Modal from "react-modal";

const builder = imageUrlBuilder(client);

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

export default function WholesaleHome({ products, reviews, logos, settings }) {
  const buttonClasses =
    "font-display px-8 py-4 text-3xl hover:bg-red-700 bg-vibrant text-white";
  const inputClasses =
    "h-14 border w-full px-4 font-body text-vibrant border-vibrant bg-white uppercase";
  const areaClasses =
    "border w-full px-4 pt-4 font-body text-vibrant border-vibrant bg-white uppercase";
  //Loop of products
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const [name, setName] = useState("");
  const [cafeName, setCafeName] = useState("");
  const [cafeLocation, setCafeLocation] = useState("");
  const [cafeAbout, setCafeAbout] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [notes, setNotes] = useState("");
  const [cookieEstimate, setCookieEstimate] = useState("");
  const [submit, submitting] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });
  const jsxBoxes =
    products &&
    products
      .sort((a, b) => compareOrder(a, b))
      .map((p) => {
        //const featuredMedia = cookie['_embedded']['wp:featuredmedia'][0];
        return <ProductWholesale product={p} key={p._id} />;
      });

  function compareOrder(a, b) {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }

  function openModal() {
    setModal(true);
  }

  function closeModal() {
    setModal(false);
  }

  function urlFor(source) {
    return builder.image(source);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    await submit({
      name,
      email,
      phone,
      cafeName,
      cafeLocation,
      cafeAbout,
      cookieEstimate,
    });
    router.push("/thanks");
  };

  const onSubmitCoporate = async (e) => {
    e.preventDefault();
    await submit({
      name,
      email,
      phone,
      deliveryAddress,
      eventDate,
      notes,
      cookieEstimate,
    });
    router.push("/thanks");
  };

  if (!settings) {
    return <div>Loading settings</div>;
  }

  return (
    <Page title="Wholesale" settings={settings}>
      <Modal
        isOpen={modal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Get in touch"
      >
        <div className="mx-auto w-full p-1 bg-white text-dark text-center shadow">
          <h2 className="uppercase font-display text-vibrant text-2xl md:text-4xl text-center pt-12">
            Corporate enquiry
          </h2>
          <form className="space-y-3 p-12" onSubmit={onSubmitCoporate}>
            <input
              type="text"
              placeholder="Contact name"
              name="name"
              className={inputClasses}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Email address"
              name="email"
              className={inputClasses}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Estimate of cookies you would like"
              name="cookie_estimate"
              className={inputClasses}
              onChange={(e) => setCookieEstimate(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Delivery address"
              name="delivery_address"
              className={inputClasses}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              required
            />
            <div className="flex">
              <label className="flex whitespace-nowrap font-body text-vibrant text-base uppercase border border-vibrant border-r-0 px-4 h-14 items-center">
                Event date
              </label>
              <input
                type="date"
                placeholder="Event date"
                name="event_date"
                className={inputClasses}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
            </div>
            <textarea
              type="text"
              placeholder="Additional information"
              name="notes"
              className={areaClasses}
              rows={4}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
            <button
              name="email"
              className="font-display uppercase text-white bg-vibrant py-4 text-xl md:text-2xl w-full"
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </Modal>

      <h2 className="uppercase font-display text-mauve text-4xl md:text-8xl text-center py-8 md:py-16 border-t border-vibrant">
        Wholesale
      </h2>
      <nav className="hidden md:block m-auto space-x-8 pb-12">
        <a href="#about" className="text-vibrant font-body text-xl uppercase">
          About
        </a>
        <a
          href="#corporate"
          className="text-vibrant font-body text-xl uppercase"
        >
          Corporate orders
        </a>
        <a href="#contact" className="text-vibrant font-body text-xl uppercase">
          Contact
        </a>
      </nav>
      <p className="font-body text-lg md:text-2xl p-6 max-w-5xl m-auto leading-relaxed text-center text-vibrant">
        Is your cafe missing something sweet? Butterboy offers a wholesale
        option so our customers can have the convenience of getting their cookie
        fix at a local cafe nearby, and for our stockists to be able to supply
        the best cookies in town!
      </p>
      <section className="grid grid-cols-2 border-t border-vibrant border-l">
        {jsxBoxes}
      </section>

      <section className="block" id="about">
        <div className="flex flex-col border-none md:border border-vibrant border-b">
          <h2 className="uppercase font-display text-mauve text-4xl md:text-8xl text-center py-16 border-b border-vibrant">
            About
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center border-b border-vibrant">
            <div className="flex-1 p-6 md:p-24">
              <img src="butterboy.png" className="" />
            </div>
            <div className="flex-1 flex justify-start items-center flex-col text-left border-l border-vibrant">
              <div className="text-left space-y-4 w-full">
                <figure className="space-y-2 border-vibrant">
                  <p className="font-body text-lg md:text-2xl p-6 leading-relaxed text-vibrant">
                    Renowned for our unique and ever-evolving cookies that push
                    the flavour boundaries, at Butterboy we bake, sell and
                    wholesale some of the best cookies in Sydney. Our gourmet
                    cookies are created from scratch, with the highest quality
                    ingredients and then hand-rolled and baked fresh daily by
                    our team. We pride ourselves on bringing joy with every
                    bite. You can find us at our Flagship store on Manly Corso,
                    or stocked in some of the coolest cafes across Sydney.
                  </p>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="block border-b border-vibrant pb-12" id="corporate">
        <div className="flex flex-col border-none md:border border-vibrant space-y-8 px-4">
          <h2 className="uppercase font-display text-mauve text-4xl md:text-8xl text-center py-16 border-b border-vibrant">
            Corporate orders
          </h2>
          <p className="m-auto text-lg md:text-2xl font-body max-w-5xl leading-relaxed text-center text-vibrant">
            Do you have an event happening soon? Bring Butterboy to sweeten
            things up. Choose from our many classic or fun flavours which are
            guaranteed crowd-pleasers. Made from the finest ingredients and
            baked fresh on the day, our gooey, gourmet cookies are sure to be a
            hit at any function!
          </p>
          <div className="m-auto max-w-4xl">
            <button className={buttonClasses} onClick={openModal}>
              Enquire
            </button>
          </div>
        </div>
      </section>

      <section className="block px-4">
        <div className="flex flex-col border-none md:border border-vibrant">
          <h2
            className="uppercase font-display text-mauve text-4xl md:text-8xl text-center py-16 border-b border-vibrant"
            id="contact"
          >
            Contact
          </h2>
          <p className="block text-2xl font-body text-center pt-12">
            We would love to supply your cafe, get in touch below
          </p>
          <form
            className="space-y-3 w-full max-w-3xl m-auto py-12"
            onSubmit={onSubmit}
          >
            <input
              type="text"
              placeholder="Contact name"
              name="name"
              className={inputClasses}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Cafe name"
                name="cafe_name"
                className={inputClasses}
                onChange={(e) => setCafeName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Cafe location"
                name="cafe_location"
                className={inputClasses}
                onChange={(e) => setCafeLocation(e.target.value)}
              />
            </div>
            <textarea
              type="text"
              placeholder="Tell us about your cafe"
              name="about_cafe"
              className={areaClasses}
              rows={4}
              onChange={(e) => setCafeAbout(e.target.value)}
            ></textarea>
            <input
              type="text"
              placeholder="Email address"
              name="email"
              className={inputClasses}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              className={inputClasses}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Estimate of cookies you would like"
              name="cookie_estimate"
              className={inputClasses}
              onChange={(e) => setCookieEstimate(e.target.value)}
              required
            />
            <button
              name="email"
              className="font-display uppercase text-white bg-vibrant py-4 text-xl md:text-2xl w-full"
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </section>
      <section
        className="flex border-t border-vibrant py-24 flex-col space-y-16 bg-cover"
        style={{ backgroundImage: "url('chocolate.jpg')" }}
      >
        {reviews &&
          reviews.map((review, i) => (
            <div
              className="text-white font-body text-3xl text-center w-full"
              key={review.id + i}
            >
              "{review.text}"
            </div>
          ))}
        <div className="max-w-5xl m-auto flex space-x-4 md:space-x-8 justify-between w-full px-8 md:px-0">
          {logos &&
            logos.map(
              (logo, i) =>
                logo.thumbnail && (
                  <a href={logo.url} className="" key={`logo_${i}`}>
                    <img
                      src={urlFor(logo.thumbnail).width(200).url()}
                      className="w-20 h-auto"
                      key={`logo_${i}`}
                    />
                  </a>
                )
            )}
        </div>
      </section>
    </Page>
  );
}

export async function getStaticProps() {
  const products = await client.fetch(`
    *[_type == "product-wholesale" && live] | order(order asc)
  `);
  const reviews = await client.fetch(`
    *[_type == "review"] | order(text asc)
  `);
  const logos = await client.fetch(`
    *[_type == "logo"]
  `);
  const settings = await client.fetch(`
    *[_type == "settings"]
  `);
  return {
    props: {
      products,
      reviews,
      logos,
      settings: settings[0],
    },
  };
}
