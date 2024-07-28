import { makeAutoObservable } from "mobx";
import {getAlbums, Album} from "../api/directus-api"

class AlbumStore  {
    albums: Album[] = [];
    loading: boolean = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async loadAlbums() {
        this.loading = true;
        this.error = null;
        try {
            this.albums = await getAlbums();
        } catch (err) {
            this.error = 'Ошибка загрузки альбомов';
            console.error(err);
        } finally {
            this.loading = false;
        }
    }
}

export const albumStore = new AlbumStore();