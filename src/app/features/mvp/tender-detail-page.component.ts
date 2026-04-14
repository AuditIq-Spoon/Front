import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { getOffersByTender, getTenderById } from '../../core/data/mock-procurement.data';

@Component({
  selector: 'app-tender-detail-page',
  imports: [RouterLink, NgIf, NgFor, CurrencyPipe, DatePipe],
  templateUrl: './tender-detail-page.component.html',
  styleUrl: './tender-detail-page.component.scss',
})
export class TenderDetailPageComponent {
  private readonly route = inject(ActivatedRoute);

  readonly tenderId = toSignal(this.route.paramMap.pipe(map((p) => p.get('tenderId') ?? '')), {
    initialValue: '',
  });

  tender() {
    const id = this.tenderId();
    return id ? getTenderById(id) : undefined;
  }

  offers() {
    const id = this.tenderId();
    return id ? getOffersByTender(id) : [];
  }
}
