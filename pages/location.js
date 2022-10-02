import Page from "components/Page";
import Image from "next/image";
import client from "utils/sanity";

export default function Location({ location }) {
  const locationData = location[0];
  return (
    <Page title="Location" heading="Location">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 relative border-l md:border-b border-vibrant border-r">
          <Image src="/map.svg" layout="responsive" width={968} height={1209} />
        </div>
        <div className="w-full md:w-1/2 md:border-r md:border-b border-vibrant">
          <h2 className="flex text-5xl uppercase text-mauve font-display w-full justify-center py-6 border-b border-vibrant">
            Location
          </h2>
          <p className="font-body text-vibrant text-lg flex justify-center py-6">
            74-78 The Corso Manly Sydney Australia{" "}
          </p>
          <h2 className="flex text-5xl uppercase text-mauve font-display w-full justify-center py-6 border-t border-b border-vibrant">
            Baking Hours
          </h2>

          <ul className="py-6 w-full md:w-1/2 m-auto space-y-2">
            <li className="flex space-x-4 font-body text-xl text-vibrant w-full justify-between">
              <span>Monday</span>
              <span>{locationData.baking_monday}</span>
            </li>
            <li className="flex space-x-4 font-body text-xl text-vibrant w-full justify-between">
              <span>Tuesday</span>
              <span>{locationData.baking_monday}</span>
            </li>
            <li className="flex space-x-4 font-body text-xl text-vibrant w-full justify-between">
              <span>Wednesday</span>
              <span>{locationData.baking_monday}</span>
            </li>
            <li className="flex space-x-4 font-body text-xl text-vibrant w-full justify-between">
              <span>Thursday</span>
              <span>{locationData.baking_monday}</span>
            </li>
            <li className="flex space-x-4 font-body text-xl text-vibrant w-full justify-between">
              <span>Friday</span>
              <span>{locationData.baking_monday}</span>
            </li>

            <li className="flex space-x-4 font-body text-xl text-vibrant w-full pt-6 justify-between">
              <span>Saturday</span>
              <span>{locationData.baking_monday}</span>
            </li>
            <li className="flex space-x-4 font-body text-xl text-vibrant w-full justify-between">
              <span>Sunday</span>
              <span>{locationData.baking_monday}</span>
            </li>
          </ul>
          <div className="border-t border-b border-vibrant w-full uppercase font-body text-vibrant py-4 justify-center">
            <span className="w-full md:w-1/2 m-auto flex text-center">
              {locationData.order_notice}
            </span>
          </div>
        </div>
      </div>
    </Page>
  );
}

export async function getStaticProps({ params }) {
  const location = await client.fetch(`
        *[_type == "location"]
    `);

  return {
    props: {
      location,
    },
  };
}
