import Page from "components/Page";

export default function Wholesale() {

const inputClasses = "h-12 border rounded w-full px-4 border-gray-300";

    return (
        <Page
            title="Wholesale"
            heading="Wholesale">

            <div
                className="rounded-lg border-gray-900 px-12 py-8 space-y-6 w-full max-w-4xl m-auto"
            >
                <form
                    className="space-y-3"
                    action="https://submit-form.com/650VxMLv"
                >
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        className={inputClasses}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        name="address"
                        className={inputClasses}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Phone number"
                        name="phone"
                        className={inputClasses}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Email address"
                        name="email"
                        className={inputClasses}
                        required
                    />
                    <input
                        type="hidden"
                        name="_redirect"
                        value="https://sephorapressday.com.au/thanks"
                    />
                    <input
                        type="submit"
                        value="Submit"
                        name="email"
                        className="font-display uppercase text-white bg-vibrant py-6 text-3xl w-full"
                    />
                </form>
            </div>
        </Page>
    )
}