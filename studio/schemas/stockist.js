export default {
  name: "stockist",
  title: "Stockist",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Link",
      name: "link",
      type: "url",
    },
    {
      title: "Location",
      name: "location",
      type: "geopoint",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};
