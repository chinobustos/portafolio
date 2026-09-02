import { Lock } from "lucide-react";
import type { ReactNode } from "react";

/**
 * MacBook Pro 14" dibujado en CSS. Toda la geometría vive en devices.css y se
 * deriva de las cotas reales del hardware (tapa 312.6 x 221.2 mm, bisel de
 * 3.5 mm, notch de 22 x 8.7 mm).
 */
export const MacBookPro = ({
  /** Ruta que muestra la barra de direcciones, para `chrome: "safari"`. */
  path,
  /** Título de la ventana, para `chrome: "terminal"`. */
  title,
  /** Un proyecto de terminal dentro de una ventana de Safari no tiene sentido. */
  chrome = "safari",
  children
}: {
  path?: string;
  title?: string;
  chrome?: "safari" | "terminal";
  children: ReactNode;
}) => {
  const isTerminal = chrome === "terminal";

  return (
    <div className="mbp" aria-hidden="true">
      <div className="mbp__lid">
        <div className="mbp__screen">
          <div className="mbp__notch">
            <span className="mbp__camera" />
          </div>

          <div className="mbp__menubar">
            <strong style={{ fontWeight: 600 }}>
              {isTerminal ? "Terminal" : "Safari"}
            </strong>
            <span>{isTerminal ? "Shell" : "Archivo"}</span>
            <span>Edición</span>
            <span>Ver</span>
            <span className="mbp__menubar-spacer" />
            <span>9:41</span>
          </div>

          <div className="mbp__chrome">
            <div className="mbp__lights">
              <span className="mbp__light mbp__light--red" />
              <span className="mbp__light mbp__light--amber" />
              <span className="mbp__light mbp__light--green" />
            </div>

            {isTerminal ? (
              <span className="mbp__title">{title}</span>
            ) : (
              <div className="mbp__address">
                <Lock size={9} strokeWidth={2.4} />
                <span>{path}</span>
              </div>
            )}
          </div>

          <div className="mbp__viewport">{children}</div>

          <span className="mbp__glass" />
          <span className="sweep" />
        </div>

        <span className="mbp__wordmark">MacBook Pro</span>
      </div>

      <div className="mbp__hinge" />
      <div className="mbp__base" />
      <span className="mbp__floor" />
    </div>
  );
};
