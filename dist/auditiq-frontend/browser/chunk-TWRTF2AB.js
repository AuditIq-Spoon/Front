import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-YGRBEE3D.js";
import {
  DOC_TYPE_LABELS
} from "./chunk-SNCFYU2E.js";
import {
  ApiService
} from "./chunk-ZLFUANLR.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  NgForOf,
  NgIf,
  RouterLink,
  forkJoin,
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
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-W2VXPSOJ.js";

// src/app/features/documents/documents.component.ts
var _c0 = () => [1, 2, 3, 4, 5];
function DocumentsComponent_p_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.windowError);
  }
}
function DocumentsComponent_div_27_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 20);
  }
}
function DocumentsComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275template(1, DocumentsComponent_div_27_div_1_Template, 1, 0, "div", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", \u0275\u0275pureFunction0(1, _c0));
  }
}
function DocumentsComponent_ng_container_28_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275text(1, " No documents yet. ");
    \u0275\u0275elementStart(2, "a", 30);
    \u0275\u0275text(3, "Upload files");
    \u0275\u0275elementEnd()();
  }
}
function DocumentsComponent_ng_container_28_div_7_tr_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 41)(1, "td", 42)(2, "p", 43);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 44);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 45);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 46);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 47);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 48);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(d_r2.filename);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.docLabel(d_r2.document_type));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.docLabel(d_r2.document_type));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", d_r2.transaction_date || "\u2014", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", d_r2.tender_id || "\u2014", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatDt(d_r2.uploaded_at), " ");
  }
}
function DocumentsComponent_ng_container_28_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "table", 32)(2, "thead")(3, "tr", 33)(4, "th", 34);
    \u0275\u0275text(5, "File");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 35);
    \u0275\u0275text(7, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 36);
    \u0275\u0275text(9, "Transaction");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 37);
    \u0275\u0275text(11, "Tender");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 38);
    \u0275\u0275text(13, "Uploaded");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody", 39);
    \u0275\u0275template(15, DocumentsComponent_ng_container_28_div_7_tr_15_Template, 14, 6, "tr", 40);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(15);
    \u0275\u0275property("ngForOf", ctx_r0.allDocs)("ngForTrackBy", ctx_r0.trackById);
  }
}
function DocumentsComponent_ng_container_28_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275text(1, " No documents with a transaction date in this range. ");
    \u0275\u0275elementEnd();
  }
}
function DocumentsComponent_ng_container_28_div_16_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 41)(1, "td", 52);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 45);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 53);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 48);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const d_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r3.filename);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.docLabel(d_r3.document_type));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(d_r3.transaction_date);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatDt(d_r3.uploaded_at), " ");
  }
}
function DocumentsComponent_ng_container_28_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50)(1, "table", 32)(2, "thead")(3, "tr", 51)(4, "th", 34);
    \u0275\u0275text(5, "File");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 35);
    \u0275\u0275text(7, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 34);
    \u0275\u0275text(9, "Transaction");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 38);
    \u0275\u0275text(11, "Uploaded");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "tbody", 39);
    \u0275\u0275template(13, DocumentsComponent_ng_container_28_div_16_tr_13_Template, 9, 4, "tr", 40);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(13);
    \u0275\u0275property("ngForOf", ctx_r0.windowDocs)("ngForTrackBy", ctx_r0.trackById);
  }
}
function DocumentsComponent_ng_container_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 21)(2, "h2", 22);
    \u0275\u0275text(3, " All uploads ");
    \u0275\u0275elementStart(4, "span", 23);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, DocumentsComponent_ng_container_28_div_6_Template, 4, 0, "div", 24)(7, DocumentsComponent_ng_container_28_div_7_Template, 16, 2, "div", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div")(9, "h2", 22);
    \u0275\u0275text(10, " In audit window ");
    \u0275\u0275elementStart(11, "span", 23);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "p", 26);
    \u0275\u0275text(14, " Bank statements & invoices use this date filter during an INOUT session; quotes and price books are unbounded on dates in the pipeline. ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, DocumentsComponent_ng_container_28_div_15_Template, 2, 0, "div", 27)(16, DocumentsComponent_ng_container_28_div_16_Template, 14, 2, "div", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("(", ctx_r0.allDocs.length, ")");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.allDocs.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.allDocs.length > 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate3(" (", ctx_r0.winStart, " \u2192 ", ctx_r0.winEnd, ", ", ctx_r0.windowDocs.length, ") ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.windowDocs.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.windowDocs.length > 0);
  }
}
var DocumentsComponent = class _DocumentsComponent {
  constructor(api, cd) {
    this.api = api;
    this.cd = cd;
    this.allDocs = [];
    this.windowDocs = [];
    this.winStart = "";
    this.winEnd = "";
    this.loading = true;
    this.windowError = "";
  }
  ngOnInit() {
    const end = /* @__PURE__ */ new Date();
    const start = /* @__PURE__ */ new Date();
    start.setDate(end.getDate() - 30);
    this.winEnd = end.toISOString().slice(0, 10);
    this.winStart = start.toISOString().slice(0, 10);
    this.reload();
  }
  reload() {
    this.windowError = "";
    if (!this.winStart || !this.winEnd) {
      this.windowError = "Please choose both start and end dates.";
      return;
    }
    if (this.winStart > this.winEnd) {
      this.windowError = "Start date must be on or before end date.";
      return;
    }
    this.loading = true;
    this.cd.markForCheck();
    forkJoin({
      all: this.api.listDocuments(),
      window: this.api.listDocuments(this.winStart, this.winEnd)
    }).subscribe({
      next: ({ all, window }) => {
        this.allDocs = all;
        this.windowDocs = window;
        this.loading = false;
        this.cd.markForCheck();
      },
      error: (err) => {
        this.windowError = err.message;
        this.loading = false;
        this.cd.markForCheck();
      }
    });
  }
  docLabel(t) {
    return DOC_TYPE_LABELS[t] ?? t;
  }
  formatDt(iso) {
    try {
      return new Date(iso).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return iso;
    }
  }
  trackById(_, d) {
    return d.id;
  }
  static {
    this.\u0275fac = function DocumentsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DocumentsComponent)(\u0275\u0275directiveInject(ApiService), \u0275\u0275directiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DocumentsComponent, selectors: [["app-documents"]], decls: 29, vars: 6, consts: [[1, "mx-auto", "max-w-7xl", "px-4", "py-10", "sm:px-6", "lg:px-8", "animate-fade-in"], [1, "mb-8"], [1, "text-3xl", "font-semibold", "text-foreground"], [1, "mt-1", "text-sm", "text-foreground/60"], [1, "font-medium", "text-foreground/80"], [1, "text-xs", "font-mono", "text-accent/90"], [1, "card", "p-5", "mb-8"], [1, "text-sm", "font-semibold", "text-foreground", "mb-4"], [1, "flex", "flex-wrap", "items-end", "gap-4"], ["for", "win_start", 1, "label", "text-xs"], ["id", "win_start", "type", "date", 1, "input", "text-sm", 3, "ngModelChange", "ngModel"], ["for", "win_end", 1, "label", "text-xs"], ["id", "win_end", "type", "date", 1, "input", "text-sm", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "btn-primary", "text-sm", 3, "click", "disabled"], ["class", "mt-3 text-sm text-destructive", "role", "alert", 4, "ngIf"], ["class", "space-y-3", "aria-busy", "true", 4, "ngIf"], [4, "ngIf"], ["role", "alert", 1, "mt-3", "text-sm", "text-destructive"], ["aria-busy", "true", 1, "space-y-3"], ["class", "card h-12 animate-pulse bg-muted/50", 4, "ngFor", "ngForOf"], [1, "card", "h-12", "animate-pulse", "bg-muted/50"], [1, "mb-10"], [1, "text-lg", "font-semibold", "text-foreground", "mb-3"], [1, "ml-2", "text-sm", "font-normal", "text-foreground/40"], ["class", "card py-12 text-center text-sm text-foreground/50", 4, "ngIf"], ["class", "card overflow-hidden", 4, "ngIf"], [1, "text-xs", "text-foreground/40", "mb-3"], ["class", "card py-10 text-center text-sm text-foreground/50", 4, "ngIf"], ["class", "card overflow-hidden border-accent/20", 4, "ngIf"], [1, "card", "py-12", "text-center", "text-sm", "text-foreground/50"], ["routerLink", "/upload", 1, "text-accent", "hover:underline"], [1, "card", "overflow-hidden"], ["role", "grid", 1, "w-full", "text-sm"], [1, "border-b", "border-border", "bg-primary/50"], [1, "px-4", "py-2", "text-left", "text-xs", "font-medium", "text-foreground/50", "uppercase"], [1, "px-4", "py-2", "text-left", "text-xs", "font-medium", "text-foreground/50", "uppercase", "hidden", "sm:table-cell"], [1, "px-4", "py-2", "text-left", "text-xs", "font-medium", "text-foreground/50", "uppercase", "hidden", "md:table-cell"], [1, "px-4", "py-2", "text-left", "text-xs", "font-medium", "text-foreground/50", "uppercase", "hidden", "lg:table-cell"], [1, "px-4", "py-2", "text-right", "text-xs", "font-medium", "text-foreground/50", "uppercase"], [1, "divide-y", "divide-border"], ["class", "hover:bg-muted/30", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "hover:bg-muted/30"], [1, "px-4", "py-2.5"], [1, "font-medium", "text-foreground", "truncate", "max-w-[200px]", "sm:max-w-xs"], [1, "text-xs", "text-foreground/40", "sm:hidden"], [1, "px-4", "py-2.5", "text-foreground/70", "hidden", "sm:table-cell"], [1, "px-4", "py-2.5", "font-mono", "text-xs", "text-foreground/60", "hidden", "md:table-cell"], [1, "px-4", "py-2.5", "text-xs", "text-foreground/50", "hidden", "lg:table-cell"], [1, "px-4", "py-2.5", "text-right", "text-xs", "text-foreground/40", "tabular", "whitespace-nowrap"], [1, "card", "py-10", "text-center", "text-sm", "text-foreground/50"], [1, "card", "overflow-hidden", "border-accent/20"], [1, "border-b", "border-border", "bg-accent/5"], [1, "px-4", "py-2.5", "font-medium", "text-foreground", "truncate", "max-w-[200px]", "sm:max-w-xs"], [1, "px-4", "py-2.5", "font-mono", "text-xs", "text-accent/90"]], template: function DocumentsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Document Library");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p", 3);
        \u0275\u0275text(5, " Every uploaded file appears below. Use the date window to see documents that would be included in an ");
        \u0275\u0275elementStart(6, "span", 4);
        \u0275\u0275text(7, "INOUT");
        \u0275\u0275elementEnd();
        \u0275\u0275text(8, " audit (same rule as session creation: business ");
        \u0275\u0275elementStart(9, "code", 5);
        \u0275\u0275text(10, "transaction_date");
        \u0275\u0275elementEnd();
        \u0275\u0275text(11, " between start and end). ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "div", 6)(13, "h2", 7);
        \u0275\u0275text(14, "INOUT audit date window");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "div", 8)(16, "div")(17, "label", 9);
        \u0275\u0275text(18, "Start date");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "input", 10);
        \u0275\u0275twoWayListener("ngModelChange", function DocumentsComponent_Template_input_ngModelChange_19_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.winStart, $event) || (ctx.winStart = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "div")(21, "label", 11);
        \u0275\u0275text(22, "End date");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "input", 12);
        \u0275\u0275twoWayListener("ngModelChange", function DocumentsComponent_Template_input_ngModelChange_23_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.winEnd, $event) || (ctx.winEnd = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(24, "button", 13);
        \u0275\u0275listener("click", function DocumentsComponent_Template_button_click_24_listener() {
          return ctx.reload();
        });
        \u0275\u0275text(25, " Apply window ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(26, DocumentsComponent_p_26_Template, 2, 1, "p", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275template(27, DocumentsComponent_div_27_Template, 2, 2, "div", 15)(28, DocumentsComponent_ng_container_28_Template, 17, 8, "ng-container", 16);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(19);
        \u0275\u0275twoWayProperty("ngModel", ctx.winStart);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.winEnd);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.windowError);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, RouterLink], encapsulation: 2, changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DocumentsComponent, [{
    type: Component,
    args: [{
      selector: "app-documents",
      standalone: true,
      imports: [CommonModule, FormsModule, RouterLink],
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 animate-fade-in">

      <div class="mb-8">
        <h1 class="text-3xl font-semibold text-foreground">Document Library</h1>
        <p class="mt-1 text-sm text-foreground/60">
          Every uploaded file appears below. Use the date window to see documents that would be included in an
          <span class="font-medium text-foreground/80">INOUT</span> audit (same rule as session creation: business
          <code class="text-xs font-mono text-accent/90">transaction_date</code> between start and end).
        </p>
      </div>

      <!-- Date window -->
      <div class="card p-5 mb-8">
        <h2 class="text-sm font-semibold text-foreground mb-4">INOUT audit date window</h2>
        <div class="flex flex-wrap items-end gap-4">
          <div>
            <label class="label text-xs" for="win_start">Start date</label>
            <input id="win_start" type="date" [(ngModel)]="winStart" class="input text-sm" />
          </div>
          <div>
            <label class="label text-xs" for="win_end">End date</label>
            <input id="win_end" type="date" [(ngModel)]="winEnd" class="input text-sm" />
          </div>
          <button type="button" (click)="reload()" class="btn-primary text-sm" [disabled]="loading">
            Apply window
          </button>
        </div>
        <p *ngIf="windowError" class="mt-3 text-sm text-destructive" role="alert">{{ windowError }}</p>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="space-y-3" aria-busy="true">
        <div *ngFor="let _ of [1,2,3,4,5]" class="card h-12 animate-pulse bg-muted/50"></div>
      </div>

      <ng-container *ngIf="!loading">

        <!-- All documents -->
        <div class="mb-10">
          <h2 class="text-lg font-semibold text-foreground mb-3">
            All uploads
            <span class="ml-2 text-sm font-normal text-foreground/40">({{ allDocs.length }})</span>
          </h2>
          <div *ngIf="allDocs.length === 0" class="card py-12 text-center text-sm text-foreground/50">
            No documents yet. <a routerLink="/upload" class="text-accent hover:underline">Upload files</a>
          </div>
          <div *ngIf="allDocs.length > 0" class="card overflow-hidden">
            <table class="w-full text-sm" role="grid">
              <thead>
                <tr class="border-b border-border bg-primary/50">
                  <th class="px-4 py-2 text-left text-xs font-medium text-foreground/50 uppercase">File</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-foreground/50 uppercase hidden sm:table-cell">Type</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-foreground/50 uppercase hidden md:table-cell">Transaction</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-foreground/50 uppercase hidden lg:table-cell">Tender</th>
                  <th class="px-4 py-2 text-right text-xs font-medium text-foreground/50 uppercase">Uploaded</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                <tr *ngFor="let d of allDocs; trackBy: trackById" class="hover:bg-muted/30">
                  <td class="px-4 py-2.5">
                    <p class="font-medium text-foreground truncate max-w-[200px] sm:max-w-xs">{{ d.filename }}</p>
                    <p class="text-xs text-foreground/40 sm:hidden">{{ docLabel(d.document_type) }}</p>
                  </td>
                  <td class="px-4 py-2.5 text-foreground/70 hidden sm:table-cell">{{ docLabel(d.document_type) }}</td>
                  <td class="px-4 py-2.5 font-mono text-xs text-foreground/60 hidden md:table-cell">
                    {{ d.transaction_date || '\u2014' }}
                  </td>
                  <td class="px-4 py-2.5 text-xs text-foreground/50 hidden lg:table-cell">
                    {{ d.tender_id || '\u2014' }}
                  </td>
                  <td class="px-4 py-2.5 text-right text-xs text-foreground/40 tabular whitespace-nowrap">
                    {{ formatDt(d.uploaded_at) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- In-window -->
        <div>
          <h2 class="text-lg font-semibold text-foreground mb-3">
            In audit window
            <span class="ml-2 text-sm font-normal text-foreground/40">
              ({{ winStart }} \u2192 {{ winEnd }}, {{ windowDocs.length }})
            </span>
          </h2>
          <p class="text-xs text-foreground/40 mb-3">
            Bank statements & invoices use this date filter during an INOUT session; quotes and price books are unbounded on dates in the pipeline.
          </p>
          <div *ngIf="windowDocs.length === 0" class="card py-10 text-center text-sm text-foreground/50">
            No documents with a transaction date in this range.
          </div>
          <div *ngIf="windowDocs.length > 0" class="card overflow-hidden border-accent/20">
            <table class="w-full text-sm" role="grid">
              <thead>
                <tr class="border-b border-border bg-accent/5">
                  <th class="px-4 py-2 text-left text-xs font-medium text-foreground/50 uppercase">File</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-foreground/50 uppercase hidden sm:table-cell">Type</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-foreground/50 uppercase">Transaction</th>
                  <th class="px-4 py-2 text-right text-xs font-medium text-foreground/50 uppercase">Uploaded</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                <tr *ngFor="let d of windowDocs; trackBy: trackById" class="hover:bg-muted/30">
                  <td class="px-4 py-2.5 font-medium text-foreground truncate max-w-[200px] sm:max-w-xs">{{ d.filename }}</td>
                  <td class="px-4 py-2.5 text-foreground/70 hidden sm:table-cell">{{ docLabel(d.document_type) }}</td>
                  <td class="px-4 py-2.5 font-mono text-xs text-accent/90">{{ d.transaction_date }}</td>
                  <td class="px-4 py-2.5 text-right text-xs text-foreground/40 tabular whitespace-nowrap">
                    {{ formatDt(d.uploaded_at) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </ng-container>
    </div>
  `
    }]
  }], () => [{ type: ApiService }, { type: ChangeDetectorRef }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DocumentsComponent, { className: "DocumentsComponent", filePath: "src/app/features/documents/documents.component.ts", lineNumber: 137 });
})();
export {
  DocumentsComponent
};
//# sourceMappingURL=chunk-TWRTF2AB.js.map
