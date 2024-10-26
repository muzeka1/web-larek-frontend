import { Product } from "../../types";

export interface IProductPreView {
    setAddHandler(handlerOpenPreview: Function): void;
    render(): HTMLButtonElement;
    setContent(data: Product): void;
}

export interface IProductPreViewConstructor {
    new (productCatalogTemplate: HTMLTemplateElement): IProductPreView;
}

export class ProductPreView implements IProductPreView{
    protected productElement: HTMLButtonElement;
    protected categoryProduct: HTMLSpanElement;
    protected titleProduct: HTMLTitleElement;
    protected descriptionProduct: HTMLParagraphElement;
    protected imageProduct: HTMLImageElement;
    protected priceProduct: HTMLSpanElement;
    protected addToCartButton: HTMLButtonElement;
    protected handleAddToCart: Function;

    constructor(productPreViewTemplate: HTMLTemplateElement) {
        this.productElement = productPreViewTemplate.content.querySelector('.card').cloneNode(true) as HTMLButtonElement;
        this.categoryProduct = this.productElement.querySelector('.card__category');
        this.titleProduct = this.productElement.querySelector('.card__title');
        this.descriptionProduct = this.productElement.querySelector('.card__text')
        this.imageProduct = this.productElement.querySelector('.card__image');
        this.priceProduct = this.productElement.querySelector('.card__price');
        this.addToCartButton = this.priceProduct.querySelector('.button');
    }

    setContent(data: Product): void {
        this.categoryProduct.textContent = data.category;
        this.titleProduct.textContent = data.title;
        this.descriptionProduct.textContent = data.description
        this.imageProduct.src = data.image;
        this.priceProduct.textContent = String(data.price)
    }

    setAddHandler(handleAddToCart: Function): void {
        this.handleAddToCart = handleAddToCart
        this.addToCartButton.addEventListener('click', () => {
            this.handleAddToCart(this)
        })
    }

    render(): HTMLButtonElement {
        return this.productElement
    }
}