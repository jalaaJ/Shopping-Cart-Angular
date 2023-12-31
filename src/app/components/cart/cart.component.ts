import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  //here's where i'm gonna store the products that were added to the cart
  public products: any = [];
  public totalCost!: number;
  
  constructor(
    private cartService: CartService, 
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    
      // to get the products that were added, as well as the total cost
      this.cartService.getProducts().subscribe(response => {
              this.products = response;
              this.totalCost = this.cartService.getTotalPrice();
          });
  }

  removeItem(product: any) {
      this.cartService.removeCartItem(product);
      this.totalCost -= product.price;
  }

  emptyCart() {
      this.cartService.emptyCart();
  }

  onCheckout() {
    this.messageService.add({ severity: 'primary', summary: 'Goodbye!', detail: "Thank you for buying!" });
    this.emptyCart();
    this.router.navigate(['products']);
  }
}
