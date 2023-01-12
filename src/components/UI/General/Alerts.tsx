import { Report } from "notiflix/build/notiflix-report-aio";

export function NotYetImplemented() {
  return Report.info(
    "Sorry..",
    "This feature is not yet implemented.",
    "Okay",
    {
      backOverlayClickToClose: true,
      backOverlay: true,
      backOverlayColor: "rgba(0,0,0,0.5)",
      svgSize: "64px",
    }
  );
}
