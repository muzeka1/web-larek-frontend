import { AppState, ILarekApi } from "../../types";
import { ICartConstructor, ICartProductConstructor } from "../view/Cart";
import { IFormContactsConstructor, IFormOrderConstructor } from "../view/Forms";
import { IModal } from "../view/Modal";
import { IPage } from "../view/Page";
import { IProductCatalogViewConstructor } from "../view/Product";
import { IProductPreViewConstructor } from "../view/ProductPreview";
import { ISuccesViewConstructor } from "../view/Succes";

export class Presenter {
    protected orderFormTemplate: HTMLTemplateElement;
    protected contactsFormTemplate: HTMLTemplateElement;
    protected succesTemplate: HTMLTemplateElement;
    protected productCatalogTemplate: HTMLTemplateElement;
    protected productPreviewTemplate: HTMLTemplateElement;
    protected productCartTemplate: HTMLTemplateElement;
    protected cartTemplate: HTMLTemplateElement;

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
        protected cartViewConstructor: ICartConstructor,
        protected productPreView: IProductPreViewConstructor,
    ) {
        this.productCatalogTemplate = document.querySelector('#card-catalog');
        this.orderFormTemplate = document.querySelector('#order');
        this.contactsFormTemplate = document.querySelector('#contacts')
        this.productCartTemplate = document.querySelector('#card-basket')
        this.cartTemplate = document.querySelector('#basket')
        this.succesTemplate = document.querySelector('#success')
        this.productPreviewTemplate = document.querySelector('#card-preview')
    }

    init() {
        this.model.loadProducts()
            .then(() => {
                const productsList: HTMLElement[] = []
                Array.from(this.model.getProducts().values()).forEach(productData => {
                    const productCatalog = new this.productCatalogConstructor(this.productCatalogTemplate);
                    productCatalog.setContent(productData);
                    productsList.push(productCatalog.render())
                })

                this.pageView.galleryContent(productsList)
            })
    }
}