export default function formatDate(createdOn) {
  const date = new Date(createdOn)
  const now = Date.now()
  const diffInMilliseconds = now - date.getTime()
  return Math.floor(diffInMilliseconds / (1000 * 3600))
}
