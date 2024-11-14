import './scss/styles.scss';

import { CDN_URL, API_URL } from './utils/constants';
import { LarekApi } from './components/model/LarekApi';
import { AppStateModel } from './components/model/AppState';
import { FormOrder, FormContacts, IForm } from './components/view/Forms';
import { Modal } from './components/view/Modal';
import { Page } from './components/view/Page';
import { ProductCatalogView } from './components/view/Product';
import { Cart, CartProduct, ICart } from './components/view/Cart';
import { SuccesView } from './components/view/Succes';
import { ProductPreView } from './components/view/ProductPreview';
import { AppState, Contacts, ILarekApi, OrderInfo } from "./types";
import { ICartProductConstructor } from './components/view/Cart';
import { IFormContactsConstructor, IFormOrderConstructor } from './components/view/Forms';
import { IModal } from "./components/view/Modal";
import { IPage } from "./components/view/Page";
import { IProductCatalogViewConstructor } from "./components/view/Product";
import { IProductPreViewConstructor } from "./components/view/ProductPreview";
import { ISuccesViewConstructor } from "./components/view/Succes";
import { AppStateChanges } from './types';

const modalElement = document.querySelector('.modal') as HTMLDivElement;
const page = document.querySelector('.page') as HTMLElement;

const productCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const orderFormTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsFormTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
const productCartTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const cartTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const succesTemplate = document.querySelector('#success') as HTMLTemplateElement;
const productPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;

const api = new LarekApi(CDN_URL, API_URL);
const app = new AppStateModel();
const modal = new Modal(modalElement);
const pageView = new Page(page);
const cart = new Cart(cartTemplate);

export class Presenter {
    protected form: IForm;
    protected addToCartCurrentButtno: HTMLButtonElement;

    constructor(
        protected api: ILarekApi,
        protected model: AppState,
        protected pageView: IPage,
        protected modal: IModal,
        protected formOrderConstructor: IFormOrderConstructor,
        protected formContactsConstructor: IFormContactsConstructor,
        protected productCatalogConstructor: IProductCatalogViewConstructor,
        protected productCartConstructor: ICartProductConstructor,
        protected succesViewConstructor: ISuccesViewConstructor,
        protected cart: ICart,
        protected productPreview: IProductPreViewConstructor,
    ) {
    }

    init() {
        this.api.getProducts()
            .then(data => {
                this.model.setProducts(data)
                const productsList: HTMLElement[] = [];
                data.forEach(itemData => {
                    const product = new this.productCatalogConstructor(productCatalogTemplate)
                    product.id = itemData.id;
                    product.setContent(itemData)
                    product.on(AppStateChanges.modal, this.onOpenPreview.bind(this))
                    productsList.push(product.render())
                })
                this.pageView.galleryContent(productsList);
                this.pageView.setCartCount(this.model.cart.size);
                this.pageView.on(AppStateChanges.modal, this.onOpenCart.bind(this));
            })
            .catch(err => {
                console.log(err)
            })

        

    }

    createCart(): HTMLElement {
        const cartList: HTMLLIElement[] = [];
        this.model.getCartProducts().forEach((item, index) => {
            const cartProductElement = new this.productCartConstructor(productCartTemplate);
            cartProductElement.setContent(item, String(index+1));
            cartProductElement.id = item.id;
            cartProductElement.on(AppStateChanges.product, this.onDeleteProduct.bind(this))
            cartList.push(cartProductElement.render())
        })

        this.cart.setTotalPrice(this.model.cartTotal);
        this.cart.cartListContent = cartList;
        this.cart.on(AppStateChanges.modal, this.onPlaceOrder.bind(this))
        this.cart.toggleButtonState(this.model.cartList.length != 0)

        return this.cart.render()
    }

    onOpenPreview(data: {id: string}):void {
        const productPreview = new this.productPreview(productPreviewTemplate);
        productPreview.id = data.id;
        productPreview.setContent(this.model.getProduct(data.id))
        productPreview.on(AppStateChanges.product, this.onAddToCart.bind(this));
        productPreview.inCartState = this.model.cart.has(data.id)
        productPreview.changeButtonState()
        this.modal.modalContent = productPreview.render()
        this.modal.open();
    }

    onAddToCart(data: {id: string}) {
        if (!this.model.cart.has(data.id)) {
            this.model.addProduct(data.id)
        } else {
            this.model.removeProduct(data.id) 
        }
        this.pageView.setCartCount(this.model.cart.size)
    }

    onOpenCart(): void {
        this.modal.modalContent = this.createCart();
        this.modal.open()
    }

    onDeleteProduct(data: {id: string}): void {
        this.model.removeProduct(data.id);
        this.modal.modalContent = this.createCart();
        this.pageView.setCartCount(this.model.cart.size)
    }

    onPlaceOrder() {
        this.modal.close();
        const orderInfoData = JSON.parse(localStorage.getItem("formOrderValues")) as OrderInfo;
        const formOrder = new this.formOrderConstructor(orderFormTemplate);
        if (orderInfoData) {
            this.model.orderInfo = orderInfoData;
            formOrder.setValues(this.model.orderInfo)
            formOrder.togglePaymentButtonsState()
        }
        this.form = formOrder;
        this.model.isValidOrder();
        formOrder.toggleButtonState(this.model.isValid)
        formOrder.on(AppStateChanges.input, this.onOrderInput.bind(this));
        formOrder.on(AppStateChanges.submit, this.onOrderSubmit.bind(this));
        this.modal.modalContent = formOrder.render()
        this.modal.open()
    }

    onOrderInput(data: OrderInfo) {
        this.model.orderInfo = data;
        this.model.isValidOrder();
        this.form.validateMessage(this.model.errorMessage)
        this.form.toggleButtonState(this.model.isValid)
    }

    onOrderSubmit() {
        this.modal.close();
        localStorage.setItem("formOrderValues", JSON.stringify(this.model.orderInfo));
        const contactsInfoData = JSON.parse(localStorage.getItem("formContactsValues")) as Contacts;
        const formContacts = new this.formContactsConstructor(contactsFormTemplate);
        if (contactsInfoData) {
            this.model.contacts = contactsInfoData;
            formContacts.setValues(this.model.contacts)
        }
        this.form = formContacts;
        this.model.isValidContacts();
        formContacts.toggleButtonState(this.model.isValid);
        formContacts.on(AppStateChanges.input, this.onContactsInput.bind(this));
        formContacts.on(AppStateChanges.submit, this.onContactsSubmit.bind(this));
        this.modal.modalContent = formContacts.render();
        this.modal.open();
    }

    onContactsInput(data: Contacts) {
        this.model.contacts = data;
        this.model.isValidContacts();
        this.form.validateMessage(this.model.errorMessage)
        this.form.toggleButtonState(this.model.isValid)
    }

    onContactsSubmit() {
        this.modal.close()
        localStorage.setItem("formContactsValues", JSON.stringify(this.model.contacts));
        this.api.makeOrder(this.model.order)
        .then((data) => {
            const succesWindow = new this.succesViewConstructor(succesTemplate);
            succesWindow.setTotal(data.total);
            succesWindow.on(AppStateChanges.modal, () => {
                this.modal.close()
            })
            console.log(`ID заказа: ${data.id}`)
            this.modal.modalContent = succesWindow.render();
            this.modal.open();
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

const LarekPresenter = new Presenter(api, app, pageView, modal, FormOrder, FormContacts, ProductCatalogView, CartProduct, SuccesView, cart, ProductPreView)
LarekPresenter.init()
