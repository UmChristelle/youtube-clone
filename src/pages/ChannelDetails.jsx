import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import VideoCard from '../components/VideoCard'
import Loader from '../components/Loader'

const ChannelDetails = () => {
  const { id } = useParams()

  const { data: channelData, isLoading: loadingChannel, isError: errorChannel } = useQuery({
    queryKey: ['channel', id],
    queryFn: () => fetchFromAPI(`channels?part=snippet,statistics&id=${id}`),
    staleTime: 1000 * 60 * 5,
  })

  const { data: videosData, isLoading: loadingVideos } = useQuery({
    queryKey: ['channelVideos', id],
    queryFn: () => fetchFromAPI(`search?channelId=${id}&part=snippet&order=date&type=video`),
    staleTime: 1000 * 60 * 5,
  })

  const channel = channelData?.items?.[0]
  const snippet = channel?.snippet
  const statistics = channel?.statistics

  const formatCount = (count) => {
    if (!count) return '0'
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count
  }

  if (loadingChannel) return <div style={{ flex: 1, overflowY: 'auto' }}><Loader /></div>

  if (errorChannel) return (
    <div style={{ flex: 1, overflowY: 'auto' }} className="flex justify-center items-center h-64">
      <p className="text-red-500 text-lg font-medium">Failed to load channel. Please try again.</p>
    </div>
  )

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#0f0f0f' }}>
      <div
        className="w-full h-40 md:h-56"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        }}
      />
      <div className="px-4 md:px-8 pb-24 md:pb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-10 mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#0f0f0f] bg-zinc-800 flex-shrink-0">
            <img
              src={
                snippet?.thumbnails?.high?.url ||
                `https://ui-avatars.com/api/?name=${snippet?.title}&background=random&size=96`
              }
              alt={snippet?.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center sm:text-left pb-2">
            <h1 className="text-white text-2xl font-bold">{snippet?.title}</h1>
            <p className="text-zinc-400 text-sm mt-1">
              {formatCount(statistics?.subscriberCount)} subscribers · {formatCount(statistics?.videoCount)} videos
            </p>
            <p className="text-zinc-500 text-sm mt-1 max-w-xl line-clamp-2">
              {snippet?.description}
            </p>
          </div>
        </div>
        <div className="border-t border-zinc-800 pt-6">
          <h2 className="text-white font-semibold text-lg mb-4">Videos</h2>
          {loadingVideos ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {videosData?.items?.map((item, idx) => (
                item.id?.videoId && <VideoCard key={idx} video={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChannelDetails