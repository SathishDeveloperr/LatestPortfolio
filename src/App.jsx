import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Tour from './pages/Tour.jsx'
import { useLenis } from './hooks/useLenis.js'

/** Reset scroll to top on route change (Lenis-aware). */
function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  useLenis()

  return (
    <BrowserRouter>
      <ScrollReset />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Tour />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
