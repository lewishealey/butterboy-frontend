import { useEffect, useState } from "react";
import Page from "components/Page";
import { useFormspark } from "@formspark/use-formspark";
const FORMSPARK_FORM_ID = "650VxMLv";
import { useRouter } from "next/router";

export default function Wholesale() {
  const inputClasses =
    "h-14 border w-full px-4 font-body text-vibrant border-vibrant bg-cream uppercase";
    const areaClasses =
    "border w-full px-4 pt-4 font-body text-vibrant border-vibrant bg-cream uppercase";
  const [name, setName] = useState("");
  const [cafeName, setCafeName] = useState("");
  const [cafeLocation, setCafeLocation] = useState("");
  const [cafeAbout, setCafeAbout] = useState("");
  const [email, setEmail] = useState("");
  const [cookieEstimate, setCookieEstimate] = useState("");

  const router = useRouter();
  const [submit, submitting] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await submit({
      name,
      email,
      cafeName,
      cafeLocation,
      cafeAbout,
      cookieEstimate,
    });
    router.push("/thanks");
  };

  return (
    <Page title="Wholesale" heading="Wholesale">
      <div className="rounded-lg border-gray-900 px-12 py-8 space-y-6 w-full max-w-4xl m-auto">
        <form className="space-y-3" onSubmit={onSubmit}>
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
    </Page>
  );
}
