import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RiskBand } from '../../core/models/view-models';
import { DossierStoreService } from '../../core/services/dossier-store.service';

@Component({
  selector: 'app-dossiers-list-page',
  imports: [RouterLink, DatePipe],
  templateUrl: './dossiers-list-page.component.html',
  styleUrl: './dossiers-list-page.component.scss',
})
export class DossiersListPageComponent {
  readonly store = inject(DossierStoreService);

  riskLabel(b: RiskBand): string {
    const m: Record<RiskBand, string> = {
      high: 'High',
      medium: 'Medium',
      low: 'Low',
    };
    return m[b];
  }
}
