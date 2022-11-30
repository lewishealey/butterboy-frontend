import React, { useState, useRef } from "react";
import Page from "components/Page";
import Map, { Source, Layer } from "react-map-gl";
import client from "utils/sanity";

const layerStyle = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
};

const SECRET =
  "sk.eyJ1IjoibGV3aXNoZWFsZXkiLCJhIjoiY2w4eWNuNmh2MDZ6ejN2cXA0bjBrYWloZyJ9.XeUZ1wI8wJ1ayj6obUsDiQ";
const PUBLIC =
  "pk.eyJ1IjoibGV3aXNoZWFsZXkiLCJhIjoiY2tuMW1ic3ZiMHpiMDJwdHA3YngyZGw3NCJ9.HIUEFGrQfzLWF-c7sShszg";

export default function Stockists({ stockists }) {
  const features = stockists.map((stock) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [stock?.location?.lng, stock?.location?.lat],
      },
    };
  });

  const geojson = {
    type: "FeatureCollection",
    features,
  };

  if (!stockists) {
    return <div>Loading...</div>;
  }
  return (
    <Page title="Stockists" heading="Stockists">
      <div className="relative w-full my-12 h-full">
        <div className="absolute w-1/4 h-full bg-white z-10 p-4 space-y-2">
          {stockists.map((stock) => (
            <button
              className="w-full hover:bg-gray-100 flex justify-start py-2 px-2"
              key={stock.title}
            >
              {stock.title}
            </button>
          ))}
        </div>
        <Map
          initialViewState={{
            longitude: 151.28732,
            latitude: -33.79795,
            zoom: 12,
          }}
          style={{ width: "100%", height: 800 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={PUBLIC}
        >
          <Source id="my-data" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
          </Source>
        </Map>
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
