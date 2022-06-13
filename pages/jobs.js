import Page from "components/Page";
import client from 'utils/sanity';
import RenderBody from "utils/body";

import Cookie from 'components/Cookie';
import Product from 'components/Product';
import { useState } from "react";

export default function Jobs({ jobs }) {
    const [openJob, setOpenJob] = useState(null);

    const jsxJobs = jobs && jobs.map((job, i ) => {
        return <div key={job.name} className={`flex space-x-2 border-t border-vibrant w-full px-4 font-body py-12 space-x-8 items-start ${i === 0 && "border-none"}`}>
                    {openJob === i ? <button className="text-vibrant text-7xl font-body font-light" onClick={() => setOpenJob(i) }>
                        <img src="minus.png" className="w-6 h-6" />
                    </button> : <button className="text-vibrant text-7xl font-body font-light" onClick={() => setOpenJob(i) }>
                        <img src="plus.png" className="w-6 h-6" />
                    </button>}
                    <div className="flex flex-col space-y-2 w-full">
                        <button className="text-vibrant text-2xl uppercase text-left" onClick={() => setOpenJob(i) }>{job.title}</button>
                        {openJob === i && <div className="font-body text-base w-full text-vibrant">
                            <RenderBody body={job.content} className="w-full" />
                        </div>}
                    </div>
            </div>;
    });

    return (
        <Page
            title="We are hiring"
            heading="We are hiring">

            <section className="flex flex-col mt-24 border-t border-vibrant mb-12">
                <div className="m-auto w-full max-w-5xl">
                    {jsxJobs}
                </div>
            </section>
        </Page>
    )
}

export async function getStaticProps({ params }) {

    const jobs = await client.fetch(`
        *[_type == "job"] | order(title)
    `);

    return {
        props: {
            jobs
        },
        revalidate: 10, // In seconds
    };
}