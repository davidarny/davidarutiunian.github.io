module.exports = {
    siteMetadata: {
        title: `David Arutiunian`,
        description: `Personal website powered by Gatsby`,
        author: `@DavidArutiunian`,
        menuLinks: [
            { title: "Home", id: "home", url: "/" },
            { title: "About", id: "about", url: "/about" },
            { title: "Contacts", id: "contacts", url: "/contacts" },
        ]
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `David Arutiunian`,
                short_name: `David Arutiunian`,
                start_url: `/`,
                background_color: `#001529`,
                theme_color: `#001529`,
                display: `minimal-ui`,
                icon: `src/images/favicon.png`,
            },
        },
        {
            resolve: `gatsby-plugin-styled-jsx`,
            options: {
                optimizeForSpeed: true,
                sourceMaps: false,
                vendorPrefixes: true,
            },
        },
        `gatsby-plugin-offline`
    ],
};
