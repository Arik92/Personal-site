import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../content.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  detailItem: any; // can be converted to interface
  routeSubscription: Subscription;
  projectStatus: number = 0;
  constructor(private route: ActivatedRoute, private content: ContentService) { }

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe((paramsMap:any) => {
      this.detailItem = this.content.getProject(paramsMap.params.title);
      console.log('detail item is ', this.detailItem);
      this.determineStatus(this.detailItem.status);
    });
  }

  determineStatus(status: string) {
    switch (status) {
      case 'DEV':
        this.projectStatus = 1;
        break;
      case 'DONE':
      this.projectStatus = 2;
      break;
      case 'UNM':
        this.projectStatus = 3;
        break;
    }
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
