import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslatorService } from './translator.service';

import projectInfo from '../assets/project_info.json';

/**
 * Content service :
 * Responsible to content that is translation dependant, such as matching proper titles to navigation
 * links and changing project content
 */
export interface navItem {
  key: string, // translation file key
  title: string,
  route: string
}

export interface projectItem {
  title: string,
  status: string,
  description: string,
  tech: string[],
  code_url: string,
  site_url: string,
  thumb_url: string,
  small_thumb_url: string,
  future_features: string[]            
}
@Injectable({
  providedIn: 'root'
})

export class ContentService {
  navPages: BehaviorSubject<navItem[]> = new BehaviorSubject<navItem[]>([{
    key: 'PROJECTS',
    title: '',
    route: 'projects'
  },  
  {
    key: 'ABOUT',
    title: '',
    route: 'about'
  },
  {
    key: 'CONTACT',
    title: '',
    route: 'contact'
  }]);

  projectSorce: any = projectInfo.projects; // project info from source file
  projectList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]); // project list that gets updated

  constructor(private translator: TranslatorService) {

    this.translator.langChange$.subscribe(languageObj => {
      const newProjectContent = this.updateProjectContent(languageObj.lang);
      this.projectList.next(newProjectContent); // update new projectList content

      const newPages = this.updateNavPages(languageObj.translations.NAVBAR);
      this.navPages.next(newPages);      //update new navItem content
    });
   }

   updateProjectContent(currentLanguage): projectItem[] {
     const newContent = this.projectSorce.map(project =>{
       return {
        title: project.title,
        status: currentLanguage.localeCompare("en") === 0 ? project.english_status: project.hebrew_status,
        description:  currentLanguage.localeCompare("en") === 0 ? project.english_description: project.hebrew_description,
        tech: project.tech,
        code_url: project.code_url,
        site_url: project.site_url,
        thumb_url: project.thumb_url,
        small_thumb_url: project.small_thumb_url,
        future_features: project.future_features    
       }
     });
     return newContent;
   }

   updateNavPages(translations: JSON): navItem[] {
     const navPagesCopy = this.navPages.value;
     navPagesCopy.map(navItem => {
      navItem.title = translations[navItem.key];
    });

    return navPagesCopy;
   }  
}
