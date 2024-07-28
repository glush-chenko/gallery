import React, {useCallback, useEffect, useMemo} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {PhotoPreview} from "../photo-preview/photo-preview";
import {albumStore} from "../../stores/album-store";
import {observer} from "mobx-react-lite";
import "./album-style.scss"
import {selectScreenSizes} from "../../stores/screen-store";
import {PhotoModal} from "../photo-modal/photo-modal";
import left from "../../assets/left-chevron.png"
import right from "../../assets/right-chevron.png"

export const Album = observer(() => {
    const navigate = useNavigate();
    const {albumId, photoId} = useParams<{ albumId: string; photoId: string }>();
    const [currentPage, setCurrentPage] = React.useState(1);
    const [photosPerPage, setPhotosPerPage] = React.useState(15);
    const screenSizes = selectScreenSizes.get();

    useEffect(() => {
        albumStore.loadAlbums();
    }, [albumStore])

    useEffect(() => {
        if (screenSizes.isExtraLarge) {
            setPhotosPerPage(15);
        } else if (screenSizes.isLarge) {
            setPhotosPerPage(12);
        } else if (screenSizes.isMedium) {
            setPhotosPerPage(9);
        } else if (screenSizes.isSmall || screenSizes.isExtraSmall) {
            setPhotosPerPage(6);
        } else if (screenSizes.isMin) {
            setPhotosPerPage(4);
        }
    }, [screenSizes, photosPerPage]);

    const photosFromAlbum = useMemo(() => {
        if (!albumId) return [];

        const album = albumStore.albums.find((album) => album.id === +albumId)

        return album ? album.images : [];
    }, [albumStore.albums, albumId])

    const totalPages = Math.ceil(photosFromAlbum.length / photosPerPage);

    const indexOfLastPhoto = currentPage * photosPerPage;
    const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;

    const currentPhotos = photosFromAlbum.slice(indexOfFirstPhoto, indexOfLastPhoto);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);


    return (
        <div className="album-container">
            <ul className="album">
                {currentPhotos.map(image => (
                    <li key={image.item}>
                        <Link to={`/albums/${albumId}/photo/${image.id}`}>
                            <PhotoPreview image={image.item} albumSection/>
                        </Link>
                    </li>
                ))}
            </ul>

            {photoId && (
                <PhotoModal/>
            )}

            <div className="bottom-nav">
                <button
                    type="button"
                    className="albums-page"
                    onClick={() => navigate("/")}
                >
                    Назад
                </button>
                <nav aria-label="page navigation" className="pagination-container">
                    <ul className="pagination justify-content-end">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button
                                type="button"
                                className="page-link"
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                <img src={left} alt="prev-page" style={{width: '15px'}}/>
                            </button>
                        </li>

                        {Array.from({length: totalPages}, (_, index) => (
                            <li className={`page-item ${currentPage === index + 1 ? "active" : ""}`} key={index + 1}>
                                <button
                                    type="button"
                                    className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}

                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <button
                                type="button"
                                className="page-link"
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                <img src={right} alt="prev-page" style={{width: '15px'}}/>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
});