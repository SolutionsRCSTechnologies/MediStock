import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'meditab',
  templateUrl: 'medistocktabcontainer.html'
})
export class mediTabPage {
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
