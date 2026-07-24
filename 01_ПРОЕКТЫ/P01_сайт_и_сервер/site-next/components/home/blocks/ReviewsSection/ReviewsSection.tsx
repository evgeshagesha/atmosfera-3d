import { REC2040537801_HTML } from "./html";
import ReviewsSlider from "./ReviewsSlider";

export default function ReviewsSection() {
  return (
    <>
      <div
        data-site-block="rec2040537801"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: REC2040537801_HTML }}
      />
      <ReviewsSlider targetId="rec2040537801" />
    </>
  );
}
