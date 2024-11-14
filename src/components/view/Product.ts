import { AppStateChanges, Product } from "../../types";
import { EventEmitter, IEvents } from "../base/events";

export interface IProductCatalogView extends IEvents{
    id: string;
    render(): HTMLButtonElement;
    setContent(data: Product): void;
}

export interface IProductCatalogViewConstructor {
    new (productCatalogTemplate: HTMLTemplateElement): IProductCatalogView;
}

export class ProductCatalogView extends EventEmitter implements IProductCatalogView{
    protected productElement: HTMLButtonElement;
    protected categoryProduct: HTMLSpanElement;
    protected titleProduct: HTMLTitleElement;
    protected imageProduct: HTMLImageElement;
    protected priceProduct: HTMLSpanElement;
    protected _id: string;

    constructor(productCatalogTemplate: HTMLTemplateElement) {
        super();
        this.productElement = productCatalogTemplate.content.querySelector('.gallery__item').cloneNode(true) as HTMLButtonElement;
        this.categoryProduct = this.productElement.querySelector('.card__category');
        this.titleProduct = this.productElement.querySelector('.card__title');
        this.imageProduct = this.productElement.querySelector('.card__image');
        this.priceProduct = this.productElement.querySelector('.card__price');

        this.productElement.addEventListener('click', () => {
            this.emit(AppStateChanges.modal, {id: this._id});
        })
    }

    set id(id: string) {
        this._id = id;
    }

    setContent(data: Product): void {
        this.categoryProduct.textContent = data.category;
        this.titleProduct.textContent = data.title;
        this.imageProduct.src = data.image;
        this.priceProduct.textContent = data.price != null? `${String(data.price)} синапсов` : "Бесценно";
    }

    render(): HTMLButtonElement {
        return this.productElement
    }
}