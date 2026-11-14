import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslatorService } from '../translator.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AboutComponent implements OnInit, OnDestroy {
  age: number = 0;
  yearOfBirth: number = 1992;
  todaysDate: Date = new Date();
  wordCount: number = 0;
  hobbies: string[] = [];
  currentLanguage: string = '';
  currentLanguageSubscription: Subscription;
  langChangeSubscription: Subscription;

  // Injected DOCUMENT (not the global) so the word count also works during the build-time prerender.
  private document = inject(DOCUMENT);

  constructor(private translate: TranslatorService) { }

  ngOnInit(): void {
    this.calcAge();   
    this.currentLanguage = this.translate.getTranslationLanguage();
    this.currentLanguageSubscription = this.translate.getTranslation(this.currentLanguage).subscribe(langObj => {     
      this.createHobbies(langObj.HOBBIES);
    });    
    this.langChangeSubscription = this.translate.langChange$.subscribe((langChange) => {      
      this.createHobbies(langChange.translations.HOBBIES);     
    });
  }

  createHobbies(langObj) {
    this.hobbies = Object.values(langObj);      
    this.setWordCount();    // run in event queue, after content has loaded and hobbies deteremined
  }

  setWordCount() {
    setTimeout(() => { this.wordCount = this.calcWords(); }, 0); 
  }
  
  calcAge() {
    this.age =  this.todaysDate.getFullYear() - this.yearOfBirth;
  }

  calcWords(): number {
    const wordPatt = /\S+/g;
    const contentElemText = this.document.getElementsByClassName('content')[0].textContent;    
    return contentElemText.match(wordPatt).length;
  }

  ngOnDestroy() {
    this.langChangeSubscription.unsubscribe();
    this.currentLanguageSubscription.unsubscribe();
  }

}
