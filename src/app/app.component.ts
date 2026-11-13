import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslatorService } from './translator.service';
import { PageSeo, SeoService } from './seo.service';
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
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);

  constructor(private translator: TranslatorService) {
    // Per-route title, description, canonical, OG/Twitter tags and JSON-LD (from route data).
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      let child = this.route.firstChild;
      while (child?.firstChild) {
        child = child.firstChild;
      }
      const seo: PageSeo | undefined = child?.snapshot.data['seo'];
      if (seo) {
        this.seo.apply(seo);
      }
    });

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
