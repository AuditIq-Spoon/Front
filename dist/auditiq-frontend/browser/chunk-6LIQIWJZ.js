import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-YGRBEE3D.js";
import {
  ApiService
} from "./chunk-Q3MZI6DE.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  DecimalPipe,
  NgClass,
  NgForOf,
  NgIf,
  Router,
  RouterLink,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
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
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵpureFunction3,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-W2VXPSOJ.js";

// src/app/features/session-creator/session-creator.component.ts
var _c0 = (a0, a1, a2) => ({ "border-accent": a0, "bg-accent/5": a1, "shadow-glow-accent": a2 });
var _c1 = (a0, a1) => ({ "text-background": a0, "text-foreground/50": a1 });
var _c2 = (a0, a1) => ({ "bg-accent/5": a0, "opacity-50 cursor-not-allowed": a1 });
function SessionCreatorComponent_ng_container_31_p_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 30);
    \u0275\u0275text(1, " Start date is required. ");
    \u0275\u0275elementEnd();
  }
}
function SessionCreatorComponent_ng_container_31_p_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 31);
    \u0275\u0275text(1, " End date is required. ");
    \u0275\u0275elementEnd();
  }
}
function SessionCreatorComponent_ng_container_31_p_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 32);
    \u0275\u0275text(1, " End date must be after start date. ");
    \u0275\u0275elementEnd();
  }
}
function SessionCreatorComponent_ng_container_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 22)(2, "div")(3, "label", 23);
    \u0275\u0275text(4, " Start Date ");
    \u0275\u0275elementStart(5, "span", 6);
    \u0275\u0275text(6, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(7, "input", 24);
    \u0275\u0275template(8, SessionCreatorComponent_ng_container_31_p_8_Template, 2, 0, "p", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div")(10, "label", 26);
    \u0275\u0275text(11, " End Date ");
    \u0275\u0275elementStart(12, "span", 6);
    \u0275\u0275text(13, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(14, "input", 27);
    \u0275\u0275template(15, SessionCreatorComponent_ng_container_31_p_15_Template, 2, 0, "p", 28)(16, SessionCreatorComponent_ng_container_31_p_16_Template, 2, 0, "p", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275classProp("border-destructive", ctx_r0.isInvalid("start_date"));
    \u0275\u0275attribute("aria-invalid", ctx_r0.isInvalid("start_date"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isInvalid("start_date"));
    \u0275\u0275advance(6);
    \u0275\u0275classProp("border-destructive", ctx_r0.isInvalid("end_date") || ctx_r0.dateRangeError);
    \u0275\u0275attribute("aria-invalid", ctx_r0.isInvalid("end_date") || ctx_r0.dateRangeError);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isInvalid("end_date"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.dateRangeError);
  }
}
function SessionCreatorComponent_ng_container_32_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 36);
    \u0275\u0275element(2, "circle", 37)(3, "path", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Loading tenders\u2026 ");
    \u0275\u0275elementEnd();
  }
}
function SessionCreatorComponent_ng_container_32_div_2_div_6_p_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Due ", t_r3.deadline, " ");
  }
}
function SessionCreatorComponent_ng_container_32_div_2_div_6_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 57);
    \u0275\u0275element(2, "path", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span", 59);
    \u0275\u0275text(4, " Winner: ");
    \u0275\u0275elementStart(5, "span", 60);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(t_r3.winner.company);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" \u2014 ", \u0275\u0275pipeBind2(8, 3, t_r3.winner.amount, "1.0-0"), " ", t_r3.currency, " ");
  }
}
function SessionCreatorComponent_ng_container_32_div_2_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275listener("click", function SessionCreatorComponent_ng_container_32_div_2_div_6_Template_div_click_0_listener() {
      const t_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.selectTender(t_r3));
    });
    \u0275\u0275elementStart(1, "div", 44)(2, "div", 45)(3, "div", 46)(4, "span", 47);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 48);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "p", 49);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 50);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 51)(13, "p", 52);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, SessionCreatorComponent_ng_container_32_div_2_div_6_p_16_Template, 2, 1, "p", 53);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(17, SessionCreatorComponent_ng_container_32_div_2_div_6_div_17_Template, 9, 6, "div", 54);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("border-accent", ctx_r0.selectedTenderId === t_r3.id);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(16, _c2, ctx_r0.selectedTenderId === t_r3.id, t_r3.status === "CANCELLED"));
    \u0275\u0275attribute("aria-selected", ctx_r0.selectedTenderId === t_r3.id);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(t_r3.reference);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.tenderStatusClass(t_r3.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", t_r3.status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(t_r3.description);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(15, 13, t_r3.budget, "1.0-0"), " ", t_r3.currency, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", t_r3.deadline);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", t_r3.winner);
  }
}
function SessionCreatorComponent_ng_container_32_div_2_p_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 61);
    \u0275\u0275text(1, " Please select a tender. ");
    \u0275\u0275elementEnd();
  }
}
function SessionCreatorComponent_ng_container_32_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "label", 39);
    \u0275\u0275text(2, " Select Tender (Appel d'Offre) ");
    \u0275\u0275elementStart(3, "span", 6);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 40);
    \u0275\u0275template(6, SessionCreatorComponent_ng_container_32_div_2_div_6_Template, 18, 19, "div", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, SessionCreatorComponent_ng_container_32_div_2_p_7_Template, 2, 0, "p", 42);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r0.tenders);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.selectedTenderId && ((tmp_3_0 = ctx_r0.form.get("project_name")) == null ? null : tmp_3_0.touched));
  }
}
function SessionCreatorComponent_ng_container_32_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62)(1, "p", 63);
    \u0275\u0275text(2, "No tenders found.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "a", 64);
    \u0275\u0275text(4, "Upload Tender Documents");
    \u0275\u0275elementEnd()();
  }
}
function SessionCreatorComponent_ng_container_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, SessionCreatorComponent_ng_container_32_div_1_Template, 5, 0, "div", 33)(2, SessionCreatorComponent_ng_container_32_div_2_Template, 8, 2, "div", 17)(3, SessionCreatorComponent_ng_container_32_div_3_Template, 5, 0, "div", 34);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.loadingTenders);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.loadingTenders);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.loadingTenders && ctx_r0.tenders.length === 0);
  }
}
function SessionCreatorComponent_p_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 65);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.submitError, " ");
  }
}
function SessionCreatorComponent__svg_svg_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 36);
    \u0275\u0275element(1, "circle", 37)(2, "path", 38);
    \u0275\u0275elementEnd();
  }
}
var SessionCreatorComponent = class _SessionCreatorComponent {
  constructor(fb, api, router, cd) {
    this.fb = fb;
    this.api = api;
    this.router = router;
    this.cd = cd;
    this.selectedType = "INOUT";
    this.selectedTenderId = "";
    this.tenders = [];
    this.loadingTenders = false;
    this.isSubmitting = false;
    this.submitError = "";
    this.form = this.fb.group({
      start_date: ["", Validators.required],
      end_date: ["", Validators.required],
      project_name: ["", [Validators.required, Validators.minLength(2)]]
    });
  }
  ngOnInit() {
    this.loadTenders();
  }
  // ── Tenders ────────────────────────────────────────────────────────────────
  loadTenders() {
    this.loadingTenders = true;
    this.api.listTenders().subscribe({
      next: (tenders) => {
        this.tenders = tenders;
        this.loadingTenders = false;
        this.cd.markForCheck();
      },
      error: () => {
        this.loadingTenders = false;
        this.cd.markForCheck();
      }
    });
  }
  selectTender(t) {
    if (t.status === "CANCELLED")
      return;
    this.selectedTenderId = t.id;
    this.form.get("project_name")?.setValue(t.name);
    this.form.get("project_name")?.markAsTouched();
  }
  tenderStatusClass(status) {
    const map = {
      OPEN: "bg-accent/10 text-accent",
      AWARDED: "bg-purple-500/10 text-purple-400",
      CANCELLED: "bg-muted text-foreground/30"
    };
    return map[status] ?? "";
  }
  // ── Type selection ─────────────────────────────────────────────────────────
  selectType(type) {
    this.selectedType = type;
    this.form.markAsPristine();
    this.submitError = "";
  }
  // ── Validation helpers ─────────────────────────────────────────────────────
  isInvalid(field) {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }
  get dateRangeError() {
    const start = this.form.get("start_date")?.value;
    const end = this.form.get("end_date")?.value;
    return !!(start && end && end <= start);
  }
  // ── Submit ─────────────────────────────────────────────────────────────────
  submit() {
    if (this.selectedType === "INOUT") {
      this.form.get("start_date")?.markAsTouched();
      this.form.get("end_date")?.markAsTouched();
      if (this.form.get("start_date")?.invalid || this.form.get("end_date")?.invalid || this.dateRangeError)
        return;
    } else {
      this.form.get("project_name")?.markAsTouched();
      if (!this.selectedTenderId)
        return;
    }
    this.isSubmitting = true;
    this.submitError = "";
    const params = this.selectedType === "INOUT" ? {
      audit_type: "INOUT",
      start_date: this.form.value.start_date,
      end_date: this.form.value.end_date
    } : {
      audit_type: "TENDER",
      tender_id: this.selectedTenderId,
      project_name: this.form.value.project_name
    };
    this.api.createSession({ params }).subscribe({
      next: (session) => {
        this.isSubmitting = false;
        this.cd.markForCheck();
        this.router.navigate(["/audit", session.id]);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.submitError = err.message;
        this.cd.markForCheck();
      }
    });
  }
  static {
    this.\u0275fac = function SessionCreatorComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SessionCreatorComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ApiService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SessionCreatorComponent, selectors: [["app-session-creator"]], decls: 38, vars: 36, consts: [[1, "mx-auto", "max-w-xl", "px-4", "py-10", "sm:px-6", "lg:px-8", "animate-fade-in"], [1, "mb-8"], [1, "text-3xl", "font-semibold", "text-foreground"], [1, "mt-1.5", "text-sm", "text-foreground/60"], [1, "mb-6"], [1, "label"], ["aria-hidden", "true", 1, "text-destructive"], ["role", "radiogroup", "aria-label", "Audit type", 1, "grid", "grid-cols-2", "gap-3"], ["type", "button", "role", "radio", 1, "card", "flex", "flex-col", "gap-2", "p-4", "cursor-pointer", "text-left", "transition-all", "duration-150", "hover:border-accent/50", "hover:bg-muted/50", "focus-visible:ring-2", "focus-visible:ring-accent", 3, "click", "ngClass"], [1, "flex", "items-center", "gap-2"], [1, "flex", "h-8", "w-8", "items-center", "justify-center", "rounded-md"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true", 1, "h-4", "w-4", 3, "ngClass"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"], [1, "text-sm", "font-semibold", "text-foreground"], [1, "text-xs", "text-foreground/50", "leading-relaxed"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"], ["novalidate", "", 1, "space-y-5", "animate-slide-up", 3, "ngSubmit", "formGroup"], [4, "ngIf"], [1, "pt-2"], ["class", "mb-3 text-sm text-destructive", "role", "alert", 4, "ngIf"], ["type", "submit", 1, "btn-primary", "w-full", 3, "disabled"], ["class", "h-4 w-4 animate-spin", "fill", "none", "viewBox", "0 0 24 24", "aria-hidden", "true", 4, "ngIf"], [1, "grid", "grid-cols-2", "gap-4"], ["for", "start_date", 1, "label"], ["id", "start_date", "type", "date", "formControlName", "start_date", "aria-describedby", "start_date_err", 1, "input"], ["id", "start_date_err", "class", "mt-1 text-xs text-destructive", "role", "alert", 4, "ngIf"], ["for", "end_date", 1, "label"], ["id", "end_date", "type", "date", "formControlName", "end_date", "aria-describedby", "end_date_err", 1, "input"], ["id", "end_date_err", "class", "mt-1 text-xs text-destructive", "role", "alert", 4, "ngIf"], ["class", "mt-1 text-xs text-destructive", "role", "alert", 4, "ngIf"], ["id", "start_date_err", "role", "alert", 1, "mt-1", "text-xs", "text-destructive"], ["id", "end_date_err", "role", "alert", 1, "mt-1", "text-xs", "text-destructive"], ["role", "alert", 1, "mt-1", "text-xs", "text-destructive"], ["class", "flex items-center gap-2 text-sm text-foreground/50", 4, "ngIf"], ["class", "card flex flex-col items-center gap-3 py-8 text-center", 4, "ngIf"], [1, "flex", "items-center", "gap-2", "text-sm", "text-foreground/50"], ["fill", "none", "viewBox", "0 0 24 24", "aria-hidden", "true", 1, "h-4", "w-4", "animate-spin"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"], ["for", "tender_select", 1, "label"], ["role", "listbox", "aria-label", "Tender list", 1, "space-y-2", "max-h-72", "overflow-y-auto", "pr-1"], ["class", "card p-3 cursor-pointer transition-all duration-100 hover:border-accent/50 hover:bg-muted/40", "role", "option", 3, "border-accent", "ngClass", "click", 4, "ngFor", "ngForOf"], ["class", "mt-1.5 text-xs text-destructive", "role", "alert", 4, "ngIf"], ["role", "option", 1, "card", "p-3", "cursor-pointer", "transition-all", "duration-100", "hover:border-accent/50", "hover:bg-muted/40", 3, "click", "ngClass"], [1, "flex", "items-start", "justify-between", "gap-3"], [1, "flex-1", "min-w-0"], [1, "flex", "items-center", "gap-2", "flex-wrap"], [1, "text-xs", "font-mono", "text-foreground/40"], [1, "rounded", "px-1.5", "py-0.5", "text-xs", "font-medium", 3, "ngClass"], [1, "mt-0.5", "text-sm", "font-semibold", "text-foreground", "leading-snug"], [1, "mt-0.5", "text-xs", "text-foreground/50", "line-clamp-2"], [1, "shrink-0", "text-right"], [1, "text-sm", "font-semibold", "tabular", "text-foreground"], ["class", "text-xs text-foreground/40", 4, "ngIf"], ["class", "mt-2 flex items-center gap-2 pt-2 border-t border-border", 4, "ngIf"], [1, "text-xs", "text-foreground/40"], [1, "mt-2", "flex", "items-center", "gap-2", "pt-2", "border-t", "border-border"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true", 1, "h-3.5", "w-3.5", "text-accent", "shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"], [1, "text-xs", "text-foreground/60"], [1, "font-medium", "text-foreground"], ["role", "alert", 1, "mt-1.5", "text-xs", "text-destructive"], [1, "card", "flex", "flex-col", "items-center", "gap-3", "py-8", "text-center"], [1, "text-sm", "text-foreground/50"], ["routerLink", "/upload", 1, "btn-secondary", "text-sm"], ["role", "alert", 1, "mb-3", "text-sm", "text-destructive"]], template: function SessionCreatorComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "New Audit Session");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p", 3);
        \u0275\u0275text(5, " Configure an audit session. The AI pipeline will automatically select and analyse the matching documents. ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 4)(7, "label", 5);
        \u0275\u0275text(8, "Audit Type ");
        \u0275\u0275elementStart(9, "span", 6);
        \u0275\u0275text(10, "*");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "div", 7)(12, "button", 8);
        \u0275\u0275listener("click", function SessionCreatorComponent_Template_button_click_12_listener() {
          return ctx.selectType("INOUT");
        });
        \u0275\u0275elementStart(13, "div", 9)(14, "div", 10);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(15, "svg", 11);
        \u0275\u0275element(16, "path", 12);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(17, "span", 13);
        \u0275\u0275text(18, "INOUT Transaction");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "p", 14);
        \u0275\u0275text(20, " Analyse bank statements, invoices, quotes, and price books over a date range. ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(21, "button", 8);
        \u0275\u0275listener("click", function SessionCreatorComponent_Template_button_click_21_listener() {
          return ctx.selectType("TENDER");
        });
        \u0275\u0275elementStart(22, "div", 9)(23, "div", 10);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(24, "svg", 11);
        \u0275\u0275element(25, "path", 15);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(26, "span", 13);
        \u0275\u0275text(27, "Tender Audit");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(28, "p", 14);
        \u0275\u0275text(29, " Evaluate bids, market comparisons, and supplier selection for a procurement project. ");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(30, "form", 16);
        \u0275\u0275listener("ngSubmit", function SessionCreatorComponent_Template_form_ngSubmit_30_listener() {
          return ctx.submit();
        });
        \u0275\u0275template(31, SessionCreatorComponent_ng_container_31_Template, 17, 9, "ng-container", 17)(32, SessionCreatorComponent_ng_container_32_Template, 4, 3, "ng-container", 17);
        \u0275\u0275elementStart(33, "div", 18);
        \u0275\u0275template(34, SessionCreatorComponent_p_34_Template, 2, 1, "p", 19);
        \u0275\u0275elementStart(35, "button", 20);
        \u0275\u0275template(36, SessionCreatorComponent__svg_svg_36_Template, 3, 0, "svg", 21);
        \u0275\u0275text(37);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(12);
        \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(22, _c0, ctx.selectedType === "INOUT", ctx.selectedType === "INOUT", ctx.selectedType === "INOUT"));
        \u0275\u0275attribute("aria-checked", ctx.selectedType === "INOUT");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("bg-accent", ctx.selectedType === "INOUT")("bg-primary", ctx.selectedType !== "INOUT");
        \u0275\u0275advance();
        \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(26, _c1, ctx.selectedType === "INOUT", ctx.selectedType !== "INOUT"));
        \u0275\u0275advance(6);
        \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(29, _c0, ctx.selectedType === "TENDER", ctx.selectedType === "TENDER", ctx.selectedType === "TENDER"));
        \u0275\u0275attribute("aria-checked", ctx.selectedType === "TENDER");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("bg-accent", ctx.selectedType === "TENDER")("bg-primary", ctx.selectedType !== "TENDER");
        \u0275\u0275advance();
        \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(33, _c1, ctx.selectedType === "TENDER", ctx.selectedType !== "TENDER"));
        \u0275\u0275advance(6);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.selectedType === "INOUT");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.selectedType === "TENDER");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.submitError);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.isSubmitting);
        \u0275\u0275attribute("aria-busy", ctx.isSubmitting);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isSubmitting);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.isSubmitting ? "Creating Session\u2026" : "Start Audit Session", " ");
      }
    }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, DecimalPipe, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink], encapsulation: 2, changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SessionCreatorComponent, [{
    type: Component,
    args: [{
      selector: "app-session-creator",
      standalone: true,
      imports: [CommonModule, ReactiveFormsModule, RouterLink],
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <div class="mx-auto max-w-xl px-4 py-10 sm:px-6 lg:px-8 animate-fade-in">

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-semibold text-foreground">New Audit Session</h1>
        <p class="mt-1.5 text-sm text-foreground/60">
          Configure an audit session. The AI pipeline will automatically select and analyse the matching documents.
        </p>
      </div>

      <!-- Audit type selector -->
      <div class="mb-6">
        <label class="label">Audit Type <span class="text-destructive" aria-hidden="true">*</span></label>
        <div class="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Audit type">

          <!-- INOUT button -->
          <button
            type="button"
            role="radio"
            [attr.aria-checked]="selectedType === 'INOUT'"
            (click)="selectType('INOUT')"
            [ngClass]="{
              'border-accent': selectedType === 'INOUT',
              'bg-accent/5': selectedType === 'INOUT',
              'shadow-glow-accent': selectedType === 'INOUT'
            }"
            class="card flex flex-col gap-2 p-4 cursor-pointer text-left transition-all duration-150
                   hover:border-accent/50 hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-accent"
          >
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-md"
                   [class.bg-accent]="selectedType === 'INOUT'"
                   [class.bg-primary]="selectedType !== 'INOUT'">
                <svg class="h-4 w-4"
                     [ngClass]="{
                       'text-background': selectedType === 'INOUT',
                       'text-foreground/50': selectedType !== 'INOUT'
                     }"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
              </div>
              <span class="text-sm font-semibold text-foreground">INOUT Transaction</span>
            </div>
            <p class="text-xs text-foreground/50 leading-relaxed">
              Analyse bank statements, invoices, quotes, and price books over a date range.
            </p>
          </button>

          <!-- TENDER button -->
          <button
            type="button"
            role="radio"
            [attr.aria-checked]="selectedType === 'TENDER'"
            (click)="selectType('TENDER')"
            [ngClass]="{
              'border-accent': selectedType === 'TENDER',
              'bg-accent/5': selectedType === 'TENDER',
              'shadow-glow-accent': selectedType === 'TENDER'
            }"
            class="card flex flex-col gap-2 p-4 cursor-pointer text-left transition-all duration-150
                   hover:border-accent/50 hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-accent"
          >
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-md"
                   [class.bg-accent]="selectedType === 'TENDER'"
                   [class.bg-primary]="selectedType !== 'TENDER'">
                <svg class="h-4 w-4"
                     [ngClass]="{
                       'text-background': selectedType === 'TENDER',
                       'text-foreground/50': selectedType !== 'TENDER'
                     }"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>
              <span class="text-sm font-semibold text-foreground">Tender Audit</span>
            </div>
            <p class="text-xs text-foreground/50 leading-relaxed">
              Evaluate bids, market comparisons, and supplier selection for a procurement project.
            </p>
          </button>

        </div>
      </div>

      <!-- Dynamic form -->
      <form [formGroup]="form" (ngSubmit)="submit()" novalidate class="space-y-5 animate-slide-up">

        <!-- INOUT params -->
        <ng-container *ngIf="selectedType === 'INOUT'">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="label" for="start_date">
                Start Date <span class="text-destructive" aria-hidden="true">*</span>
              </label>
              <input
                id="start_date"
                type="date"
                formControlName="start_date"
                class="input"
                [class.border-destructive]="isInvalid('start_date')"
                [attr.aria-invalid]="isInvalid('start_date')"
                aria-describedby="start_date_err"
              />
              <p *ngIf="isInvalid('start_date')" id="start_date_err"
                 class="mt-1 text-xs text-destructive" role="alert">
                Start date is required.
              </p>
            </div>
            <div>
              <label class="label" for="end_date">
                End Date <span class="text-destructive" aria-hidden="true">*</span>
              </label>
              <input
                id="end_date"
                type="date"
                formControlName="end_date"
                class="input"
                [class.border-destructive]="isInvalid('end_date') || dateRangeError"
                [attr.aria-invalid]="isInvalid('end_date') || dateRangeError"
                aria-describedby="end_date_err"
              />
              <p *ngIf="isInvalid('end_date')" id="end_date_err"
                 class="mt-1 text-xs text-destructive" role="alert">
                End date is required.
              </p>
              <p *ngIf="dateRangeError"
                 class="mt-1 text-xs text-destructive" role="alert">
                End date must be after start date.
              </p>
            </div>
          </div>
        </ng-container>

        <!-- TENDER params -->
        <ng-container *ngIf="selectedType === 'TENDER'">

          <!-- Loading tenders -->
          <div *ngIf="loadingTenders" class="flex items-center gap-2 text-sm text-foreground/50">
            <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading tenders\u2026
          </div>

          <!-- Tender selector -->
          <div *ngIf="!loadingTenders">
            <label class="label" for="tender_select">
              Select Tender (Appel d'Offre)
              <span class="text-destructive" aria-hidden="true">*</span>
            </label>

            <!-- Tender cards -->
            <div class="space-y-2 max-h-72 overflow-y-auto pr-1" role="listbox" aria-label="Tender list">
              <div
                *ngFor="let t of tenders"
                (click)="selectTender(t)"
                [class.border-accent]="selectedTenderId === t.id"
                [ngClass]="{'bg-accent/5': selectedTenderId === t.id, 'opacity-50 cursor-not-allowed': t.status === 'CANCELLED'}"
                class="card p-3 cursor-pointer transition-all duration-100 hover:border-accent/50 hover:bg-muted/40"
                role="option"
                [attr.aria-selected]="selectedTenderId === t.id"
              >
                <div class="flex items-start justify-between gap-3">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-xs font-mono text-foreground/40">{{ t.reference }}</span>
                      <span [ngClass]="tenderStatusClass(t.status)"
                            class="rounded px-1.5 py-0.5 text-xs font-medium">
                        {{ t.status }}
                      </span>
                    </div>
                    <p class="mt-0.5 text-sm font-semibold text-foreground leading-snug">{{ t.name }}</p>
                    <p class="mt-0.5 text-xs text-foreground/50 line-clamp-2">{{ t.description }}</p>
                  </div>
                  <div class="shrink-0 text-right">
                    <p class="text-sm font-semibold tabular text-foreground">
                      {{ t.budget | number:'1.0-0' }} {{ t.currency }}
                    </p>
                    <p *ngIf="t.deadline" class="text-xs text-foreground/40">
                      Due {{ t.deadline }}
                    </p>
                  </div>
                </div>

                <!-- Winner row -->
                <div *ngIf="t.winner" class="mt-2 flex items-center gap-2 pt-2 border-t border-border">
                  <svg class="h-3.5 w-3.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                  </svg>
                  <span class="text-xs text-foreground/60">
                    Winner: <span class="font-medium text-foreground">{{ t.winner.company }}</span>
                    \u2014 {{ t.winner.amount | number:'1.0-0' }} {{ t.currency }}
                  </span>
                </div>
              </div>
            </div>

            <p *ngIf="!selectedTenderId && form.get('project_name')?.touched"
               class="mt-1.5 text-xs text-destructive" role="alert">
              Please select a tender.
            </p>
          </div>

          <!-- No tenders notice -->
          <div *ngIf="!loadingTenders && tenders.length === 0"
               class="card flex flex-col items-center gap-3 py-8 text-center">
            <p class="text-sm text-foreground/50">No tenders found.</p>
            <a routerLink="/upload" class="btn-secondary text-sm">Upload Tender Documents</a>
          </div>

        </ng-container>

        <!-- Errors / Submit -->
        <div class="pt-2">
          <p *ngIf="submitError" class="mb-3 text-sm text-destructive" role="alert">
            {{ submitError }}
          </p>
          <button
            type="submit"
            class="btn-primary w-full"
            [disabled]="isSubmitting"
            [attr.aria-busy]="isSubmitting"
          >
            <svg *ngIf="isSubmitting" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isSubmitting ? 'Creating Session\u2026' : 'Start Audit Session' }}
          </button>
        </div>

      </form>
    </div>
  `
    }]
  }], () => [{ type: FormBuilder }, { type: ApiService }, { type: Router }, { type: ChangeDetectorRef }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SessionCreatorComponent, { className: "SessionCreatorComponent", filePath: "src/app/features/session-creator/session-creator.component.ts", lineNumber: 267 });
})();
export {
  SessionCreatorComponent
};
//# sourceMappingURL=chunk-6LIQIWJZ.js.map
