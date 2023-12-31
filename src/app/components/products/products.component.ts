import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  public productsList: any;

    constructor(
      private productService: ProductService, 
      private cartService: CartService,
      private messageService: MessageService 
    ) {}

    ngOnInit(): void {   
        this.productService.getProducts().subscribe( response => {
                this.productsList = response;
                // I have to assign one more attributes to my main object,
                this.productsList.forEach((product: any) => 
                {   
                    Object.assign(product, {total: product.price});   
                });

            });
    }

    addToCart(product: any) {
        this.cartService.addToCart(product);
        this.messageService.add({ severity: 'success', summary: 'Congrats!', detail: "Item added to cart!" });
    }
}
