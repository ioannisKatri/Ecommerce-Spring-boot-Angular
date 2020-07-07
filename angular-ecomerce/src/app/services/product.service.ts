import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../common/product";
import {map} from "rxjs/operators";
import {ProductCategory} from "../common/product-category";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private baseUrl = "http://dev.security.com/api/products";
    private categoryUrl = "http://dev.security.com/api/product-category"

    constructor(private httpClient: HttpClient) {
    }

    getProductListPaginate(page: number, pageSize: number, categoryId: number): Observable<GetResponseProducts> {
        const searchUrl: string = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}` +
            `&page=${page}` + `&size=${pageSize}`;
        return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
            map((response) => {
                return response;
            })
        );
    }

    getProductList(theCategoryId: number): Observable<Product[]> {
        const searchUrl: string = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
        return this.getProducts(searchUrl);
    }


    getProductCategories(): Observable<ProductCategory[]> {
        return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
            map(response => {
                return response._embedded.productCategory;
            })
        )
    }

    searchProducts(keyword: string): Observable<Product[]> {
        const searchUrl: string = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
        return this.getProducts(searchUrl);
    }

    searchProductsPaginate(page: number,
                           pageSize: number,
                           categoryId: number,
                           keyword: string): Observable<GetResponseProducts> {
        const searchUrl: string = `${this.baseUrl}/search/findByNameContaining?name=${keyword}` +
            `&page=${page}` + `&size=${pageSize}`;
        return this.httpClient.get<GetResponseProducts>(searchUrl);
    }

    private getProducts(search: string): Observable<Product[]> {
        return this.httpClient.get<GetResponseProducts>(search).pipe(
            map(response => {
                return response._embedded.products
            })
        )
    };


    getProduct(productId: number): Observable<Product> {
        const searchUrl = `${this.baseUrl}/${productId}`
        return this.httpClient.get<Product>(searchUrl);
    }
}

// help us to unwrap json from the Spring Rest API, and make use of _embedded entry that
// comes back from the spring data REST API, and access teh array of products
interface GetResponseProducts {
    _embedded: {
        products: Product[];
    },
    page: {
        size: number,
        totalElements: number,
        totalPages: number,
        number: number
    }
}

interface GetResponseProductCategory {
    _embedded: {
        products: Product[];
        productCategory: ProductCategory[];
    }

}
