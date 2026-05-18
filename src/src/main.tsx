import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './Navbar'
import Courses from './Courses'
import Library from './Library'
import Footer from './Footer'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main>
        <Courses />
        <Library />
      </main>
      <Footer />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
