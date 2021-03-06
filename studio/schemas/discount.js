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
        {
            name: 'live',
            title: 'Live on the site',
            type: 'boolean',
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
    },
}