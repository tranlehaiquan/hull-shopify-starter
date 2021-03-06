import React from 'react'

import Layout from '@components/layout'
import { getAllDocSlugs, getCollection } from '@lib/api'

import { Module } from '@modules/index'

const CollectionPage = ({ data }) => {
  const { site, page } = data

  return (
    <Layout site={site} page={page}>
      {page.modules?.map((module, key) => (
        <Module key={key} module={module} collectionProducts={page.products} />
      ))}
    </Layout>
  )
}

export async function getStaticProps({ params, preview, previewData }) {
  const collectionData = await getCollection(params.slug, {
    active: preview,
    token: previewData?.token,
  })

  return {
    props: {
      data: collectionData,
    },
    revalidate: 15,
  }
}

export async function getStaticPaths() {
  const allCollections = await getAllDocSlugs('collection')

  return {
    paths:
      allCollections?.map((collection) => {
        return {
          params: {
            slug: collection.slug,
          },
        }
      }) || [],
    fallback: false,
  }
}

export default CollectionPage
