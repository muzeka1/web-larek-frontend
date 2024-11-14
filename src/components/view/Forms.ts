import { AppStateChanges } from "../../types";
import { EventEmitter, IEvents } from "../base/events";

export interface IForm extends IEvents {
    buttonText: string;
    render(): HTMLFormElement;
    setValue(inputElement: HTMLInputElement, data: string): void;
    getValue(inputElement: HTMLInputElement): string;
    validateMessage(data: string): HTMLSpanElement;
    clearValue(): void;
    toggleButtonState(isValid: boolean): void;
}

export abstract class Form extends EventEmitter implements IForm {
    formElement: HTMLFormElement;
    submitButton: HTMLButtonElement;
    handleFormSubmit: Function;
    handleValidate: Function;
    validationTextElement: HTMLSpanElement;

    constructor(formTemplate: HTMLTemplateElement) {
        super();
        this.formElement = formTemplate.content.querySelector('.form').cloneNode(true) as HTMLFormElement;
        this.submitButton = this.formElement.querySelector('button[type="submit"]');
        this.validationTextElement = this.formElement.querySelector('.form__errors');
    }

    set buttonText(data: string) {
        this.submitButton.textContent = data;
    }

    render(): HTMLFormElement {
        return this.formElement
    }

    setValue(inputElement: HTMLInputElement, data: string): HTMLInputElement {
        inputElement.value = data;
        return inputElement
    }

    getValue(inputElement: HTMLInputElement): string {
        return inputElement.value
    }

    validateMessage(data: string): HTMLSpanElement {
        this.validationTextElement.textContent = data;
        return this.validationTextElement
    }

    clearValue(): void {
        this.formElement.reset()
    }

    toggleButtonState(isValid: boolean): void {
        isValid ? this.submitButton.disabled = false : this.submitButton.disabled = true
    }

}

export interface IFormOrderConstructor {
    new(formTemplate: HTMLTemplateElement): IForm;
}

export class FormOrder extends Form implements IForm {
    inputAddressField: HTMLInputElement;
    cashPaymentButton: HTMLButtonElement;
    cardPaymentButton: HTMLButtonElement;
    protected orderInfo = {
        payment: "",
        address: ""
    }


    constructor(formTemplate: HTMLTemplateElement) {
        super(formTemplate)
        this.inputAddressField = this.formElement.querySelector('input[name="address"]');
        this.cashPaymentButton = this.formElement.querySelector('button[name="cash"]');
        this.cardPaymentButton = this.formElement.querySelector('button[name="card"]');

        this.cardPaymentButton.addEventListener('click', () => {
            if (this.cashPaymentButton.classList.contains('button_alt-active')) {
                this.cashPaymentButton.classList.remove('button_alt-active');
            }
            this.orderInfo.payment = "online";
            this.cardPaymentButton.classList.add('button_alt-active');
            this.emit(AppStateChanges.input, this.orderInfo);
        })

        this.cashPaymentButton.addEventListener('click', () => {
            if (this.cardPaymentButton.classList.contains('button_alt-active')) {
                this.cardPaymentButton.classList.remove('button_alt-active');
            }
            this.orderInfo.payment = "cash"
            this.cashPaymentButton.classList.add('button_alt-active');
            this.emit(AppStateChanges.input, this.orderInfo);
        })

        this.inputAddressField.addEventListener('input', () => {
            this.orderInfo.address = this.inputAddressField.value
            this.emit(AppStateChanges.input, this.orderInfo)
        })

        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.emit(AppStateChanges.submit)
        })
    }
}

export interface IFormContactsConstructor {
    new(formTemplate: HTMLTemplateElement): IForm;
}

export class FormContacts extends Form {
    inputEmailField: HTMLInputElement;
    inputPhoneNumberField: HTMLInputElement;
    protected contacts = {
        email: "",
        phone: ""
    }

    constructor(formTemplate: HTMLTemplateElement) {
        super(formTemplate)
        this.inputEmailField = this.formElement.querySelector('input[name="email"]');
        this.inputPhoneNumberField = this.formElement.querySelector('input[name="phone"]');

        this.inputEmailField.addEventListener('input', () => {
            this.contacts.email = this.inputEmailField.value;
            this.emit(AppStateChanges.input, this.contacts)
        })
        this.inputPhoneNumberField.addEventListener('input', () => {
            this.contacts.phone = this.inputPhoneNumberField.value
            this.emit(AppStateChanges.input, this.contacts)
        })

        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this.emit(AppStateChanges.submit)
        })
    }
}