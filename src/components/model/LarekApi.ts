import { ILarekApi, Order, OrderResult } from "../../types";
import { Api } from "../base/api";
import { Product, ProductList} from "../../types";

export class LarekApi extends Api implements ILarekApi{
    readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	};

    async getProduct(id: string): Promise<Product> {
        const data: Product = await this.get<Product>("/product/" + id);
        return data
    };

    async makeOrder(order: Order): Promise<OrderResult> {
        const data: OrderResult = await this.post("/order", order);
        return data
    }

    async getProducts(): Promise<Product[]> {
        const data: ProductList = await this.get<ProductList>("/product");
        return data.items.map(item => ({
            ...item,
            image: this.cdn + item.image
        }))
    }
}


