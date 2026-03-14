import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Feed from './pages/Feed'
import VideoCardDetails from './pages/VideoCardDetails'
import ChannelDetails from './pages/ChannelDetails'
import SearchResults from './pages/SearchResults'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0f0f0f', color: 'white' }}>
      <Navbar />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/video/:id" element={<VideoCardDetails />} />
          <Route path="/channel/:id" element={<ChannelDetails />} />
          <Route path="/search/:query" element={<SearchResults />} />
        </Routes>
      </div>
    </div>
  )
}

export default App