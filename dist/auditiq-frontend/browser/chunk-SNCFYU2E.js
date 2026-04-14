// src/app/core/models/audit.models.ts
var DOC_TYPE_LABELS = {
  INVOICE: "Invoice / Facture",
  BANK_STATEMENT: "Bank Statement / Relev\xE9",
  QUOTE: "Quote / Devis",
  PRICE_BOOK: "Price Book / Catalogue",
  BID: "Bid / Soumission",
  MARKET_PLACE: "Market Study / Comparatif",
  OTHER: "Other / Autre"
};
var TENDER_DOCUMENT_TYPES = ["QUOTE", "BID", "MARKET_PLACE"];
function riskBadgeClass(score) {
  if (score === null)
    return "badge-pending";
  if (score <= 20)
    return "badge-safe";
  if (score <= 40)
    return "badge-low";
  if (score <= 60)
    return "badge-medium";
  if (score <= 80)
    return "badge-high";
  return "badge-critical";
}
function riskLabel(score) {
  if (score === null)
    return "\u2014";
  if (score <= 20)
    return "Safe";
  if (score <= 40)
    return "Low Risk";
  if (score <= 60)
    return "Medium Risk";
  if (score <= 80)
    return "High Risk";
  return "Critical";
}
function riskColor(score) {
  if (score === null)
    return "#94A3B8";
  if (score <= 20)
    return "#22C55E";
  if (score <= 40)
    return "#84CC16";
  if (score <= 60)
    return "#F59E0B";
  if (score <= 80)
    return "#F97316";
  return "#EF4444";
}

export {
  DOC_TYPE_LABELS,
  TENDER_DOCUMENT_TYPES,
  riskBadgeClass,
  riskLabel,
  riskColor
};
//# sourceMappingURL=chunk-SNCFYU2E.js.map
