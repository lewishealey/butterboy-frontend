export default {
    name: 'settings',
    title: 'Settings',
    type: 'document',
      __experimental_actions: ['update','publish'],
    fields: [
      {
        name: 'deliveryDays',
        title: 'Delivery days',
        type: 'tags',
        options: {
            predefinedTags: [
                {label: 'Monday', value: "1"},
                {label: 'Tuesday', value: "2"},
                {label: 'Wednesday', value: "3"},
                {label: 'Thursday', value: "4"},
                {label: 'Friday', value: "5"},
                {label: 'Saturday', value: "6"},
                {label: 'Sunday', value: "7"},
              ]
        }
      },
      {
        name: 'notice',
        title: 'Hours of notice for delivery',
        type: 'number',
        initialValue: 48
      },
    ],
    preview: {
        select: {
          title: 'Settings',
        },
      },
  }