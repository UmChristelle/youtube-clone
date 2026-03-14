import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoId }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const containerRef = useRef(null);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video rounded-xl overflow-hidden bg-black"
    >
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        controls
        playing
        width="100%"
        height="100%"
        className="absolute top-0 left-0"
      />
      <button
        onClick={toggleFullScreen}
        className="absolute bottom-3 right-3 z-10 bg-black/60 hover:bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg transition"
      >
        {isFullScreen ? '⛶ Exit' : '⛶ Fullscreen'}
      </button>
    </div>
  );
};

export default VideoPlayer;