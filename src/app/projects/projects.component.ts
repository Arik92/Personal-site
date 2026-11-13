import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ContentService, projectItem } from '../content.service';

declare var particlesJS: any;
@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ProjectsComponent implements OnInit {
  wideThreshold: number = 990;
  midThreshold: number = 770;  
  currentIndex: number = 0;
  paginationConst: number;
  projectList: projectItem[] = [];
  projectDisplay: projectItem[] = []; // to be sliced off source list and idsplayed, arring a simpler solution

  constructor(private content: ContentService) {
  }

  ngOnInit(): void {   
    this.content.projectList.subscribe(newProjects => {
      this.projectList = newProjects;
      this.calcDefs();
      this.updateDisplay();
    });         
  }

  updateDisplay() {
    this.projectDisplay = this.projectList.slice(this.currentIndex, this.currentIndex + this.paginationConst);
  }

  updatePagination(amount: number) {
    if (this.currentIndex + amount < 0) {
      this.currentIndex = 0;
    } else if (this.currentIndex + amount <= this.projectList.length - 1) {
      this.currentIndex += amount;
    } 

    this.updateDisplay();
  }

  isFirstPage() {
    return this.currentIndex === 0;
  }

  isLastPage() {
    return this.currentIndex + this.paginationConst > this.projectList.length - 1;
  }

  calcDefs() {
    const windowHeight = window.innerWidth; // breakpoints at 990 and 770
    if (windowHeight <= this.midThreshold) {
      this.paginationConst = 1;
    } else if (windowHeight <= this.wideThreshold) {
      this.paginationConst = 4;
    } else {
      this.paginationConst = 3
    }
  }

  // ngOnDestroy() {
  //   this.content.projectList.unsubscribe();
  // }
}
