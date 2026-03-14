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
    queryFn: () => fetchFromAPI(`search?part=snippet&q=${query}`),
    staleTime: 1000 * 60 * 5,
  })

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#0f0f0f' }}>
      <div className="px-4 py-6 pb-24 md:pb-6">
        <h2 className="text-white text-xl font-semibold mb-6">
          Results for: <span className="text-zinc-400">"{query}"</span>
        </h2>
        {isLoading && <Loader />}
        {isError && (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500 text-lg font-medium">Search failed. Please try again.</p>
          </div>
        )}
        {!isLoading && !isError && (
          <div className="flex flex-col gap-6 max-w-4xl">
            {data?.items?.map((item, idx) => (
              <div key={idx}>
                {item.id?.videoId && <VideoCard video={item} />}
                {item.id?.channelId && <ChannelCard channel={item} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResults