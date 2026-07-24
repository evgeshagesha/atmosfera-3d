import { LOGO_SRC } from "@/components/home/blocks/SiteHeader/styles";

const FOOTER_LINKS = [
  { href: "/about", target: "_blank", number: "1", label: "обо мне" },
  { href: "#rec2034125511", number: "2", label: "формат работы" },
  { href: "", number: "3", label: "студия АТМОСФЕРА" },
  { href: "/club", target: "_blank", number: "4", label: "ОНЛАЙН-Сообщество" },
  { href: "/policy", target: "_blank", number: "5", label: "" },
  { href: "/oferta", number: "6", label: "" },
  { href: "/personal", target: "_blank", number: "7", label: "" },
  { href: "/about", label: "Евгений Гошев — путь к здоровью через движение" },
  { href: "/policy", label: "Политика конфиденциальности" },
  { href: "/personal", label: "Согласие на обработку персональных данных" },
  { href: "/oferta", label: "Публичная оферта" },
] as const;

function StyleTag({ css }: { css: string }) {
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

export default function SiteFooter() {
  return (
    <div
      id="rec2039329591"
      className="r t-rec t-rec_pt_0 t-rec_pt-res-480_0 t-rec_pb_0"
      style={{ paddingTop: "0px", paddingBottom: "0px", backgroundColor: "#000000" }}
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
            <a className="t457__link" href="#rec2034125511">
              <img
                className="t457__logo t457__img t-img"
                src={LOGO_SRC}
                data-original={LOGO_SRC}
                {...({ imgfield: "img" } as Record<string, string>)}
                style={{ maxWidth: "100px", width: "100%" }}
                alt="Евгений Гошев | EG"
              />
            </a>
          </div>
          <div className="t-col t-col_12">
            <div className="t457__copyright" {...({ field: "text" } as Record<string, string>)}>
              Самозанятый Гошев Евгений Николаевич
              <br />
              ИНН: 366224223508
              <br />© 2026 Евгений Гошев | Атмосфера 3D
            </div>
          </div>
        </div>
      </div>
      <StyleTag css="#rec2039329591 .t457__link{font-size:14px;color:#000000;}#rec2039329591 .t457__copyright{color:#ffffff;}#rec2039329591 .t457__li a{color:#ffffff;}" />
      <StyleTag css="#rec2039329591 .t457__logo{font-size:14px;color:#000000;}" />
    </div>
  );
}
