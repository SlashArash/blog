import { graphql, useStaticQuery } from 'gatsby'

import SiteMetadata from 'types/SiteMetadata'

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            author
            description
            siteUrl
            social {
              linkedin
              facebook
              nickname
            }
            title
          }
        }
      }
    `
  )
  return site.siteMetadata as SiteMetadata
}

export default useSiteMetadata
