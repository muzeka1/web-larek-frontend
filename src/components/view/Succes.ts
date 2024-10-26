export interface ISuccesView {
    setTotal(data: number): void;
    render(): HTMLDivElement;
}

export interface ISuccesViewConstructor {
    new (succesTemplate: HTMLTemplateElement): ISuccesView;
}

export class SuccesView implements ISuccesView{
    protected succesElement: HTMLDivElement;
    protected totalText: HTMLParagraphElement;
    constructor(succesTemplate: HTMLTemplateElement) {
        this.succesElement = succesTemplate.content.querySelector('.order-success').cloneNode(true) as HTMLDivElement;
        this.totalText = this.succesElement.querySelector('.order-success__description');
    }

    setTotal(data: number): void {
        this.totalText.textContent = `Списано ${String(data)} синапсов`;
    }

    render(): HTMLDivElement {
        return this.succesElement
    }
}
