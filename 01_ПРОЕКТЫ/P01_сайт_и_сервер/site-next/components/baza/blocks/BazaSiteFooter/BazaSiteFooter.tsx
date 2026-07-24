import { LOGO_SRC } from "@/components/home/blocks/SiteHeader/styles";

const FOOTER_LINKS = [
  { href: "/", label: "Евгений Гошев | EG | Атмосфера 3D" },
  { href: "/policy", label: "Политика конфиденциальности" },
  { href: "/personal", label: "Согласие на обработку персональных данных" },
  { href: "/oferta", label: "Публичная оферта" },
] as const;

function StyleTag({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

export default function BazaSiteFooter() {
  return (
    <div
      id="rec2073587801"
      className="r t-rec t-rec_pt_15 t-rec_pt-res-480_15 t-rec_pb_30 t-rec_pb-res-480_15"
      style={{ paddingTop: "15px", paddingBottom: "30px", backgroundColor: "#000000" }}
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
                <li key={link.href} className="t457__li">
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="t457__col_mt30 t-col t-col_12">
            <a className="t457__link" href="/" target="_blank">
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
              © Атмосфера 3D | Евгений Гошев
              <br />
              Системная работа с телом через движение, дыхание <br />и телесные практики
            </div>
          </div>
        </div>
      </div>
      <StyleTag css="#rec2073587801 .t457__link{font-size:28px;color:#ffffff;font-weight:600;}#rec2073587801 .t457__copyright{color:#ffffff;}#rec2073587801 .t457__li a{color:#ffffff;}" />
      <StyleTag css="#rec2073587801 .t457__logo{color:#ffffff;font-weight:600;}@media screen and (min-width:480px){#rec2073587801 .t457__logo{font-size:28px;}}" />
    </div>
  );
}
