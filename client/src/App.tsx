import React from 'react';
import './App.scss';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    Navigate,
} from 'react-router-dom';
import {Root} from "./routes/root";
import {AlbumGallery} from "./components/album-gallery/album-gallery";
import {Album} from "./components/album/album";
import {PhotoModal} from "./components/photo-modal/photo-modal";

const appRouter = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root />}>
        <Route index element={<AlbumGallery/> }/>
        <Route path="albums" element={<Album />}>
            <Route path=":albumId" element={<Album />}>
                <Route path="photo" element={<PhotoModal />} >
                    <Route path=":photoId" element={<PhotoModal />} />
                </Route>
            </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
));

function App() {

    return (
        <div className="App">
            <RouterProvider router={appRouter}/>
        </div>
    )
}

export default App;
