import React from "react";
import {baseUrl} from "../../api/directus-api";
import './photo-preview-style.scss';
import {selectScreenSizes} from "../../stores/screen-store";

interface PhotoCardProps {
    image: string;
    albumSection: boolean;
}

export const PhotoPreview = (props: PhotoCardProps) => {
    const {image, albumSection} = props;
    const screenSizes = selectScreenSizes.get();

    return (
        <div className="image">
            {screenSizes.isExtraSmall || screenSizes.isMin ? (
                <img key={image} src={`${baseUrl}/assets/${image}?key=${albumSection ? "album-section-sm" : "albums-list-section-sm"}`} alt={image}/>
            ) : (
                <img key={image} src={`${baseUrl}/assets/${image}?key=${albumSection ? "album-section-md" : "albums-list-section-md"}`} alt={image}/>
            )}
        </div>
    )
}