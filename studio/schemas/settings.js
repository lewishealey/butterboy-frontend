export default {
    name: 'settings',
    title: 'Settings',
    type: 'document',
      __experimental_actions: ['update','publish','create'],
    fields: [
      {
        name: 'deliveryDays',
        title: 'Delivery days',
        description: 'This defines the days you want to allow delivery for',
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
        description: 'This defines the minimum hours before the user can book a delivery slot',
        type: 'number',
        initialValue: 48
      },
      {
        name: 'deliveryRange',
        title: 'Number of days allowed for delivery',
        description: 'This defines the number of days in advance the user is allowed to book a delivery',
        type: 'number',
        initialValue: 14
      },
      {
        name: 'noticePickUp',
        title: 'Hours of notice for pick up',
        description: 'This defines the minimum hours before the user can book a pickup slot',
        type: 'number',
        initialValue: 24
      },
      {
        name: 'pickupRange',
        title: 'Number of days allowed for pickup',
        description: 'This defines the number of days in advance the user is allowed to book a delivery',
        type: 'number',
        initialValue: 7
      },
      {
        name: 'holiday',
        title: 'Holiday days',
        description: 'This defines the days the shop is not open',
        type: 'array',
        of: [
          {
            type: 'date',
            options: {
              dateFormat: 'DD-MM-YYYY',
            }
          }
        ]
      },
      {
        name: 'timeSlots',
        title: 'Time slots',
        description: 'This defines the time slots available for pick up',
        type: 'array',
        of: [
          {
            type: 'string',
          }
        ]
      }
    ],
    preview: {
        select: {
          title: 'Settings',
        },
      },
  }