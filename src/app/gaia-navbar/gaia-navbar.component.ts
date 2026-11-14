import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TranslatorService } from '../translator.service';
import { ContentService, navItem } from '../content.service';

@Component({
    selector: 'app-gaia-navbar',
    templateUrl: './gaia-navbar.component.html',
    styleUrls: ['./gaia-navbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class GaiaNavbarComponent implements OnInit, OnDestroy {
  dropdownFlag: boolean = false;
  navPages: navItem[] = [];

  constructor(private translate: TranslatorService, private content: ContentService) { }

  ngOnInit(): void {
    this.content.navPages.subscribe(newPages => {
      this.navPages = newPages;
    });
  }

  changeLang(lng: string) {
    this.translate.changeLanguage(lng);
  }

  closeDropdown = () => {
    this.dropdownFlag = false;
    document.body.removeEventListener('click', this.closeDropdown, false);
  }

  toggleDropdown() {
    this.dropdownFlag = !this.dropdownFlag;
    if (this.dropdownFlag) {
      setTimeout(() => {
        document.body.addEventListener('click', this.closeDropdown, false);
      }, 370);
    } 
  }

  ngOnDestroy() {
    this.content.navPages.unsubscribe();
  }
}
