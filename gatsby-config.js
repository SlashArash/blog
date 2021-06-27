const title = 'وبلاگ آرش کدخدائی'
const description = 'وبلاگ شخصی آرش کدخدائی یک فانی‌لنسر'
const siteUrl = 'https://kadkhodaei.ir/'
const author = 'آرش کدخدائی'

const siteMetadata = {
  title: title,
  description: description,
  siteUrl: siteUrl,
  author: author,
  googleAnalyticsID: 'UA-53881969-2',
  social: {
    linkedin: 'kadkhodaei',
    facebook: 'arash.kadkhodaei',
    nickname: `slasharash`,
  },
  rssMetadata: {
    site_url: siteUrl,
    feed_url: siteUrl + 'rss.xml',
    title: title,
    description: description,
    image_url: `${siteUrl}src/assets/images/SlashArash.webp`,
    author: author,
  },
}

module.exports = {
  siteMetadata: siteMetadata,
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    'gatsby-plugin-tailwindcss',
    'gatsby-plugin-offline',
    'gatsby-plugin-sitemap',
    `gatsby-plugin-postcss`,
    'gatsby-plugin-resolve-src',
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets/images`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteMetadata.siteTitle,
        short_name: siteMetadata.siteTitle,
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#e3b95f',
        display: 'standalone',
        icon: `src/assets/images/SlashArash.webp`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: siteMetadata.googleAnalyticsID,
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        setup(ref) {
          const ret = ref.query.site.siteMetadata.rssMetadata
          ret.allMarkdownRemark = ref.query.allMarkdownRemark
          ret.generator = siteMetadata.siteTitle
          return ret
        },
        query: `
                {
                  site {
                    siteMetadata {
                      rssMetadata {
                        site_url
                        feed_url
                        title
                        description
                        image_url
                        author
                      }
                    }
                  }
                }
              `,
        feeds: [
          {
            serialize({ query: { site, allMarkdownRemark } }) {
              const rssMetadata = site.siteMetadata.rssMetadata
              return allMarkdownRemark.edges
                .filter(
                  (edge) => edge.node.frontmatter.templateKey === 'blog-post'
                )
                .map((edge) => ({
                  categories: edge.node.frontmatter.tags,
                  date: edge.node.frontmatter.date,
                  title: edge.node.frontmatter.title,
                  description: edge.node.excerpt,
                  author: rssMetadata.author,
                  url: encodeURI(rssMetadata.site_url + edge.node.fields.slug),
                  guid: rssMetadata.site_url + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                }))
            },
            query: `
                    {
                      allMarkdownRemark(
                        limit: 1000,
                        sort: { order: DESC, fields: [frontmatter___date] },
                      ) {
                        edges {
                          node {
                            excerpt(pruneLength: 400)
                            html
                            id
                            fields { slug }
                            frontmatter {
                              title
                              templateKey
                              date(formatString: "MMMM DD, YYYY")
                              tags
                            }
                          }
                        }
                      }
                    }
                  `,
            output: '/rss.xml',
            title: siteMetadata.siteTitle,
          },
        ],
      },
    },
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
