import { Link } from 'react-router-dom';

const ChannelCard = ({ channel }) => {
  const { id, snippet, statistics } = channel;
  const channelId = id?.channelId || id;

  const formatSubs = (count) => {
    if (!count) return 'No subscribers';
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M subscribers`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K subscribers`;
    return `${count} subscribers`;
  };

  return (
    <Link to={`/channel/${channelId}`}>
      <div className="flex flex-col items-center gap-3 p-6 bg-zinc-900 rounded-2xl hover:bg-zinc-800 transition-all duration-200 group">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-zinc-700 group-hover:border-red-500 transition">
          <img
            src={
              snippet?.thumbnails?.high?.url ||
              `https://ui-avatars.com/api/?name=${snippet?.title}&background=random&size=96`
            }
            alt={snippet?.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center">
          <h3 className="text-white font-semibold text-sm">
            {snippet?.title}
          </h3>
          <p className="text-zinc-400 text-xs mt-1">
            {formatSubs(statistics?.subscriberCount)}
          </p>
          {snippet?.country && (
            <p className="text-zinc-500 text-xs mt-0.5">{snippet.country}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ChannelCard;