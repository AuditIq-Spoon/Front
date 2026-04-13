import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { DossierStoreService } from '../../core/services/dossier-store.service';

@Component({
  selector: 'app-dossier-report',
  templateUrl: './dossier-report.component.html',
  styleUrl: './dossier-report.component.scss',
})
export class DossierReportComponent {
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
