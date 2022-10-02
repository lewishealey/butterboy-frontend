export default {
  widgets: [
    {
      name: "netlify",
      options: {
        title: "Website deploys",
        sites: [
          {
            title: "Butterboy website",
            apiId: "84f6f436-a796-47fb-b614-1e0e62d577c6",
            buildHookId: "62de61d7e705d1156ca56725",
            name: "sprightly-dusk-cbb060",
          },
        ],
      },
    },
    {
      name: "google-analytics",
      layout: {
        width: "large",
      },
      options: {
        title: "Last 30 days",
        gaConfig: {
          reportType: "ga",
          query: {
            dimensions: "ga:date",
            metrics: "ga:users, ga:sessions, ga:newUsers",
            "start-date": "30daysAgo",
            "end-date": "yesterday",
          },
          chart: {
            type: "LINE",
            options: {
              width: "100%",
            },
          },
        },
      },
    },
  ],
};
