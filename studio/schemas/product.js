export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200, // will be ignored if slugify is set
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 200)
      }
    },
    {
      name: "content",
      title: "Body",
      type: "blockContent",
    },
    {
      name: 'available',
      title: 'Available for purchase',
      type: 'boolean',
    },
    {
      name: 'live',
      title: 'Live on site',
      type: 'boolean',
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'hover',
      title: 'Hover',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Cookies',
      name: 'cookies',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'cookie' },
          ]
        }
      ]
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
      name: 'details',
      type: 'object',
      title: 'Details',
      fields: [
        {
          name: "type",
          title: "Type",
          type: "string",
          options: {
            list: [
              { title: "Box", value: "box" },
              { title: "Merch", value: "merch" },
              { title: "Other", value: "other" },
            ],
          },
        },
        {
          title: 'Flavours',
          name: 'flavours',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [
                { type: 'cookie' },
              ]
            }
          ],
          hidden: ({ parent, value }) => parent?.type !== "box" && parent?.type !== "other"
        },
        {
          name: "sizing",
          title: "Sizing",
          type: "string",
          options: {
            list: [
              { title: "One size fits all", value: "one-size" },
              { title: "T-shirt sizes", value: "t-shirt" },
            ],
          },
          hidden: ({ parent, value }) => parent?.type !== "merch"
        },
      ]
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    },
  ],
  orderings: [
    {
      title: 'Name',
      name: 'order',
      by: [
        { field: 'order', direction: 'desc' }
      ]
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
    },
  },
}