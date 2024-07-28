import React, {useCallback, useEffect, useMemo} from "react";
import {useParams, useNavigate} from 'react-router-dom';
import {albumStore} from "../../stores/album-store";
import {observer} from "mobx-react-lite";
import {baseUrl} from "../../api/directus-api";
import "./photo-modal-style.scss"
import close from "../../assets/close.png"
import left from "../../assets/left-chevron.png"
import right from "../../assets/right-chevron.png"

export const PhotoModal: React.FC = observer(() => {
    const {albumId, photoId} = useParams<{ albumId: string; photoId: string }>();
    const navigate = useNavigate();
    const modalRef = React.useRef<HTMLDivElement | null>(null);

    const modalPhoto: any = useMemo(() => {
        if (!albumId || !photoId || !albumStore.albums.length) return { photo: null, totalPhotos: 0, photoIndex: -1 };

        const album = albumStore.albums.find((album) => album.id === +albumId);
        if (!album) return { photo: null, totalPhotos: 0, photoIndex: -1 };

        const foundImage = album.images.find(image => image.id === +photoId);

        const totalPhotos = album.images.length;

        const photoIndex = foundImage ? album.images.findIndex(image => image.id === foundImage.id) : -1;

        return { photo: foundImage, totalPhotos, photoIndex, albumImages: album.images };
    }, [albumStore.albums, albumId, photoId]);

    const { photo, totalPhotos, photoIndex, albumImages } = modalPhoto;

    const handleNextPhoto = useCallback(() => {
        if(photoIndex >= 0 && photoIndex < totalPhotos - 1) {
            const nextPhotoId = albumImages[photoIndex + 1].id;
            navigate(`/albums/${albumId}/photo/${nextPhotoId}`);
        }
    }, [photoIndex, albumImages, totalPhotos, albumId]);

    const handlePrevPhoto = useCallback(() => {
        if(photoIndex > 0) {
            const prevPhotoId = albumImages[photoIndex - 1].id;
            navigate(`/albums/${albumId}/photo/${prevPhotoId}`);
        }
    }, [photoIndex, albumImages, totalPhotos, albumId]);

    const handleClose = useCallback(() => {
        navigate(`/albums/${albumId}`);
    }, [navigate, albumId]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            handleClose();
        }
    }, [modalRef, handleClose]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClose]);

    return (
        <>
            <div className="modal" ref={modalRef}>
                {photo && (
                    <img key={photo.id} src={`${baseUrl}/assets/${photo.item}`} alt="modal-image" className="photo-modal"/>
                )}
                <div className="modal-button">
                    <h4>{photoIndex + 1}/{totalPhotos}</h4>
                    <button
                        onClick={handlePrevPhoto}
                        className={photoIndex === 0 ? "disabled" : "activity"}
                    >
                        <img src={left} alt="Button Icon Left"/>
                    </button>
                    <button
                        onClick={handleNextPhoto}
                        className={photoIndex + 1 === totalPhotos ? "disabled" : "activity"}
                    >
                        <img src={right} alt="Button Icon Right"/>
                    </button>
                    <button onClick={handleClose}>
                        <img src={close} alt="Button Icon Close"/>
                    </button>
                </div>
            </div>
            <div className="tint-background"></div>
        </>
    );
});