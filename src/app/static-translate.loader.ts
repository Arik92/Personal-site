import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import en from '../assets/i18n/en.json';
import iw from '../assets/i18n/iw.json';

const translations: Record<string, any> = { en, iw };

/**
 * Serves the translation files from the bundle instead of fetching them over HTTP.
 * This lets the build-time prerender (which has no web server to fetch from) render
 * real text instead of translation keys, and removes the flash of keys on first load.
 */
export class StaticTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations[lang] ?? translations['en']);
  }
}
