import { writeFileSync, existsSync, mkdirSync } from 'fs'
import path from 'path'
import GithubSlugger from 'github-slugger'
import siteMetadata from '../src/data/config.js'

// Jika tidak ada blog, biarkan array kosong
const allBlogs = [] // ganti nanti dengan import MDX posts jika ada

const slugger = new GithubSlugger()

// Sort descending by date
function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

function sortPosts(posts, dateKey = 'date') {
  return posts.sort((a, b) => dateSortDesc(a[dateKey], b[dateKey]))
}

// HTML escape helper
function escapeHtml(str = '') {
  return str.replace(/[&<>'"]/g, (m) => {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    }[m]
  })
}

// Generate single RSS item
function generateRssItem(config, post) {
  return `
<item>
  <guid>${config.siteURL}blog/${post.slug}</guid>
  <title>${escapeHtml(post.title)}</title>
  <link>${config.siteURL}blog/${post.slug}</link>
  ${post.summary ? `<description>${escapeHtml(post.summary)}</description>` : ''}
  <pubDate>${new Date(post.date).toUTCString()}</pubDate>
  <author>${config.email} (${config.author})</author>
  ${post.tags ? post.tags.map((t) => `<category>${t}</category>`).join('') : ''}
</item>`
}

// Generate full RSS feed
function generateRss(config, posts, page = 'feed.xml') {
  return `
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeHtml(config.title)}</title>
    <link>${config.siteURL}blog</link>
    <description>${escapeHtml(config.description)}</description>
    <language>${config.language}</language>
    <managingEditor>${config.email} (${config.author})</managingEditor>
    <webMaster>${config.email} (${config.author})</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${config.siteURL}/${page}" rel="self" type="application/rss+xml"/>
    ${posts.map((post) => generateRssItem(config, post)).join('')}
  </channel>
</rss>
`
}

// Main function to generate RSS file
async function generateRSS(config, allBlogs, page = 'feed.xml') {
  const publishPosts = allBlogs.filter((post) => post.draft !== true)

  if (publishPosts.length === 0) {
    console.log('No published posts found. Skipping RSS generation.')
    return
  }

  const rss = generateRss(config, sortPosts(publishPosts))

  // Pastikan folder public ada
  const publicDir = path.join(process.cwd(), 'public')
  if (!existsSync(publicDir)) mkdirSync(publicDir)

  writeFileSync(path.join(publicDir, page), rss)
  console.log(`RSS feed generated: /public/${page}`)
}

export default async function rss() {
  await generateRSS(siteMetadata, allBlogs)
}
