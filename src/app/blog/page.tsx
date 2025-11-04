import ListLayout from './ListLayout'
// import { allCoreContent, sortPosts } from '@/lib/utils' // opsional, bisa hapus sementara
// import { allBlogs } from 'contentlayer/generated' // dihapus
import { genPageMetadata } from '../seo'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

// sementara blog kosong karena Contentlayer dihapus
const allBlogs = []

export default function BlogPage() {
  const posts = allBlogs // bisa ganti dengan sortPosts(allBlogs) kalau utils tetap ada
  const pageNumber = 1
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      title="Blog"
    />
  )
}
