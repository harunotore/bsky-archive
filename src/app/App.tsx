import { useState } from 'react'
import { Navbar } from '../components/Navbar.tsx/Navbar'
import { useAgent } from '../providers/AgentProvider';
import { FeedViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs';
import ArchiveFeed from '../components/ArchiveFeed/ArchiveFeed';

function App() {
  const [data, setData] = useState<FeedViewPost[]>([])
  const { agent } = useAgent()

  const handleSetData = async (value: string) => {
    if (!agent) return
    const response = await agent.getAuthorFeed({
      actor: value,
      filter: 'posts_no_replies'
    })
    setData(response.data.feed)
  }

  return (
    <>
      <Navbar handleSetData={handleSetData} />
      {data && <ArchiveFeed data={data} />}
    </>
  )
}

export default App
