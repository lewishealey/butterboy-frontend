import Page from "components/Page";

export default function Thanks() {

const inputClasses = "h-12 border rounded w-full px-4 border-gray-300";

    return (
        <Page
            title="Thank you"
            heading="Thank you">

            <div
                className="rounded-lg border-gray-900 px-12 py-8 space-y-6 w-full max-w-4xl m-auto"
            >
                <p>Thanks for your wholesale submission</p>
            </div>
        </Page>
    )
}