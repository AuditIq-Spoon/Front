import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { getOfferById, getTenderForOffer } from '../../core/data/mock-procurement.data';

@Component({
  selector: 'app-offer-detail-page',
  imports: [RouterLink, NgIf, CurrencyPipe, DatePipe],
  templateUrl: './offer-detail-page.component.html',
  styleUrl: './offer-detail-page.component.scss',
})
export class OfferDetailPageComponent {
  private readonly route = inject(ActivatedRoute);

  readonly offerId = toSignal(this.route.paramMap.pipe(map((p) => p.get('offerId') ?? '')), {
    initialValue: '',
  });

  offer() {
    const id = this.offerId();
    return id ? getOfferById(id) : undefined;
  }

  parentTender() {
    const o = this.offer();
    return o ? getTenderForOffer(o) : undefined;
  }
}
