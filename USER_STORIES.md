# AuditIQ (DataVigil) — User stories

This document is derived from the **actual Angular routes**, **shell navigation**, **ingestion channel configuration**, **`IngestionService` contract**, **pipeline steps**, **domain/view-model types**, and **feature screens** in this repository.

**Personas (implied by the UI):** auditor / compliance analyst, procurement oversight, finance controller, case owner reviewing risk.

---

## Route map (implemented)

| Path | Lazy-loaded screen |
|------|-------------------|
| `/` | Redirects to `/dashboard` |
| `/dashboard` | `DashboardPageComponent` |
| `/cases` | `DossiersListPageComponent` |
| `/upload` | `UploadHubComponent` |
| `/cases/:id` | `DossierShellComponent` → default child |
| `/cases/:id` (exact) | `DossierOverviewComponent` |
| `/cases/:id/finance` | `DossierFinanceComponent` |
| `/cases/:id/procurement` | `DossierProcurementComponent` |
| `/cases/:id/tenders` | `DossierTendersComponent` |
| `/cases/:id/decisions` | `DossierDecisionnaireComponent` |
| `/cases/:id/validation` | `DossierValidationComponent` |
| `/cases/:id/suppliers` | `DossierSuppliersComponent` |
| `/cases/:id/suppliers/:supplierId` | `DossierSupplierDetailComponent` |
| `/cases/:id/market` | `DossierMarketComponent` |
| `/cases/:id/report` | `DossierReportComponent` |

**Shell:** `AppShellComponent` wraps all of the above. **Global nav:** Dashboard, Cases, Upload.

---

## Epic: Application shell & orientation

### US-SHELL-01 — Navigate the product from the header

**As a** user opening AuditIQ,  
**I want** persistent links to Dashboard, Cases, and Upload plus branding back to the dashboard,  
**So that** I can move through the audit workflow without losing context.

**Acceptance criteria**

- Header exposes `routerLink` targets: `/dashboard`, `/cases` (exact active match), `/upload` (exact active match).
- Brand link targets `/dashboard` with accessible name “AuditIQ — Dashboard”.
- Aside documents the intended journey: upload → analysis → dashboard → case detail → deep dives → validation → export report.

---

## Epic: Portfolio risk overview (`/dashboard`)

### US-DASH-01 — See portfolio-level KPIs

**As an** oversight user,  
**I want** a single view of average risk score, total anomalies, and counts of cases by risk band (high / medium / low),  
**So that** I can prioritize work across all cases.

**Acceptance criteria**

- KPIs are computed from all `DossierVm` records: `riskScore`, `riskBand`, `anomalyCount` aggregation matches `DossierStoreService.dashboardSummary`.
- Average score is shown as **x/100**.

### US-DASH-02 — Spot cross-case price and supplier patterns

**As an** analyst,  
**I want** an aggregated price histogram and a ranked list of suppliers by usage volume,  
**So that** I can detect concentration or outlier-heavy spend patterns.

**Acceptance criteria**

- “Price distribution (aggregated)” uses `priceHistogram` from the first dossier that has histogram data (demo aggregation behavior as implemented).
- “Top suppliers by volume” aggregates `supplierUsage[].count` across dossiers and shows top five.

### US-DASH-03 — Jump to a case from recent activity

**As a** user,  
**I want** each case in recent activity to link to its detail route with score and timestamp,  
**So that** I can drill in quickly.

**Acceptance criteria**

- Each row links to `/cases/:id` with label, `riskBand` badge styling, `riskScore`, and `updatedAt` (short date).

---

## Epic: Case inventory (`/cases`)

### US-CASES-01 — Browse all cases in a table

**As a** case manager,  
**I want** a tabular list of every case with status, numeric score, risk label, and last update,  
**So that** I can triage and open the right file.

**Acceptance criteria**

- Columns: case id + label, status pill (`analyzed` vs `in_progress`), score, localized risk label (`high` → “High”, etc.), `updatedAt`, and “View detail” → `/cases/:id`.

---

## Epic: Document ingestion (`/upload`)

### US-UP-01 — Classify uploads by document type

**As a** user ingesting evidence,  
**I want** to choose a document type (radio group) with hints,  
**So that** the correct ingestion channel is used.

**Acceptance criteria**

- Tag options come from `UPLOAD_TAG_OPTIONS`: `facture` → Invoices channel, `devis` → Quotes & tenders, `releve` → Bank statements, `autre` → Quotes & tenders (manual path per hint).
- When “Auto-classify from file extension” is enabled, manual tag radios are disabled; new files get tags via extension heuristics (e.g. `csv` → `releve`, `pdf` → `facture`, Excel → `devis`).

### US-UP-02 — Associate uploads with a case (optional)

**As a** user,  
**I want** to optionally enter a Case ID,  
**So that** the backend can attach files to the right dossier.

**Acceptance criteria**

- Optional `dossierId` field; trimmed value is sent as `dossierId` in `FormData` when non-empty (`IngestionService.upload`).

### US-UP-03 — Queue multi-file uploads with progress

**As a** user,  
**I want** drag-and-drop or multi-select browse, per-file progress, and clear completion or error states,  
**So that** I know each file reached the ingestion service.

**Acceptance criteria**

- Drop zone accepts drag/drop; file input is `multiple` with `accept=".pdf,.csv,.xlsx,.xls"`.
- Each queued job shows file name, resolved tag label, progress bar during `HttpEventType.UploadProgress`, then “Received by ingestion service” on response, or an error message on failure.
- Completed jobs can be removed from the queue via dismiss control.
- Client validates file against selected channel’s `mimeTypes` / `accept` before POST; mismatch surfaces “File format not accepted for this type.”

### US-UP-04 — POST to the correct ingestion endpoint

**As a** platform integrator,  
**I want** uploads to hit dedicated REST paths per channel,  
**So that** services can scale independently.

**Acceptance criteria**

- Request is `POST` multipart `FormData` with fields: `file` (required), optional `dossierId`, optional `documentType` (upload tag id).
- URL is `environment.apiBaseUrl` + channel `endpoint` for the resolved `IngestionChannel`:

  | Channel `id` | Endpoint |
  |--------------|----------|
  | `invoices` | `/api/v1/ingest/invoices` |
  | `quotes-tenders` | `/api/v1/ingest/quotes-tenders` |
  | `bank-statements` | `/api/v1/ingest/bank-statements` |
  | `suppliers` | `/api/v1/ingest/suppliers` |
  | `market-prices` | `/api/v1/ingest/market-prices` |

*(Note: current upload UI maps tags to invoices, quotes-tenders, and bank-statements only; `suppliers` and `market-prices` exist on `INGESTION_CHANNELS` for API/backend alignment.)*

### US-UP-05 — Understand post-ingestion processing

**As a** stakeholder,  
**I want** the documented pipeline steps shown after upload,  
**So that** I understand how data becomes audit insight.

**Acceptance criteria**

- UI lists `PIPELINE_STEPS` in order: Collect → Extract → Structure → Match → Analyze → Anomalies → Report, each with label + description aligned to domain objects (Invoice, Transaction, Tender, Bid, Supplier, Decision) and matching/reconciliation narrative.

---

## Epic: Case workspace (`/cases/:id`)

### US-DOS-00 — Land on a valid case or recover gracefully

**As a** user,  
**I want** the case shell to show title, id, status, section tabs, and content outlet when the id exists,  
**So that** I can work inside one dossier end-to-end.

**Acceptance criteria**

- Route param `id` resolves via `DossierStoreService.getById`.
- Unknown id: message “Case not found.” and link back to `/cases`.
- Tabs: Overview, Financial analysis, Procurement, Tenders, Decisions, Validation, Suppliers, Market, Report — each `routerLink` includes `/cases/:id/...` as implemented.

---

### US-DOS-01 — Case overview (`/cases/:id`)

**As an** auditor,  
**I want** risk score, band, anomaly count, last update, score breakdown from pending anomalies, and the full anomaly list with severity and human notes,  
**So that** I grasp the case at a glance and can jump to validation.

**Acceptance criteria**

- Score breakdown lists only anomalies with `humanStatus === 'pending'`, showing `typeLabel` and `+impactScore`.
- Anomaly cards show `typeLabel`, `severity`, `impactScore`, `explanation`, optional `humanNote`.
- Link from anomalies summary card to `/cases/:id/validation`.

---

### US-DOS-02 — Financial analysis (`/cases/:id/finance`)

**As a** finance reviewer,  
**I want** invoice vs payment reconciliation rows with amounts and match status,  
**So that** I can spot missing documents or mismatches.

**Acceptance criteria**

- Table driven by `DossierVm.reconciliation`: `invoiceRef`, `paymentRef`, `amountInvoice`, `amountPayment`, `status` with labels: Match, Missing invoice, Missing payment, Mismatch.
- Currency display EUR, whole euros.

---

### US-DOS-03 — Procurement analysis (`/cases/:id/procurement`)

**As a** procurement analyst,  
**I want** mean/median/std-dev of prices and a price histogram with outlier styling on the last bins,  
**So that** I can interpret dispersion and tail risk.

**Acceptance criteria**

- KPIs from `d.kpi` (mean, median, stdev) in €.
- Histogram from `priceHistogram`; bar height scaled to max; last two bars use outlier CSS class.

---

### US-DOS-04 — Tenders (`/cases/:id/tenders`)

**As a** tender oversight user,  
**I want** ranked bids, winner, runner-up, gap %, and a coherence note,  
**So that** I can reason about competition and outcomes.

**Acceptance criteria**

- If `d.tender.bids.length > 0`, show bid list (`rank`, `supplierName`, `amount`), winner, second place, `gapPercent`, `coherenceNote`.
- Else show “No structured tender data for this case.”

---

### US-DOS-05 — Decisions (`/cases/:id/decisions`)

**As an** integrity analyst,  
**I want** decision pattern cards with detail and risk indicator styling,  
**So that** I can document bias or inconsistency hypotheses.

**Acceptance criteria**

- If `decisionPatterns` non-empty, render each `DecisionPatternVm` (`label`, `detail`, `riskIndicator`).
- Else show muted empty state.

---

### US-DOS-06 — Human validation (`/cases/:id/validation`)

**As a** human reviewer,  
**I want** to confirm or reject each anomaly, add a rejection justification, and see global confirm/reject counts,  
**So that** the loop reduces false positives and records rationale.

**Acceptance criteria**

- Global line uses `DossierStoreService.feedbackStats` (totals across all dossiers).
- For each `AnomalyVm` with `humanStatus === 'pending'`, show type, explanation, optional note, textarea for reject justification, Confirm and Reject actions.
- Confirm calls `setAnomalyReview(..., 'confirmed')`.
- Reject uses trimmed note or default text “Rejected without text justification” and `setAnomalyReview(..., 'rejected', note)`.
- Non-pending anomalies show status label (Pending / Confirmed / Rejected) without action buttons.

---

### US-DOS-07 — Suppliers list (`/cases/:id/suppliers`)

**As a** risk analyst,  
**I want** supplier cards with win rate, frequency, risk note, and navigation to detail,  
**So that** I can prioritize counterparties.

**Acceptance criteria**

- Each `SupplierSummaryVm` links to `/cases/:id/suppliers/:supplierId` with name, win rate %, frequency text, `riskNote`.

---

### US-DOS-08 — Supplier detail (`/cases/:id/suppliers/:supplierId`)

**As a** user,  
**I want** a detail view with win rate, frequency, signed average price delta, and risk narrative,  
**So that** I can support investigations.

**Acceptance criteria**

- Resolves supplier by `supplierId` within current dossier’s `suppliers` list.
- Unknown supplier: “Supplier not found.” and back link to list.
- Back link returns to `/cases/:id/suppliers`.

---

### US-DOS-09 — Market comparison (`/cases/:id/market`)

**As a** price integrity user,  
**I want** market vs invoice prices per line with gap percentage, highlighting large gaps,  
**So that** I can focus on material overpricing.

**Acceptance criteria**

- Table from `market`: `label`, `marketPrice`, `invoicePrice`, `gapPercent` (EUR, gap as percent).
- Rows with `gapPercent > 25` get emphasized gap styling.

---

### US-DOS-10 — Report (`/cases/:id/report`)

**As an** audit lead,  
**I want** an executive-style narrative summary and export placeholders,  
**So that** I can communicate findings and plan backend export wiring.

**Acceptance criteria**

- Summary includes overall score /100 and anomaly count.
- Lists all anomalies with type, severity, explanation.
- Static “Recommendations (generated)” bullets align with finance + validation workflow.
- PDF / Excel buttons are present but disabled with “Connect to backend” intent.

---

## Epic: Structured domain & API contracts (for backlog alignment)

These types define the **intended structured model** after extraction (see `domain.models.ts`):

- **`Invoice`:** `id`, optional `supplierRef`, `amount`, `currency`, `issuedAt`.
- **`Transaction`:** `id`, optional `amount`, `bookedAt`, `counterparty`.
- **`Tender`:** `id`, optional `title`, `openedAt`, `closedAt`.
- **`Bid`:** `id`, `tenderId`, `supplierId`, optional `amount`.
- **`Supplier`:** `id`, `name`, optional `normalizedName`.
- **`Decision`:** `id`, optional `tenderId`, `decidedBy`, `decidedAt`, `winningBidId`.

**Anomaly taxonomy** (for rules/scoring UX) from `view-models.ts`: types include `surfacturation`, `paiement_sans_facture`, `favoritisme`, `collusion`, `manipulation_ao`, `anomalie_financiere`; each `AnomalyVm` exposes `typeLabel`, `severity` (`high` | `medium` | `low`), `impactScore`, `humanStatus` (`pending` | `confirmed` | `rejected`).

---

## Non-functional / configuration (as implemented)

- **API base URL:** `environment.apiBaseUrl` (default `http://localhost:8080` in dev) prefixes all ingestion `endpoint` paths.
- **Locale:** `LOCALE_ID` is `en-US` in `app.config.ts`.
- **Case data source:** `DossierStoreService` currently serves `MOCK_DOSSIERS`; replacing with HTTP-backed dossiers would be a separate epic without changing the routes above.

---

## Traceability matrix (quick reference)

| User story id | Primary route(s) | Key interfaces |
|---------------|------------------|----------------|
| US-SHELL-01 | `AppShellComponent` | `Routes` children |
| US-DASH-* | `/dashboard` | `DossierVm`, `dashboardSummary` |
| US-CASES-01 | `/cases` | `DossierVm` |
| US-UP-* | `/upload` | `IngestionChannel`, `UploadProgress`, `UploadTagOption`, `FormData` fields |
| US-DOS-01 | `/cases/:id` | `AnomalyVm`, `DossierVm` |
| US-DOS-02 | `.../finance` | `ReconciliationRowVm` |
| US-DOS-03 | `.../procurement` | `DossierVm.kpi`, `priceHistogram` |
| US-DOS-04 | `.../tenders` | `TenderVm`, `TenderBidVm` |
| US-DOS-05 | `.../decisions` | `DecisionPatternVm` |
| US-DOS-06 | `.../validation` | `HumanReviewStatus`, `setAnomalyReview` |
| US-DOS-07–08 | `.../suppliers`, `.../suppliers/:supplierId` | `SupplierSummaryVm` |
| US-DOS-09 | `.../market` | `MarketCompareVm` |
| US-DOS-10 | `.../report` | `DossierVm` summary composition |

---

*Generated from the AuditIQ Angular codebase routes and TypeScript interfaces.*
