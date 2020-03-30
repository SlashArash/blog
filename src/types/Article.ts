export type ArticleForBlog = {
  node: {
    excerpt: string
    id: string
    fields: {
      slug: string
    }
    frontmatter: {
      date: string
      tags: string[] | null
      templateKey: string
      title: string
    }
  }
}

export type ArticleForPost = {
  fields: {
    slug: string
  }
  frontmatter: {
    date: string
    description: string
    tags: string[]
    title: string
  }
  html: string
}
