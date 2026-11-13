import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TranslatorService } from './translator.service';
declare var particlesJS: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})

export class AppComponent implements OnInit {  
  currentLanguage: string = 'en';
  isOpen: boolean = false;

  constructor(private translator: TranslatorService) {
    // Optional: get currentLanguage from localstorage
    this.translator.init(this.currentLanguage).then(res => {
      //translate service initiated
      
    });  
  }

  ngOnInit() {
    // particlesJS.load('app-particles', 'assets/particles.json', function() {
      // console.log('callback - app particles config loaded');
    // });          
  }   
}
