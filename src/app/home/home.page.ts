import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MenuItems } from 'src/models/menu-items';
import { ApiService } from 'src/service/api.service';
import { ProductPage } from '../product/product.page';
import { Storage } from '@ionic/storage';
import { ItemDetails } from 'src/models/item-details';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  //-----------------------//
  // Variables and Objects //
  //-----------------------//
  menuItems : any = [];
  cartItems : ItemDetails[] = [];

  constructor(private api: ApiService, private navCtrl: NavController, private storage: Storage)
  {

  }

  ngOnInit()
  {
    this.refreshMenuItems(); // We get the API Contents on the page //
  }

  // This is to prepare the data before the view is loaded, works best for Storage //
  ionViewWillEnter()
  {
    this.storage.get('cart-items').then(value =>
    {
      let items : ItemDetails[] = [];

      if (value)
        items = JSON.parse(value);

      this.cartItems = items;
      console.log(value);
    });
  }

  //--------------------------------------//
  // Refreshes the menu items data source //
  //--------------------------------------//
  refreshMenuItems()
  {
    console.log('Refreshing Menu Items');
    this.api.getMenuProducts().subscribe(async (res: any) => {
      this.menuItems = res;
      console.log(this.menuItems);
    });
  }

  //--------------------------//
  // Opens the menu Item Page //
  //--------------------------//
  openMenuItem(item : any)
  {
    console.log(`Opening item ${item.name}`);
    this.navCtrl.navigateForward(`product?id=${item.id}`);
  }

  //-----------//
  // Open Cart //
  //-----------//
  openCart()
  {
    console.log('Opening Cart');
    this.navCtrl.navigateForward('cart');
  }

}
