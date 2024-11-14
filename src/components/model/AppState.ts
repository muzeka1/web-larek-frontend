import { AppState, Contacts, OrderResult, Product } from "../../types";
import { Order, AppStateModals, OrderInfo} from "../../types";

export class AppStateModel implements AppState {
    products: Map<string, Product>;
    cart: Map<string, Product>;
    contacts: Contacts = {
        email: "",
        phone: "",
    };
    
    orderInfo: OrderInfo = {
        address: "",
        payment: null
    };

    openedModal: AppStateModals = AppStateModals.none;
    errorMessage: string | null = null;
    isValid = false;
    
    constructor() {
        this.products = new Map<string, Product>();
        this.cart = new Map<string, Product>();
    }
    
    get cartTotal(): number {
        let total = 0;
        for (const item of this.cart.values()) {
            total += item.price
        }
        return total
    }

    get cartList() {
        const cartList = []
        for (const item of this.cart.values()) {
            cartList.push(item.id)
        }
        return cartList
    }

    get order(): Order {
        return {
            ...this.orderInfo,
            ...this.contacts,
            total: this.cartTotal,
            items: this.cartList
        }
    }

    get orderResult(): Order {
        return {
            ...this.contacts,
            ...this.orderInfo,
            total: this.cartTotal,
            items: this.getCartProducts().map(item => {
                return item.id
            })
        }
    }

    setProducts(data: Product[]): void {
        data.forEach(item => {
            this.products.set(item.id, item)
        })
    }

    getProduct(id: string): Product {
        return this.products.get(id)
    }

    getProducts(): Map<string, Product> {
        return this.products
    }

    getCartProduct(id: string): Product {
        return this.cart.get(id)
    }

    getCartProducts(): Product[] {
        return [...this.cart.values()]
    }

    addProduct(id: string): void {
        if (!this.cart.get(id)) {
            this.cart.set(id, this.getProduct(id))
        }
    }

    removeProduct(id: string): void {
        this.cart.delete(id)
    }

    setMessage(message: string | null, isValid = true): void {
        this.errorMessage = message;
        this.isValid= isValid;
    }

    fillContacts(contacts: Contacts): void {
        this.contacts = contacts
    };

    fillOrder(orderInfo: OrderInfo): void {
        this.orderInfo = orderInfo
    }

    validateContactsHandler(contacts: Contacts): string | null {
        const errors: string[] = [];
		if (!contacts.email || !contacts.phone) {
			errors.push('Email и телефон обязательные поля');
		}
		if (
			contacts.email &&
			!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(contacts.email)
		) {
			errors.push('Некорректный email');
		}
		if (contacts.phone && !/^\+?[0-9]{10,14}$/.test(contacts.phone)) {
			errors.push('Некорректный телефон');
		}
		if (errors.length) {
			return errors.join('. ') + '.';
		}
		return null;
    }

    validateOrderHandler(orderInfo: OrderInfo): string | null {
        const errors: string[] = [];
        if (!orderInfo.address || !orderInfo.payment) {
            errors.push('Необходимо выбрать способ оплаты и заполнить адрес')
        }
        if (errors.length) {
            return errors.join('. ') + '.';
        }
        return null
    }

    isValidContacts(): boolean {
        const error = this.validateContactsHandler(this.contacts)
        if (error) {
            this.setMessage(error, false);
            return true
        } else {
            this.setMessage(null);
            return false
        }
    }

    isValidOrder(): boolean {
        const error = this.validateOrderHandler(this.orderInfo)
        if (error) {
            this.setMessage(error, false);
            return true
        } else {
            this.setMessage(null);
            return false
        }
    }
}