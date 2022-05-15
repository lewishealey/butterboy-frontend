export default {
    name: 'discount',
    title: 'Discount',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
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
                    { title: "Percent", value: "percent" },
                    { title: "Fixed", value: "fixed" },
                ],
            },
        },
        {
            name: 'amount',
            title: 'Amount',
            type: 'number',
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
    },
}