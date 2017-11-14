module.exports = {
  siteMetadata: {
    title: `Rochelt.com`,
    subline: {
      de: `Tiroler Schnapsbrennerei`
    },
    author: `Kevin Förster`,
    navigation: [
      {
        name: 'was',
        path: '/de/was/',
        bookmarks: []
      },
      {
        name: 'wie',
        path: '/de/wie/',
        bookmarks: []
      },
      {
        name: 'wer',
        path: '/de/wer/',
        bookmarks: []
      },
      {
        name: 'warum',
        path: '/de/warum/',
        bookmarks: []
      },
      {
        name: 'wo',
        path: '/de/wo/',
        bookmarks: []
      }
    ]
  },
  plugins: [
    `gatsby-plugin-sass`,
    // `gatsby-plugin-react-helmet`, {
    // 	resolve: `gatsby-plugin-postcss-sass`,
    // 	options: {
    // 		postCssPlugins: [

    // 		]
    // 	}
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants'
        ]
      }
    }
  ]
};
