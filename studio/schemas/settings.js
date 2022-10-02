import Tabs from "sanity-plugin-tabs";

export default {
  name: "settings",
  title: "Settings",
  type: "document",
  __experimental_actions: ["update", "publish", "create"],
  inputComponent: Tabs,
  fieldsets: [
    { name: "delivery", title: "Delivery", options: { sortOrder: 10 } },
    { name: "homepage", title: "Homepage", options: { sortOrder: 20 } },
    { name: "cart", title: "Cart", options: { sortOrder: 30 } },
    { name: "footer", title: "Footer", options: { sortOrder: 40 } },
  ],
  fields: [
    {
      type: "object",
      name: "delivery",
      title: "Delivery",
      fieldset: "delivery",
      fields: [
        {
          name: "allowLocalDelivery",
          title: "Allow local cookie deliveries",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "deliveryDays",
          title: "Delivery days",
          description: "This defines the days you want to allow delivery for",
          type: "tags",
          options: {
            predefinedTags: [
              { label: "Monday", value: "1" },
              { label: "Tuesday", value: "2" },
              { label: "Wednesday", value: "3" },
              { label: "Thursday", value: "4" },
              { label: "Friday", value: "5" },
              { label: "Saturday", value: "6" },
              { label: "Sunday", value: "7" },
            ],
          },
        },
        {
          name: "notice",
          title: "Hours of notice for delivery",
          description:
            "This defines the minimum hours before the user can book a delivery slot",
          type: "number",
          initialValue: 48,
        },
        {
          name: "deliveryRange",
          title: "Number of days allowed for delivery",
          description:
            "This defines the number of days in advance the user is allowed to book a delivery",
          type: "number",
          initialValue: 14,
        },
        {
          name: "noticePickUp",
          title: "Hours of notice for pick up",
          description:
            "This defines the minimum hours before the user can book a pickup slot",
          type: "number",
          initialValue: 24,
        },
        {
          name: "pickupRange",
          title: "Number of days allowed for pickup",
          description:
            "This defines the number of days in advance the user is allowed to book a pickup",
          type: "number",
          initialValue: 7,
        },
        {
          name: "holiday",
          title: "Holiday days",
          description: "This defines the days the shop is not open",
          type: "array",
          of: [
            {
              type: "date",
              options: {
                dateFormat: "DD-MM-YYYY",
              },
            },
          ],
        },
        {
          name: "timeSlots",
          title: "Time slots",
          description: "This defines the time slots available for pick up",
          type: "array",
          of: [
            {
              type: "string",
            },
          ],
        },
        {
          name: "allowedPostcodes",
          title: "Allowed postcodes",
          type: "array",
          description: "This defines the postcodes allowed for local delivery",
          of: [{ type: "string" }],
        },
      ],
    },
    {
      type: "object",
      name: "homepage",
      title: "Homepage",
      fieldset: "homepage",
      fields: [
        {
          name: "marquee",
          title: "Marquee",
          type: "string",
        },
        {
          name: "location",
          title: "Location",
          type: "string",
        },
        {
          name: "bakingHours",
          title: "Baking hours",
          type: "string",
        },
      ],
    },
    {
      type: "object",
      name: "cart",
      title: "Cart",
      fieldset: "cart",
      fields: [
        {
          name: "localDeliveryInfo",
          title: "Local delivery description",
          type: "string",
        },
        {
          name: "localDeliveryAvailability",
          title: "Local delivery availability",
          type: "string",
        },
        {
          name: "merchDeliveryInfo",
          title: "Merch delivery description",
          type: "string",
        },
        {
          name: "merchDeliveryAvailability",
          title: "Merch delivery availability",
          type: "string",
        },
        {
          name: "allowedPostcodes",
          title: "Allowed postcodes",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
    },
    {
      type: "object",
      name: "footer",
      title: "Footer",
      fieldset: "footer",
      fields: [
        {
          name: "links",
          title: "Links",
          type: "array",
          of: [
            {
              title: "Footer link",
              type: "object",
              fields: [
                {
                  title: "Title",
                  name: "title",
                  type: "string",
                },
                {
                  title: "URL",
                  description: "e.g https://google.com",
                  name: "url",
                  type: "url",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "Settings",
    },
  },
};
