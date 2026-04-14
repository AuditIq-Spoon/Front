import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        <!-- Logo -->
        <a routerLink="/" class="flex items-center gap-2.5 group">
          <div class="flex h-8 w-8 items-center justify-center rounded-md bg-accent shadow-glow-accent">
            <svg class="h-5 w-5 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
          </div>
          <span class="text-lg font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors duration-150">
            Audit<span class="text-accent">IQ</span>
          </span>
        </a>

        <!-- Navigation -->
        <nav class="flex items-center gap-1" aria-label="Main navigation">
          <a routerLink="/dashboard" routerLinkActive="text-accent bg-muted"
             class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground transition-colors duration-150">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
            Dashboard
          </a>

          <a routerLink="/upload" routerLinkActive="text-accent bg-muted"
             class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground transition-colors duration-150">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
            Upload
          </a>

          <a routerLink="/documents" routerLinkActive="text-accent bg-muted"
             class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground transition-colors duration-150">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            Documents
          </a>

          <a routerLink="/new-session" routerLinkActive="text-accent bg-muted"
             class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground transition-colors duration-150">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            New Audit
          </a>
        </nav>

      </div>
    </header>
  `,
})
export class NavbarComponent {}
