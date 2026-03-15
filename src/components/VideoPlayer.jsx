import { useRef, useState } from 'react'

const VideoPlayer = ({ videoId }) => {
  const containerRef = useRef(null)
  const [isFullScreen, setIsFullScreen] = useState(false)

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
      setIsFullScreen(true)
    } else {
      document.exitFullscreen()
      setIsFullScreen(false)
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video rounded-xl overflow-hidden bg-black"
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
        style={{ border: 'none' }}
      />
      <button
        onClick={toggleFullScreen}
        className="absolute bottom-3 right-3 z-10 bg-black/60 hover:bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg transition"
      >
        {isFullScreen ? '⛶ Exit' : '⛶ Fullscreen'}
      </button>
    </div>
  )
}

export default VideoPlayer