import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import StickyPlayer from './components/StickyPlayer'
import LiveDJBanner from './components/LiveDJBanner'
import Home from './pages/Home'
import Programma from './pages/Programma'
import DJs from './pages/DJs'
import Nieuws from './pages/Nieuws'
import Chat from './pages/Chat'
import Verzoek from './pages/Verzoek'
import Login from './pages/Login'
import Register from './pages/Register'
import { usePlayerStore } from './store/playerStore'
import { useEffect } from 'react'

function App() {
  const { fetchNowPlaying } = usePlayerStore()

  useEffect(() => {
    fetchNowPlaying()

    // oude versie: const interval = setInterval(fetchNowPlaying, 10000)
    const interval = setInterval(fetchNowPlaying, 15000)

    return () => clearInterval(interval)
  }, [fetchNowPlaying])

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <LiveDJBanner />

        <main className="flex-grow pb-28">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programma" element={<Programma />} />
            <Route path="/djs" element={<DJs />} />
            <Route path="/nieuws" element={<Nieuws />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/verzoek" element={<Verzoek />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        <Footer />
        <StickyPlayer />
      </div>
    </Router>
  )
}

export default App
