import { Wifi } from "lucide-react";
import type { ReactNode } from "react";

/**
 * iPhone Pro dibujado en CSS. 71.6 x 147.6 mm, esquinas de radio elíptico y
 * marco de titanio con bandas especulares en los cantos.
 */
export const IPhonePro = ({ children }: { children: ReactNode }) => (
  <div className="iphone" aria-hidden="true">
    <span className="iphone__btn iphone__btn--action" />
    <span className="iphone__btn iphone__btn--vol-up" />
    <span className="iphone__btn iphone__btn--vol-down" />
    <span className="iphone__btn iphone__btn--power" />

    <div className="iphone__frame">
      <div className="iphone__screen">
        <div className="iphone__island">
          <span className="iphone__lens" />
        </div>

        <div className="iphone__statusbar">
          <span>9:41</span>
          <span className="iphone__status-icons">
            <span className="iphone__bars">
              <i />
              <i />
              <i />
              <i />
            </span>
            <Wifi size={11} strokeWidth={2.6} />
            <span className="iphone__battery" />
          </span>
        </div>

        <div className="iphone__viewport">{children}</div>

        <span className="iphone__home" />
        <span className="iphone__glass" />
        <span className="sweep sweep--phone" />
      </div>
    </div>
  </div>
);
