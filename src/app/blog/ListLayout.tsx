/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { IoNewspaper } from 'react-icons/io5'

interface ListLayoutProps {
  title?: string
}

export default function ListLayoutWith({ title = 'Blog' }: ListLayoutProps) {
  return (
    <div>
      <div className="mb-4 space-y-2 pt-6 md:space-y-5">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {title} <IoNewspaper className="inline-block" />
        </h1>
        <p className="leading-7 text-gray-500 dark:text-gray-400">The blog is still under development.</p>
      </div>
    </div>
  )
}
