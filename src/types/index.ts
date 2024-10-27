export interface Product {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export enum ProductCategory {
    soft = "card__category_soft",
    other = "card__category_other",
    additional = "card__category_additional",
    button = "card__category_button",
    hard = "card__category_hard"
}

export interface ProductCategorySettings {
    soft: string,
    other: string,
    additional: string,
    button: string,
    hard: string
}

export interface ProductList {
    total: number;
    items: Product[]
}

export interface OrderInfo {
    paymentMethod?: "online" | "uponReceipt" | null;
    address: string;
}

export interface Contacts {
    email: string;
    phoneNumber: string;
}

export interface Order extends Contacts, OrderInfo {
    total: number;
    items: string[];
}

export interface OrderResult {
    id: string;
    total: number;
}

export enum AppStateModals {
    product = "modal:product",
    cart = "modal:cart",
    contacts = "modal:contacts",
    succes = "succes",
    none = "none"
}

export interface AppState {
    products: Map<string, Product>;
    cart: Map<string, Product>;
    cartTotal: number;
    contacts: Contacts;
    orderInfo: OrderInfo;
    order: Order;
    cartList: string[]

    openedModal: AppStateModals;
    errorMessage: string | null;
    isValid: boolean;

    addProduct(id: string): void;
    removeProduct(id: string): void;
    fillContacts(contacts: Contacts): void;
    fillOrder(orderInfo: OrderInfo): void;
    isValidContacts(): boolean;
    isValidOrder(): boolean;
    validateContactsHandler(contacts: Contacts): string | null;
    validateOrderHandler(orderInfo: OrderInfo): string | null;
    setMessage(message: string | null, isValid: boolean): void;

    getProduct(id: string): Product;
    getCartProduct(id: string): Product;
    getProducts(): Map<string, Product>;

}

export interface AppStateConstructor {
    new(api: ILarekApi): AppState;
}

export interface ILarekApi {
    getProducts(): Promise<Product[]>;
    getProduct(id: string): Promise<Product>;
    makeOrder(order: Order): Promise<OrderResult>
}