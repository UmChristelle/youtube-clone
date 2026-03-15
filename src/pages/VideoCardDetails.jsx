import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import VideoPlayer from '../components/VideoPlayer'
import VideoCard from '../components/VideoCard'
import Loader from '../components/Loader'
import { AiOutlineEye, AiOutlineLike } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'

const VideoCardDetails = () => {
  const { id } = useParams()

  const { data: videoData, isLoading: loadingVideo, isError: errorVideo } = useQuery({
    queryKey: ['video', id],
    queryFn: () => fetchFromAPI(`videos?part=snippet,statistics&id=${id}`),
    staleTime: 1000 * 60 * 5,
  })

  const video = videoData?.items?.[0]
  const snippet = video?.snippet
  const statistics = video?.statistics

  const { data: relatedData, isLoading: loadingRelated } = useQuery({
    queryKey: ['related', id],
    queryFn: () => fetchFromAPI(`search?part=snippet&q=${snippet?.title}&type=video&maxResults=20`),
    enabled: !!snippet?.title,
    staleTime: 1000 * 60 * 5,
  })

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
            <div className="flex flex-wrap items-center justify-between gap-4 mt-3 pb-3 border-b border-zinc-800">
              <Link to={`/channel/${snippet?.channelId}`}>
                <p className="text-blue-400 font-semibold text-sm hover:text-blue-300 transition">
                  {snippet?.channelTitle}
                </p>
              </Link>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-1.5 text-zinc-400 text-sm">
                  <AiOutlineEye size={17} />
                  <span>{formatCount(statistics?.viewCount)}</span>
                  <span className="text-zinc-600 text-xs">views</span>
                </div>
                <div className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 transition px-3 py-1.5 rounded-full cursor-pointer">
                  <AiOutlineLike size={17} className="text-white" />
                  <span className="text-white text-sm font-medium">
                    {formatCount(statistics?.likeCount)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400 text-sm">
                  <BiComment size={16} />
                  <span>{formatCount(statistics?.commentCount)}</span>
                  <span className="text-zinc-600 text-xs">comments</span>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-zinc-900 hover:bg-zinc-800 transition rounded-xl p-4 cursor-pointer">
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