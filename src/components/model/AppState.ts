import { AppState, Contacts, ILarekApi, OrderResult, Product } from "../../types";
import { Order, AppStateModals, OrderInfo} from "../../types";

export class AppStateModel implements AppState {
    products: Map<string, Product> = new Map<string, Product>();
    cart: Map<string, Product> = new Map<string, Product>();
    contacts: Contacts = {
        email: "",
        phoneNumber: "",
    };
    
    orderInfo: OrderInfo = {
        address: "",
        paymentMethod: null
    };

    openedModal: AppStateModals = AppStateModals.none;
    errorMessage: string | null = null;
    isValid = false;
    
    constructor(protected api: ILarekApi) {}
    
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

    // Добавить методы для добавление элементов в объекты корзины и списка товаров

    getProduct(id: string): Product {
        return this.products.get(id)
    }

    getProducts(): Map<string, Product> {
        return this.products
    }

    getCartProduct(id: string): Product {
        return this.cart.get(id)
    }

    addProduct(id: string): void {
        this.cart.set(id, this.getProduct(id))
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
		if (!contacts.email || !contacts.phoneNumber) {
			errors.push('Email и телефон обязательные поля');
		}
		if (
			contacts.email &&
			!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(contacts.email)
		) {
			errors.push('Некорректный email');
		}
		if (contacts.phoneNumber && !/^\+?[0-9]{10,14}$/.test(contacts.phoneNumber)) {
			errors.push('Некорректный телефон');
		}
		if (errors.length) {
			return errors.join('. ') + '.';
		}
		return null;
    }

    validateOrderHandler(orderInfo: OrderInfo): string | null {
        const errors: string[] = [];
        if (!orderInfo.address || !orderInfo.paymentMethod) {
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