import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdOutlineKeyboardVoice } from 'react-icons/md'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search/${query}`)
      setQuery('')
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center w-full max-w-2xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        className="w-full px-5 py-2 bg-transparent text-white placeholder-zinc-500 border border-zinc-700 rounded-l-full focus:outline-none focus:border-blue-500 text-sm transition"
      />
      <button
        type="submit"
        className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 border-l-0 rounded-r-full text-zinc-300 hover:text-white transition-all duration-200 flex items-center justify-center"
      >
        <AiOutlineSearch size={20} />
      </button>
      <button type="button" className="ml-3 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white transition">
        <MdOutlineKeyboardVoice size={20} />
      </button>
    </form>
  )
}

export default SearchBar