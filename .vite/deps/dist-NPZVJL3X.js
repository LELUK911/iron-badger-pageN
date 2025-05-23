import {
  ConfigCtrl,
  ModalCtrl,
  OptionsCtrl,
  ThemeCtrl
} from "./chunk-35YKZJSE.js";
import "./chunk-ONY6HBPH.js";

// node_modules/@walletconnect/modal/dist/index.js
var WalletConnectModal = class {
  constructor(config) {
    this.openModal = ModalCtrl.open;
    this.closeModal = ModalCtrl.close;
    this.subscribeModal = ModalCtrl.subscribe;
    this.setTheme = ThemeCtrl.setThemeConfig;
    ThemeCtrl.setThemeConfig(config);
    ConfigCtrl.setConfig(config);
    this.initUi();
  }
  async initUi() {
    if (typeof window !== "undefined") {
      await import("./dist-RPYTV4EO.js");
      const modal = document.createElement("wcm-modal");
      document.body.insertAdjacentElement("beforeend", modal);
      OptionsCtrl.setIsUiLoaded(true);
    }
  }
};
export {
  WalletConnectModal
};
//# sourceMappingURL=dist-NPZVJL3X.js.map
