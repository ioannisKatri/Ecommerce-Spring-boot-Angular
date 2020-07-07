import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";
import has = Reflect.has;
import {Observable, of} from "rxjs";
import {CartItem} from "../../common/cart-item";
import {CartService} from "../../services/cart.service";

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list-grid.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

    products: Product[] = [];
    currentCategoryId: number
    previousCategoryId: number = 1;
    currentCategoryName: string;
    searchMode: boolean;

    pageNumber: number = 1;
    pageSize: number = 10;
    theTotalElements: number = 0;

    previousKeyword: string = null;


    constructor(private productService: ProductService,
                private cartService: CartService,
                private route: ActivatedRoute) {
        this.cartService.loadSessionCartItems();
    }

    ngOnInit() {
        this.route.paramMap.subscribe(() => {
            this.listProducts();
        });
    };

    private listProducts() {
        this.searchMode = this.route.snapshot.paramMap.has('keyword');

        if (this.searchMode) {
            this.handleSearchProducts();
        } else {
            this.handleListProducts();
        }
    }

    private handleListProducts() {
        const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

        if (hasCategoryId) {
            this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
            this.currentCategoryName = this.route.snapshot.paramMap.get('name');
        } else {
            this.currentCategoryId = 1;
            this.currentCategoryName = 'Books';
        }

        if (this.previousCategoryId != this.currentCategoryId) {
            this.pageNumber = 1;
        }

        this.previousCategoryId = this.currentCategoryId;

        this.productService.getProductListPaginate(
            this.pageNumber - 1,
            this.pageSize,
            this.currentCategoryId)
            .subscribe(this.processResult());
    }

    private handleSearchProducts() {
        const keyword: string = this.route.snapshot.paramMap.get('keyword');

        if (this.previousKeyword != keyword) {
            this.pageNumber = 1;
        }

        this.previousKeyword = keyword;

        console.log(keyword);
        this.productService.searchProductsPaginate(this.pageNumber - 1,
            this.pageSize,
            this.currentCategoryId,
            keyword).subscribe(this.processResult())
    }

    private processResult() {
        return data => {
            this.products = data._embedded.products;
            this.pageNumber = data.page.number + 1;
            this.pageSize = data.page.size;
            this.theTotalElements = data.page.totalElements;
        }
    }

    updatePageSize(pageSize: number) {
        this.pageSize = pageSize;
        this.pageNumber = 1;
        this.listProducts();
    }

    addToCart(product: Product) {
        const cartItem = new CartItem(product);
        this.cartService.addToCart(cartItem);
    }
}
