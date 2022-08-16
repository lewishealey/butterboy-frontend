export default {
    name: 'logo',
    title: 'Logo',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
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
        name: 'url',
        title: 'URL',
        type: 'string',
      },
    ],
    preview: {
      select: {
        title: 'title',
        media: 'thumbnail',
      },
    },
  }