import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ContentService, navItem } from '../content.service';
@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
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
