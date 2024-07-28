import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {albumStore} from "../../stores/album-store";
import {Link} from "react-router-dom";
import {PhotoPreview} from "../photo-preview/photo-preview";
import "./album-gallery-style.scss"

export const AlbumGallery: React.FC = observer(() => {
    useEffect(() => {
        albumStore.loadAlbums();
    }, []);

    if (albumStore.loading) {
        return <div>Загрузка альбомов...</div>;
    }

    if (albumStore.error) {
        return <div>{albumStore.error}</div>;
    }


    return (
        <ul className="album-list-container">
            {albumStore.albums.map((album) => (
                <li key={album.id}>
                    <Link
                        to={`/albums/${album.id}`}
                        className="custom-link">
                        <PhotoPreview image={album.images[0].item} albumSection={false}/>
                        <div className="album-info">
                            <h4>{album.name}</h4>
                            <h5>{album.images.length} фото</h5>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
});