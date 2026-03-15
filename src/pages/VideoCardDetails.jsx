import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import VideoPlayer from '../components/VideoPlayer'
import VideoCard from '../components/VideoCard'
import Loader from '../components/Loader'

const VideoCardDetails = () => {
  const { id } = useParams()

  const { data: videoData, isLoading: loadingVideo, isError: errorVideo } = useQuery({
    queryKey: ['video', id],
    queryFn: () => fetchFromAPI(`videos?part=snippet,statistics&id=${id}`),
    staleTime: 1000 * 60 * 5,
  })

  const { data: relatedData, isLoading: loadingRelated } = useQuery({
    queryKey: ['related', id],
    queryFn: () => fetchFromAPI(`search?part=snippet&q=${snippet?.title}&type=video&maxResults=20`),
    staleTime: 1000 * 60 * 5,
  })

  const video = videoData?.items?.[0]
  const snippet = video?.snippet
  const statistics = video?.statistics

  const formatCount = (count) => {
    if (!count) return '0'
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count
  }

  if (loadingVideo) return <div style={{ flex: 1, overflowY: 'auto' }}><Loader /></div>

  if (errorVideo) return (
    <div style={{ flex: 1, overflowY: 'auto' }} className="flex justify-center items-center h-64">
      <p className="text-red-500 text-lg font-medium">Failed to load video. Please try again.</p>
    </div>
  )

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#0f0f0f' }}>
      <div className="flex flex-col lg:flex-row gap-6 p-4 pb-24 md:pb-4">
        <div className="flex-1">
          <VideoPlayer videoId={id} />
          <div className="mt-4">
            <h1 className="text-white text-xl font-bold leading-snug">
              {snippet?.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-3">
              <Link to={`/channel/${snippet?.channelId}`}>
                <p className="text-blue-400 font-semibold text-sm hover:text-blue-300 transition">
                  {snippet?.channelTitle}
                </p>
              </Link>
              <div className="flex gap-4 text-zinc-400 text-sm">
                <span>👁 {formatCount(statistics?.viewCount)} views</span>
                <span>👍 {formatCount(statistics?.likeCount)} likes</span>
                <span>💬 {formatCount(statistics?.commentCount)} comments</span>
              </div>
            </div>
            <div className="mt-4 bg-zinc-900 rounded-xl p-4">
              <p className="text-zinc-300 text-sm whitespace-pre-line line-clamp-4">
                {snippet?.description}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-96 flex-shrink-0">
          <h2 className="text-white font-semibold text-base mb-3">Related Videos</h2>
          {loadingRelated ? (
            <Loader />
          ) : (
            <div className="flex flex-col gap-4">
              {relatedData?.items?.map((item, idx) => (
                item.id?.videoId && <VideoCard key={idx} video={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoCardDetails