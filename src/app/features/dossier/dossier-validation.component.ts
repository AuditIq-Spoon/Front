import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { DossierStoreService } from '../../core/services/dossier-store.service';

@Component({
  selector: 'app-dossier-validation',
  imports: [FormsModule],
  templateUrl: './dossier-validation.component.html',
  styleUrl: './dossier-validation.component.scss',
})
export class DossierValidationComponent {
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

  readonly feedback = this.store.feedbackStats;

  notes: Record<string, string> = {};

  confirm(dossierId: string, anomalyId: string): void {
    this.store.setAnomalyReview(dossierId, anomalyId, 'confirmed');
  }

  reject(dossierId: string, anomalyId: string): void {
    const note = this.notes[anomalyId]?.trim() || 'Rejected without text justification';
    this.store.setAnomalyReview(dossierId, anomalyId, 'rejected', note);
  }

  statusLabel(s: string): string {
    const m: Record<string, string> = {
      pending: 'Pending',
      confirmed: 'Confirmed',
      rejected: 'Rejected',
    };
    return m[s] ?? s;
  }
}
