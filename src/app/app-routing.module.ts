import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { PAGE_SEO } from './seo.service';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', data: { seo: PAGE_SEO.home } },
  { path: 'projects', component: ProjectsComponent, data: { seo: PAGE_SEO.projects } },
  { path: 'about', component: AboutComponent, data: { seo: PAGE_SEO.about } },
  { path: 'home', redirectTo: '', pathMatch: 'full' }, // old URL: prerendered as a redirect page to /
  { path: 'contact', component: ContactComponent, data: { seo: PAGE_SEO.contact } },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Until a 404 is implemented
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })], // , {useHash: true}
  exports: [RouterModule]
})
export class AppRoutingModule { }
