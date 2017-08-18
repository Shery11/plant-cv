
import { Component } from '@angular/core';

import { DiseasePage } from '../disease/disease';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = DiseasePage;
  

  constructor() {

  }
}
