import type { EcosystemProduct } from "@/lib/ecosystem";
import { ECOSYSTEM_PRODUCTS } from "@/lib/ecosystem";

const ARROW_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function routeLabel(step: number): string {
  return `ШАГ ${String(step).padStart(2, "0")} · МАРШРУТ`;
}

function renderRouteButton(product: EcosystemProduct): string {
  const label = routeLabel(product.step);
  const title = escapeHtml(product.title.toUpperCase());
  const desc = escapeHtml(`${product.price}${product.priceNote ? ` · ${product.priceNote}` : ""}`);
  const arrow = `<div class="egoshev-btn-arrow">${ARROW_SVG}</div>`;
  const inner = `<div class="egoshev-btn-content"><div class="egoshev-btn-text"><div class="egoshev-btn-label"><span class="egoshev-btn-label-dot"></span><span>${label}</span></div><div class="egoshev-btn-title">${title}</div><div class="egoshev-btn-desc">${desc}</div></div>${arrow}</div>`;

  if (product.status === "live" && product.href) {
    return `<a href="${escapeHtml(product.href)}" class="egoshev-btn egoshev-btn-online">${inner}</a>`;
  }

  return `<div class="egoshev-btn egoshev-btn-soon" aria-disabled="true">${inner}</div>`;
}

function renderRouteSection(): string {
  const items = ECOSYSTEM_PRODUCTS.filter(
    (product) => product.id !== "guide" && product.id !== "personal"
  );
  const buttons = items.map(renderRouteButton).join("");
  return `<!-- PRODUCT LADDER --> <div class="egoshev-route-divider"> <div class="egoshev-social-divider-line"></div> <div class="egoshev-social-divider-text">Маршрут Атмосфера 3D</div> <div class="egoshev-social-divider-line"></div> </div> ${buttons}`;
}

const TREE_LAYOUT_FIX = `<style>
#rec2252402801 .t396__artboard,
#rec2252402801 .t396__filter,
#rec2252402801 .t396__carrier {
  height: auto !important;
  min-height: 1200px;
  overflow: visible !important;
}
#rec2252402801 .t396__carrier-wrapper,
#rec2252402801 .t396__filter,
#rec2252402801 .t396 {
  overflow: visible !important;
}
#rec2252402801 .tn-elem[data-elem-id="1778921161976"] {
  height: auto !important;
  min-height: 945px;
}
#rec2252402801 .tn-elem[data-elem-id="1778921161976"] .tn-atom {
  height: auto !important;
  overflow: visible !important;
}
#egoshev-links-page .egoshev-route-divider {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 26px 20px 8px;
  max-width: 100%;
  box-sizing: border-box;
}
#egoshev-links-page .egoshev-btn-soon {
  opacity: 0.58;
  cursor: default;
  pointer-events: none;
}
#egoshev-links-page .egoshev-social {
  opacity: 1 !important;
  visibility: visible !important;
  padding-bottom: 8px;
}
#egoshev-links-page .egoshev-legal {
  opacity: 1 !important;
  visibility: visible !important;
}
#egoshev-links-page .egoshev-footer {
  opacity: 1 !important;
  visibility: visible !important;
}
#rec2252402801,
#rec2252402801 .t396 {
  overflow: visible !important;
}
</style>`;

function patchTreeEmbeddedHeights(html: string): string {
  return html
    .replace(
      /#rec2252402801 \.t396__artboard \{height:1200px/g,
      "#rec2252402801 .t396__artboard {height:auto;min-height:1200px"
    )
    .replace(
      /#rec2252402801 \.t396__filter \{height:1200px/g,
      "#rec2252402801 .t396__filter {height:auto;min-height:1200px"
    )
    .replace(
      /#rec2252402801 \.t396__carrier\{height:1200px/g,
      "#rec2252402801 .t396__carrier{height:auto;min-height:1200px"
    )
    .replace(
      /(\[data-elem-id="1778921161976"\]\{[^}]*?)height:945px/g,
      "$1height:auto;min-height:945px"
    )
    .replace(
      /(\[data-elem-id="1778921161976"\]\{[^}]*?)height:1011px/g,
      "$1height:auto;min-height:1011px"
    );
}

/** Injects TZ product ladder into the legacy egoshev links page shell. */
export function injectTreeContent(html: string): string {
  const routeMarkup = renderRouteSection();

  return patchTreeEmbeddedHeights(html)
    .replace(
      '<div id="rec2252402801"',
      `${TREE_LAYOUT_FIX}<div id="rec2252402801"`
    )
    .replace('href="/privacy"', 'href="/policy"')
    .replace('href="/soglasie"', 'href="/personal"')
    .replace(
      /<\/a> <\/div> <!-- SOCIAL -->/,
      `</a> ${routeMarkup} </div> <!-- SOCIAL -->`
    );
}
