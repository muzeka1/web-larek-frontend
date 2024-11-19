import { AppStateChanges, Product, ProductCategory } from "../../types";
import { EventEmitter, IEvents } from "../base/events";

export interface IProductPreView extends IEvents{
    id: string;
    inCartState: boolean;
    render(): HTMLButtonElement;
    changeButtonState(): void;
    setContent(data: Product): void;
}

export interface IProductPreViewConstructor {
    new (productCatalogTemplate: HTMLTemplateElement): IProductPreView;
}

export class ProductPreView extends EventEmitter implements IProductPreView{
    protected productElement: HTMLButtonElement;
    protected categoryProduct: HTMLSpanElement;
    protected titleProduct: HTMLTitleElement;
    protected descriptionProduct: HTMLParagraphElement;
    protected imageProduct: HTMLImageElement;
    protected priceProduct: HTMLSpanElement;
    protected addToCartButton: HTMLButtonElement;
    protected _id: string;
    protected _inCart: boolean

    constructor(productPreViewTemplate: HTMLTemplateElement) {
        super();
        this.productElement = productPreViewTemplate.content.querySelector('.card').cloneNode(true) as HTMLButtonElement;
        this.categoryProduct = this.productElement.querySelector('.card__category');
        this.titleProduct = this.productElement.querySelector('.card__title');
        this.descriptionProduct = this.productElement.querySelector('.card__text')
        this.imageProduct = this.productElement.querySelector('.card__image');
        this.priceProduct = this.productElement.querySelector('.card__price');
        this.addToCartButton = this.productElement.querySelector('.button');
        this.categoryProduct = this.productElement.querySelector('.card__category');

        
    }

    set id(id: string) {
        this._id = id;
    }

    get inCartState() {
        return this._inCart
    }

    set inCartState(inCart: boolean) {
        this._inCart = inCart;
    }

    setContent(data: Product): void {
        this.categoryProduct.textContent = data.category;
        this.titleProduct.textContent = data.title;
        this.descriptionProduct.textContent = data.description
        this.imageProduct.src = data.image;
        this.categoryProduct.classList.add(`card__category_${ProductCategory[data.category]}`);
        if (data.price != null) {
            this.priceProduct.textContent = `${String(data.price)} синапсов`
            this.addToCartButton.addEventListener('click', () => {
                this.changeButtonState()
                this.emit(AppStateChanges.product, {id: this._id, handler: this.changeButtonState.bind(this)})
            })
        } else {
            this.priceProduct.textContent = "Бесценно"
            this.addToCartButton.disabled = true;
        }
    }
    
    changeButtonState(): void {
        this._inCart ? this.addToCartButton.textContent = "Убрать" : this.addToCartButton.textContent = "В корзину";
        this._inCart = !this._inCart
    }

    render(): HTMLButtonElement {
        return this.productElement
    }
}