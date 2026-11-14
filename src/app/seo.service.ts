import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

export const SITE_URL = 'https://arikaviv.com';
const OG_IMAGE = `${SITE_URL}/assets/arik-4668-min.jpg`;

/** Per-route SEO data, attached to routes via `data: { seo }` in app-routing.module.ts. */
export interface PageSeo {
  path: string; // canonical path, e.g. '/' or '/about'
  title: string;
  description: string;
  personJsonLd?: boolean; // emit the schema.org Person block (home page only)
}

export const PAGE_SEO: Record<'home' | 'about' | 'projects' | 'contact', PageSeo> = {
  home: {
    path: '/',
    title: 'Arik Aviv – Software Developer',
    description: 'Arik Aviv (אריק אביב) – software developer building apps that make people\'s lives better. Projects, about and contact.',
    personJsonLd: true,
  },
  about: {
    path: '/about',
    title: 'About – Arik Aviv',
    description: 'About Arik Aviv (אריק אביב), software developer: what I\'m working on and what I enjoy outside of code.',
  },
  projects: {
    path: '/projects',
    title: 'Projects – Arik Aviv',
    description: 'Projects by Arik Aviv (אריק אביב), software developer: web and mobile apps with source code and live demos.',
  },
  contact: {
    path: '/contact',
    title: 'Contact – Arik Aviv',
    description: 'Get in touch with Arik Aviv (אריק אביב), software developer, through GitHub or LinkedIn.',
  },
};

const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Arik Aviv',
  alternateName: 'אריק אביב',
  url: `${SITE_URL}/`,
  jobTitle: 'Software Developer',
  image: OG_IMAGE,
  sameAs: [
    'https://github.com/Arik92',
    'https://www.linkedin.com/in/arik-aviv/',
    'https://www.codementor.io/@arikaviv',
  ],
};

const JSON_LD_ID = 'person-jsonld';

/**
 * Sets title, meta description, canonical, Open Graph / Twitter tags and JSON-LD for the
 * current route. Runs during the build-time prerender too, so the tags are in the static HTML.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);

  apply(seo: PageSeo): void {
    const url = seo.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${seo.path}`;

    this.title.setTitle(seo.title);
    this.meta.updateTag({ name: 'description', content: seo.description });

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Arik Aviv' });
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: OG_IMAGE });
    this.meta.updateTag({ property: 'og:image:alt', content: 'Arik Aviv' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: seo.title });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });
    this.meta.updateTag({ name: 'twitter:image', content: OG_IMAGE });

    this.setCanonical(url);
    this.setPersonJsonLd(!!seo.personJsonLd);
  }

  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setPersonJsonLd(enabled: boolean): void {
    let script = this.document.getElementById(JSON_LD_ID);
    if (!enabled) {
      script?.remove();
      return;
    }
    if (!script) {
      script = this.document.createElement('script');
      script.id = JSON_LD_ID;
      script.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(PERSON_JSON_LD);
  }
}
