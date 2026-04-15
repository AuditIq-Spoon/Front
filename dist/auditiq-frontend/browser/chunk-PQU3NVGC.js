import {
  riskBadgeClass,
  riskColor,
  riskLabel
} from "./chunk-SNCFYU2E.js";
import {
  ApiService
} from "./chunk-ZLFUANLR.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  NgClass,
  NgForOf,
  NgIf,
  RouterLink,
  SlicePipe,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction4,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-W2VXPSOJ.js";

// src/app/features/dashboard/dashboard.component.ts
var _c0 = () => [1, 2, 3, 4];
var _c1 = (a0) => ["/audit", a0];
var _c2 = (a0, a1, a2, a3) => ({ "bg-blue-500/10": a0, "text-blue-400": a1, "bg-purple-500/10": a2, "text-purple-400": a3 });
function DashboardComponent_div_11_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 14);
  }
}
function DashboardComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275template(1, DashboardComponent_div_11_div_1_Template, 1, 0, "div", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", \u0275\u0275pureFunction0(1, _c0));
  }
}
function DashboardComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 16);
    \u0275\u0275element(2, "path", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "div")(4, "p", 18);
    \u0275\u0275text(5, "Failed to load sessions");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 19);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 20);
    \u0275\u0275listener("click", function DashboardComponent_div_12_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.load());
    });
    \u0275\u0275text(9, "Retry");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function DashboardComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 22);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 23);
    \u0275\u0275element(3, "path", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "div")(5, "p", 18);
    \u0275\u0275text(6, "No audit sessions yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 19);
    \u0275\u0275text(8, "Upload documents and create your first audit session.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 25)(10, "a", 26);
    \u0275\u0275text(11, "Upload Documents");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "a", 5);
    \u0275\u0275text(13, "New Audit");
    \u0275\u0275elementEnd()()();
  }
}
function DashboardComponent_div_14_tr_20_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const s_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", s_r3.params["start_date"], " \u2192 ", s_r3.params["end_date"], " ");
  }
}
function DashboardComponent_div_14_tr_20_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const s_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", s_r3.params["project_name"], " ");
  }
}
function DashboardComponent_div_14_tr_20_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 51);
    \u0275\u0275element(2, "div", 52);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 53);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const s_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", s_r3.risk_score, "%")("background-color", ctx_r1.riskColor(s_r3.risk_score));
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", ctx_r1.riskColor(s_r3.risk_score));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r3.risk_score);
  }
}
function DashboardComponent_div_14_tr_20_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 54);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_div_14_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 37)(1, "td", 38)(2, "span", 39);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "slice");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "td", 38)(6, "span", 40);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td", 41);
    \u0275\u0275template(9, DashboardComponent_div_14_tr_20_ng_container_9_Template, 2, 2, "ng-container", 42)(10, DashboardComponent_div_14_tr_20_ng_container_10_Template, 2, 1, "ng-container", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 38)(12, "span", 43);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td", 44)(15, "div", 45);
    \u0275\u0275template(16, DashboardComponent_div_14_tr_20_ng_container_16_Template, 5, 7, "ng-container", 46)(17, DashboardComponent_div_14_tr_20_ng_template_17_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "td", 47);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "td", 48);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(22, "svg", 49);
    \u0275\u0275element(23, "path", 50);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const s_r3 = ctx.$implicit;
    const noScore_r4 = \u0275\u0275reference(18);
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(15, _c1, s_r3.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind3(4, 11, s_r3.id, 0, 8), "\u2026");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction4(17, _c2, s_r3.audit_type === "INOUT", s_r3.audit_type === "INOUT", s_r3.audit_type === "TENDER", s_r3.audit_type === "TENDER"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", s_r3.audit_type, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", s_r3.audit_type === "INOUT");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", s_r3.audit_type === "TENDER");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.statusBadge(s_r3.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", s_r3.status, " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", s_r3.risk_score !== null)("ngIfElse", noScore_r4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatDate(s_r3.created_at), " ");
  }
}
function DashboardComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "table", 28)(2, "thead")(3, "tr", 29)(4, "th", 30);
    \u0275\u0275text(5, "Session");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 30);
    \u0275\u0275text(7, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 31);
    \u0275\u0275text(9, "Parameters");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 30);
    \u0275\u0275text(11, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 32);
    \u0275\u0275text(13, "Risk Score");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 33);
    \u0275\u0275text(15, "Created");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 32)(17, "span", 34);
    \u0275\u0275text(18, "Actions");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(19, "tbody", 35);
    \u0275\u0275template(20, DashboardComponent_div_14_tr_20_Template, 24, 22, "tr", 36);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(20);
    \u0275\u0275property("ngForOf", ctx_r1.sessions)("ngForTrackBy", ctx_r1.trackById);
  }
}
var DashboardComponent = class _DashboardComponent {
  constructor(api, cd) {
    this.api = api;
    this.cd = cd;
    this.sessions = [];
    this.loading = true;
    this.error = "";
    this.riskBadgeClass = riskBadgeClass;
    this.riskLabel = riskLabel;
    this.riskColor = riskColor;
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading = true;
    this.error = "";
    this.cd.markForCheck();
    this.api.listSessions().subscribe({
      next: (sessions) => {
        this.sessions = sessions;
        this.loading = false;
        this.cd.markForCheck();
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
        this.cd.markForCheck();
      }
    });
  }
  statusBadge(status) {
    const map = {
      PENDING: "badge-pending",
      RUNNING: "badge-running",
      COMPLETED: "badge-safe",
      FAILED: "badge-critical"
    };
    return map[status] ?? "badge-pending";
  }
  formatDate(iso) {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }
  trackById(_, s) {
    return s.id;
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DashboardComponent)(\u0275\u0275directiveInject(ApiService), \u0275\u0275directiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], decls: 15, vars: 4, consts: [["noScore", ""], [1, "mx-auto", "max-w-7xl", "px-4", "py-10", "sm:px-6", "lg:px-8", "animate-fade-in"], [1, "flex", "items-center", "justify-between", "mb-8"], [1, "text-3xl", "font-semibold", "text-foreground"], [1, "mt-1", "text-sm", "text-foreground/60"], ["routerLink", "/new-session", 1, "btn-primary", "text-sm"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2.5", "aria-hidden", "true", 1, "h-4", "w-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M12 4.5v15m7.5-7.5h-15"], ["class", "space-y-3", "aria-busy", "true", "aria-label", "Loading sessions", 4, "ngIf"], ["class", "card flex flex-col items-center gap-4 py-16 text-center", "role", "alert", 4, "ngIf"], ["class", "card flex flex-col items-center gap-4 py-20 text-center", 4, "ngIf"], ["class", "card overflow-hidden animate-slide-up", 4, "ngIf"], ["aria-busy", "true", "aria-label", "Loading sessions", 1, "space-y-3"], ["class", "card h-20 animate-pulse bg-muted/50", 4, "ngFor", "ngForOf"], [1, "card", "h-20", "animate-pulse", "bg-muted/50"], ["role", "alert", 1, "card", "flex", "flex-col", "items-center", "gap-4", "py-16", "text-center"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "1.5", "aria-hidden", "true", 1, "h-10", "w-10", "text-destructive"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"], [1, "text-base", "font-medium", "text-foreground"], [1, "mt-1", "text-sm", "text-foreground/50"], [1, "btn-secondary", "text-sm", 3, "click"], [1, "card", "flex", "flex-col", "items-center", "gap-4", "py-20", "text-center"], [1, "flex", "h-16", "w-16", "items-center", "justify-center", "rounded-2xl", "bg-muted", "border", "border-border"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "1.5", "aria-hidden", "true", 1, "h-8", "w-8", "text-foreground/30"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"], [1, "flex", "gap-3"], ["routerLink", "/upload", 1, "btn-secondary", "text-sm"], [1, "card", "overflow-hidden", "animate-slide-up"], ["role", "grid", "aria-label", "Audit sessions", 1, "w-full", "text-sm"], [1, "border-b", "border-border", "bg-primary/50"], ["scope", "col", 1, "px-4", "py-3", "text-left", "text-xs", "font-medium", "text-foreground/50", "uppercase", "tracking-wider"], ["scope", "col", 1, "px-4", "py-3", "text-left", "text-xs", "font-medium", "text-foreground/50", "uppercase", "tracking-wider", "hidden", "sm:table-cell"], ["scope", "col", 1, "px-4", "py-3", "text-right", "text-xs", "font-medium", "text-foreground/50", "uppercase", "tracking-wider"], ["scope", "col", 1, "px-4", "py-3", "text-right", "text-xs", "font-medium", "text-foreground/50", "uppercase", "tracking-wider", "hidden", "md:table-cell"], [1, "sr-only"], [1, "divide-y", "divide-border"], ["class", "hover:bg-muted/40 transition-colors duration-100 cursor-pointer group", "role", "row", 3, "routerLink", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["role", "row", 1, "hover:bg-muted/40", "transition-colors", "duration-100", "cursor-pointer", "group", 3, "routerLink"], [1, "px-4", "py-3"], [1, "font-mono", "text-xs", "text-foreground/40"], [1, "inline-flex", "items-center", "gap-1.5", "rounded-md", "px-2", "py-0.5", "text-xs", "font-medium", 3, "ngClass"], [1, "px-4", "py-3", "text-foreground/60", "hidden", "sm:table-cell"], [4, "ngIf"], [3, "ngClass"], [1, "px-4", "py-3", "text-right", "tabular"], [1, "flex", "items-center", "justify-end", "gap-2"], [4, "ngIf", "ngIfElse"], [1, "px-4", "py-3", "text-right", "text-xs", "text-foreground/40", "hidden", "md:table-cell", "tabular"], [1, "px-4", "py-3", "text-right"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true", 1, "ml-auto", "h-4", "w-4", "text-foreground/20", "group-hover:text-accent", "transition-colors", "duration-150"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "m8.25 4.5 7.5 7.5-7.5 7.5"], [1, "relative", "h-1.5", "w-16", "rounded-full", "bg-muted", "overflow-hidden"], [1, "absolute", "left-0", "top-0", "h-full", "rounded-full", "transition-all", "duration-500"], [1, "text-sm", "font-semibold", "tabular"], [1, "text-sm", "text-foreground/30"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div")(3, "h1", 3);
        \u0275\u0275text(4, "Audit Dashboard");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 4);
        \u0275\u0275text(6, "Overview of all audit sessions and their risk scores.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "a", 5);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(8, "svg", 6);
        \u0275\u0275element(9, "path", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275text(10, " New Audit ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(11, DashboardComponent_div_11_Template, 2, 2, "div", 8)(12, DashboardComponent_div_12_Template, 10, 1, "div", 9)(13, DashboardComponent_div_13_Template, 14, 0, "div", 10)(14, DashboardComponent_div_14_Template, 21, 2, "div", 11);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && ctx.error);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.sessions.length === 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading && !ctx.error && ctx.sessions.length > 0);
      }
    }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, SlicePipe, RouterLink], encapsulation: 2, changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardComponent, [{
    type: Component,
    args: [{
      selector: "app-dashboard",
      standalone: true,
      imports: [CommonModule, RouterLink],
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 animate-fade-in">

      <!-- Header row -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-semibold text-foreground">Audit Dashboard</h1>
          <p class="mt-1 text-sm text-foreground/60">Overview of all audit sessions and their risk scores.</p>
        </div>
        <a routerLink="/new-session" class="btn-primary text-sm">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Audit
        </a>
      </div>

      <!-- Loading skeleton -->
      <div *ngIf="loading" class="space-y-3" aria-busy="true" aria-label="Loading sessions">
        <div *ngFor="let _ of [1,2,3,4]" class="card h-20 animate-pulse bg-muted/50"></div>
      </div>

      <!-- Error state -->
      <div *ngIf="!loading && error"
           class="card flex flex-col items-center gap-4 py-16 text-center"
           role="alert">
        <svg class="h-10 w-10 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
        <div>
          <p class="text-base font-medium text-foreground">Failed to load sessions</p>
          <p class="mt-1 text-sm text-foreground/50">{{ error }}</p>
        </div>
        <button (click)="load()" class="btn-secondary text-sm">Retry</button>
      </div>

      <!-- Empty state -->
      <div *ngIf="!loading && !error && sessions.length === 0"
           class="card flex flex-col items-center gap-4 py-20 text-center">
        <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted border border-border">
          <svg class="h-8 w-8 text-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
          </svg>
        </div>
        <div>
          <p class="text-base font-medium text-foreground">No audit sessions yet</p>
          <p class="mt-1 text-sm text-foreground/50">Upload documents and create your first audit session.</p>
        </div>
        <div class="flex gap-3">
          <a routerLink="/upload" class="btn-secondary text-sm">Upload Documents</a>
          <a routerLink="/new-session" class="btn-primary text-sm">New Audit</a>
        </div>
      </div>

      <!-- Sessions table -->
      <div *ngIf="!loading && !error && sessions.length > 0"
           class="card overflow-hidden animate-slide-up">
        <table class="w-full text-sm" role="grid" aria-label="Audit sessions">
          <thead>
            <tr class="border-b border-border bg-primary/50">
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Session</th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Type</th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider hidden sm:table-cell">Parameters</th>
              <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-foreground/50 uppercase tracking-wider">Risk Score</th>
              <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-foreground/50 uppercase tracking-wider hidden md:table-cell">Created</th>
              <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-foreground/50 uppercase tracking-wider">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr
              *ngFor="let s of sessions; trackBy: trackById"
              class="hover:bg-muted/40 transition-colors duration-100 cursor-pointer group"
              [routerLink]="['/audit', s.id]"
              role="row"
            >
              <!-- Session ID -->
              <td class="px-4 py-3">
                <span class="font-mono text-xs text-foreground/40">{{ s.id | slice:0:8 }}\u2026</span>
              </td>

              <!-- Type badge -->
              <td class="px-4 py-3">
                <span
                  class="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium"
                  [ngClass]="{
                    'bg-blue-500/10': s.audit_type === 'INOUT',
                    'text-blue-400': s.audit_type === 'INOUT',
                    'bg-purple-500/10': s.audit_type === 'TENDER',
                    'text-purple-400': s.audit_type === 'TENDER'
                  }"
                >
                  {{ s.audit_type }}
                </span>
              </td>

              <!-- Params summary -->
              <td class="px-4 py-3 text-foreground/60 hidden sm:table-cell">
                <ng-container *ngIf="s.audit_type === 'INOUT'">
                  {{ s.params['start_date'] }} \u2192 {{ s.params['end_date'] }}
                </ng-container>
                <ng-container *ngIf="s.audit_type === 'TENDER'">
                  {{ s.params['project_name'] }}
                </ng-container>
              </td>

              <!-- Status -->
              <td class="px-4 py-3">
                <span [ngClass]="statusBadge(s.status)">
                  {{ s.status }}
                </span>
              </td>

              <!-- Risk score gauge -->
              <td class="px-4 py-3 text-right tabular">
                <div class="flex items-center justify-end gap-2">
                  <ng-container *ngIf="s.risk_score !== null; else noScore">
                    <!-- Mini gauge -->
                    <div class="relative h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                      <div
                        class="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
                        [style.width.%]="s.risk_score"
                        [style.background-color]="riskColor(s.risk_score)"
                      ></div>
                    </div>
                    <span
                      class="text-sm font-semibold tabular"
                      [style.color]="riskColor(s.risk_score)"
                    >{{ s.risk_score }}</span>
                  </ng-container>
                  <ng-template #noScore>
                    <span class="text-sm text-foreground/30">\u2014</span>
                  </ng-template>
                </div>
              </td>

              <!-- Date -->
              <td class="px-4 py-3 text-right text-xs text-foreground/40 hidden md:table-cell tabular">
                {{ formatDate(s.created_at) }}
              </td>

              <!-- Arrow -->
              <td class="px-4 py-3 text-right">
                <svg class="ml-auto h-4 w-4 text-foreground/20 group-hover:text-accent transition-colors duration-150"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  `
    }]
  }], () => [{ type: ApiService }, { type: ChangeDetectorRef }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src/app/features/dashboard/dashboard.component.ts", lineNumber: 183 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-PQU3NVGC.js.map
