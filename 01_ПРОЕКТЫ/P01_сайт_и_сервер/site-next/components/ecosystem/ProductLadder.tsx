import Link from "next/link";

import {
  ECOSYSTEM_PRODUCTS,
  type EcosystemProduct,
  type EcosystemProductStatus,
} from "@/lib/ecosystem";

function statusLabel(status: EcosystemProductStatus): string {
  if (status === "live") return "Доступно";
  if (status === "building") return "Скоро";
  return "Планируется";
}

function ProductCard({ product }: { product: EcosystemProduct }) {
  const canNavigate = product.status === "live" && product.href;

  return (
    <article className={`eco-ladder__item is-${product.status}`} id={`product-${product.id}`}>
      <div className="eco-ladder__head">
        <span className="eco-ladder__step">{String(product.step).padStart(2, "0")}</span>
        <h2 className="eco-ladder__title">{product.title}</h2>
        <div className="eco-ladder__price">{product.price}</div>
      </div>
      <p className="eco-ladder__subtitle">{product.subtitle}</p>
      {product.priceNote ? <p className="eco-ladder__note">{product.priceNote}</p> : null}
      <div className="eco-ladder__footer">
        <span className={`eco-ladder__status is-${product.status}`}>{statusLabel(product.status)}</span>
        {canNavigate ? (
          <Link href={product.href!} className="eco-btn">
            {product.cta}
          </Link>
        ) : (
          <span className="eco-btn is-disabled" aria-disabled="true">
            {product.status === "building" ? "Подключаем" : product.cta}
          </span>
        )}
      </div>
    </article>
  );
}

export default function ProductLadder() {
  return (
    <section aria-label="Продуктовая лестница">
      <div className="eco-ladder">
        {ECOSYSTEM_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
