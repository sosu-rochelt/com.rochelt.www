const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const select = require(`unist-util-select`)
const fs = require(`fs-extra`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const pages = []
    const blogPost = path.resolve("./src/templates/blog-post.js")
    resolve(
      graphql(
        `
      {
        allMarkdownRemark(limit: 1000, filter: {frontmatter: {type: {ne: "product"}}}) {
          edges {
            node {
              frontmatter {
                path
              }
            }
          }
        }
      }
    `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        _.each(result.data.allMarkdownRemark.edges, edge => {
          createPage({
            path: edge.node.frontmatter.path,
            component: blogPost,
            context: {
              path: edge.node.frontmatter.path,
            },
          })
        })
      })
    )
  })
}

exports.modifyWebpackConfig = function(args) {
  const { config, stage } = args
  // svg as raw string to be inlined
  config.loader('svg', {
    test: /\.svg$/,
    loader: "raw-loader",

  })
  // excluding svg from standard url loader
  config.loader('url-loader', {
     test: /\.(jpg|jpeg|png|gif|mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
     loader: 'url',
     query: { limit: 10000, name: 'static/[name].[hash:8].[ext]' }
  });
  return config
};
