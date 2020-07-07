import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CartService} from "../../services/cart.service";



@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

    checkoutFormGroup: FormGroup;
    totalQuantity: number = 0;
    totalPrice: number = 0;

    constructor(private formBuilder: FormBuilder, private cartService: CartService) {
    }


    ngOnInit() {
        this.updateCartStatus();
        this.createForm();
    }

    private updateCartStatus() {
        this.cartService.totalPrice.subscribe((data) => {
            this.totalPrice = data;
        });

        this.cartService.totalQuantity.subscribe((data) => {
            this.totalQuantity = data;
        })

        this.cartService.computeCartTotals();
    }

    createForm() {
        this.checkoutFormGroup = this.formBuilder.group({
            customer: this.formBuilder.group({
                firstName: [''],
                lastName: [''],
                email: [''],
            }),
            shippingAddress: this.formBuilder.group({
                street: [''],
                city: [''],
                state: [''],
                country: [''],
                zipCode: [''],
            }),
            billingAddress: this.formBuilder.group({
                street: [''],
                city: [''],
                state: [''],
                country: [''],
                zipCode: [''],
            }),
            creditCard: this.formBuilder.group({
                cardType: [''],
                nameOnCard: [''],
                cardNumber: [''],
                securityCode: [''],
                expirationMonth: [''],
                expirationYear: [''],
            }),
        })
    }

    onSubmit() {
        console.log(this.checkoutFormGroup.get('customer').value)
    }

    copyShippingAddressToBillingAddress(event) {
        if (event.target.checked) {
            this.checkoutFormGroup.controls.billingAddress.setValue(
                this.checkoutFormGroup.controls.shippingAddress.value
            );
        } else {
            this.checkoutFormGroup.controls.billingAddress.reset();
        }
    }
}
