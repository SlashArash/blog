import { config, collection, fields, singleton } from '@keystatic/core'

export const markdocConfig = fields.markdoc.createMarkdocConfig({})

export const showAdminUI = process.env.NODE_ENV === 'development'

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.datetime({ label: 'Date' }),
        description: fields.text({ label: 'Description', multiline: true }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value || 'New Tag', // Shows the tag name in the list
        }),
        keywords: fields.array(fields.text({ label: 'Keyword' }), {
          label: 'Keywords',
          itemLabel: (props) => props.value || 'New Keyword',
        }),
        seo: fields.object(
          {
            metaTitle: fields.text({
              label: 'Meta Title (Optional)',
              description: 'If empty, the post title will be used.',
            }),
            metaDescription: fields.text({
              label: 'Meta Description',
              multiline: true,
              description: 'Ideally between 150-160 characters.',
            }),
            keywords: fields.array(fields.text({ label: 'Keyword' }), {
              label: 'Keywords',
              itemLabel: (props) => props.value || 'New Keyword',
            }),
          },
          {
            label: 'SEO Settings',
          }
        ),
        content: fields.markdoc({
          label: 'Content',
          options: {
            link: true,
            bold: true,
            italic: true,
            heading: [2, 3, 4],
            blockquote: true,
            orderedList: true,
            unorderedList: true,
            image: {
              directory: 'public/images/posts',
              publicPath: '/images/posts',
            },
          },
        }),
      },
    }),
  },
  singletons: {
    about: singleton({
      label: 'About Me',
      path: 'content/about',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Title' }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            link: true,
            bold: true,
            heading: [2, 3],
          },
        }),
      },
    }),
  },
})
