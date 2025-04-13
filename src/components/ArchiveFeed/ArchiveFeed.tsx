import { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs"

interface ArchiveFeedProps {
  data: FeedViewPost[]
}

export default function ArchiveFeed({ data }: ArchiveFeedProps) {
  const dataFilter = data.filter((element: FeedViewPost) => {
    if (element.reason) {
      return false
    } return true
  })

  console.log(dataFilter)

  const authorFeed = dataFilter.map((element: FeedViewPost) => {
    return (
      <div className="w-45 h-45 overflow-y-hidden">
        {element.post.record.text}
      </div>
    )
  })


  return (
    <div className='flex flex-wrap'>
      {authorFeed}
    </div>
  )
}