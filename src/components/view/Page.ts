export interface IPage {
    galleryContent(items: HTMLElement[]): void;
}



export class Page implements IPage {
    constructor(protected gallery: HTMLElement) {}

    galleryContent(items: HTMLElement[]) {
        this.gallery.replaceChildren(...items)
    }
}