export default {
    name: 'cookie',
    title: 'Cookie',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'blockContent',
      },
      {
        name: 'allergens',
        title: 'Allergens',
        type: 'string',
      },
      {
        name: "type",
        title: "Type",
        type: "string",
        options: {
          list: [
            { title: "Cookie", value: "cookie" },
            { title: "Dough", value: "dough" },
            { title: "Cake", value: "cake" },
          ],
        },
      },
      {
        name: 'thumbnail',
        title: 'Thumbnail',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
    ],
    preview: {
      select: {
        title: 'title',
        subtitle: 'type',
        media: 'thumbnail',
      },
    },
  }