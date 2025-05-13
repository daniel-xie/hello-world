import "./App.css";

import { Gallery } from "./components/layout/Gallery";
import type { Photo } from "./types";

const sikkim: Photo[] = [
  {path: new URL("/src/assets/sikkim/sikkim1.JPEG", import.meta.url).href, title: "Something cool", caption: "Not bad"},
  {path: new URL("/src/assets/sikkim/sikkim2.JPEG", import.meta.url).href},
  {path: new URL("/src/assets/sikkim/sikkim3.JPEG", import.meta.url).href},

  {path: new URL("/src/assets/sikkim/sikkim1.JPEG", import.meta.url).href},
  {path: new URL("/src/assets/sikkim/sikkim2.JPEG", import.meta.url).href},
  {path: new URL("/src/assets/sikkim/sikkim3.JPEG", import.meta.url).href},
  {path: new URL("/src/assets/sikkim/sikkim1.JPEG", import.meta.url).href},
  {path: new URL("/src/assets/sikkim/sikkim2.JPEG", import.meta.url).href},
  {path: new URL("/src/assets/sikkim/sikkim3.JPEG", import.meta.url).href},
];

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
              <Gallery title={"Sikkim"} description={"Sikkim is a cool place"} images={sikkim} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
