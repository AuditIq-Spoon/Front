import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuditContextService } from '../../core/services/audit-context.service';

@Component({
  selector: 'app-audit-launch-page',
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './audit-launch-page.component.html',
  styleUrl: './audit-launch-page.component.scss',
})
export class AuditLaunchPageComponent {
  private readonly audit = inject(AuditContextService);

  startDate = '';
  endDate = '';
  submitted = false;
  errorMsg = '';

  onSubmit(): void {
    this.errorMsg = '';
    if (!this.startDate || !this.endDate) {
      this.errorMsg = 'Please choose both a start date and an end date.';
      return;
    }
    if (this.startDate > this.endDate) {
      this.errorMsg = 'The start date must be before the end date.';
      return;
    }
    this.audit.launch(this.startDate, this.endDate);
    this.submitted = true;
  }
}
