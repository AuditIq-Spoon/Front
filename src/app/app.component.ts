import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <div class="min-h-dvh bg-background flex flex-col">
      <app-navbar />
      <main class="flex-1">
        <router-outlet />
      </main>
      <footer class="border-t border-border py-4 text-center text-xs text-foreground/20">
        AuditIQ &copy; {{ year }} — Intelligent Financial &amp; Procurement Auditing
      </footer>
    </div>
  `,
})
export class AppComponent {
  readonly year = new Date().getFullYear();
}
