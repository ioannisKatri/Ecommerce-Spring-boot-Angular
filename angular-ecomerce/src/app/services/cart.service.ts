import {Injectable} from '@angular/core';
import {CartItem} from "../common/cart-item";
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CartService {

    cartItems: CartItem[];

    totalPrice: Subject<number> = new Subject<number>();
    totalQuantity: Subject<number> = new Subject<number>();

    constructor() {
        this.loadSessionCartItems();
    }

    loadSessionCartItems() {
        this.cartItems = JSON.parse(sessionStorage.getItem('cartItems')) ? JSON.parse(sessionStorage.getItem('cartItems')) : [];
        this.computeCartTotals();
    }

    addToCart(theCartItem: CartItem) {
        let existingCartItem: CartItem = undefined;

        existingCartItem = this.cartItems.find((item) => item.id === theCartItem.id);

        if (existingCartItem !== undefined) {
            existingCartItem.quantity++;
        } else {
            this.cartItems.push(theCartItem)
        }
        this.computeCartTotals();
        this.persistCartItems();
    };

    computeCartTotals() {
        let totalPriceValue: number = 0;
        let totalQuantityValue: number = 0;

        for (let currentCartItem of this.cartItems) {
            totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
            totalQuantityValue += currentCartItem.quantity;
        }

        this.totalPrice.next(totalPriceValue);
        this.totalQuantity.next(totalQuantityValue)

        this.logCartData(totalPriceValue, totalQuantityValue);
        this.persistCartItems();
    }

    private logCartData(totalPriceValue: number, totalQuantityValue: number) {

        console.log('Contents of the cart ')
        console.log(totalQuantityValue + "   " + totalPriceValue)
    }

    decrementQuantity(tempCartItem: CartItem) {
        tempCartItem.quantity--;

        if (tempCartItem.quantity == 0) {
            this.removeCartItemFromArray(tempCartItem);
        }
        this.persistCartItems();
        this.computeCartTotals();
    }

    removeCartItem(tempCartItem: CartItem) {
        if (this.removeCartItemFromArray(tempCartItem)) {
            this.persistCartItems();
            this.computeCartTotals();
        }
    }

    private removeCartItemFromArray(tempCartItem: CartItem) {
        const index = this.cartItems.findIndex(item => item.id === tempCartItem.id);

        if (index >= -1) {
            this.cartItems.splice(index, 1);
            return true;
        }
        return false;
    }

    persistCartItems() {
        sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
}
