import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Music from './pages/Music';
import Works from './pages/Works';
import Concerts from './pages/Concerts';
import Gallery from './pages/Gallery';
import Press from './pages/Press';
import Book from './pages/Book';

// Only the admin ever opens the dashboard, so visitors don't download its code.
const Admin = lazy(() => import('./pages/Admin'));

export default function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/music" element={<Music />} />
        {/* old URL, kept so existing links and bookmarks still land */}
        <Route path="/listen" element={<Navigate to="/music" replace />} />
        <Route path="/works" element={<Works />} />
        <Route path="/concerts" element={<Concerts />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/press" element={<Press />} />
        <Route path="/book" element={<Book />} />
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={null}>
              <Admin />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
}
