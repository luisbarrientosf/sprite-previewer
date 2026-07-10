import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './presentation/components/Navbar/Navbar';
import { HomePage } from './presentation/pages/Home/HomePage';
import { ListPage } from './presentation/pages/SpriteList/ListPage';
import { PreviewPage } from './presentation/pages/SpriteDetail/PreviewPage';
import { SpritesheetsPage } from './presentation/pages/SpritesheetCutter/SpritesheetsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/spritesheets" element={<SpritesheetsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
