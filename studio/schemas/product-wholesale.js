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
      name: "hover",
      title: "Hover",
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
      name: "image_size",
      title: "Image size",
      type: "string",
      options: {
        list: [
          { title: "Small", value: "small" },
          { title: "Medium", value: "medium" },
          { title: "Large", value: "large" },
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
