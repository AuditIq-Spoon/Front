# AuditIQ — Backend API

Reference for HTTP endpoints the app expects or will use. Frontend base URL: `src/environments/environment.ts` → `apiBaseUrl` (default `http://localhost:8080`). Append paths below to that base (no trailing slash on the base).

---

## Called by the current MVP UI

| Method | Path | Description |
|--------|------|-------------|
| **POST** | `/api/v1/documents?type={type}` | Upload one file. `type` must be one of: `invoice`, `bank_statement`, `quote`. |
| **POST** | `/api/v1/documents?type=quote&parentTenderId={id}` | Same for quotes; include `parentTenderId` in the query when linking a quote to a tender. |

### Multipart form fields

| Field | Required | Notes |
|-------|----------|--------|
| `file` | Yes | The uploaded file. |
| `parentTenderId` | For quotes | Also sent in `FormData` when `type=quote` and a parent tender is selected (duplicates query for backends that read body only). |

### Client behavior

Any HTTP **2xx** response is treated as success. The client uses `reportProgress` for upload progress and does not parse a response body.

---

## Recommended (full product — not wired in the UI yet)

Use when you persist audits, serve real tenders/quotes, and return live analysis instead of mocks / in-memory state.

| Method | Example path | Purpose |
|--------|----------------|---------|
| **POST** | `/api/v1/audits` | Create an audit when the user runs an audit (`startDate`, `endDate` → returns `auditId`). |
| **GET** | `/api/v1/audits/{auditId}` | Read audit metadata. |
| **PATCH** | `/api/v1/audits/{auditId}` | Update period or status. |
| **GET** | `/api/v1/audits/{auditId}/documents` | List documents linked to an audit (optional). |
| **GET** | `/api/v1/tenders` | List tenders (replaces mock list). |
| **GET** | `/api/v1/tenders/{tenderId}` | Tender detail + linked quotes. |
| **GET** | `/api/v1/quotes/{quoteId}` | Quote detail + parent tender (or nest under tenders). |
| **POST** | `/api/v1/audits/{auditId}/analyze` | Trigger or re-run analysis after uploads. |
| **GET** | `/api/v1/audits/{auditId}/analysis` | JSON for the analysis / report UI. |
| **GET** | `/api/v1/audits/{auditId}/report.pdf` | Server-side PDF (optional; UI can use print-to-PDF today). |

You may combine resources (e.g. embed `analysis` and `documents` in **GET** `/api/v1/audits/{id}`) to reduce round-trips.

---

## Legacy ingest URLs (code still present, not used by MVP routes)

Defined in `src/app/core/config/ingestion-channels.config.ts` and `IngestionService`. Only relevant if you revive the old multi-channel upload flow.

| Method | Path |
|--------|------|
| **POST** | `/api/v1/ingest/invoices` |
| **POST** | `/api/v1/ingest/quotes-tenders` |
| **POST** | `/api/v1/ingest/bank-statements` |
| **POST** | `/api/v1/ingest/suppliers` |
| **POST** | `/api/v1/ingest/market-prices` |

---

## Minimal backend to satisfy the live UI only

1. **POST** `/api/v1/documents` — query `type`, optional `parentTenderId` for quotes, multipart `file` (+ optional `parentTenderId` in body).

**CORS:** allow the Angular dev origin on the API. Configure **multipart** and **upload size** limits for your file types.

---

See also: [README.md](./README.md) for how to run and build the frontend.
