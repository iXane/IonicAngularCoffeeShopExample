import { Component, OnInit } from '@angular/core';
import { ItemDetails } from 'src/models/item-details';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  //-----------------------//
  // Variables and Objects //
  //-----------------------//
  cartItems : ItemDetails[] = [];
  orderTotal : number = 0;

  constructor(private navCtrl: NavController, private storage: Storage)
  {

  }

  ngOnInit()
  {

  }

  // Will load the items when we enter the page //
  ionViewWillEnter()
  {
    this.storage.get('cart-items').then(value =>
    {
      let items : ItemDetails[] = [];

      if (value)
        items = JSON.parse(value);

      this.cartItems = items;
      console.log(value);

      items.forEach(element => {
        this.orderTotal += element.price;
      });
    });
  }

  //-------------//
  // Delete Item //
  //-------------//
  deleteItem(item: any)
  {
    // We look for the item and remove it //
    const index = this.cartItems.indexOf(item, 0);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }

    // We update the local storage and order total //
    this.storage.set('cart-items', JSON.stringify(this.cartItems)).then(() =>
    {
      this.updateOrderTotal();
    });
  }

  //------------------------------//
  // Update the Total in the cart //
  //------------------------------//
  updateOrderTotal()
  {
    this.orderTotal = 0;
    
    this.storage.get('cart-items').then(value =>
      {
        let items : ItemDetails[] = [];
  
        if (value)
        {
          items = JSON.parse(value);

          // We get the sum of the order total from all items //
          items.forEach(element => {
            this.orderTotal += element.price;
          });
        }

        // If there's no items, just go home //
        if (this.orderTotal == 0)
        {
          this.goHome();
        }

      });
  }

  //------------------------------------------------------------------//
  // Return the user to home when they press the button on empty cart //
  //------------------------------------------------------------------//
  goHome()
  {
    this.navCtrl.navigateRoot('home');
  }
}
