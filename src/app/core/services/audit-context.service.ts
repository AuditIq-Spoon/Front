import { Injectable, signal } from '@angular/core';
import { AuditPeriod } from '../models/mvp.models';

@Injectable({ providedIn: 'root' })
export class AuditContextService {
  /** Current audit window (set when user runs an audit from the launch page) */
  readonly period = signal<AuditPeriod | null>(null);

  launch(startDate: string, endDate: string): AuditPeriod {
    const id = `audit-${Date.now()}`;
    const p: AuditPeriod = {
      id,
      startDate,
      endDate,
      launchedAt: new Date().toISOString(),
    };
    this.period.set(p);
    return p;
  }

  clear(): void {
    this.period.set(null);
  }
}
