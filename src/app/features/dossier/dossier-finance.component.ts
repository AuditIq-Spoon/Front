import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { DossierStoreService } from '../../core/services/dossier-store.service';

@Component({
  selector: 'app-dossier-finance',
  imports: [CurrencyPipe],
  templateUrl: './dossier-finance.component.html',
  styleUrl: './dossier-finance.component.scss',
})
export class DossierFinanceComponent {
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

  statusLabel(s: string): string {
    const m: Record<string, string> = {
      match: 'Match',
      missing_invoice: 'Missing invoice',
      missing_payment: 'Missing payment',
      mismatch: 'Mismatch',
    };
    return m[s] ?? s;
  }
}
