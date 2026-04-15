import {
  HttpClient,
  HttpParams,
  Injectable,
  catchError,
  setClassMetadata,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-W2VXPSOJ.js";

// src/environments/environment.defaults.ts
var devEnvironment = {
  apiBaseUrl: "http://localhost:8000/api",
  wsBaseUrl: "ws://localhost:8000"
};

// src/environments/environment.ts
var environment = {
  production: false,
  apiBaseUrl: devEnvironment.apiBaseUrl,
  wsBaseUrl: devEnvironment.wsBaseUrl
};

// src/app/core/services/api.service.ts
var ApiService = class _ApiService {
  constructor(http) {
    this.http = http;
    this.base = environment.apiBaseUrl;
  }
  // ── Documents ──────────────────────────────────────────────────────────────
  /**
   * Upload documents with per-file type overrides and optional tender assignment.
   */
  uploadDocuments(items) {
    const form = new FormData();
    items.forEach((item) => form.append("files", item.file, item.file.name));
    form.append("document_types", items.map((i) => i.docType).join(","));
    form.append("tender_ids", items.map((i) => i.tenderId ?? "").join(","));
    return this.http.post(`${this.base}/upload`, form).pipe(catchError(this.handleError));
  }
  /**
   * List uploaded documents. When both startDate and endDate are provided
   * (YYYY-MM-DD), returns only rows whose transaction_date falls in that inclusive range
   * (same rule as INOUT audit sessions).
   */
  listDocuments(startDate, endDate) {
    let params = new HttpParams();
    if (startDate && endDate) {
      params = params.set("start_date", startDate).set("end_date", endDate);
    }
    return this.http.get(`${this.base}/documents`, { params }).pipe(catchError(this.handleError));
  }
  // ── Tenders ────────────────────────────────────────────────────────────────
  /** List all tenders / Appels d'Offre. */
  listTenders() {
    return this.http.get(`${this.base}/tenders`).pipe(catchError(this.handleError));
  }
  /** Get a single tender by ID. */
  getTender(tenderId) {
    return this.http.get(`${this.base}/tenders/${tenderId}`).pipe(catchError(this.handleError));
  }
  // ── Audit Sessions ─────────────────────────────────────────────────────────
  /**
   * Create a new audit session and trigger the AI pipeline.
   * Returns immediately with a PENDING session; subscribe to WS for progress.
   */
  createSession(payload) {
    return this.http.post(`${this.base}/sessions`, payload).pipe(catchError(this.handleError));
  }
  /** List all sessions for the dashboard. */
  listSessions() {
    return this.http.get(`${this.base}/sessions`).pipe(catchError(this.handleError));
  }
  /** Get full detail of a single session (including anomalies). */
  getSession(sessionId) {
    return this.http.get(`${this.base}/sessions/${sessionId}`).pipe(catchError(this.handleError));
  }
  // ── Error handling ─────────────────────────────────────────────────────────
  handleError(err) {
    const message = err.error?.detail ?? err.error?.message ?? err.message ?? "An unexpected error occurred.";
    console.error("[ApiService]", message, err);
    return throwError(() => new Error(message));
  }
  static {
    this.\u0275fac = function ApiService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ApiService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ApiService, factory: _ApiService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApiService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  environment,
  ApiService
};
//# sourceMappingURL=chunk-ZLFUANLR.js.map
