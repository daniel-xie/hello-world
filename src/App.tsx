import "./App.css";

import { GalleryPage } from "./pages/GalleryPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GalleryRootPage } from "./pages/GalleryRootPage";
import { GalleryRegionPage } from "./pages/GalleryRegionPage";
import { AudioPage } from "./pages/AudioPage";

function App() {
  return (
    <>
      <nav className="flex items-center justify-center">
        <h1>Hello Daniel</h1>
      </nav>

      <main>
        <div className=" bg-gradient-to-tr from-teal-500 to-indigo-500">
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-4/5">
              <BrowserRouter basename={import.meta.env.BASE_URL}>
                <Routes>
                  <Route path="/" element={<GalleryRootPage />} />
                  <Route path="/region/:regionId" element={<GalleryRegionPage />} />
                  <Route path="/region/:regionId/gallery/:galleryId" element={<GalleryPage />} />

                  <Route path="/sounds" element={<AudioPage />} />
                </Routes>
              </BrowserRouter>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
