import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../common/cart-item";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.listCartDetails();
  }

  private listCartDetails() {

    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe((data) => {
      this.totalPrice = data;
    });

    this.cartService.totalQuantity.subscribe((data) => {
      this.totalQuantity = data;
    })

    this.cartService.computeCartTotals();

  }

  decrementQuantity(tempCartItem: CartItem) {
    this.cartService.decrementQuantity(tempCartItem);
  }

  incrementQuantity(tempCartItem: CartItem) {
    this.cartService.addToCart(tempCartItem);
  }

  remove(tempCartItem: CartItem) {
    this.cartService.removeCartItem(tempCartItem);
  }
}
