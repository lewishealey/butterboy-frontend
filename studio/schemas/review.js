export default {
    name: 'review',
    title: 'Review',
    type: 'document',
    fields: [
      {
        name: 'text',
        title: 'Text',
        type: 'string',
      },
    ],
    preview: {
      select: {
        title: 'text',
      },
    },
  }