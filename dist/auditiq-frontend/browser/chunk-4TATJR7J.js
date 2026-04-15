import {
  riskBadgeClass,
  riskColor,
  riskLabel
} from "./chunk-SNCFYU2E.js";
import {
  ApiService,
  environment
} from "./chunk-ZLFUANLR.js";
import {
  ActivatedRoute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  DecimalPipe,
  Injectable,
  NgClass,
  NgForOf,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
  RouterLink,
  SlicePipe,
  Subject,
  filter,
  setClassMetadata,
  share,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-W2VXPSOJ.js";

// src/app/core/services/websocket.service.ts
var WebSocketService = class _WebSocketService {
  constructor() {
    this.sockets = /* @__PURE__ */ new Map();
    this.subjects = /* @__PURE__ */ new Map();
    this.pingTimers = /* @__PURE__ */ new Map();
    this.destroy$ = new Subject();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.disconnectAll();
  }
  // ── Public API ─────────────────────────────────────────────────────────────
  /**
   * Returns a hot Observable that emits all events from the given session's
   * WebSocket channel. The Observable completes when the server closes the socket
   * or when the caller unsubscribes.
   */
  connect(sessionId) {
    if (!this.subjects.has(sessionId)) {
      this.subjects.set(sessionId, new Subject());
      this._openSocket(sessionId);
    }
    return this.subjects.get(sessionId).asObservable().pipe(share());
  }
  /** Convenience filter — only emits PROGRESS events. */
  progress$(sessionId) {
    return this.connect(sessionId).pipe(filter((e) => e.type === "PROGRESS"));
  }
  /** Convenience filter — only emits the final RESULT event. */
  result$(sessionId) {
    return this.connect(sessionId).pipe(filter((e) => e.type === "RESULT"));
  }
  /** Convenience filter — only emits ERROR events. */
  error$(sessionId) {
    return this.connect(sessionId).pipe(filter((e) => e.type === "ERROR"));
  }
  /** Explicitly close a session's WebSocket connection. */
  disconnect(sessionId) {
    this._closeSocket(sessionId);
  }
  // ── Internal socket lifecycle ──────────────────────────────────────────────
  /**
   * Resolves WebSocket base URL. When `environment.wsBaseUrl` is empty (typical for
   * same-origin Netlify builds with AUDITIQ_API_BASE_URL=/api), use the page origin.
   */
  _wsBaseUrl() {
    const configured = environment.wsBaseUrl?.trim();
    if (configured)
      return configured.replace(/\/+$/, "");
    if (typeof globalThis !== "undefined" && "location" in globalThis) {
      const loc = globalThis.location;
      if (loc?.host) {
        const proto = loc.protocol === "https:" ? "wss:" : "ws:";
        return `${proto}//${loc.host}`;
      }
    }
    return "";
  }
  _openSocket(sessionId, attempt = 0) {
    const base = this._wsBaseUrl();
    const url = `${base}/ws/progress/${sessionId}`;
    const ws = new WebSocket(url);
    this.sockets.set(sessionId, ws);
    ws.onopen = () => {
      console.debug(`[WS] Connected \u2014 session ${sessionId}`);
      this._startPing(sessionId, ws);
    };
    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        this.subjects.get(sessionId)?.next(parsed);
        if (parsed.type === "RESULT" || parsed.type === "PROGRESS" && parsed.status === "DONE") {
          setTimeout(() => this._closeSocket(sessionId), 500);
        }
      } catch {
        console.warn("[WS] Received non-JSON message:", event.data);
      }
    };
    ws.onerror = (err) => {
      console.error(`[WS] Error on session ${sessionId}`, err);
    };
    ws.onclose = (event) => {
      console.debug(`[WS] Closed \u2014 session ${sessionId}, code=${event.code}`);
      this._stopPing(sessionId);
      const MAX_RETRIES = 3;
      const RETRY_BASE_MS = 1e3;
      if (!event.wasClean && attempt < MAX_RETRIES) {
        const delay = RETRY_BASE_MS * 2 ** attempt;
        console.info(`[WS] Reconnecting in ${delay}ms (attempt ${attempt + 1}/${MAX_RETRIES})`);
        setTimeout(() => this._openSocket(sessionId, attempt + 1), delay);
      } else {
        this.subjects.get(sessionId)?.complete();
        this.sockets.delete(sessionId);
        this.subjects.delete(sessionId);
      }
    };
  }
  _closeSocket(sessionId) {
    this._stopPing(sessionId);
    const ws = this.sockets.get(sessionId);
    if (ws && ws.readyState < WebSocket.CLOSING) {
      ws.close(1e3, "Client disconnected");
    }
    this.sockets.delete(sessionId);
    this.subjects.get(sessionId)?.complete();
    this.subjects.delete(sessionId);
  }
  _startPing(sessionId, ws) {
    const interval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send("PING");
      }
    }, 3e4);
    this.pingTimers.set(sessionId, interval);
  }
  _stopPing(sessionId) {
    const t = this.pingTimers.get(sessionId);
    if (t !== void 0) {
      clearInterval(t);
      this.pingTimers.delete(sessionId);
    }
  }
  disconnectAll() {
    for (const id of this.sockets.keys()) {
      this._closeSocket(id);
    }
  }
  static {
    this.\u0275fac = function WebSocketService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _WebSocketService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _WebSocketService, factory: _WebSocketService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WebSocketService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/features/live-audit/live-audit.component.ts
var _c0 = (a0, a1) => ({ "text-foreground": a0, "text-foreground/30": a1 });
function LiveAuditComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "span", 11);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.statusBadge(ctx_r0.session.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.session.status, " ");
  }
}
function LiveAuditComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275element(1, "div", 13)(2, "div", 14);
    \u0275\u0275elementEnd();
  }
}
function LiveAuditComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 16);
    \u0275\u0275element(2, "path", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "p", 18);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "a", 19);
    \u0275\u0275text(6, "Back to Dashboard");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.loadError);
  }
}
function LiveAuditComponent_ng_container_14_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "p", 22);
    \u0275\u0275text(2, "Date Range");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 24);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r0.session.params["start_date"], " \u2192 ", ctx_r0.session.params["end_date"], "");
  }
}
function LiveAuditComponent_ng_container_14_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "p", 22);
    \u0275\u0275text(2, "Project");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 39);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.session.params["project_name"]);
  }
}
function LiveAuditComponent_ng_container_14_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275element(1, "span", 41);
    \u0275\u0275elementStart(2, "span", 42);
    \u0275\u0275text(3, "Live");
    \u0275\u0275elementEnd()();
  }
}
function LiveAuditComponent_ng_container_14_div_26__svg_svg_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 54);
    \u0275\u0275element(1, "path", 55);
    \u0275\u0275elementEnd();
  }
}
function LiveAuditComponent_ng_container_14_div_26__svg_svg_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 56);
    \u0275\u0275element(1, "circle", 57)(2, "path", 58);
    \u0275\u0275elementEnd();
  }
}
function LiveAuditComponent_ng_container_14_div_26__svg_svg_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 59);
    \u0275\u0275element(1, "path", 60);
    \u0275\u0275elementEnd();
  }
}
function LiveAuditComponent_ng_container_14_div_26_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61)(1, "span", 62);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const i_r2 = \u0275\u0275nextContext().index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r2 + 1);
  }
}
function LiveAuditComponent_ng_container_14_div_26_p_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 63);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", step_r3.detail, " ");
  }
}
function LiveAuditComponent_ng_container_14_div_26_span_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 64);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatTime(step_r3.timestamp), " ");
  }
}
function LiveAuditComponent_ng_container_14_div_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "div", 44);
    \u0275\u0275elementContainerStart(2, 45);
    \u0275\u0275template(3, LiveAuditComponent_ng_container_14_div_26__svg_svg_3_Template, 2, 0, "svg", 46)(4, LiveAuditComponent_ng_container_14_div_26__svg_svg_4_Template, 3, 0, "svg", 47)(5, LiveAuditComponent_ng_container_14_div_26__svg_svg_5_Template, 2, 0, "svg", 48)(6, LiveAuditComponent_ng_container_14_div_26_div_6_Template, 3, 1, "div", 49);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 50)(8, "p", 51);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, LiveAuditComponent_ng_container_14_div_26_p_10_Template, 2, 1, "p", 52);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, LiveAuditComponent_ng_container_14_div_26_span_11_Template, 2, 1, "span", 53);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r3 = ctx.$implicit;
    \u0275\u0275classProp("opacity-30", step_r3.status === "PENDING")("animate-fade-in", step_r3.status !== "PENDING");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngSwitch", step_r3.status);
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "DONE");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "RUNNING");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "ERROR");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(12, _c0, step_r3.status !== "PENDING", step_r3.status === "PENDING"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", step_r3.label, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", step_r3.detail);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", step_r3.timestamp && step_r3.status === "DONE");
  }
}
function LiveAuditComponent_ng_container_14_div_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65);
    \u0275\u0275element(1, "div", 66);
    \u0275\u0275elementEnd();
  }
}
function LiveAuditComponent_ng_container_14_div_28_div_20_li_7_div_8_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 96);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const doc_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(doc_r4);
  }
}
function LiveAuditComponent_ng_container_14_div_28_div_20_li_7_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 94);
    \u0275\u0275template(1, LiveAuditComponent_ng_container_14_div_28_div_20_li_7_div_8_span_1_Template, 2, 1, "span", 95);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", a_r5.affected_documents);
  }
}
function LiveAuditComponent_ng_container_14_div_28_div_20_li_7_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 97)(1, "span", 98);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const a_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" +", \u0275\u0275pipeBind2(3, 1, a_r5.delta_amount, "1.2-2"), " ");
  }
}
function LiveAuditComponent_ng_container_14_div_28_div_20_li_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 88)(1, "span", 89);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 50)(4, "p", 90);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 91);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, LiveAuditComponent_ng_container_14_div_28_div_20_li_7_div_8_Template, 2, 1, "div", 92);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, LiveAuditComponent_ng_container_14_div_28_div_20_li_7_div_9_Template, 4, 4, "div", 93);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.severityClass(a_r5.severity));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(a_r5.severity);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r5.code);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r5.description);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", a_r5.affected_documents.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", a_r5.delta_amount !== null);
  }
}
function LiveAuditComponent_ng_container_14_div_28_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 82)(1, "div", 83)(2, "h2", 84);
    \u0275\u0275text(3, " Detected Anomalies ");
    \u0275\u0275elementStart(4, "span", 85);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "ul", 86);
    \u0275\u0275template(7, LiveAuditComponent_ng_container_14_div_28_div_20_li_7_Template, 10, 6, "li", 87);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("(", ctx_r0.result.anomalies.length, ")");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.result.anomalies)("ngForTrackBy", ctx_r0.trackByCode);
  }
}
function LiveAuditComponent_ng_container_14_div_28_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 99);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 100);
    \u0275\u0275element(2, "path", 101);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "p", 18);
    \u0275\u0275text(4, "No anomalies detected");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 102);
    \u0275\u0275text(6, "This audit session passed all checks.");
    \u0275\u0275elementEnd()();
  }
}
function LiveAuditComponent_ng_container_14_div_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67)(1, "div", 68)(2, "h2", 69);
    \u0275\u0275text(3, " Audit Result ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 70)(5, "div", 71);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 72);
    \u0275\u0275element(7, "circle", 73)(8, "circle", 74);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "div", 75)(10, "span", 76);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 77);
    \u0275\u0275text(13, "/100");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 50)(15, "div", 78)(16, "span", 11);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "p", 79);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(20, LiveAuditComponent_ng_container_14_div_28_div_20_Template, 8, 3, "div", 80)(21, LiveAuditComponent_ng_container_14_div_28_div_21_Template, 7, 0, "div", 81);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275attribute("stroke", ctx_r0.riskColor(ctx_r0.result.risk_score))("stroke-dasharray", 251.2)("stroke-dashoffset", 251.2 - 251.2 * ctx_r0.result.risk_score / 100);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("color", ctx_r0.riskColor(ctx_r0.result.risk_score));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.result.risk_score, " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("ngClass", ctx_r0.riskBadgeClass(ctx_r0.result.risk_score));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.riskLabel(ctx_r0.result.risk_score), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.result.risk_summary);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.result.anomalies.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.result.anomalies.length === 0);
  }
}
function LiveAuditComponent_ng_container_14_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 103)(1, "div", 104);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 105);
    \u0275\u0275element(3, "path", 60);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "div")(5, "p", 106);
    \u0275\u0275text(6, "Pipeline Error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 107);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.wsError);
  }
}
function LiveAuditComponent_ng_container_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 20)(2, "div", 21)(3, "div")(4, "p", 22);
    \u0275\u0275text(5, "Audit Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 23);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, LiveAuditComponent_ng_container_14_div_8_Template, 5, 2, "div", 9)(9, LiveAuditComponent_ng_container_14_div_9_Template, 5, 1, "div", 9);
    \u0275\u0275elementStart(10, "div")(11, "p", 22);
    \u0275\u0275text(12, "Created");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 24);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(15, "div", 25)(16, "div", 26)(17, "div", 27)(18, "div", 28);
    \u0275\u0275element(19, "span", 29)(20, "span", 30)(21, "span", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 32);
    \u0275\u0275text(23, "audit-pipeline");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(24, LiveAuditComponent_ng_container_14_div_24_Template, 4, 0, "div", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 34);
    \u0275\u0275template(26, LiveAuditComponent_ng_container_14_div_26_Template, 12, 15, "div", 35)(27, LiveAuditComponent_ng_container_14_div_27_Template, 2, 0, "div", 36);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(28, LiveAuditComponent_ng_container_14_div_28_Template, 22, 11, "div", 37)(29, LiveAuditComponent_ng_container_14_div_29_Template, 9, 1, "div", 38);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275classProp("text-blue-400", ctx_r0.session.audit_type === "INOUT")("text-purple-400", ctx_r0.session.audit_type === "TENDER");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.session.audit_type, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.session.audit_type === "INOUT");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.session.audit_type === "TENDER");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.formatDate(ctx_r0.session.created_at));
    \u0275\u0275advance(10);
    \u0275\u0275property("ngIf", ctx_r0.isRunning);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.steps)("ngForTrackBy", ctx_r0.trackByIndex);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isRunning);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.result);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.wsError);
  }
}
var LiveAuditComponent = class _LiveAuditComponent {
  constructor(route, api, ws, cd) {
    this.route = route;
    this.api = api;
    this.ws = ws;
    this.cd = cd;
    this.sessionId = "";
    this.session = null;
    this.steps = [];
    this.result = null;
    this.loadError = "";
    this.wsError = "";
    this.riskColor = riskColor;
    this.riskLabel = riskLabel;
    this.riskBadgeClass = riskBadgeClass;
    this.destroy$ = new Subject();
  }
  ngOnInit() {
    this.sessionId = this.route.snapshot.paramMap.get("id") ?? "";
    this.loadSession();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.ws.disconnect(this.sessionId);
  }
  get isRunning() {
    return this.session?.status === "RUNNING" || this.session?.status === "PENDING";
  }
  // ── Load session & subscribe to WS ────────────────────────────────────────
  loadSession() {
    this.api.getSession(this.sessionId).subscribe({
      next: (s) => {
        this.session = s;
        if (s.status === "COMPLETED" && s.risk_score !== null) {
          this.result = {
            risk_score: s.risk_score,
            risk_summary: s.risk_summary ?? "",
            anomalies: s.anomalies
          };
        }
        this.cd.markForCheck();
        this.subscribeWebSocket();
      },
      error: (err) => {
        this.loadError = err.message;
        this.cd.markForCheck();
      }
    });
  }
  subscribeWebSocket() {
    this.ws.connect(this.sessionId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (event) => {
        switch (event.type) {
          case "PROGRESS":
            this.handleProgress(event);
            break;
          case "RESULT":
            this.handleResult(event);
            break;
          case "ERROR":
            this.wsError = event.message;
            if (this.session)
              this.session.status = "FAILED";
            break;
        }
        this.cd.markForCheck();
      }
    });
  }
  handleProgress(event) {
    while (this.steps.length < event.total_steps) {
      this.steps.push({ label: "\u2026", detail: null, status: "PENDING" });
    }
    this.steps[event.step - 1] = {
      label: event.label,
      detail: event.detail,
      status: event.status,
      timestamp: event.timestamp
    };
    if (this.session)
      this.session.status = event.status === "DONE" ? "RUNNING" : "RUNNING";
  }
  handleResult(event) {
    this.result = {
      risk_score: event.risk_score,
      risk_summary: event.risk_summary,
      anomalies: event.anomalies
    };
    if (this.session) {
      this.session.status = "COMPLETED";
      this.session.risk_score = event.risk_score;
    }
  }
  // ── Helpers ────────────────────────────────────────────────────────────────
  statusBadge(status) {
    const map = {
      PENDING: "badge-pending",
      RUNNING: "badge-running",
      COMPLETED: "badge-safe",
      FAILED: "badge-critical"
    };
    return map[status] ?? "badge-pending";
  }
  severityClass(severity) {
    const map = {
      LOW: "bg-risk-low/10 text-risk-low",
      MEDIUM: "bg-risk-medium/10 text-risk-medium",
      HIGH: "bg-risk-high/10 text-risk-high",
      CRITICAL: "bg-risk-critical/10 text-risk-critical"
    };
    return map[severity] ?? "";
  }
  formatDate(iso) {
    return new Date(iso).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  formatTime(iso) {
    return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }
  trackByIndex(i) {
    return i;
  }
  trackByCode(_, a) {
    return a.code;
  }
  static {
    this.\u0275fac = function LiveAuditComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LiveAuditComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(ApiService), \u0275\u0275directiveInject(WebSocketService), \u0275\u0275directiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LiveAuditComponent, selectors: [["app-live-audit"]], decls: 15, vars: 9, consts: [[1, "mx-auto", "max-w-4xl", "px-4", "py-10", "sm:px-6", "lg:px-8", "animate-fade-in"], [1, "mb-8", "flex", "items-start", "justify-between", "gap-4"], [1, "flex", "items-center", "gap-2", "mb-1.5"], ["routerLink", "/dashboard", 1, "text-xs", "text-foreground/40", "hover:text-foreground/70", "transition-colors"], [1, "text-3xl", "font-semibold", "text-foreground"], [1, "mt-1", "text-sm", "text-foreground/50", "font-mono"], ["class", "shrink-0", 4, "ngIf"], ["class", "space-y-4", "aria-busy", "true", "aria-label", "Loading session", 4, "ngIf"], ["class", "card flex flex-col items-center gap-4 py-16 text-center", "role", "alert", 4, "ngIf"], [4, "ngIf"], [1, "shrink-0"], [1, "text-sm", "px-3", "py-1", 3, "ngClass"], ["aria-busy", "true", "aria-label", "Loading session", 1, "space-y-4"], [1, "card", "h-24", "animate-pulse", "bg-muted/50"], [1, "card", "h-48", "animate-pulse", "bg-muted/50"], ["role", "alert", 1, "card", "flex", "flex-col", "items-center", "gap-4", "py-16", "text-center"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "1.5", "aria-hidden", "true", 1, "h-10", "w-10", "text-destructive"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"], [1, "text-base", "font-medium", "text-foreground"], ["routerLink", "/dashboard", 1, "btn-secondary", "text-sm"], [1, "card", "p-5", "mb-6"], [1, "grid", "grid-cols-2", "gap-4", "sm:grid-cols-3"], [1, "text-xs", "text-foreground/40", "uppercase", "tracking-wider", "mb-1"], [1, "text-sm", "font-semibold"], [1, "text-sm", "tabular"], [1, "card", "mb-6"], [1, "flex", "items-center", "justify-between", "px-5", "py-3", "border-b", "border-border"], [1, "flex", "items-center", "gap-2"], [1, "flex", "gap-1.5"], [1, "h-3", "w-3", "rounded-full", "bg-destructive/80"], [1, "h-3", "w-3", "rounded-full", "bg-risk-medium/80"], [1, "h-3", "w-3", "rounded-full", "bg-accent/80"], [1, "text-xs", "font-mono", "text-foreground/40", "ml-2"], ["class", "flex items-center gap-1.5", 4, "ngIf"], ["role", "log", "aria-live", "polite", "aria-label", "Audit progress", 1, "p-5", "space-y-3"], ["class", "flex items-start gap-3 transition-all duration-300", 3, "opacity-30", "animate-fade-in", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "mt-4 relative h-0.5 w-full bg-muted overflow-hidden rounded-full", 4, "ngIf"], ["class", "space-y-6 animate-slide-up", 4, "ngIf"], ["class", "card p-5 border-destructive/30 bg-destructive/5 animate-slide-up", "role", "alert", 4, "ngIf"], [1, "text-sm"], [1, "flex", "items-center", "gap-1.5"], [1, "h-2", "w-2", "rounded-full", "bg-accent", "animate-pulse"], [1, "text-xs", "text-accent", "font-medium"], [1, "flex", "items-start", "gap-3", "transition-all", "duration-300"], [1, "mt-0.5", "shrink-0"], [3, "ngSwitch"], ["class", "h-5 w-5 text-accent", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", "aria-label", "Completed", 4, "ngSwitchCase"], ["class", "h-5 w-5 text-accent animate-spin", "fill", "none", "viewBox", "0 0 24 24", "aria-label", "Running", 4, "ngSwitchCase"], ["class", "h-5 w-5 text-destructive", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", "aria-label", "Error", 4, "ngSwitchCase"], ["class", "h-5 w-5 rounded-full border-2 border-border flex items-center justify-center", 4, "ngSwitchDefault"], [1, "flex-1", "min-w-0"], [1, "text-sm", "font-medium", 3, "ngClass"], ["class", "mt-0.5 text-xs font-mono text-foreground/40", 4, "ngIf"], ["class", "shrink-0 text-xs tabular text-foreground/30", 4, "ngIf"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", "aria-label", "Completed", 1, "h-5", "w-5", "text-accent"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"], ["fill", "none", "viewBox", "0 0 24 24", "aria-label", "Running", 1, "h-5", "w-5", "text-accent", "animate-spin"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", "aria-label", "Error", 1, "h-5", "w-5", "text-destructive"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"], [1, "h-5", "w-5", "rounded-full", "border-2", "border-border", "flex", "items-center", "justify-center"], [1, "text-xs", "font-mono", "text-foreground/30"], [1, "mt-0.5", "text-xs", "font-mono", "text-foreground/40"], [1, "shrink-0", "text-xs", "tabular", "text-foreground/30"], [1, "mt-4", "relative", "h-0.5", "w-full", "bg-muted", "overflow-hidden", "rounded-full"], [1, "absolute", "h-full", "w-1/3", "bg-accent", "rounded-full", "animate-progress-bar"], [1, "space-y-6", "animate-slide-up"], [1, "card", "p-6"], [1, "text-sm", "font-medium", "text-foreground/50", "uppercase", "tracking-wider", "mb-5"], [1, "flex", "items-center", "gap-8"], [1, "relative", "shrink-0", "flex", "items-center", "justify-center"], ["viewBox", "0 0 100 100", "aria-hidden", "true", 1, "h-28", "w-28", "-rotate-90"], ["cx", "50", "cy", "50", "r", "40", "fill", "none", "stroke", "currentColor", "stroke-width", "8", 1, "text-muted"], ["cx", "50", "cy", "50", "r", "40", "fill", "none", "stroke-width", "8", "stroke-linecap", "round", 1, "transition-all", "duration-700", "ease-out"], [1, "absolute", "flex", "flex-col", "items-center"], [1, "text-3xl", "font-bold", "tabular"], [1, "text-xs", "text-foreground/40"], [1, "flex", "items-center", "gap-2", "mb-3"], [1, "text-sm", "text-foreground/70", "leading-relaxed"], ["class", "card", 4, "ngIf"], ["class", "card flex flex-col items-center gap-3 py-10 text-center", 4, "ngIf"], [1, "card"], [1, "px-5", "py-4", "border-b", "border-border"], [1, "text-sm", "font-semibold", "text-foreground"], [1, "ml-2", "text-foreground/40", "font-normal"], ["role", "list", "aria-label", "Anomaly flags", 1, "divide-y", "divide-border"], ["class", "px-5 py-4 flex items-start gap-4", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "px-5", "py-4", "flex", "items-start", "gap-4"], [1, "mt-0.5", "shrink-0", "rounded-md", "px-2", "py-0.5", "text-xs", "font-semibold", 3, "ngClass"], [1, "text-sm", "font-medium", "text-foreground", "font-mono"], [1, "mt-1", "text-sm", "text-foreground/60"], ["class", "mt-2 flex flex-wrap gap-1.5", 4, "ngIf"], ["class", "shrink-0 text-right", 4, "ngIf"], [1, "mt-2", "flex", "flex-wrap", "gap-1.5"], ["class", "rounded bg-muted border border-border px-2 py-0.5 text-xs font-mono text-foreground/50", 4, "ngFor", "ngForOf"], [1, "rounded", "bg-muted", "border", "border-border", "px-2", "py-0.5", "text-xs", "font-mono", "text-foreground/50"], [1, "shrink-0", "text-right"], [1, "text-sm", "font-semibold", "tabular", "text-destructive"], [1, "card", "flex", "flex-col", "items-center", "gap-3", "py-10", "text-center"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "1.5", "aria-hidden", "true", 1, "h-10", "w-10", "text-accent"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"], [1, "text-sm", "text-foreground/50"], ["role", "alert", 1, "card", "p-5", "border-destructive/30", "bg-destructive/5", "animate-slide-up"], [1, "flex", "items-center", "gap-3"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true", 1, "h-5", "w-5", "text-destructive", "shrink-0"], [1, "text-sm", "font-medium", "text-destructive"], [1, "text-sm", "text-foreground/50", "mt-0.5"]], template: function LiveAuditComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "div", 2)(4, "a", 3);
        \u0275\u0275text(5, " \u2190 Dashboard ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "h1", 4);
        \u0275\u0275text(7, "Live Audit");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p", 5);
        \u0275\u0275text(9);
        \u0275\u0275pipe(10, "slice");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(11, LiveAuditComponent_div_11_Template, 3, 2, "div", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275template(12, LiveAuditComponent_div_12_Template, 3, 0, "div", 7)(13, LiveAuditComponent_div_13_Template, 7, 1, "div", 8)(14, LiveAuditComponent_ng_container_14_Template, 30, 14, "ng-container", 9);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275textInterpolate1("Session ", \u0275\u0275pipeBind3(10, 5, ctx.sessionId, 0, 8), "\u2026");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.session);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.session && !ctx.loadError);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loadError);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.session);
      }
    }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, SlicePipe, DecimalPipe, RouterLink], encapsulation: 2, changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LiveAuditComponent, [{
    type: Component,
    args: [{
      selector: "app-live-audit",
      standalone: true,
      imports: [CommonModule, RouterLink],
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <div class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 animate-fade-in">

      <!-- Header -->
      <div class="mb-8 flex items-start justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <a routerLink="/dashboard" class="text-xs text-foreground/40 hover:text-foreground/70 transition-colors">
              \u2190 Dashboard
            </a>
          </div>
          <h1 class="text-3xl font-semibold text-foreground">Live Audit</h1>
          <p class="mt-1 text-sm text-foreground/50 font-mono">Session {{ sessionId | slice:0:8 }}\u2026</p>
        </div>

        <!-- Status badge -->
        <div *ngIf="session" class="shrink-0">
          <span [ngClass]="statusBadge(session.status)" class="text-sm px-3 py-1">
            {{ session.status }}
          </span>
        </div>
      </div>

      <!-- Loading -->
      <div *ngIf="!session && !loadError" class="space-y-4" aria-busy="true" aria-label="Loading session">
        <div class="card h-24 animate-pulse bg-muted/50"></div>
        <div class="card h-48 animate-pulse bg-muted/50"></div>
      </div>

      <!-- Load error -->
      <div *ngIf="loadError" class="card flex flex-col items-center gap-4 py-16 text-center" role="alert">
        <svg class="h-10 w-10 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
        <p class="text-base font-medium text-foreground">{{ loadError }}</p>
        <a routerLink="/dashboard" class="btn-secondary text-sm">Back to Dashboard</a>
      </div>

      <ng-container *ngIf="session">

        <!-- Session info card -->
        <div class="card p-5 mb-6">
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <p class="text-xs text-foreground/40 uppercase tracking-wider mb-1">Audit Type</p>
              <span class="text-sm font-semibold"
                    [class.text-blue-400]="session.audit_type === 'INOUT'"
                    [class.text-purple-400]="session.audit_type === 'TENDER'">
                {{ session.audit_type }}
              </span>
            </div>
            <div *ngIf="session.audit_type === 'INOUT'">
              <p class="text-xs text-foreground/40 uppercase tracking-wider mb-1">Date Range</p>
              <p class="text-sm tabular">{{ session.params['start_date'] }} \u2192 {{ session.params['end_date'] }}</p>
            </div>
            <div *ngIf="session.audit_type === 'TENDER'">
              <p class="text-xs text-foreground/40 uppercase tracking-wider mb-1">Project</p>
              <p class="text-sm">{{ session.params['project_name'] }}</p>
            </div>
            <div>
              <p class="text-xs text-foreground/40 uppercase tracking-wider mb-1">Created</p>
              <p class="text-sm tabular">{{ formatDate(session.created_at) }}</p>
            </div>
          </div>
        </div>

        <!-- Progress terminal -->
        <div class="card mb-6">
          <div class="flex items-center justify-between px-5 py-3 border-b border-border">
            <div class="flex items-center gap-2">
              <div class="flex gap-1.5">
                <span class="h-3 w-3 rounded-full bg-destructive/80"></span>
                <span class="h-3 w-3 rounded-full bg-risk-medium/80"></span>
                <span class="h-3 w-3 rounded-full bg-accent/80"></span>
              </div>
              <span class="text-xs font-mono text-foreground/40 ml-2">audit-pipeline</span>
            </div>
            <div *ngIf="isRunning" class="flex items-center gap-1.5">
              <span class="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
              <span class="text-xs text-accent font-medium">Live</span>
            </div>
          </div>

          <!-- Steps -->
          <div class="p-5 space-y-3" role="log" aria-live="polite" aria-label="Audit progress">
            <div
              *ngFor="let step of steps; let i = index; trackBy: trackByIndex"
              class="flex items-start gap-3 transition-all duration-300"
              [class.opacity-30]="step.status === 'PENDING'"
              [class.animate-fade-in]="step.status !== 'PENDING'"
            >
              <!-- Step icon -->
              <div class="mt-0.5 shrink-0">
                <ng-container [ngSwitch]="step.status">
                  <svg *ngSwitchCase="'DONE'" class="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-label="Completed">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <svg *ngSwitchCase="'RUNNING'" class="h-5 w-5 text-accent animate-spin" fill="none" viewBox="0 0 24 24" aria-label="Running">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg *ngSwitchCase="'ERROR'" class="h-5 w-5 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-label="Error">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                  <div *ngSwitchDefault class="h-5 w-5 rounded-full border-2 border-border flex items-center justify-center">
                    <span class="text-xs font-mono text-foreground/30">{{ i + 1 }}</span>
                  </div>
                </ng-container>
              </div>

              <!-- Step content -->
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium"
                   [ngClass]="{
                     'text-foreground': step.status !== 'PENDING',
                     'text-foreground/30': step.status === 'PENDING'
                   }">
                  {{ step.label }}
                </p>
                <p *ngIf="step.detail" class="mt-0.5 text-xs font-mono text-foreground/40">
                  {{ step.detail }}
                </p>
              </div>

              <!-- Timestamp -->
              <span *ngIf="step.timestamp && step.status === 'DONE'"
                    class="shrink-0 text-xs tabular text-foreground/30">
                {{ formatTime(step.timestamp) }}
              </span>
            </div>

            <!-- Indeterminate progress bar when running -->
            <div *ngIf="isRunning" class="mt-4 relative h-0.5 w-full bg-muted overflow-hidden rounded-full">
              <div class="absolute h-full w-1/3 bg-accent rounded-full animate-progress-bar"></div>
            </div>
          </div>
        </div>

        <!-- Results section -->
        <div *ngIf="result" class="space-y-6 animate-slide-up">

          <!-- Risk score card -->
          <div class="card p-6">
            <h2 class="text-sm font-medium text-foreground/50 uppercase tracking-wider mb-5">
              Audit Result
            </h2>
            <div class="flex items-center gap-8">

              <!-- Circular gauge -->
              <div class="relative shrink-0 flex items-center justify-center">
                <svg class="h-28 w-28 -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="8"
                          class="text-muted" />
                  <circle
                    cx="50" cy="50" r="40" fill="none" stroke-width="8"
                    [attr.stroke]="riskColor(result.risk_score)"
                    [attr.stroke-dasharray]="251.2"
                    [attr.stroke-dashoffset]="251.2 - (251.2 * result.risk_score / 100)"
                    stroke-linecap="round"
                    class="transition-all duration-700 ease-out"
                  />
                </svg>
                <div class="absolute flex flex-col items-center">
                  <span class="text-3xl font-bold tabular"
                        [style.color]="riskColor(result.risk_score)">
                    {{ result.risk_score }}
                  </span>
                  <span class="text-xs text-foreground/40">/100</span>
                </div>
              </div>

              <!-- Summary -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-3">
                  <span [ngClass]="riskBadgeClass(result.risk_score)" class="text-sm px-3 py-1">
                    {{ riskLabel(result.risk_score) }}
                  </span>
                </div>
                <p class="text-sm text-foreground/70 leading-relaxed">{{ result.risk_summary }}</p>
              </div>

            </div>
          </div>

          <!-- Anomalies list -->
          <div *ngIf="result.anomalies.length > 0" class="card">
            <div class="px-5 py-4 border-b border-border">
              <h2 class="text-sm font-semibold text-foreground">
                Detected Anomalies
                <span class="ml-2 text-foreground/40 font-normal">({{ result.anomalies.length }})</span>
              </h2>
            </div>
            <ul class="divide-y divide-border" role="list" aria-label="Anomaly flags">
              <li
                *ngFor="let a of result.anomalies; trackBy: trackByCode"
                class="px-5 py-4 flex items-start gap-4"
              >
                <!-- Severity pill -->
                <span
                  class="mt-0.5 shrink-0 rounded-md px-2 py-0.5 text-xs font-semibold"
                  [ngClass]="severityClass(a.severity)"
                >{{ a.severity }}</span>

                <!-- Detail -->
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-foreground font-mono">{{ a.code }}</p>
                  <p class="mt-1 text-sm text-foreground/60">{{ a.description }}</p>
                  <div *ngIf="a.affected_documents.length > 0" class="mt-2 flex flex-wrap gap-1.5">
                    <span
                      *ngFor="let doc of a.affected_documents"
                      class="rounded bg-muted border border-border px-2 py-0.5 text-xs font-mono text-foreground/50"
                    >{{ doc }}</span>
                  </div>
                </div>

                <!-- Amount delta -->
                <div *ngIf="a.delta_amount !== null" class="shrink-0 text-right">
                  <span class="text-sm font-semibold tabular text-destructive">
                    +{{ a.delta_amount | number:'1.2-2' }}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <!-- No anomalies -->
          <div *ngIf="result.anomalies.length === 0" class="card flex flex-col items-center gap-3 py-10 text-center">
            <svg class="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
            <p class="text-base font-medium text-foreground">No anomalies detected</p>
            <p class="text-sm text-foreground/50">This audit session passed all checks.</p>
          </div>

        </div>

        <!-- Error banner -->
        <div *ngIf="wsError" class="card p-5 border-destructive/30 bg-destructive/5 animate-slide-up" role="alert">
          <div class="flex items-center gap-3">
            <svg class="h-5 w-5 text-destructive shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <div>
              <p class="text-sm font-medium text-destructive">Pipeline Error</p>
              <p class="text-sm text-foreground/50 mt-0.5">{{ wsError }}</p>
            </div>
          </div>
        </div>

      </ng-container>
    </div>
  `
    }]
  }], () => [{ type: ActivatedRoute }, { type: ApiService }, { type: WebSocketService }, { type: ChangeDetectorRef }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LiveAuditComponent, { className: "LiveAuditComponent", filePath: "src/app/features/live-audit/live-audit.component.ts", lineNumber: 294 });
})();
export {
  LiveAuditComponent
};
//# sourceMappingURL=chunk-4TATJR7J.js.map
