# Веб-Ларёк
Онлайн магазинчик товаров с возможностью добавление товаров в корзину

## Реализация
- Используемый стек: TypeScript, HTML, SCSS
- Проект на основе MVC архитектуры
- Для сборки используется Webpack
- Подключены ESlint и Prettier
## Установка
После клонирования проекта установить зависимости:
```
npm install
```
Для запуска проекта в режиме разработки выполнить команду:
```
npm run start
```
и открыть в браузере страницу по адресу http://localhost:8080/

Для сборки проекта в продакшен выполнить команду:
```
npm run build
```

## Презентер проекта
### Класс **`Presenter`**
Связывает классы представления и бизнес-логику пректа.

#### Функциональность
- Управления отображением различных форм и шаблонов на странице
- Связывания пользовательского интерфейса с данными, получаемыми через API
- Обработки событий, связанных с пользовательским вводом, и обновления состояния приложения
- Взаимодействия с модальными окнами и другими компонентами интерфейса

#### Свойства класса
Класс содержит следующие защищенные свойства, которые инициализируются в конструкторе:
- **`orderFormTemplate`**: Шаблон для формы заказа
- **`contactsFormTemplate`**: Шаблон для формы контактов
- **`succesTemplate`**: Шаблон для сообщения успешного заказа
- **`productCatalogTemplate`**: Шаблон для продукта на главной странице
- **`productPreviewTemplate`**: Шаблон для предварительного просмотра продукта
- **`productCartTemplate`**: Шаблон для продукта в корзине
- **`cartTemplate`**: Шаблон для отображения корзины

#### Конструктор
Конструктор принимает несколько параметров, каждый из которых представляет собой интерфейс, связанный с различными компонентами приложения:
- **`api`**: Объект, реализующий интерфейс `ILarekApi`
- **`model`**: Объект, представляющий состояние приложения (`AppState`)
- **`pageView`**: Интерфейс для управления представлением страницы (`IPage`)
- **`modal`**: Интерфейс для работы с модальными окнами (`IModal`)
- **`formOrderConstructor`**: Конструктор для создания формы заказа (`IFormOrderConstructor`)
- **`formContactsConstructor`**: Конструктор для создания формы контактов (`IFormContactsConstructor`)
- **`productCatalogConstructor`**: Конструктор для отображения каталога продуктов (`IProductCatalogViewConstructor`)
- **`productCartConstructor`**: Конструктор для отображения корзины продуктов (`ICartProductConstructor`)
- **`succesViewConstructor`**: Конструктор для отображения успешного сообщения (`ISuccesViewConstructor`)
- **`cartViewConstructor`**: Конструктор для отображения корзины (`ICartConstructor`).
- **`productPreView`**: Конструктор для предварительного просмотра продуктов (`IProductPreViewConstructor`)

## Бизнес-логика проекта
### Класс **`AppStateModel`**
Класс для работы с данными. Хранит в себе два объекта Map со списком карточек на главной странице и в корзине.

Реализует удаление и добавление элементов в эти объекты.

Конструктор принимает в виде аргумента __Api__ модель в которой реализована работа с сервером

Класс имеет такие методы: 
- **`loadProducts, loadProduct, orderProducts`** - работают с api моделью для загрузки карточек с сервера и отправки списка из корзины на сервер
- **`addProduct, removeProduct, fillContacts, fillOrderInfo, isValidContacts, isValidOrderInfo, validateContactsHandler, validateOrderHandler, setMessage`** - добавляет продукт в корзину, убирает из нее, заполняет формы ранее заполненными пользователем данными, проверяет поля ввода на валидность, устанавливает сообщение ошибки валидации
- **`getProduct, getCartProduct, getProducts, setMessage`** - возвращают данные продукта/продуктов

## Компоненты отображение

### 1. Класс **`Page`**
Выводит список карточек в галлерею товаров

### 2. Класс **`Modal`**
Управляет содержимым модального окна и также его отображением

### 3. Класс **`Form`**
Абстрактный класс формы для управление ее содержимым.
- **`FormOrder`** - класс для отображения формы заказа
- **`FormContacts`** - класс для отображения формы контактных данных

### 4. Классы **`ProductCatalogView`** и **`ProductPreView`**
Отвечает за карточку на главной странице
Содержимое модального окна с подробной информацией о товаре
Для визуального отображения категорий используется:
```
enum ProductCategory {
    soft = "card__category_soft",
    other = "card__category_other",
    additional = "card__category_additional",
    button = "card__category_button",
    hard = "card__category_hard"
}

interface ProductCategorySettings {
    soft: string,
    other: string,
    additional: string,
    button: string,
    hard: string
}
```

### 5. Класс **`Cart`**
Содержимое модального окна корзины

### 6. Класс **`CartProduct`**
Элемент товара, находящийся в списке корзины

### 7. Класс **`SuccesView`**
Содержимое модального окна успешной покупки
