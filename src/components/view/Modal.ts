import { EventEmitter, IEvents } from "../base/events";

export interface IModal extends IEvents{
    _modalContent: HTMLElement;
    modalContent: HTMLElement;
    open(): void;
    close(): void;
}

export interface IModalConstructor {
    new (modalElement: HTMLElement): IModal;
}

export class Modal extends EventEmitter implements IModal {
    _modalContent: HTMLElement;
    protected buttonClose: HTMLButtonElement;

    constructor(protected modalElement: HTMLElement) {
        super();
        this._modalContent = modalElement.querySelector(".modal__content");
        this.buttonClose = modalElement.querySelector(".modal__close");

        this.buttonClose.addEventListener('click', this.close.bind(this))

        this.modalElement.addEventListener('click', this.close.bind(this))

        this._modalContent.addEventListener('click', evt => {
            evt.stopPropagation()
        })
    }

    set modalContent(content: HTMLElement) {
        this._modalContent.replaceChildren(content)   
    }

    open(): void {
        this.modalElement.classList.add("modal_active")
    }

    close(): void {
        this.modalElement.classList.remove("modal_active")
        this._modalContent.replaceChildren("");
    }
}