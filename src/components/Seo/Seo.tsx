import React, { memo } from 'react'
import Helmet from 'react-helmet'

import useSiteMetadata from 'utils/useSiteMetadata'

type ComponentProps = {
  title: string
  meta_desc?: string
  slug: string
  date?: string
}

const Seo: React.FC<ComponentProps> = ({ title, meta_desc, slug, date }) => {
  const metaData = useSiteMetadata()
  const totalTitle =
    title.length === 0 ? metaData.title : `${title} | ${metaData.title}`
  const postURL = metaData.siteUrl + slug
  const breadcrumbSchemaOrgJSONLD = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': metaData.siteUrl,
          name: 'Home',
          image: metaData.siteUrl + '/icons/icon-512x512.png',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@id': postURL,
          name: totalTitle,
        },
      },
    ],
  }

  const blogPostingSchemaOrgJSONLD = {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    url: postURL,
    name: totalTitle,
    alternateName: metaData.description,
    headline: totalTitle,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postURL,
    },
    author: {
      '@type': 'Person',
      name: metaData.social.nickname,
    },
    datePublished: date,
    dateModified: date,
    publisher: {
      '@type': 'Organization',
      name: metaData.title,
      logo: {
        '@type': 'ImageObject',
        url: metaData.siteUrl + '/icons/apple-icon.png',
      },
    },
    description: meta_desc,
  }

  return (
    <Helmet>
      <title>{totalTitle}</title>
      {/* General tags */}
      <meta name="description" content={meta_desc} />
      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchemaOrgJSONLD)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(blogPostingSchemaOrgJSONLD)}
      </script>
      {/* OpenGraph tags */}
      <meta property="og:url" content={postURL} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={totalTitle} />
      <meta property="og:description" content={meta_desc} />
      <meta name="twitter:site" content={metaData.social.nickname} />
      <meta name="twitter:title" content={totalTitle} />
      <meta name="twitter:description" content={meta_desc} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  )
}

export default memo(Seo)
