import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.scss']
})
export class CartStatusComponent implements OnInit {

  totalPriceNumber: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.updateCartStatus();
  }

  private updateCartStatus() {
    this.cartService.totalPrice.subscribe(
      data => this.totalPriceNumber = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

      // this.cartService.computeCartTotals();
  }
}
