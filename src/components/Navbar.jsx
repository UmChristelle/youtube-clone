import { Link } from 'react-router-dom'
import { AiFillYoutube } from 'react-icons/ai'
import { MdOutlineVideoCall } from 'react-icons/md'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { RxHamburgerMenu } from 'react-icons/rx'
import { FiUser } from 'react-icons/fi'
import SearchBar from './SearchBar'

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0f0f0f] border-b border-zinc-800">
      <div className="flex items-center justify-between px-4 h-14">

        <div className="flex items-center gap-3 flex-shrink-0">
          <RxHamburgerMenu className="text-white text-xl cursor-pointer hover:text-zinc-300 transition" />
          <Link to="/" className="flex items-center gap-1">
            <AiFillYoutube className="text-red-600 text-4xl" />
            <span className="text-white font-bold text-lg tracking-tight hidden sm:block">
              YouTube
            </span>
          </Link>
        </div>

        <div className="flex-1 flex justify-center px-4">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <MdOutlineVideoCall className="text-white text-2xl cursor-pointer hover:text-zinc-300 transition hidden md:block" />
          <IoMdNotificationsOutline className="text-white text-2xl cursor-pointer hover:text-zinc-300 transition hidden md:block" />
          <button className="flex items-center gap-1.5 border border-blue-500 text-blue-400 hover:bg-blue-500/10 transition-all duration-200 px-3 py-1.5 rounded-full text-sm font-medium">
            <FiUser size={16} />
            <span className="hidden sm:block">Sign in</span>
          </button>
        </div>

      </div>
    </nav>
  )
}

export default Navbar