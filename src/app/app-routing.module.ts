import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' }, // old URL: prerendered as a redirect page to /
  { path: 'contact', component: ContactComponent },   
  { path: '**', redirectTo: '', pathMatch: 'full' } // Until a 404 is implemented
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })], // , {useHash: true}
  exports: [RouterModule]
})
export class AppRoutingModule { }
