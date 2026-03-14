import { useNavigate } from 'react-router-dom'
import { MdHomeFilled, MdOutlineSubscriptions, MdOutlineVideoLibrary } from 'react-icons/md'
import { AiOutlineHistory, AiOutlineLike } from 'react-icons/ai'
import { SiYoutubeshorts } from 'react-icons/si'
import { IoGameControllerOutline, IoMusicalNotesOutline } from 'react-icons/io5'
import { FiTrendingUp } from 'react-icons/fi'
import { BiMoviePlay } from 'react-icons/bi'
import { RiLiveLine } from 'react-icons/ri'

const mainLinks = [
  { icon: <MdHomeFilled size={22} />, label: 'Home' },
  { icon: <SiYoutubeshorts size={22} />, label: 'Shorts' },
  { icon: <MdOutlineSubscriptions size={22} />, label: 'Subscriptions' },
]

const libraryLinks = [
  { icon: <MdOutlineVideoLibrary size={22} />, label: 'Library' },
  { icon: <AiOutlineHistory size={22} />, label: 'History' },
  { icon: <AiOutlineLike size={22} />, label: 'Liked Videos' },
]

const categories = [
  { icon: <FiTrendingUp size={20} />, label: 'New' },
  { icon: <IoMusicalNotesOutline size={20} />, label: 'Music' },
  { icon: <IoGameControllerOutline size={20} />, label: 'Gaming' },
  { icon: <RiLiveLine size={20} />, label: 'Live' },
  { icon: <BiMoviePlay size={20} />, label: 'Movie' },
  { icon: null, label: 'Coding' },
  { icon: null, label: 'ReactJS' },
  { icon: null, label: 'NextJS' },
  { icon: null, label: 'Education' },
  { icon: null, label: 'Podcast' },
  { icon: null, label: 'Football' },
  { icon: null, label: 'Crypto' },
  { icon: null, label: 'Fashion' },
  { icon: null, label: 'Beauty' },
  { icon: null, label: 'Art' },
  { icon: null, label: 'Travel' },
  { icon: null, label: 'Food' },
  { icon: null, label: 'Science' },
  { icon: null, label: 'Technology' },
]

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  const navigate = useNavigate()

  const handleClick = (label) => {
    setSelectedCategory(label)
    navigate('/')
  }

  return (
    <>
      <aside
        style={{ overflowY: 'auto', height: '100%' }}
        className="hidden md:flex flex-col w-60 bg-[#0f0f0f] border-r border-zinc-800 flex-shrink-0 py-3 px-2"
      >
        <div className="mb-1">
          {mainLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => handleClick(item.label)}
              className={`flex items-center gap-5 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${selectedCategory === item.label
                  ? 'bg-zinc-700 text-white'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        <div className="border-t border-zinc-800 pt-3 mb-1">
          {libraryLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => handleClick(item.label)}
              className={`flex items-center gap-5 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${selectedCategory === item.label
                  ? 'bg-zinc-700 text-white'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        <div className="border-t border-zinc-800 pt-3">
          <p className="text-zinc-500 text-xs font-semibold uppercase px-3 mb-2 tracking-wider">
            Explore
          </p>
          {categories.map((item) => (
            <button
              key={item.label}
              onClick={() => handleClick(item.label)}
              className={`flex items-center gap-5 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${selectedCategory === item.label
                  ? 'bg-zinc-700 text-white'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
            >
              {item.icon && item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </aside>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0f0f0f] border-t border-zinc-800 flex justify-around items-center py-2">
        <button
          onClick={() => handleClick('New')}
          className="flex flex-col items-center gap-0.5 text-zinc-400 hover:text-white transition"
        >
          <MdHomeFilled size={24} />
          <span className="text-xs">Home</span>
        </button>
        <button
          onClick={() => handleClick('Shorts')}
          className="flex flex-col items-center gap-0.5 text-zinc-400 hover:text-white transition"
        >
          <SiYoutubeshorts size={24} />
          <span className="text-xs">Shorts</span>
        </button>
        <button
          onClick={() => handleClick('Subscriptions')}
          className="flex flex-col items-center gap-0.5 text-zinc-400 hover:text-white transition"
        >
          <MdOutlineSubscriptions size={24} />
          <span className="text-xs">Subscriptions</span>
        </button>
        <button
          onClick={() => handleClick('Library')}
          className="flex flex-col items-center gap-0.5 text-zinc-400 hover:text-white transition"
        >
          <MdOutlineVideoLibrary size={24} />
          <span className="text-xs">Library</span>
        </button>
      </div>
    </>
  )
}

export default Sidebar