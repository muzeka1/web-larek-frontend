export interface IForm {
    buttonText: string;
    render(formElement: HTMLFormElement): HTMLFormElement;
    setValue(inputElement: HTMLInputElement, data: string): void;
    getValue(inputElement: HTMLInputElement): string;
    setHandler(handlerFormSubmit: Function): void;
    validateMessage(data: string): HTMLSpanElement;
    setValidateHandler(handleValidate: Function): void;
    clearValue(): void;
}

export abstract class Form implements IForm {
    formElement: HTMLFormElement;
    submitButton: HTMLButtonElement;
    handleFormSubmit: Function;
    handleValidate: Function;
    validationTextElement: HTMLSpanElement;

    constructor(formTemplate: HTMLTemplateElement) {
        this.formElement = formTemplate.content.querySelector('.form').cloneNode(true) as HTMLFormElement;
        this.submitButton = this.formElement.querySelector('button[type="submit"]');
        this.validationTextElement = this.formElement.querySelector('.form__errors');
    }

    set buttonText(data: string) {
        this.submitButton.textContent = data;
    }

    render(formElement: HTMLFormElement): HTMLFormElement {
        return formElement
    }

    setValue(inputElement: HTMLInputElement, data: string): HTMLInputElement {
        inputElement.value = data;
        return inputElement
    }

    getValue(inputElement: HTMLInputElement): string {
        return inputElement.value
    }

    setHandler(handlerFormSubmit: Function): void {
        this.handleFormSubmit = handlerFormSubmit
    }

    setValidateHandler(handleValidate: Function): void {
        this.handleValidate = handleValidate;
    }

    validateMessage(data: string): HTMLSpanElement {
        this.validationTextElement.textContent = data;
        return this.validationTextElement
    } 

    clearValue(): void {
        this.formElement.reset()
    }
}

export interface IFormOrderConstructor {
    new (formTemplate: HTMLTemplateElement): IForm;
}

export class FormOrder extends Form implements IForm{
    inputAddressField: HTMLInputElement;
    cashPaymentButton: HTMLButtonElement;
    cardPaymentButton: HTMLButtonElement;
    handleCashButton: Function;
    handleCardButton: Function;

    constructor(formTemplate: HTMLTemplateElement) {
        super(formTemplate)
        this.inputAddressField = this.formElement.querySelector('input[name="address"]');
        this.cashPaymentButton = this.formElement.querySelector('button[name="cash"]');
        this.cardPaymentButton = this.formElement.querySelector('button[name="card"]');

        this.cardPaymentButton.addEventListener('click', () => {
            this.handleCardButton()
        })

        this.cashPaymentButton.addEventListener('click', () => {
            this.handleCashButton()
        })

        this.inputAddressField.addEventListener('input', () => {
            this.handleValidate()
        })

        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault
            this.handleFormSubmit(this.inputAddressField)
        })
    }

    setCashHandler(handleCashButton: Function): void {
        this.handleCashButton = handleCashButton;
    }

    setCardHandler(handleCardButton: Function): void {
        this.handleCardButton = handleCardButton;
    }
}

export interface IFormContactsConstructor {
    new (formTemplate: HTMLTemplateElement): IForm;
}

export class FormContacts extends Form {
    inputEmailField: HTMLInputElement;
    inputPhoneNumberField: HTMLInputElement;

    constructor(formTemplate: HTMLTemplateElement) {
        super(formTemplate)
        this.inputEmailField = this.formElement.querySelector('input[name="email"]');
        this.inputPhoneNumberField = this.formElement.querySelector('input[name="phone"]');

        this.inputEmailField.addEventListener('input', () => {
            this.handleValidate()
        })
        this.inputPhoneNumberField.addEventListener('input', () => {
            this.handleValidate()
        })
        
        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this.handleFormSubmit(this.inputEmailField, this.inputPhoneNumberField)
        })
    }
}