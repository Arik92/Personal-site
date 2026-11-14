import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RTLDivDirective } from './rtldiv.directive';
import { StaticTranslateLoader } from './static-translate.loader';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';
import { ContactBtnsComponent } from './contact-btns/contact-btns.component';
import { ContactComponent } from './contact/contact.component';
import { GaiaNavbarComponent } from './gaia-navbar/gaia-navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { FlipCardComponent } from './flip-card/flip-card.component';

@NgModule({ declarations: [
        AppComponent,
        ProjectsComponent,
        AboutComponent,
        RTLDivDirective,
        ContactBtnsComponent,
        ContactComponent,
        GaiaNavbarComponent,
        FooterComponent,
        HomeComponent,
        FlipCardComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: StaticTranslateLoader
            }
        }),
        AppRoutingModule], providers: [provideHttpClient(withXhr(), withInterceptorsFromDi())] })
export class AppModule { }
