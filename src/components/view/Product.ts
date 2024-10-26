import { Product } from "../../types";

export interface IProductCatalogView {
    setOpenHandler(handlerOpenPreview: Function): void;
    render(): HTMLButtonElement;
    setContent(data: Product): void;
}

export interface IProductCatalogViewConstructor {
    new (productCatalogTemplate: HTMLTemplateElement): IProductCatalogView;
}

export class ProductCatalogView implements IProductCatalogView{
    protected productElement: HTMLButtonElement;
    protected categoryProduct: HTMLSpanElement;
    protected titleProduct: HTMLTitleElement;
    protected imageProduct: HTMLImageElement;
    protected priceProduct: HTMLSpanElement;
    protected handleOpenPreview: Function;

    constructor(productCatalogTemplate: HTMLTemplateElement) {
        this.productElement = productCatalogTemplate.content.querySelector('.gallery__item').cloneNode(true) as HTMLButtonElement;
        this.categoryProduct = this.productElement.querySelector('.card__category');
        this.titleProduct = this.productElement.querySelector('.card__title');
        this.imageProduct = this.productElement.querySelector('.card__image');
        this.priceProduct = this.productElement.querySelector('.card__price');

        this.productElement.addEventListener('click', () => {
            this.handleOpenPreview(this)
        })
    }

    setContent(data: Product): void {
        this.categoryProduct.textContent = data.category;
        this.titleProduct.textContent = data.title;
        this.imageProduct.src = data.image;
        this.priceProduct.textContent = String(data.price)
    }

    setOpenHandler(handlerOpenPreview: Function): void {
        this.handleOpenPreview = handlerOpenPreview
    }

    render(): HTMLButtonElement {
        return this.productElement
    }
}