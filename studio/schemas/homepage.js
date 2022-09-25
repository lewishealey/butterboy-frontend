import Tabs from "sanity-plugin-tabs";

export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document', 
  __experimental_actions: ['update','publish','create'],
  fields: [
    {
      name: "tabs",
      type: "object",
      inputComponent: Tabs,
      fieldsets: [
        { name: "main", title: "Main", options: { sortOrder: 10 } },
        { name: "video", title: "Video", options: { sortOrder: 20 } },
        { name: "how-to-heat", title: "How to heat", options: { sortOrder: 30 } }
      ],
      fields: [
        {
          name: 'marquee',
          title: 'Marquee',
          type: 'string',
          fieldset: "main"
        },
        {
          name: 'heat-title',
          title: 'Title',
          type: 'string',
          fieldset: "how-to-heat"
        },
        {
          name: 'heat-title',
          title: 'Title',
          type: 'string',
          fieldset: "how-to-heat"
        },
        {
          name: "heat-content",
          title: "Body",
          type: "blockContent",
          fieldset: "how-to-heat"
        },
        {
          name: 'publishedAt',
          title: 'Published at',
          type: 'datetime',
          fieldset: "video"
        },
        {
          name: 'body',
          title: 'Body',
          type: 'blockContent',
          fieldset: "main"
        }
      ]
    }
  ],

  preview: {
    select: {
      title: 'tabs.title',
      author: 'tabs.author.name',
      media: 'tabs.mainImage'
    },
    prepare(selection) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`
      })
    }
  }
}