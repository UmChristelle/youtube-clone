import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Feed from './pages/Feed'
import VideoCardDetails from './pages/VideoCardDetails'
import ChannelDetails from './pages/ChannelDetails'
import SearchResults from './pages/SearchResults'

function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/video/:id" element={<VideoCardDetails />} />
        <Route path="/channel/:id" element={<ChannelDetails />} />
        <Route path="/search/:query" element={<SearchResults />} />
      </Routes>
    </div>
  )
}

export default App