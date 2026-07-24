import { LOGO_SRC } from "@/components/home/blocks/SiteHeader/styles";

const FOOTER_LINKS = [
  { href: "/brand", target: "_blank", number: "1", label: "начать работу" },
  { href: "#rec2039710061", number: "2", label: "обо мне " },
  { href: "#rec2039710141", number: "3", label: "мой подход" },
  { href: "/", label: "Евгений Гошев | EG | Атмосфера 3D" },
  { href: "/policy", label: "Политика конфиденциальности" },
  { href: "/personal", label: "Согласие на обработку персональных данных" },
  { href: "/oferta", label: "Публичная оферта" },
] as const;

function StyleTag({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

export default function AboutSiteFooter() {
  return (
    <div
      id="rec2039710211"
      className="r t-rec t-rec_pt_0 t-rec_pb_60 t-rec_pb-res-480_45"
      style={{ paddingTop: "0px", paddingBottom: "60px", backgroundColor: "#000000" }}
      data-animationappear="off"
      data-record-type="457"
      data-bg-color="#000000"
      suppressHydrationWarning
    >
      <div className="t457">
        <div className="t-container">
          <div className="t-col t-col_12">
            <ul className="t457__ul">
              {FOOTER_LINKS.map((link) => (
                <li key={`${link.href}-${link.label}`} className="t457__li">
                  <a
                    href={link.href}
                    {...("target" in link ? { target: link.target } : {})}
                    {...("number" in link ? { "data-menu-item-number": link.number } : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="t457__col_mt30 t-col t-col_12">
            <a className="t457__link" href="#rec2039710181">
              <img
                className="t457__logo t457__img t-img"
                src={LOGO_SRC}
                data-original={LOGO_SRC}
                {...({ imgfield: "img" } as Record<string, string>)}
                alt=""
              />
            </a>
          </div>
          <div className="t-col t-col_12">
            <div className="t457__copyright" {...({ field: "text" } as Record<string, string>)}>
              Евгений Гошев | Атмосфера 3D
            </div>
          </div>
        </div>
      </div>
      <StyleTag css="#rec2039710211 .t457__link{font-size:28px;color:#ffffff;font-weight:600;}#rec2039710211 .t457__copyright{color:#FFFFFF;}#rec2039710211 .t457__li a{color:#ffffff;}" />
      <StyleTag css="#rec2039710211 .t457__logo{color:#ffffff;font-weight:600;}@media screen and (min-width:480px){#rec2039710211 .t457__logo{font-size:28px;}}" />
    </div>
  );
}
