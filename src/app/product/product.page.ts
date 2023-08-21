import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/service/api.service';
import { NavController } from '@ionic/angular';
import { ItemDetails } from 'src/models/item-details';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  //-----------------------//
  // Variables and Objects //
  //-----------------------//
  productID : number = 0;
  productDetails: ItemDetails = new ItemDetails();
  ready : boolean = false;

  constructor(private api: ApiService, private navCtrl: NavController, private route: ActivatedRoute,  private storage: Storage)
  {

  }

  ngOnInit()
  {
    // Get the product ID from the url //
    this.route.queryParams.subscribe(params =>
      {
      this.productID = params['id'];
      console.log('Product Id: ' + this.productID);
    }
  );

    // I would pass the object from the previous screen with all of the
    // selected item information, but for sake of time and API restrictions
    // I'm going with this approach
    this.retrieveItemDetails();
  }

  //------------------//
  // Get Item Details //
  //------------------//
  retrieveItemDetails()
  {
    console.log(`Getting Product Details for ID ${this.productID}`);
    this.api.getProductDetails(this.productID).subscribe(async (res: any) => {
      this.productDetails = res;
      console.log(this.productDetails);
      this.ready = true;
    });
  }

  //------------------//
  // Add Item To Cart //
  //------------------//
  addItemToCart()
  {
    // Here we add the item to the cart //
    console.log('Adding Item to Cart');

    this.storage.get('cart-items').then(value =>
    {
      let ItemDetails : ItemDetails[] = [];

      if (value)
        ItemDetails = JSON.parse(value);

      // Add the Item to the Array //
      ItemDetails.push(this.productDetails);

      // Now save it in storage //
      this.storage.set('cart-items', JSON.stringify(ItemDetails)).then(() =>
      {
        console.log(`Adding Item ${this.productDetails.name}`);
        this.navCtrl.navigateRoot('home');
      });
    });
  }
}
