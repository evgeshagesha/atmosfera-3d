import { REC2191126061_HTML } from "./html";
import ContactFormClient from "./ContactFormClient";

export default function ContactFormSection() {
  return (
    <>
      <div
        data-site-block="rec2191126061"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: REC2191126061_HTML }}
      />
      <ContactFormClient formId="form2191126061" popupHook="#popup:myform" />
    </>
  );
}
