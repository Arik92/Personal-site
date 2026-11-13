import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RTLDivDirective } from './rtldiv.directive';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';
import { ContactBtnsComponent } from './contact-btns/contact-btns.component';
import { ContactComponent } from './contact/contact.component';
import { GaiaNavbarComponent } from './gaia-navbar/gaia-navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { FlipCardComponent } from './flip-card/flip-card.component';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

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
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
