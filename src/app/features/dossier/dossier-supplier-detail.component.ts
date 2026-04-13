import { DecimalPipe, PercentPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { DossierStoreService } from '../../core/services/dossier-store.service';

@Component({
  selector: 'app-dossier-supplier-detail',
  imports: [RouterLink, DecimalPipe, PercentPipe],
  templateUrl: './dossier-supplier-detail.component.html',
  styleUrl: './dossier-supplier-detail.component.scss',
})
export class DossierSupplierDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(DossierStoreService);

  readonly dossierId = toSignal(
    this.route.parent!.paramMap.pipe(map((p) => p.get('id') ?? '')),
    { initialValue: '' },
  );

  private readonly supplierId = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('supplierId') ?? '')),
    { initialValue: '' },
  );

  readonly supplier = computed(() => {
    const d = this.store.getById(this.dossierId());
    const sid = this.supplierId();
    return d?.suppliers.find((s) => s.id === sid) ?? null;
  });
}
