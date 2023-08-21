import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent
{
  // Menu Links, Icons and routes //
  public appPages = [
    { title: 'Home', url: '/home', icon: 'cafe' },
    { title: 'Cart', url: '/cart', icon: 'cart' },
  ];

  constructor(private storage: Storage)
  {
    // We create a local Storage //
    this.storage.create();
  }
}
