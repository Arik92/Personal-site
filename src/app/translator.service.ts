import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {
  
  langChange$: Observable<any>;
  constructor(private translate: TranslateService) {
    // Replay the latest language change: translations now load synchronously (also during
    // the prerender), so services created after start-up must still receive the active language.
    const langChange = new ReplaySubject<LangChangeEvent>(1);
    this.translate.onLangChange.subscribe(event => langChange.next(event));
    this.langChange$ = langChange.asObservable();
   }
  
  // translation service example

  async init(lang) {
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.translate.getDefaultLang();    
  }

  changeLanguage(lang) {
    // this.translate.setDefaultLang(lang);
    this.translate.use(lang);   
  }

  isRTL = () => {
    return this.translate.currentLang === 'iw';
  }

  selectedLang = () => {
    return this.translate.currentLang === 'iw' ? 'עב' : 'EN';
  }

  getTranslationLanguage = () => {
    return this.translate.currentLang === 'iw' ? 'iw' : 'en';
  }

  getTranslation(lang) {
    const res = this.translate.getTranslation(lang);
    return this.translate.getTranslation(lang);
  } 

}
