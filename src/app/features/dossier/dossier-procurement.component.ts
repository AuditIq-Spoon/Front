import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { DossierStoreService } from '../../core/services/dossier-store.service';

@Component({
  selector: 'app-dossier-procurement',
  imports: [DecimalPipe],
  templateUrl: './dossier-procurement.component.html',
  styleUrl: './dossier-procurement.component.scss',
})
export class DossierProcurementComponent {
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

  readonly maxHist = () => {
    const d = this.dossier();
    if (!d?.priceHistogram.length) return 1;
    return Math.max(...d.priceHistogram, 1);
  };
}
