import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import ReactGA from 'react-ga4'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Contact from './pages/Contact'
import BlogList from './pages/BlogList'
import BlogPostPage from './pages/BlogPostPage'
import LoginPage from './pages/LoginPage'
import AdminPanel from './components/AdminPanel'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'

// Initialize Google Analytics
const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || 'G-XXXXXXXXXX'
ReactGA.initialize(GA_TRACKING_ID)

function App() {
  useEffect(() => {
    // Track page view on initial load
    ReactGA.send({ hitType: "pageview", page: window.location.pathname })
  }, [])

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </AuthProvider>
  )
}

export default App
