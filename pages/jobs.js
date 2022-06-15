import React, { useState } from "react";
import Page from "components/Page";
import client from 'utils/sanity';
import RenderBody from "utils/body";
import Script from 'next/script'

import { useFormspark } from "@formspark/use-formspark";
import Modal from 'react-modal';
Modal.setAppElement('#__next');

const customStyles = {
    background: {
        zIndex: "1000",
        backgroundColor: "transparent"
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        background: "#ffffff",
        padding: "0",
        overflowX: "auto"
    },
};

export default function Jobs({ jobs }) {
    const FORMSPARK_FORM_ID = "IEzkz1vS";
    const inputClasses = "h-12 border rounded w-full px-4 border-gray-300";

    const [submit, submitting] = useFormspark({
        formId: FORMSPARK_FORM_ID,
    });
    const [jobName, setJobName] = useState(null);
    const [applyJob, setApplyJob] = useState(false);

    const [message, setMessage] = useState("");
    const onSubmit = async (e) => {
        e.preventDefault();
        await submit({ message });
        alert("Form submitted");
    };

    function openJobModal() {
        setApplyJob(true);
    }

    function closeJobModal() {
        setApplyJob(false);
    }

    const jsxJobs = jobs && jobs.map((job, i ) => {
        return <div key={job.name} className={`flex space-x-2 border-t border-vibrant w-full px-4 font-body py-12 space-x-8 items-start ${i === 0 && "border-none"}`}>
                    <div className="flex flex-col space-y-2 w-full">
                        <h3 className="text-vibrant text-2xl uppercase text-left">{job.title}</h3>
                        <div className="font-body text-base w-full text-vibrant">
                            <RenderBody body={job.content} className="w-full" />
                        </div>
                        <div><button className="bg-vibrant text-white py-2 px-4 font-display uppercase" onClick={() => { 
                            openJobModal(true); 
                            setJobName(job.title);
                        }}>Apply</button></div>
                    </div>
            </div>;
    });

    return (
        <Page
            title="We are hiring"
            heading="We are hiring">
                <Script src="https://ucarecdn.com/libs/widget/3.x/uploadcare.full.min.js" />

            <Modal
                isOpen={applyJob}
                onRequestClose={closeJobModal}
                style={customStyles}
                contentLabel="Apply for job"
            >
                <form
                    className="space-y-3 p-4"
                    action="https://submit-form.com/IEzkz1vS"
                >
                    <h2 className="text-vibrant uppercase text-3xl font-display text-center">Apply for job</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
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
                        name="job"
                        value={jobName}
                    />
                    <input
                        type="hidden"
                        name="_redirect"
                        value="https://butterboy-frontend.vercel.app/thanks"
                    />
                        <input
                        type="hidden"
                        className="bg-blue-500"
                        id="photo"
                        name="photo"
                        role="uploadcare-uploader"
                        data-public-key="your-public-uploadcare-id"
                        />
                    <input
                        type="submit"
                        value="Submit"
                        name="email"
                        className="font-display uppercase text-white bg-vibrant py-6 text-3xl w-full"
                    />
                </form>
            </Modal>
            <section className="flex flex-col mb-12">
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