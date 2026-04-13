import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DossierStoreService } from '../../core/services/dossier-store.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink, DatePipe],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  private readonly store = inject(DossierStoreService);

  readonly summary = this.store.dashboardSummary;
  readonly dossiers = this.store.all;

  readonly topSuppliers = computed(() => {
    const map = new Map<string, number>();
    for (const d of this.store.all()) {
      for (const s of d.supplierUsage) {
        map.set(s.name, (map.get(s.name) ?? 0) + s.count);
      }
    }
    return [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  });

  readonly histDemo = computed(() => {
    const d = this.store.all().find((x) => x.priceHistogram.length);
    return d?.priceHistogram ?? [];
  });

  readonly maxHist = computed(() => {
    const h = this.histDemo();
    return h.length ? Math.max(...h, 1) : 1;
  });
}
