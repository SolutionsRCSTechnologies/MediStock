import { Component,Input} from '@angular/core';
@Component({
  selector: 'HeaderNav',
  templateUrl: 'HeaderNav.html'
})
export class HeaderNav {
  
  constructor() {

  }

  @Input() headernavObj: any;
}
