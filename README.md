# 📝 Arash Kadkhodaei's Personal Blog

A personal blog focused on software development, web technologies, and personal notes. This project is built using modern front-end tools and a Git-based headless CMS.

---

## 🚀 Tech Stack

The blog is designed for high performance, Search Engine Optimization (SEO), and a seamless user experience:

- **Framework**: [Next.js](https://nextjs.org/) (App Router + React 19)
- **CMS**: [Keystatic CMS](https://keystatic.com/) (Git-based/local content management without a database)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with Vazirmatn font, full RTL support, and Dark Mode
- **Content Renderer**: [Markdoc](https://markdoc.dev/) for structured and secure article formatting

---

## ✨ Key Features

- 🌗 **Theme Toggle**: Full support for light and dark mode (`next-themes`).
- ⚡ **Rendering**: Built with Next.js Server Components for fast page loads and static/dynamic rendering optimization.
- 📱 **Responsive Design**: Optimized layout across all screen sizes (mobile, tablet, and desktop).
- 🔍 **SEO**: Automated generation of `sitemap.xml`, `robots.txt`, and `manifest.json` along with metadata customization per post.
- 📰 **RSS Feed**: Automatically generated RSS feed at `/feed.xml`.
- 📝 **Admin Dashboard**: Easily edit posts and site data using the Keystatic Admin panel at `/keystatic`.

---

## 📂 Directory Structure

```text
├── app/                  # Main frontend pages and routes (Next.js App Router)
│   ├── (site)/           # Public site layout and pages (Posts, Archive, Tags, About)
│   ├── api/keystatic/    # Backend route handler for Keystatic CMS
│   ├── global.css        # Global CSS imports (Tailwind CSS v4 configuration)
│   └── reader.ts         # Keystatic local content reader
├── components/           # Reusable UI components (Header, Footer, ThemeToggle, PostList, etc.)
├── config/               # Site configuration (author info, social links)
├── consts/               # Constants (menu items, etc.)
├── content/              # Content directory storing posts and singletons as mdoc files
│   ├── posts/            # Blog post files
│   └── about.mdoc        # Content for the "About" page
├── keystatic.config.ts   # Keystatic collections schema and settings
├── package.json          # Dependency list and scripts
└── tsconfig.json         # TypeScript configuration
```

---

## 🛠 Getting Started

Follow these steps to set up and run the project locally:

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file in the root directory and configure it as shown in `.env.example`:
```env
KEYSTATIC_GITHUB_CLIENT_ID=your_github_client_id
KEYSTATIC_GITHUB_CLIENT_SECRET=your_github_client_secret
KEYSTATIC_SECRET=random_32_character_secret_key
```

### 3. Run the Development Server
```bash
npm run dev
```
Open `http://localhost:3000` to view the website, or `http://localhost:3000/keystatic` to access the admin panel.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🔒 Content Management (Keystatic)

In development mode, Keystatic reads and writes content directly to your local file system under the `content/` folder. In production (or if the following variable is enabled in your `.env` file), Keystatic will sync and commit changes directly to your GitHub repository:

```env
NEXT_PUBLIC_KEYSTATIC_STORAGE_KIND=github
```

The CMS fields, collections, and page structures are defined in [`keystatic.config.ts`](file:///Users/arash/Projects/blog/keystatic.config.ts).
