import {computed, makeAutoObservable} from 'mobx';

class ScreenStore {
    screenWidth = window.innerWidth;

    constructor() {
        makeAutoObservable(this);
        window.addEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.screenWidth = window.innerWidth;
    };
}

const screenStore = new ScreenStore();

export default screenStore;

export const selectScreenSizes = computed(() => {
    const screenWidth = screenStore.screenWidth;

    return {
        isMin: screenWidth < 640,
        isExtraSmall: screenWidth >= 640 && screenWidth < 735,
        isSmall: screenWidth >= 735 && screenWidth < 1100,
        isMedium: screenWidth >= 1100 && screenWidth < 1465,
        isLarge: screenWidth >= 1465 && screenWidth < 1540,
        isExtraLarge: screenWidth >= 1540,
    };
});