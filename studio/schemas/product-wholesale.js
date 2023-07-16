export default {
  name: "product-wholesale",
  title: "Wholesale Product",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
    {
      name: "content",
      title: "Body",
      type: "blockContent",
    },
    {
      name: "live",
      title: "Live on site",
      type: "boolean",
    },
    {
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      title: "Cookies",
      name: "cookies",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "cookie-wholesale" }],
        },
      ],
    },
    {
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Cookie", value: "cookie" },
          { title: "Dough", value: "dough" },
          { title: "Merch", value: "merch" },
        ],
      },
    },
    {
      name: "order",
      title: "Order",
      type: "number",
    },
  ],
  orderings: [
    {
      title: "Name",
      name: "order",
      by: [{ field: "order", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "thumbnail",
    },
  },
};
