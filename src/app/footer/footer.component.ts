import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContentService, navItem } from '../content.service';
@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: false
})
export class FooterComponent implements OnInit, OnDestroy {
  siteMap: navItem[] = [];
  

  constructor(private content: ContentService) { }

  ngOnInit(): void {
    this.content.navPages.subscribe(newPages => {
      this.siteMap = newPages;
    });
  }

  ngOnDestroy(){
    this.content.navPages.unsubscribe();
  }

}
