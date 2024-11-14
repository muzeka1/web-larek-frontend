import { AppStateChanges, Product } from "../../types";
import { EventEmitter, IEvents } from "../base/events";

export interface ICartProduct extends IEvents {
    id: string;
    setContent(data: Product, index: string): void;
    render(): HTMLLIElement;
}

export interface ICartProductConstructor {
    new (cartProductTemplate: HTMLTemplateElement): ICartProduct
}

export class CartProduct extends EventEmitter implements ICartProduct{
    protected cartProductElement: HTMLLIElement;
    protected titleCartProduct: HTMLSpanElement;
    protected indexCartProduct: HTMLSpanElement;
    protected priceCartProduct: HTMLSpanElement;
    protected buttonDeleteCartProduct: HTMLButtonElement;
    protected _id: string;

    constructor(cartProductTemplate: HTMLTemplateElement) {
        super();
        this.cartProductElement = cartProductTemplate.content.querySelector('.basket__item').cloneNode(true) as HTMLLIElement;
        this.titleCartProduct = this.cartProductElement.querySelector('.card__title');
        this.indexCartProduct = this.cartProductElement.querySelector('.basket__item-index');
        this.priceCartProduct = this.cartProductElement.querySelector('.card__price');
        this.buttonDeleteCartProduct = this.cartProductElement.querySelector('.basket__item-delete');

        this.buttonDeleteCartProduct.addEventListener('click', () => {
            this.emit(AppStateChanges.product, {id: this._id})
        })
    }

    set id(id: string) {
        this._id = id
    }

    setContent(data: Product, index: string): void {
        this.titleCartProduct.textContent = data.title;
        this.indexCartProduct.textContent = index;
        this.priceCartProduct.textContent = data.price != null? `${String(data.price)} синапсов` : "Бесценно";
    }

    render(): HTMLLIElement {
        return this.cartProductElement
    }
}

export interface ICart extends IEvents{
    cartListContent: HTMLLIElement[]
    setTotalPrice(total: number): void;
    toggleButtonState(isValid: boolean): void;
    render(): HTMLDivElement;
}

export interface ICartConstructor {
    new (cartTemplate: HTMLTemplateElement): ICart;
}

export class Cart extends EventEmitter implements ICart {
    protected cartElement: HTMLDivElement;
    protected listCart: HTMLUListElement;
    protected placeOrderButton: HTMLButtonElement;
    protected cartTotalPrice: HTMLSpanElement;

    constructor(cartTemplate: HTMLTemplateElement) {
        super();
        this.cartElement = cartTemplate.content.querySelector('.basket').cloneNode(true) as HTMLDivElement;
        this.listCart = this.cartElement.querySelector('.basket__list');
        this.placeOrderButton = this.cartElement.querySelector('.button');
        this.cartTotalPrice = this.cartElement.querySelector('.basket__price')
    }

    set cartListContent(content: HTMLLIElement[]) {
        this.listCart.replaceChildren(...content)
    }

    setTotalPrice(total: number): void {
        this.cartTotalPrice.textContent = String(total) + " синапсов";
    }

    toggleButtonState(isValid: boolean): void {
        isValid ? this.placeOrderButton.disabled = false : this.placeOrderButton.disabled = true;
    }

    render(): HTMLDivElement {
        if (this.cartTotalPrice.textContent != '0 синапсов') {
            this.placeOrderButton.addEventListener('click', () => {
                this.emit(AppStateChanges.modal)
            })
        }
        return this.cartElement
    }
}