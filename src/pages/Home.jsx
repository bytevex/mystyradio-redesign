import { motion } from 'framer-motion'
import Hero from '../components/home/Hero'
import Shows from '../components/home/Shows'
import About from '../components/home/About'
import News from '../components/home/News'
import Features from '../components/home/Features'
import Contact from '../components/home/Contact'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Shows />
      <About />
      <News />
      <Features />
      <Contact />
    </div>
  )
}
