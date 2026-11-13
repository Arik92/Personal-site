import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Every route is prerendered to static HTML at build time (outputMode "static"),
 * so the S3 bucket serves real content for each page:
 *   /         -> index.html
 *   /about    -> about/index.html
 *   /projects -> projects/index.html
 *   /contact  -> contact/index.html
 *   /home     -> home/index.html (redirect page to /)
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'projects', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: 'home', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
