export default {
  name: "cookie",
  title: "Cookie",
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
