import './scss/styles.scss';

import { CDN_URL, API_URL } from './utils/constants';
import { LarekApi } from './components/model/LarekApi';
import { AppStateModel } from './components/model/AppState';
import { FormOrder, FormContacts, Form } from './components/view/Forms';
import { Presenter } from './components/model/LarekPresenter';
import { Modal } from './components/view/Modal';
import { Page } from './components/view/Page';
import { ProductCatalogView } from './components/view/Product';
import { Cart, CartProduct } from './components/view/Cart';
import { SuccesView } from './components/view/Succes';
import { ProductPreView } from './components/view/ProductPreview';

const modalElement = document.querySelector('.modal') as HTMLDivElement;
const gallery = document.querySelector('.gallery') as HTMLElement;

const api = new LarekApi(CDN_URL, API_URL);
const app = new AppStateModel(api);
const modal = new Modal(modalElement);
const pageView = new Page(gallery);

const LarekPresenter = new Presenter(api, app, pageView, modal, FormOrder, FormContacts, ProductCatalogView, CartProduct, SuccesView, Cart, ProductPreView)

LarekPresenter.init()
