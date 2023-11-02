import { useRouter } from "next/router";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import RenderBody from "utils/body";
import Page from "components/Page";
import Cookie from "components/Cookie";
import client from "utils/sanity";
const FORMSPARK_FORM_ID = "650VxMLv";
import { useFormspark } from "@formspark/use-formspark";

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

export default function WholesaleProduct({ product, cookies }) {
  const router = useRouter();
  const [cookiesObject, setCookiesObject] = useState(cookies);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(product?.title);
  const [submit, submitting] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });

  const inputClasses =
    "h-14 border w-full px-4 font-body text-vibrant border-vibrant bg-cream uppercase";
  const areaClasses =
    "border w-full px-4 pt-4 font-body text-vibrant border-vibrant bg-cream uppercase";

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

  function openModal() {
    setModal(true);
  }

  function closeModal() {
    setModal(false);
  }

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

  const buttonClasses =
    "font-display px-8 py-4 text-3xl hover:bg-red-700 bg-vibrant text-white";

  return (
    <Page title={title} heading={title}>
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
      <>
        <div className="p-8 bg-white flex flex-col space-y-8 my-8 max-w-7xl m-auto">
          {product.content && (
            <RenderBody body={product.content} className="text-xl font-body" />
          )}
          <div>
            <button className={buttonClasses} onClick={openModal}>
              Get in touch
            </button>
          </div>
        </div>

        <h2 className="text-3xl md:text-5xl text-center text-vibrant font-bold font-display uppercase md:border-t border-b border-vibrant py-6 md:py-12">
          Flavours
        </h2>
        <div className="grid grid-cols-1 gap-4 gap-y-12 p-8 md:grid-cols-4 md:p-24 md:gap-20 md:pt-12">
          {cookiesObject.map((cookie, i) => {
            return (
              <div key={cookie.id + "-" + i} className="space-y-4">
                <Cookie cookie={cookie} />
              </div>
            );
          })}
        </div>
      </>
    </Page>
  );
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "product-wholesale" && defined(slug.current)][].slug.current`
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
      *[_type == "product-wholesale" && slug.current == $slug][0] {
        ...,
        cookie[]->{
            ...
        }
      }
    `,
    { slug }
  );

  const cookies = await client.fetch(`
        *[_type == "cookie-wholesale" && type == "${product.type}"] | order(title)
    `);
  return {
    props: {
      product,
      cookies,
    },
  };
}
