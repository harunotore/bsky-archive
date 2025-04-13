import { $Typed, AppBskyEmbedExternal, AppBskyEmbedImages, AppBskyEmbedRecord, AppBskyEmbedRecordWithMedia, AppBskyEmbedVideo } from "@atproto/api"
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

  const authorFeed = dataFilter.map((element: FeedViewPost, index: number) => {
    console.log(element.post.embed)
      <div key={index} className="w-45 h-45 overflow-y-hidden">
        {element.post.record.text}
        {element.post.embed?.$type == 'app.bsky.embed.images#view' &&
          <div>img</div>
        }
      </div>
    )
  })

  return (
    <div className='flex flex-wrap'>{authorFeed}</div>
  )
}