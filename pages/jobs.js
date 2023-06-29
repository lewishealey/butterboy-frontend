import React, { useState, useRef } from "react";
import Page from "components/Page";
import client from "utils/sanity";
import RenderBody from "utils/body";
import Script from "next/script";
import { Widget } from "@uploadcare/react-widget";
import { useRouter } from "next/router";

import { useFormspark } from "@formspark/use-formspark";
import Modal from "react-modal";
Modal.setAppElement("#__next");

const customStyles = {
  background: {
    zIndex: "1000",
    backgroundColor: "transparent",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    background: "#ffffff",
    padding: "0",
    overflowX: "auto",
  },
};

export default function Jobs({ jobs }) {
  const FORMSPARK_FORM_ID = "IEzkz1vS";
  const widgetApi = useRef();
  const router = useRouter();
  const inputClasses = "h-12 border rounded w-full px-4 border-gray-300";
  const [submit, submitting] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });
  const [jobName, setJobName] = useState(null);
  const [applyJob, setApplyJob] = useState(false);

  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submit({
      name,
      email,
      phone,
      jobName,
      resume,
    });
    router.push("/thanks");
  };

  function openJobModal() {
    setApplyJob(true);
  }

  function closeJobModal() {
    setApplyJob(false);
  }

  const jsxJobs =
    jobs &&
    jobs.map((job, i) => {
      return (
        <div
          key={job.name}
          className={`flex space-x-2 border-t border-vibrant w-full px-4 font-body py-12 space-x-8 items-start ${
            i === 0 && "border-none"
          }`}
        >
          <div className="flex flex-col space-y-2 w-full">
            <h3 className="text-vibrant text-2xl uppercase text-left">
              {job.title}
            </h3>
            <div className="font-body text-base w-full text-vibrant">
              <RenderBody body={job.content} className="w-full" />
            </div>
            <div>
              <button
                className="bg-vibrant text-white py-2 px-4 font-display uppercase"
                onClick={() => {
                  openJobModal(true);
                  setJobName(job.title);
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      );
    });

  return (
    <Page title="We are hiring" heading="We are hiring">
      <Script src="https://ucarecdn.com/libs/widget/3.x/uploadcare.full.min.js" />

      <Modal
        isOpen={applyJob}
        onRequestClose={closeJobModal}
        style={customStyles}
        contentLabel="Apply for job"
      >
        <form className="space-y-3 p-4">
          <h2 className="text-vibrant uppercase text-3xl font-display text-center">
            Apply for job
          </h2>
          <input
            type="text"
            placeholder="Name"
            name="name"
            className={inputClasses}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone number"
            name="phone"
            className={inputClasses}
            onChange={(e) => setPhone(e.target.value)}
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
          <input type="hidden" name="job" value={jobName} />
          <div>
            <Widget
              ref={widgetApi}
              publicKey="c9269e599b13f04d3d9a"
              onChange={(info) => setResume(info.cdnUrl)}
              id="file"
            />
          </div>
          {name && email && phone && resume ? (
            <button
              className="font-display uppercase text-white bg-vibrant py-4 text-xl md:text-2xl w-full"
              disabled={submitting}
              onClick={handleSubmit}
            >
              {submitting ? "Applying..." : "Submit"}
            </button>
          ) : (
            <button className="font-display uppercase text-gray-400 bg-gray-200 py-4 text-xl md:text-2xl w-full">
              Submit
            </button>
          )}
        </form>
      </Modal>
      <section className="flex flex-col mb-12">
        <div className="m-auto w-full max-w-5xl">{jsxJobs}</div>
      </section>
    </Page>
  );
}

export async function getStaticProps({ params }) {
  const jobs = await client.fetch(`
        *[_type == "job"] | order(title)
    `);

  return {
    props: {
      jobs,
    },
  };
}
