import { useEffect, useState } from "react";
import Page from "components/Page";
import { useFormspark } from "@formspark/use-formspark";
const FORMSPARK_FORM_ID = "650VxMLv";
import { useRouter } from 'next/router'

export default function Wholesale() {
    const inputClasses = "h-14 border w-full px-4 font-body text-vibrant border-vibrant bg-cream uppercase";
    const router = useRouter();
    const [submit, submitting] = useFormspark({
        formId: FORMSPARK_FORM_ID,
    });

    const [input, setInput] = useState({});

    const handleOnChange = (event) => {
        const { target } = event || {};
        const newState = {
            ...input,
            [target.name]: target.value
          };
        setInput(newState);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await submit({ input });
        router.push("/thanks")
    };


    return (
        <Page
            title="Wholesale"
            heading="Wholesale">

            <div
                className="rounded-lg border-gray-900 px-12 py-8 space-y-6 w-full max-w-4xl m-auto"
            >
                <form
                    className="space-y-3"
                    onSubmit={onSubmit}
                >
                    <input
                        type="text"
                        placeholder="Contact name"
                        name="name"
                        className={inputClasses}
                        onChange={handleOnChange}
                        required
                    />
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="Cafe name"
                            name="cafe_name"
                            className={inputClasses}
                            onChange={handleOnChange}
                        />
                        <input
                            type="text"
                            placeholder="Cafe location"
                            name="cafe_location"
                            className={inputClasses}
                            onChange={handleOnChange}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Email address"
                        name="email"
                        className={inputClasses}
                        onChange={handleOnChange}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Estimate of cookies you would like"
                        name="cookie_estimate"
                        className={inputClasses}
                        onChange={handleOnChange}
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
    )
}