import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MOCK_ANALYSIS_FINDINGS } from '../../core/data/mock-analysis.data';
import { AuditContextService } from '../../core/services/audit-context.service';

@Component({
  selector: 'app-analysis-results-page',
  imports: [RouterLink, NgIf, NgFor, DatePipe],
  templateUrl: './analysis-results-page.component.html',
  styleUrl: './analysis-results-page.component.scss',
})
export class AnalysisResultsPageComponent {
  readonly audit = inject(AuditContextService);
  readonly findings = MOCK_ANALYSIS_FINDINGS;

  exportPdf(): void {
    window.print();
  }

  severityLabel(s: string): string {
    const m: Record<string, string> = {
      high: 'High',
      medium: 'Medium',
      low: 'Low',
    };
    return m[s] ?? s;
  }
}
