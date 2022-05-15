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
            name: "type",
            title: "Type",
            type: "string",
            options: {
                list: [
                    { title: "Box", value: "box" },
                    { title: "Drink", value: "drink" },
                    { title: "Merch", value: "merch" },
                    { title: "Other", value: "other" },
                ],
            },
        },
        {
            name: 'maxCookies',
            title: 'Max cookies',
            type: 'number',
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            title: 'Flavours',
            name: 'flavours',
            type: 'array',
            of: [
              {
                type: 'reference',
                to: [
                  {type: 'cookie'},
                ]
              }
            ]
          }
    ],
    orderings: [
        {
          title: 'Name',
          name: 'nameDesc',
          by: [
            {field: 'title', direction: 'desc'}
          ]
        },
        {
          title: 'Price',
          name: 'priceAsc',
          by: [
            {field: 'price', direction: 'asc'}
          ]
        },
        {
          title: 'Type',
          name: 'typeDesc',
          by: [
            {field: 'type', direction: 'desc'}
          ]
        }
      ],
    preview: {
        select: {
            title: 'title',
            media: 'thumbnail',
        },
    },
}