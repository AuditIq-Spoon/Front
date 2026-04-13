import { PercentPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { DossierStoreService } from '../../core/services/dossier-store.service';

@Component({
  selector: 'app-dossier-suppliers',
  imports: [RouterLink, PercentPipe],
  templateUrl: './dossier-suppliers.component.html',
  styleUrl: './dossier-suppliers.component.scss',
})
export class DossierSuppliersComponent {
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
}
