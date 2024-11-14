import { AppStateChanges } from "../../types";
import { EventEmitter, IEvents } from "../base/events";

export interface ISuccesView extends IEvents {
    setTotal(data: number): void;
    render(): HTMLDivElement;
}

export interface ISuccesViewConstructor {
    new(succesTemplate: HTMLTemplateElement): ISuccesView;
}

export class SuccesView extends EventEmitter implements ISuccesView {
    protected succesElement: HTMLDivElement;
    protected totalText: HTMLParagraphElement;
    protected buttonNext: HTMLButtonElement;
    constructor(succesTemplate: HTMLTemplateElement) {
        super();
        this.succesElement = succesTemplate.content.querySelector('.order-success').cloneNode(true) as HTMLDivElement;
        this.totalText = this.succesElement.querySelector('.order-success__description');
        this.buttonNext = this.succesElement.querySelector('.order-success__close');

        this.buttonNext.addEventListener("click", () => {
            this.emit(AppStateChanges.modal)
        })
    }

    setTotal(data: number): void {
        this.totalText.textContent = `Списано ${String(data)} синапсов`;
    }

    render(): HTMLDivElement {
        return this.succesElement
    }
}
