import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { RiskBand } from '../../core/models/view-models';
import { DossierStoreService } from '../../core/services/dossier-store.service';

@Component({
  selector: 'app-dossier-overview',
  imports: [RouterLink, DatePipe],
  templateUrl: './dossier-overview.component.html',
  styleUrl: './dossier-overview.component.scss',
})
export class DossierOverviewComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(DossierStoreService);

  readonly dossier = toSignal(
    this.route.parent!.paramMap.pipe(
      map((p) => {
        const id = p.get('id') ?? '';
        return id ? (this.store.getById(id) ?? null) : null;
      }),
    ),
    { initialValue: null },
  );

  readonly scoreBreakdown = computed(() => {
    const d = this.dossier();
    if (!d) return [];
    return d.anomalies
      .filter((a) => a.humanStatus === 'pending')
      .map((a) => ({ label: a.typeLabel, points: a.impactScore }));
  });

  riskLabel(band: RiskBand): string {
    const m: Record<RiskBand, string> = {
      high: 'High risk',
      medium: 'Medium risk',
      low: 'Low risk',
    };
    return m[band];
  }
}
