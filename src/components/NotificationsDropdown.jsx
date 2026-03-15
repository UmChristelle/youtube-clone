import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchNotifications = async (accessToken) => {
  const { data } = await axios.get(
    'https://www.googleapis.com/youtube/v3/activities',
    {
      params: { part: 'snippet', home: true, maxResults: 10 },
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  )
  return data.items || []
}

const NotificationsDropdown = ({ accessToken, onClose }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notifications', accessToken],
    queryFn: () => fetchNotifications(accessToken),
    staleTime: 1000 * 60 * 5,
  })

  return (
    <div className="absolute right-0 mt-2 w-80 bg-[#282828] rounded-xl shadow-2xl z-50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-700">
        <h3 className="text-white font-semibold text-sm">Notifications</h3>
        <button onClick={onClose} className="text-zinc-400 hover:text-white text-lg leading-none">✕</button>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {isError && (
          <p className="text-zinc-400 text-sm text-center py-6 px-4">
            Could not load notifications. Try again later.
          </p>
        )}

        {!isLoading && !isError && data?.length === 0 && (
          <p className="text-zinc-400 text-sm text-center py-6">No notifications</p>
        )}

        {data?.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 px-4 py-3 hover:bg-zinc-700 cursor-pointer transition-colors"
          >
            <img
              src={item.snippet?.thumbnails?.default?.url}
              alt=""
              className="w-10 h-10 rounded-full object-cover flex-shrink-0 bg-zinc-600"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs leading-snug line-clamp-2">
                {item.snippet?.title}
              </p>
              <p className="text-zinc-400 text-xs mt-1">
                {new Date(item.snippet?.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotificationsDropdown