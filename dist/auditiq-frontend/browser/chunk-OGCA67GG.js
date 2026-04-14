import {
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-YGRBEE3D.js";
import {
  DOC_TYPE_LABELS,
  TENDER_DOCUMENT_TYPES
} from "./chunk-SNCFYU2E.js";
import {
  ApiService
} from "./chunk-Q3MZI6DE.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  NgClass,
  NgForOf,
  NgIf,
  RouterLink,
  ViewChild,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-W2VXPSOJ.js";

// src/app/features/upload/upload.component.ts
var _c0 = ["dropZone"];
var _c1 = (a0, a1) => ({ "border-accent": a0, "bg-accent/5": a1 });
var _c2 = (a0, a1) => ({ "grid-cols-2": a0, "grid-cols-1": a1 });
function UploadComponent_div_21_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 30);
    \u0275\u0275listener("click", function UploadComponent_div_21_button_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.clearQueue());
    });
    \u0275\u0275text(1, "Clear all");
    \u0275\u0275elementEnd();
  }
}
function UploadComponent_div_21_p_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 31);
    \u0275\u0275text(1, "Loading tenders\u2026");
    \u0275\u0275elementEnd();
  }
}
function UploadComponent_div_21_li_7_span_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1, "Queued");
    \u0275\u0275elementEnd();
  }
}
function UploadComponent_div_21_li_7_span_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 49);
    \u0275\u0275text(1, "Uploading");
    \u0275\u0275elementEnd();
  }
}
function UploadComponent_div_21_li_7_span_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 50);
    \u0275\u0275text(1, "Done");
    \u0275\u0275elementEnd();
  }
}
function UploadComponent_div_21_li_7_span_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 51);
    \u0275\u0275text(1, "Error");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("title", item_r6.error);
  }
}
function UploadComponent_div_21_li_7_button_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 52);
    \u0275\u0275listener("click", function UploadComponent_div_21_li_7_button_15_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const item_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      ctx_r4.removeItem(item_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 53);
    \u0275\u0275element(2, "path", 54);
    \u0275\u0275elementEnd()();
  }
}
function UploadComponent_div_21_li_7_div_16_option_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 60);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r9 = ctx.$implicit;
    \u0275\u0275property("value", opt_r9.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", opt_r9.label, " ");
  }
}
function UploadComponent_div_21_li_7_div_16_div_6_option_6_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const t_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2713 ", t_r11.winner == null ? null : t_r11.winner.company, "");
  }
}
function UploadComponent_div_21_li_7_div_16_div_6_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 60);
    \u0275\u0275text(1);
    \u0275\u0275template(2, UploadComponent_div_21_li_7_div_16_div_6_option_6_ng_container_2_Template, 2, 1, "ng-container", 59);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r11 = ctx.$implicit;
    \u0275\u0275property("value", t_r11.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", t_r11.reference, " \xB7 ", t_r11.name, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", t_r11.status === "AWARDED");
  }
}
function UploadComponent_div_21_li_7_div_16_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label", 56);
    \u0275\u0275text(2, "Related tender");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 57);
    \u0275\u0275twoWayListener("ngModelChange", function UploadComponent_div_21_li_7_div_16_div_6_Template_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r10);
      const item_r6 = \u0275\u0275nextContext(2).$implicit;
      \u0275\u0275twoWayBindingSet(item_r6.tenderId, $event) || (item_r6.tenderId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(4, "option", 61);
    \u0275\u0275text(5, "\u2014 None \u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, UploadComponent_div_21_li_7_div_16_div_6_option_6_Template, 3, 4, "option", 58);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r6 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", item_r6.tenderId);
    \u0275\u0275property("disabled", ctx_r4.isUploading || ctx_r4.loadingTenders);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r4.tenders);
  }
}
function UploadComponent_div_21_li_7_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 55)(1, "div")(2, "label", 56);
    \u0275\u0275text(3, "Document type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "select", 57);
    \u0275\u0275twoWayListener("ngModelChange", function UploadComponent_div_21_li_7_div_16_Template_select_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r8);
      const item_r6 = \u0275\u0275nextContext().$implicit;
      \u0275\u0275twoWayBindingSet(item_r6.docType, $event) || (item_r6.docType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function UploadComponent_div_21_li_7_div_16_Template_select_ngModelChange_4_listener() {
      \u0275\u0275restoreView(_r8);
      const item_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.onTypeChange(item_r6));
    });
    \u0275\u0275template(5, UploadComponent_div_21_li_7_div_16_option_5_Template, 2, 2, "option", 58);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, UploadComponent_div_21_li_7_div_16_div_6_Template, 7, 3, "div", 59);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(5, _c2, ctx_r4.isTenderType(item_r6.docType), !ctx_r4.isTenderType(item_r6.docType)));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", item_r6.docType);
    \u0275\u0275property("disabled", ctx_r4.isUploading);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r4.docTypeOptions);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r4.isTenderType(item_r6.docType));
  }
}
function UploadComponent_div_21_li_7_div_17_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1, " \xB7 ");
    \u0275\u0275elementStart(2, "span", 64);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const item_r6 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r4.tenderName(item_r6.tenderId));
  }
}
function UploadComponent_div_21_li_7_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62)(1, "span", 63);
    \u0275\u0275text(2);
    \u0275\u0275template(3, UploadComponent_div_21_li_7_div_17_ng_container_3_Template, 4, 1, "ng-container", 59);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r4.docTypeLabel(item_r6.docType), " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r6.tenderId);
  }
}
function UploadComponent_div_21_li_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 32)(1, "div", 33)(2, "div", 34);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 35);
    \u0275\u0275element(4, "path", 36);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div", 37)(6, "p", 38);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 39);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 40);
    \u0275\u0275template(11, UploadComponent_div_21_li_7_span_11_Template, 2, 0, "span", 41)(12, UploadComponent_div_21_li_7_span_12_Template, 2, 0, "span", 42)(13, UploadComponent_div_21_li_7_span_13_Template, 2, 0, "span", 43)(14, UploadComponent_div_21_li_7_span_14_Template, 2, 1, "span", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, UploadComponent_div_21_li_7_button_15_Template, 3, 0, "button", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, UploadComponent_div_21_li_7_div_16_Template, 7, 8, "div", 46)(17, UploadComponent_div_21_li_7_div_17_Template, 4, 2, "div", 47);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r4.fileIconColor(item_r6));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r6.file.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r4.formatSize(item_r6.file.size));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", item_r6.status === "queued");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r6.status === "uploading");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r6.status === "done");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r6.status === "error");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r6.status !== "uploading");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r6.status === "queued" || item_r6.status === "error");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r6.status === "done");
  }
}
function UploadComponent_div_21_p_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 65);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r4.uploadError);
  }
}
function UploadComponent_div_21_p_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 66);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r4.doneCount, " file", ctx_r4.doneCount !== 1 ? "s" : "", " uploaded successfully! ");
  }
}
function UploadComponent_div_21_a_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 67);
    \u0275\u0275text(1, " Create Audit Session \u2192 ");
    \u0275\u0275elementEnd();
  }
}
function UploadComponent_div_21__svg_svg_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 68);
    \u0275\u0275element(1, "circle", 69)(2, "path", 70);
    \u0275\u0275elementEnd();
  }
}
function UploadComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 17)(2, "h2", 18);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, UploadComponent_div_21_button_4_Template, 2, 0, "button", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, UploadComponent_div_21_p_5_Template, 2, 0, "p", 20);
    \u0275\u0275elementStart(6, "ul", 21);
    \u0275\u0275template(7, UploadComponent_div_21_li_7_Template, 18, 11, "li", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 23)(9, "div");
    \u0275\u0275template(10, UploadComponent_div_21_p_10_Template, 2, 1, "p", 24)(11, UploadComponent_div_21_p_11_Template, 2, 2, "p", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 26);
    \u0275\u0275template(13, UploadComponent_div_21_a_13_Template, 2, 0, "a", 27);
    \u0275\u0275elementStart(14, "button", 28);
    \u0275\u0275listener("click", function UploadComponent_div_21_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.uploadAll());
    });
    \u0275\u0275template(15, UploadComponent_div_21__svg_svg_15_Template, 3, 0, "svg", 29);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Files (", ctx_r4.queue.length, ")");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r4.isUploading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r4.loadingTenders);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r4.queue)("ngForTrackBy", ctx_r4.trackByFile);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r4.uploadError);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r4.uploadSuccess);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r4.uploadSuccess);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r4.isUploading || ctx_r4.queuedCount === 0);
    \u0275\u0275attribute("aria-busy", ctx_r4.isUploading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r4.isUploading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.isUploading ? "Uploading\u2026" : "Upload " + ctx_r4.queuedCount + " File" + (ctx_r4.queuedCount !== 1 ? "s" : ""), " ");
  }
}
var UploadComponent = class _UploadComponent {
  constructor(api, cd) {
    this.api = api;
    this.cd = cd;
    this.queue = [];
    this.tenders = [];
    this.isDragging = false;
    this.isUploading = false;
    this.loadingTenders = false;
    this.uploadError = "";
    this.uploadSuccess = false;
    this.docTypeOptions = Object.entries(DOC_TYPE_LABELS).map(([value, label]) => ({
      value,
      label
    }));
  }
  ngOnInit() {
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
  // ── Drag & Drop ────────────────────────────────────────────────────────────
  onDragOver(event) {
    event.preventDefault();
    this.isDragging = true;
  }
  onDragLeave(event) {
    event.preventDefault();
    this.isDragging = false;
  }
  onDrop(event) {
    event.preventDefault();
    this.isDragging = false;
    this.addFiles(Array.from(event.dataTransfer?.files ?? []));
  }
  onFileChange(event) {
    const input = event.target;
    this.addFiles(Array.from(input.files ?? []));
    input.value = "";
  }
  // ── Queue management ───────────────────────────────────────────────────────
  addFiles(files) {
    const newItems = files.map((f) => ({
      file: f,
      status: "queued",
      docType: inferDocType(f.name),
      tenderId: ""
    }));
    this.queue = [...this.queue, ...newItems];
    this.uploadSuccess = false;
    this.uploadError = "";
    this.cd.markForCheck();
  }
  removeItem(item) {
    this.queue = this.queue.filter((i) => i !== item);
  }
  clearQueue() {
    this.queue = [];
    this.uploadSuccess = false;
    this.uploadError = "";
  }
  onTypeChange(item) {
    if (!TENDER_DOCUMENT_TYPES.includes(item.docType)) {
      item.tenderId = "";
    }
  }
  // ── Upload ─────────────────────────────────────────────────────────────────
  uploadAll() {
    const toUpload = this.queue.filter((i) => i.status === "queued");
    if (!toUpload.length)
      return;
    this.isUploading = true;
    this.uploadError = "";
    this.uploadSuccess = false;
    toUpload.forEach((i) => i.status = "uploading");
    this.cd.markForCheck();
    const payloads = toUpload.map((i) => ({
      file: i.file,
      docType: i.docType,
      tenderId: i.tenderId || void 0
    }));
    this.api.uploadDocuments(payloads).subscribe({
      next: (results) => {
        results.forEach((res, idx) => {
          toUpload[idx].status = "done";
          toUpload[idx].result = res;
        });
        this.isUploading = false;
        this.uploadSuccess = true;
        this.cd.markForCheck();
      },
      error: (err) => {
        toUpload.forEach((i) => {
          if (i.status === "uploading") {
            i.status = "error";
            i.error = err.message;
          }
        });
        this.isUploading = false;
        this.uploadError = err.message;
        this.cd.markForCheck();
      }
    });
  }
  // ── Computed getters ───────────────────────────────────────────────────────
  get queuedCount() {
    return this.queue.filter((i) => i.status === "queued").length;
  }
  get doneCount() {
    return this.queue.filter((i) => i.status === "done").length;
  }
  // ── Utilities ──────────────────────────────────────────────────────────────
  isTenderType(t) {
    return TENDER_DOCUMENT_TYPES.includes(t);
  }
  docTypeLabel(t) {
    return DOC_TYPE_LABELS[t] ?? t;
  }
  tenderName(id) {
    const t = this.tenders.find((x) => x.id === id);
    return t ? `${t.reference} \xB7 ${t.name}` : id;
  }
  formatSize(bytes) {
    if (bytes < 1024)
      return `${bytes} B`;
    if (bytes < 1048576)
      return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  }
  fileIconColor(item) {
    switch (item.status) {
      case "done":
        return "text-accent";
      case "error":
        return "text-destructive";
      case "uploading":
        return "text-accent animate-pulse";
      default:
        return "text-foreground/40";
    }
  }
  trackByFile(_, item) {
    return item.file.name + item.file.size;
  }
  static {
    this.\u0275fac = function UploadComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UploadComponent)(\u0275\u0275directiveInject(ApiService), \u0275\u0275directiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UploadComponent, selectors: [["app-upload"]], viewQuery: function UploadComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.dropZoneRef = _t.first);
      }
    }, decls: 22, vars: 5, consts: [["dropZone", ""], ["fileInput", ""], [1, "mx-auto", "max-w-3xl", "px-4", "py-10", "sm:px-6", "lg:px-8", "animate-fade-in"], [1, "mb-8"], [1, "text-3xl", "font-semibold", "text-foreground"], [1, "mt-1.5", "text-sm", "text-foreground/60"], ["role", "button", "tabindex", "0", "aria-label", "Upload financial documents", 1, "group", "relative", "flex", "flex-col", "items-center", "justify-center", "rounded-xl", "border-2", "border-dashed", "border-border", "bg-muted/30", "px-6", "py-14", "cursor-pointer", "transition-all", "duration-200", "hover:border-accent/60", "hover:bg-accent/5", 3, "dragover", "dragleave", "drop", "click", "keydown.enter", "keydown.space", "ngClass"], ["type", "file", "multiple", "", "accept", ".pdf,.jpg,.jpeg,.png,.tiff,.tif,.xlsx,.csv", "aria-hidden", "true", 1, "sr-only", 3, "change"], [1, "flex", "flex-col", "items-center", "gap-4", "text-center", "pointer-events-none"], [1, "flex", "h-16", "w-16", "items-center", "justify-center", "rounded-2xl", "bg-secondary", "border", "border-border", "group-hover:border-accent/50", "transition-colors", "duration-200"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "1.5", "aria-hidden", "true", 1, "h-8", "w-8", "text-foreground/40", "group-hover:text-accent", "transition-colors", "duration-200"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"], [1, "text-base", "font-medium", "text-foreground/80"], [1, "text-accent"], [1, "mt-1", "text-xs", "text-foreground/40"], ["class", "mt-6 space-y-3 animate-slide-up", 4, "ngIf"], [1, "mt-6", "space-y-3", "animate-slide-up"], [1, "flex", "items-center", "justify-between"], [1, "text-sm", "font-medium", "text-foreground/70"], ["class", "btn-ghost text-xs py-1 px-2", "aria-label", "Clear file queue", 3, "click", 4, "ngIf"], ["class", "text-xs text-foreground/40", 4, "ngIf"], ["role", "list", "aria-label", "Upload queue", 1, "space-y-2"], ["class", "card p-3 space-y-3", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "items-center", "justify-between", "pt-2"], ["class", "text-sm text-destructive", "role", "alert", 4, "ngIf"], ["class", "text-sm text-accent", 4, "ngIf"], [1, "flex", "gap-3", "ml-auto"], ["routerLink", "/new-session", "class", "btn-secondary text-sm", 4, "ngIf"], [1, "btn-primary", "text-sm", 3, "click", "disabled"], ["class", "h-4 w-4 animate-spin", "fill", "none", "viewBox", "0 0 24 24", "aria-hidden", "true", 4, "ngIf"], ["aria-label", "Clear file queue", 1, "btn-ghost", "text-xs", "py-1", "px-2", 3, "click"], [1, "text-xs", "text-foreground/40"], [1, "card", "p-3", "space-y-3"], [1, "flex", "items-center", "gap-3"], [1, "flex", "h-10", "w-10", "shrink-0", "items-center", "justify-center", "rounded-md", "bg-primary", "border", "border-border"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "1.5", "aria-hidden", "true", 1, "h-5", "w-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"], [1, "flex-1", "min-w-0"], [1, "truncate", "text-sm", "font-medium", "text-foreground"], [1, "text-xs", "text-foreground/40", "tabular"], [1, "shrink-0"], ["class", "badge-pending", 4, "ngIf"], ["class", "badge-running", 4, "ngIf"], ["class", "badge-safe", 4, "ngIf"], ["class", "badge-critical", 3, "title", 4, "ngIf"], ["class", "btn-ghost p-1 text-foreground/40 hover:text-destructive", "aria-label", "Remove file", 3, "click", 4, "ngIf"], ["class", "grid gap-2 pl-[52px]", 3, "ngClass", 4, "ngIf"], ["class", "pl-[52px]", 4, "ngIf"], [1, "badge-pending"], [1, "badge-running"], [1, "badge-safe"], [1, "badge-critical", 3, "title"], ["aria-label", "Remove file", 1, "btn-ghost", "p-1", "text-foreground/40", "hover:text-destructive", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true", 1, "h-4", "w-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M6 18 18 6M6 6l12 12"], [1, "grid", "gap-2", "pl-[52px]", 3, "ngClass"], [1, "block", "text-xs", "text-foreground/40", "mb-1"], [1, "input", "text-sm", "py-1.5", 3, "ngModelChange", "ngModel", "disabled"], [3, "value", 4, "ngFor", "ngForOf"], [4, "ngIf"], [3, "value"], ["value", ""], [1, "pl-[52px]"], [1, "text-xs", "text-foreground/50"], [1, "text-accent/70"], ["role", "alert", 1, "text-sm", "text-destructive"], [1, "text-sm", "text-accent"], ["routerLink", "/new-session", 1, "btn-secondary", "text-sm"], ["fill", "none", "viewBox", "0 0 24 24", "aria-hidden", "true", 1, "h-4", "w-4", "animate-spin"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"]], template: function UploadComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "h1", 4);
        \u0275\u0275text(3, "Upload Documents");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p", 5);
        \u0275\u0275text(5, " Drag and drop or browse to upload financial documents. Select the document type and optionally link to a tender. ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 6, 0);
        \u0275\u0275listener("dragover", function UploadComponent_Template_div_dragover_6_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onDragOver($event));
        })("dragleave", function UploadComponent_Template_div_dragleave_6_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onDragLeave($event));
        })("drop", function UploadComponent_Template_div_drop_6_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onDrop($event));
        })("click", function UploadComponent_Template_div_click_6_listener() {
          \u0275\u0275restoreView(_r1);
          const fileInput_r2 = \u0275\u0275reference(9);
          return \u0275\u0275resetView(fileInput_r2.click());
        })("keydown.enter", function UploadComponent_Template_div_keydown_enter_6_listener() {
          \u0275\u0275restoreView(_r1);
          const fileInput_r2 = \u0275\u0275reference(9);
          return \u0275\u0275resetView(fileInput_r2.click());
        })("keydown.space", function UploadComponent_Template_div_keydown_space_6_listener() {
          \u0275\u0275restoreView(_r1);
          const fileInput_r2 = \u0275\u0275reference(9);
          return \u0275\u0275resetView(fileInput_r2.click());
        });
        \u0275\u0275elementStart(8, "input", 7, 1);
        \u0275\u0275listener("change", function UploadComponent_Template_input_change_8_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onFileChange($event));
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "div", 8)(11, "div", 9);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(12, "svg", 10);
        \u0275\u0275element(13, "path", 11);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(14, "div")(15, "p", 12)(16, "span", 13);
        \u0275\u0275text(17, "Click to browse");
        \u0275\u0275elementEnd();
        \u0275\u0275text(18, " or drag files here ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "p", 14);
        \u0275\u0275text(20, "PDF, JPEG, PNG, TIFF, XLSX, CSV \u2014 up to 20 MB each");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(21, UploadComponent_div_21_Template, 17, 12, "div", 15);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(2, _c1, ctx.isDragging, ctx.isDragging));
        \u0275\u0275advance(15);
        \u0275\u0275property("ngIf", ctx.queue.length > 0);
      }
    }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel, RouterLink], encapsulation: 2, changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UploadComponent, [{
    type: Component,
    args: [{
      selector: "app-upload",
      standalone: true,
      imports: [CommonModule, FormsModule, RouterLink],
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <div class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 animate-fade-in">

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-semibold text-foreground">Upload Documents</h1>
        <p class="mt-1.5 text-sm text-foreground/60">
          Drag and drop or browse to upload financial documents. Select the document type and optionally link to a tender.
        </p>
      </div>

      <!-- Drop zone -->
      <div
        #dropZone
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (drop)="onDrop($event)"
        (click)="fileInput.click()"
        [ngClass]="{'border-accent': isDragging, 'bg-accent/5': isDragging}"
        class="group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border
               bg-muted/30 px-6 py-14 cursor-pointer transition-all duration-200
               hover:border-accent/60 hover:bg-accent/5"
        role="button"
        tabindex="0"
        aria-label="Upload financial documents"
        (keydown.enter)="fileInput.click()"
        (keydown.space)="fileInput.click()"
      >
        <input
          #fileInput
          type="file"
          class="sr-only"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.tiff,.tif,.xlsx,.csv"
          (change)="onFileChange($event)"
          aria-hidden="true"
        />
        <div class="flex flex-col items-center gap-4 text-center pointer-events-none">
          <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary
                      border border-border group-hover:border-accent/50 transition-colors duration-200">
            <svg class="h-8 w-8 text-foreground/40 group-hover:text-accent transition-colors duration-200"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </div>
          <div>
            <p class="text-base font-medium text-foreground/80">
              <span class="text-accent">Click to browse</span> or drag files here
            </p>
            <p class="mt-1 text-xs text-foreground/40">PDF, JPEG, PNG, TIFF, XLSX, CSV \u2014 up to 20 MB each</p>
          </div>
        </div>
      </div>

      <!-- Queue -->
      <div *ngIf="queue.length > 0" class="mt-6 space-y-3 animate-slide-up">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-medium text-foreground/70">Files ({{ queue.length }})</h2>
          <button
            *ngIf="!isUploading"
            (click)="clearQueue()"
            class="btn-ghost text-xs py-1 px-2"
            aria-label="Clear file queue"
          >Clear all</button>
        </div>

        <!-- Tenders loading -->
        <p *ngIf="loadingTenders" class="text-xs text-foreground/40">Loading tenders\u2026</p>

        <ul class="space-y-2" role="list" aria-label="Upload queue">
          <li
            *ngFor="let item of queue; let i = index; trackBy: trackByFile"
            class="card p-3 space-y-3"
          >
            <!-- Top row: icon + name + status + remove -->
            <div class="flex items-center gap-3">
              <!-- Icon -->
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary border border-border">
                <svg class="h-5 w-5" [class]="fileIconColor(item)" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>

              <!-- Name + size -->
              <div class="flex-1 min-w-0">
                <p class="truncate text-sm font-medium text-foreground">{{ item.file.name }}</p>
                <p class="text-xs text-foreground/40 tabular">{{ formatSize(item.file.size) }}</p>
              </div>

              <!-- Status -->
              <div class="shrink-0">
                <span *ngIf="item.status === 'queued'"    class="badge-pending">Queued</span>
                <span *ngIf="item.status === 'uploading'" class="badge-running">Uploading</span>
                <span *ngIf="item.status === 'done'"      class="badge-safe">Done</span>
                <span *ngIf="item.status === 'error'"
                      class="badge-critical" [title]="item.error">Error</span>
              </div>

              <!-- Remove -->
              <button
                *ngIf="item.status !== 'uploading'"
                (click)="removeItem(item); $event.stopPropagation()"
                class="btn-ghost p-1 text-foreground/40 hover:text-destructive"
                aria-label="Remove file"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Bottom row: doc type + tender (only when queued) -->
            <div *ngIf="item.status === 'queued' || item.status === 'error'"
                 class="grid gap-2 pl-[52px]"
                 [ngClass]="{'grid-cols-2': isTenderType(item.docType), 'grid-cols-1': !isTenderType(item.docType)}">

              <!-- Document type selector -->
              <div>
                <label class="block text-xs text-foreground/40 mb-1">Document type</label>
                <select
                  [(ngModel)]="item.docType"
                  (ngModelChange)="onTypeChange(item)"
                  class="input text-sm py-1.5"
                  [disabled]="isUploading"
                >
                  <option *ngFor="let opt of docTypeOptions" [value]="opt.value">
                    {{ opt.label }}
                  </option>
                </select>
              </div>

              <!-- Tender selector (only for QUOTE / BID / MARKET_PLACE) -->
              <div *ngIf="isTenderType(item.docType)">
                <label class="block text-xs text-foreground/40 mb-1">Related tender</label>
                <select
                  [(ngModel)]="item.tenderId"
                  class="input text-sm py-1.5"
                  [disabled]="isUploading || loadingTenders"
                >
                  <option value="">\u2014 None \u2014</option>
                  <option *ngFor="let t of tenders" [value]="t.id">
                    {{ t.reference }} \xB7 {{ t.name }}
                    <ng-container *ngIf="t.status === 'AWARDED'"> \u2713 {{ t.winner?.company }}</ng-container>
                  </option>
                </select>
              </div>

            </div>

            <!-- Done: show type badge -->
            <div *ngIf="item.status === 'done'" class="pl-[52px]">
              <span class="text-xs text-foreground/50">
                {{ docTypeLabel(item.docType) }}
                <ng-container *ngIf="item.tenderId">
                  \xB7 <span class="text-accent/70">{{ tenderName(item.tenderId) }}</span>
                </ng-container>
              </span>
            </div>
          </li>
        </ul>

        <!-- Upload actions -->
        <div class="flex items-center justify-between pt-2">
          <div>
            <p *ngIf="uploadError"   class="text-sm text-destructive" role="alert">{{ uploadError }}</p>
            <p *ngIf="uploadSuccess" class="text-sm text-accent">
              {{ doneCount }} file{{ doneCount !== 1 ? 's' : '' }} uploaded successfully!
            </p>
          </div>
          <div class="flex gap-3 ml-auto">
            <a routerLink="/new-session" *ngIf="uploadSuccess" class="btn-secondary text-sm">
              Create Audit Session \u2192
            </a>
            <button
              [disabled]="isUploading || queuedCount === 0"
              (click)="uploadAll()"
              class="btn-primary text-sm"
              [attr.aria-busy]="isUploading"
            >
              <svg *ngIf="isUploading" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isUploading ? 'Uploading\u2026' : 'Upload ' + queuedCount + ' File' + (queuedCount !== 1 ? 's' : '') }}
            </button>
          </div>
        </div>
      </div>

    </div>
  `
    }]
  }], () => [{ type: ApiService }, { type: ChangeDetectorRef }], { dropZoneRef: [{
    type: ViewChild,
    args: ["dropZone"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UploadComponent, { className: "UploadComponent", filePath: "src/app/features/upload/upload.component.ts", lineNumber: 232 });
})();
function inferDocType(filename) {
  const l = filename.toLowerCase();
  if (l.includes("invoice") || l.includes("facture") || l.includes("inv_"))
    return "INVOICE";
  if (l.includes("bank") || l.includes("statement") || l.includes("releve") || l.includes("rib"))
    return "BANK_STATEMENT";
  if (l.includes("quote") || l.includes("devis") || l.includes("quotation") || l.includes("offer"))
    return "QUOTE";
  if (l.includes("pricebook") || l.includes("price_book") || l.includes("catalogue") || l.includes("tarif"))
    return "PRICE_BOOK";
  if (l.includes("bid") || l.includes("soumission") || l.includes("appel"))
    return "BID";
  if (l.includes("market") || l.includes("marketplace") || l.includes("comparatif"))
    return "MARKET_PLACE";
  return "OTHER";
}
export {
  UploadComponent
};
//# sourceMappingURL=chunk-OGCA67GG.js.map
