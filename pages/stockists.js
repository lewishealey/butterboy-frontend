import React, { useState, useMemo } from "react";
import Page from "components/Page";
import Map, { Source, Marker, Popup } from "react-map-gl";
import client from "utils/sanity";
import Pin from "../components/Pin";
import { urlFor } from "helpers/sanity";
import { useMediaQuery } from "react-responsive";

const PUBLIC =
  "pk.eyJ1IjoibGV3aXNoZWFsZXkiLCJhIjoiY2tuMW1ic3ZiMHpiMDJwdHA3YngyZGw3NCJ9.HIUEFGrQfzLWF-c7sShszg";

export default function Stockists({ stockists }) {
  const [popupInfo, setPopupInfo] = useState(null);
  const [query, setQuery] = useState("");
  const isTabletAndBelow = useMediaQuery({ query: "(max-width: 600px)" });
  const [data, setData] = useState(stockists);
  const [initialLocation, setInitialLocation] = useState({
    longitude: 151.28732,
    latitude: -33.79795,
    zoom: 12,
  });

  const onChange = (event) => {
    setQuery(event.target.value);
    if (event.target.value.length === 0) {
      setData(stockists);
    } else {
      setData(
        data.filter(
          (x) =>
            x.title?.toLowerCase().includes(event.target.value.toLowerCase()) ||
            x.address?.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
    }
  };

  const pins = useMemo(
    () =>
      stockists.map((stock, index) => {
        if (stock && stock.location) {
          return (
            <Marker
              key={`marker-${index}`}
              longitude={stock?.location?.lng}
              latitude={stock?.location?.lat}
              anchor="bottom"
              onClick={(e) => {
                // If we let the click event propagates to the map, it will immediately close the popup
                // with `closeOnClick: true`
                e.originalEvent.stopPropagation();
                setPopupInfo(stock);
              }}
            >
              <Pin />
            </Marker>
          );
        }
      }),
    []
  );

  if (!stockists) {
    return <div>Loading...</div>;
  }
  return (
    <Page title="Stockists" heading="Stockists">
      <div className="relative w-full my-12 h-full flex flex-col">
        <div className="order-1 md:order-0 relative md:absolute w-full md:w-1/4 h-full z-10 p-4 overflow-y-auto">
          <div className="p-4 space-y-2 bg-cream rounded-lg">
            <div className="relative sticky top-0">
              <input
                placeholder="Search name, suburb or postcode"
                className="font-body h-12 border border-vibrant px-2 w-full"
                onKeyDown={onChange}
                onChange={onChange}
                defaultValue={query}
                value={query}
              />
              <button
                className="absolute right-2 hover:bg-gray-100 px-2 py-1 top-2"
                onClick={() => {
                  setData(stockists);
                  setQuery("");
                }}
              >
                Clear
              </button>
            </div>
            {data
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((stock) => (
                <button
                  className="w-full hover:bg-gray-100 flex flex-col justify-start items-start text-left py-2 px-2 font-body border-b border-vibrant"
                  key={stock.title}
                  onClick={() => {
                    setPopupInfo(stock);
                    setInitialLocation({
                      longitude: stock?.location?.lng,
                      latitude: stock?.location?.lat,
                      zoom: 14,
                    });
                  }}
                >
                  <h4 className="text-xl font-body text-vibrant">
                    {stock.title}
                  </h4>
                  {stock.address && (
                    <p className="block text-vibrant text-base font-body">
                      {stock.address}
                    </p>
                  )}
                  {stock.description && (
                    <p className="block text-vibrant text-base font-body">
                      {stock.description}
                    </p>
                  )}
                </button>
              ))}
          </div>
        </div>
        <div className="order-0 md:order-1">
          <Map
            initialViewState={initialLocation}
            zoom={initialLocation.zoom}
            style={{ width: "100%", height: isTabletAndBelow ? 400 : 700 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={PUBLIC}
          >
            {pins}

            {popupInfo && (
              <Popup
                anchor="top"
                longitude={Number(popupInfo.location?.lng)}
                latitude={Number(popupInfo.location?.lat)}
                onClose={() => setPopupInfo(null)}
              >
                <div className="flex flex-col space-y-1">
                  {popupInfo.thumbnail && (
                    <img
                      src={urlFor(popupInfo.thumbnail).width(400)}
                      layout="fill"
                    />
                  )}
                  <h4 className="text-xl font-display uppercase text-vibrant">
                    {popupInfo.title}
                  </h4>
                  {popupInfo.address && (
                    <p className="block text-vibrant text-base font-body">
                      {popupInfo.address}
                    </p>
                  )}
                  {popupInfo.description && (
                    <p className="block text-vibrant text-base font-body">
                      {popupInfo.description}
                    </p>
                  )}
                  <nav className="flex space-x-3">
                    {popupInfo.instagram && (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        className="font-body uppercase text-base"
                        href={popupInfo.instagram}
                      >
                        Instagram
                      </a>
                    )}
                    {popupInfo.website && (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        className="font-body uppercase text-base"
                        href={popupInfo.website}
                      >
                        Website
                      </a>
                    )}
                  </nav>
                </div>
                <img width="100%" src={popupInfo.image} />
              </Popup>
            )}
          </Map>
        </div>
      </div>
    </Page>
  );
}

export async function getStaticProps({ params }) {
  const stockists = await client.fetch(`
          *[_type == "stockist"]
      `);

  return {
    props: {
      stockists,
    },
  };
}
