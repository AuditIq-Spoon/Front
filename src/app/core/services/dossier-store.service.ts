import { Injectable, computed, signal } from '@angular/core';
import { MOCK_DOSSIERS } from '../data/mock-audit.data';
import { AnomalyVm, DossierVm, HumanReviewStatus } from '../models/view-models';

@Injectable({ providedIn: 'root' })
export class DossierStoreService {
  private readonly dossiers = signal<DossierVm[]>(structuredClone(MOCK_DOSSIERS));

  readonly all = this.dossiers.asReadonly();

  readonly dashboardSummary = computed(() => {
    const list = this.dossiers();
    const totalAnomalies = list.reduce((s, d) => s + d.anomalyCount, 0);
    const high = list.filter((d) => d.riskBand === 'high').length;
    const medium = list.filter((d) => d.riskBand === 'medium').length;
    const low = list.filter((d) => d.riskBand === 'low').length;
    const avgRisk =
      list.length === 0 ? 0 : Math.round(list.reduce((s, d) => s + d.riskScore, 0) / list.length);
    return { totalAnomalies, high, medium, low, avgRisk, dossierCount: list.length };
  });

  getById(id: string): DossierVm | undefined {
    return this.dossiers().find((d) => d.id === id);
  }

  setAnomalyReview(
    dossierId: string,
    anomalyId: string,
    status: HumanReviewStatus,
    note?: string,
  ): void {
    this.dossiers.update((list) =>
      list.map((d) => {
        if (d.id !== dossierId) return d;
        const anomalies = d.anomalies.map((a) =>
          a.id === anomalyId
            ? { ...a, humanStatus: status, humanNote: note ?? a.humanNote }
            : a,
        );
        return { ...d, anomalies };
      }),
    );
  }

  /** Mock: counts human validations for future scoring feedback */
  readonly feedbackStats = computed(() => {
    let confirmed = 0;
    let rejected = 0;
    for (const d of this.dossiers()) {
      for (const a of d.anomalies) {
        if (a.humanStatus === 'confirmed') confirmed++;
        if (a.humanStatus === 'rejected') rejected++;
      }
    }
    return { confirmed, rejected };
  });
}
