import { AppStateChanges } from "../../types";
import { EventEmitter, IEvents } from "../base/events";

export interface IPage extends IEvents{
    setCartCount(total: number): void;
    galleryContent(items: HTMLElement[]): void;
}



export class Page extends EventEmitter implements IPage {
    protected gallery: HTMLElement;
    protected cartButton: HTMLButtonElement;
    protected cartCounter: HTMLSpanElement;
    constructor(body: HTMLElement) {
        super();
        this.gallery = body.querySelector('.gallery') as HTMLElement;
        this.cartButton = body.querySelector('.header__basket') as HTMLButtonElement;
        this.cartCounter = this.cartButton.querySelector('.header__basket-counter')
        this.cartButton.addEventListener('click', () => {
            this.emit(AppStateChanges.modal)
        })
    }

    setCartCount(total: number) {
        this.cartCounter.textContent = String(total);
    }

    galleryContent(items: HTMLElement[]) {
        this.gallery.replaceChildren(...items)
    }
}