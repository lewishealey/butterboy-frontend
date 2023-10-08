export default {
  name: "cookie",
  title: "Retail Cookie",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "blockContent",
    },
    {
      name: "allergens",
      title: "Allergens",
      type: "string",
    },
    {
      name: "type",
      title: "Type",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Cookie", value: "cookie" },
          { title: "Dough", value: "dough" },
          { title: "Cake", value: "cake" },
        ],
      },
    },
    {
      name: "category",
      title: "category",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: { title: "Cookie flavours", value: "cookie-flavours" },
      options: {
        list: [
          { title: "Cookie flavours", value: "cookie-flavours" },
          { title: "Cookie specials", value: "cookie-specials" },
          { title: "Brownie sandwiches", value: "brownie-sandwhiches" },
        ],
      },
    },
    {
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "type",
      media: "thumbnail",
    },
  },
};
