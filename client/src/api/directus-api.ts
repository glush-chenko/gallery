export interface AlbumImage {
    item: string;
    id: number;
}

export interface Album {
    id: number;
    name: string;
    images: AlbumImage[];
}

export const baseUrl = "http://localhost:8055";
// const thumbnailParams = '?key=preset-1';

export async function getAlbums(): Promise<Album[]> {
    const response = await fetch(`${baseUrl}/items/albums?fields=*,images.item,images.id`, {
        cache: "no-store"
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.data;
}