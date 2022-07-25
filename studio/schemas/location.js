export default {
  name: "location",
  title: "Location",
  type: "document",
  __experimental_actions: ["update", "publish", "create"],
  fields: [
    {
      name: "baking_monday",
      title: "Monday baking hours",
      type: "string",
    },
    {
      name: "baking_tuesday",
      title: "Tuesday baking hours",
      type: "string",
    },
    {
      name: "baking_wednesday",
      title: "Wednesday baking hours",
      type: "string",
    },
    {
      name: "baking_thursday",
      title: "Thursday baking hours",
      type: "string",
    },
    {
      name: "baking_friday",
      title: "Friday baking hours",
      type: "string",
    },
    {
      name: "baking_saturday",
      title: "Saturday baking hours",
      type: "string",
    },
    {
      name: "baking_sunday",
      title: "Sunday baking hours",
      type: "string",
    },
    {
      name: "order_notice",
      title: "Order notice",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "Settings",
    },
  },
};
