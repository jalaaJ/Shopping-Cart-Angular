import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //this will be our list of items that were added to the cart
  private cartItemsList: any = [];

  // this behaviorSubject can emmit data and act like an observable as well!
  public productList = new BehaviorSubject<any>([]);

  constructor() { 
    
    if (!CartService.sharedInstance) {
      CartService.sharedInstance = this;
    }
  }

  static sharedInstance = new CartService();

  // here, who ever uses this method can subscribe to it and use the data 
  getProducts()
  {
    return this.productList.asObservable();
  }

  setProduct(product: any)
  {
    this.cartItemsList.push(...product);

    //the product is emitted and they can listen to it by a subscribe method
    this.productList.next(product);
  }

  addToCart(product: any)
  {
    this.cartItemsList.push(product);

    //here, we're emitting the list of items so they could be displayed later
    this.productList.next(this.cartItemsList);

    this.getTotalPrice();
  }

  // this will return the total price of the cart items
  getTotalPrice(): number
  {
    let cartTotal = 0;
    this.cartItemsList.map((item: any) => { cartTotal += item.total; });
    return cartTotal;
  }

  // a method to remove an item from our cart
  removeCartItem(product: any)
  {
    this.cartItemsList.map((item: any, index: any) => 
    {
      //first we need to check if the id of the item matches the id of our product:
      if(product.id === item.id)
      {
        this.cartItemsList.splice(index, 1);
      }
    });
  }

  // a simple method to empty all the items from the cart
  emptyCart()
  {
    this.cartItemsList = [];
    this.productList.next(this.cartItemsList);
  }
}
