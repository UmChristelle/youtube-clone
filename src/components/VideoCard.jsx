import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  const { id, snippet, statistics } = video;
  const videoId = id?.videoId || id;
  const channelId = snippet?.channelId;

  const formatViews = (count) => {
    if (!count) return '0 views';
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M views`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K views`;
    return `${count} views`;
  };

  return (
    <div className="flex flex-col gap-2 group cursor-pointer w-full">
      <Link to={`/video/${videoId}`}>
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-800">
          <img
            src={snippet?.thumbnails?.high?.url}
            alt={snippet?.title}
            onError={(e) => {
              e.target.src =
                snippet?.thumbnails?.medium?.url ||
                snippet?.thumbnails?.default?.url ||
                'https://via.placeholder.com/480x270?text=No+Thumbnail'
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="flex gap-3 px-1">
        <Link to={`/channel/${channelId}`} className="flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-zinc-700 overflow-hidden">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(snippet?.channelTitle || 'C')}&background=random`}
              alt={snippet?.channelTitle}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        <div className="flex flex-col min-w-0">
          <Link to={`/video/${videoId}`}>
            <h3 className="text-white text-sm font-medium line-clamp-2 leading-snug hover:text-zinc-300 transition">
              {snippet?.title}
            </h3>
          </Link>
          <Link to={`/channel/${channelId}`}>
            <p className="text-zinc-400 text-xs mt-1 hover:text-white transition truncate">
              {snippet?.channelTitle}
            </p>
          </Link>
          <p className="text-zinc-500 text-xs mt-0.5">
            {formatViews(statistics?.viewCount)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;