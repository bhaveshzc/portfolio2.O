import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import "./OriginCalendar.css";

export default function OriginCalendar({
  calUsername = import.meta.env.VITE_CAL_USERNAME || "bhaveshbisht",
  calEventSlug30m = import.meta.env.VITE_CAL_EVENT_SLUG_30M || "30min"
}) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        styles: {
          branding: { brandColor: "#D41414" },
        },
      });
    })();
  }, []);

  return (
    <div className="cal-inline-embed-wrapper">
      <Cal
        namespace="30min"
        calLink={`${calUsername}/${calEventSlug30m}`}
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{
          layout: "month_view",
          theme: "dark",
        }}
      />
    </div>
  );
}
