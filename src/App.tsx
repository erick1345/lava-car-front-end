import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Galeria from './pages/Galeria';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/galeria" element={<Galeria />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
