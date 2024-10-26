import { Product } from "../../types";

export interface ICartProduct {
    setContent(data: Product, index: string): void;
    setDeleteHandler(handleDeleteProduct: Function): void;
    render(): HTMLLIElement;
}

export interface ICartProductConstructor {
    new (cartProductTemplate: HTMLTemplateElement): ICartProduct
}

export class CartProduct implements ICartProduct{
    protected cartProductElement: HTMLLIElement;
    protected titleCartProduct: HTMLSpanElement;
    protected indexCartProduct: HTMLSpanElement;
    protected priceCartProduct: HTMLSpanElement;
    protected buttonDeleteCartProduct: HTMLButtonElement;
    protected handleDeleteProduct: Function;

    constructor(cartProductTemplate: HTMLTemplateElement) {
        this.cartProductElement = cartProductTemplate.content.querySelector('.basket__item').cloneNode(true) as HTMLLIElement;
        this.titleCartProduct = this.cartProductElement.querySelector('.card__title');
        this.indexCartProduct = this.cartProductElement.querySelector('.basket__item-index');
        this.priceCartProduct = this.cartProductElement.querySelector('.card__price');
        this.buttonDeleteCartProduct = this.cartProductElement.querySelector('.basket__item-delete');
    }

    setContent(data: Product, index: string): void {
        this.titleCartProduct.textContent = data.title;
        this.indexCartProduct.textContent = index;
        this.priceCartProduct.textContent = String(data.price);
    }

    setDeleteHandler(handleDeleteProduct: Function): void {
        this.handleDeleteProduct = handleDeleteProduct;
        this.buttonDeleteCartProduct.addEventListener('click', () => {
            this.handleDeleteProduct(this)
        })
    }

    render(): HTMLLIElement {
        return this.cartProductElement
    }
}

export interface ICart {
    cartListContent: HTMLLIElement[]
    setPlaceOrderHandler(handlePlaceOrder: Function): void;
    render(): HTMLDivElement;
}

export interface ICartConstructor {
    new (cartTemplate: HTMLTemplateElement): ICart;
}

export class Cart implements ICart {
    protected cartElement: HTMLDivElement;
    protected listCart: HTMLUListElement;
    protected placeOrderButton: HTMLButtonElement;
    protected handlePlaceOrder: Function;

    constructor(cartTemplate: HTMLTemplateElement) {
        this.cartElement = cartTemplate.content.querySelector('.basket').cloneNode(true) as HTMLDivElement;
        this.listCart = this.cartElement.querySelector('.basket__list');
        this.placeOrderButton = this.cartElement.querySelector('.button');
    }

    setPlaceOrderHandler(handlePlaceOrder: Function): void {
        this.handlePlaceOrder = handlePlaceOrder
        this.placeOrderButton.addEventListener('click', () => {
            this.handlePlaceOrder(this)
        })
    }

    set cartListContent(content: HTMLLIElement[]) {
        this.listCart.replaceChildren(...content)
    }

    render(): HTMLDivElement {
        return this.cartElement
    }
}