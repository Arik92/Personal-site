import { Component, OnInit, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import { ContentService, projectItem } from '../content.service';
declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class HomeComponent implements OnInit, AfterViewChecked {
  featured_projects: projectItem[];

  constructor(private content: ContentService) { }

  ngOnInit(): void {
    this.content.projectList.subscribe(newProjects => {
      this.featured_projects = newProjects.slice(0, 3);   //TODO: make random   
    });
  }

  ngAfterViewChecked() {
    // this.setProjectEllipsis();    
  }

  setProjectEllipsis() {
    const descriptionParagraphs = $('.prj-eli');
    const desiredHeight = 140;

    for (let i = 0; i < descriptionParagraphs.length; i++) {
      let elementHeight = descriptionParagraphs[i].clientHeight;

      while (elementHeight > desiredHeight) {
        elementHeight = descriptionParagraphs[i].clientHeight;
        $(descriptionParagraphs[i]).text((index, text) => {
          return text.replace(/\W*\s(\S)*$/, '...');
        });
      }
    }
  }

}
