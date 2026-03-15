import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import VideoCard from '../components/VideoCard'
import ChannelCard from '../components/ChannelCard'
import Loader from '../components/Loader'

const SearchResults = () => {
  const { query } = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['search', query],
    queryFn: () => fetchFromAPI(`search?part=snippet&q=${decodeURIComponent(query)}`),
    staleTime: 1000 * 60 * 5,
  })

  const videos = data?.items?.filter((item) => item.id?.videoId) || []
  const channels = data?.items?.filter((item) => item.id?.channelId) || []

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#0f0f0f' }}>
      <div className="max-w-screen-xl mx-auto px-6 py-6 pb-24 md:pb-6">
        <h2 className="text-white text-lg font-normal mb-6">
          Results for: <span className="text-white font-semibold">"{decodeURIComponent(query)}"</span>
        </h2>

        {isLoading && <Loader />}

        {isError && (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500 text-lg font-medium">Search failed. Please try again.</p>
          </div>
        )}

        {!isLoading && !isError && (
          <div className="flex flex-col gap-3">
            {channels.map((item, idx) => (
              <ChannelCard key={idx} channel={item} />
            ))}

            {videos.map((item, idx) => (
              <VideoCard key={idx} video={item} horizontal />
            ))}

            {videos.length === 0 && channels.length === 0 && (
              <div className="flex justify-center items-center h-64">
                <p className="text-zinc-400 text-lg">No results found for "{decodeURIComponent(query)}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResults