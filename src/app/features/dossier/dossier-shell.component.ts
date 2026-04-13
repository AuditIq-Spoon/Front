import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { DossierStoreService } from '../../core/services/dossier-store.service';

@Component({
  selector: 'app-dossier-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dossier-shell.component.html',
  styleUrl: './dossier-shell.component.scss',
})
export class DossierShellComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(DossierStoreService);

  readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get('id') ?? '')), {
    initialValue: '',
  });

  readonly dossier = computed(() => {
    const id = this.id();
    return id ? this.store.getById(id) : undefined;
  });
}
