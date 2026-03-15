import { Link } from 'react-router-dom'

const ChannelCard = ({ channel }) => {
  const { id, snippet, statistics } = channel
  const channelId = id?.channelId || id

  const formatSubs = (count) => {
    if (!count) return 'No subscribers'
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M subscribers`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K subscribers`
    return `${count} subscribers`
  }

  return (
    <Link to={`/channel/${channelId}`} className="w-full">
      <div className="flex items-center gap-5 p-4 rounded-xl hover:bg-zinc-800 transition-all duration-200 group border border-zinc-800">
        <img
          src={
            snippet?.thumbnails?.high?.url ||
            snippet?.thumbnails?.medium?.url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(snippet?.title || 'C')}&background=random&size=96`
          }
          alt={snippet?.title}
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(snippet?.title || 'C')}&background=random&size=96`
          }}
          className="w-20 h-20 rounded-full object-cover flex-shrink-0 border-2 border-zinc-700 group-hover:border-red-500 transition"
        />
        <div className="min-w-0">
          <h3 className="text-white font-semibold text-base truncate">
            {snippet?.title}
          </h3>
          <p className="text-zinc-400 text-sm mt-0.5">
            {formatSubs(statistics?.subscriberCount)}
          </p>
          {snippet?.description && (
            <p className="text-zinc-500 text-sm mt-1 line-clamp-1">
              {snippet.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ChannelCard