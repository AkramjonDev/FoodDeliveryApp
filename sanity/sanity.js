import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
  projectId: 'ats6bh5v', // Your project ID
  dataset: 'production', // Dataset name
  useCdn: true,
  apiVersion: '2024-08-1sani3', // API version
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

export default client
