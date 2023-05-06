/**
 * 生成网站水印
 * @author Eward
 * 18/08/31
 */
export type watermarkSettingType = {
  /**
   * 水印显示的字
   * @author Eward
   * 18/08/31
   */
  text: string;
  /**
   * 横向之间间距
   * @author Eward
   * @default 32
   * 18/08/31
   */
  gutterX?: number;
  /**
   * 纵向之间间距
   * @author Eward
   * @default 16
   * 18/08/31
   */
  gutterY?: number;
  /**
   * 透明度(0-1)
   * @author Eward
   * 18/08/31
   */
  alpha?: number;
  /**
   * 水印倾斜度数 deg
   * @author Eward
   * @default 15
   * 18/08/31
   */
  angle?: number;
  /**
   * 更新频率 ms
   * @author Eward <ewardwang@126.com>
   * @default 50
   * @since 19/12/17
   */
  debounce?: number;
};

function uuid() {
  return `ww-${Math.random().toString(36).slice(2, 6)}`;
}

function debounce(fn: Function, time: number) {
  let last: number;
  return function () {
    let ctx = this,
      args = arguments;
    clearTimeout(last);
    last = setTimeout(function () {
      fn.apply(ctx, args);
    }, time);
  };
}

function generateImage(option: {
  fontSize?: number;
  text: string;
  paddingX?: number;
  paddingY?: number;
  angle?: number;
  alpha?: number;
}) {
  if (!option.text) throw new Error("text is invalid!");
  const fontSize = option.fontSize || 16;
  const text = option.text || "";
  const paddingX = option.paddingX || 32;
  const paddingY = option.paddingY || 16;
  const font = `${fontSize}px sans-serif `;
  const color = `rgba(0,0,0,${option.alpha || 0.3})`;
  const angle = option.angle || 15;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = font;
  ctx.fillStyle = color;
  const { width: fontWidth } = ctx.measureText(text);
  const fontHeight = fontSize;
  const actualDiagonal =
    fontHeight / 2 / Math.tan((90 - angle) * (Math.PI / 180)) +
    fontHeight / 2 / Math.tan((angle * Math.PI) / 180) +
    fontWidth;
  const actualHeight =
    (Math.abs(Math.sin(angle * (Math.PI / 180))) * actualDiagonal +
      paddingY * 2) *
    window.devicePixelRatio;
  const actualWidth =
    (Math.abs(Math.cos(angle * (Math.PI / 180))) * actualDiagonal +
      paddingX * 2) *
    window.devicePixelRatio;

  canvas.width = actualWidth;
  canvas.height = actualHeight;

  ctx.translate(actualWidth / 2, actualHeight / 2);
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  ctx.rotate(-angle * (Math.PI / 180));
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 0, 0);
  const result = canvas.toDataURL("image/png", 1);
  return result;
}

const isObject = (obj: any) =>
  obj && Object.prototype.toString.call(obj) === "[object Object]";

class Watermark {
  private setting: watermarkSettingType = null;
  private readonly update: () => void = null;
  private _refreshing = false;
  private wrapper: HTMLDivElement;

  private observer: MutationObserver;
  private observerWrapper: MutationObserver;

  constructor(setting?: watermarkSettingType) {
    this.setting = {
      text: "",
      alpha: 0.35,
      angle: 15,
      debounce: 50,
      gutterX: 32,
      gutterY: 16,
      ...((isObject(setting) && setting) || {}),
    };

    this.update = debounce(this.build, this.setting.debounce).bind(this);
  }

  public init = () => {
    this.build();

    this.observer = new MutationObserver(this.observerCallback);
    this.observer.observe(document.body, {
      childList: true,
    });
  };
  private observerCallback = (mutations: MutationRecord[]) => {
    if (this._refreshing) return;
    let wasChanged = false;
    for (const r of mutations) {
      if (r.target === document.body) {
        for (const n of r.removedNodes) {
          if (n === this.wrapper) {
            wasChanged = true;
            break;
          }
        }
      }
    }
    if (wasChanged) {
      this._refreshing = true;
      this.build();
    }
  };

  private observerWrapperCallback = (mutations: MutationRecord[]) => {
    if (this._refreshing) return;
    let wasChanged = false;
    for (const r of mutations) {
      if (r.target === this.wrapper) {
        wasChanged = true;
        break;
      }
    }
    if (wasChanged) {
      this._refreshing = true;
      this.build();
    }
  };

  // aha destory -> destroy;
  public destory() {
    this.destroy();
  }

  public destroy() {
    this.observer.disconnect();
    if (this.wrapper) {
      if (this.observerWrapper) {
        this.observerWrapper.disconnect();
        this.observerWrapper = null;
      }
      if (document.body.contains(this.wrapper)) {
        document.body.removeChild(this.wrapper);
      }
      this.wrapper = null;
    }
  }

  public change = (param?: Partial<watermarkSettingType>): void => {
    if (!isObject(param)) return;
    this.setting = { ...this.setting, ...param };
    this.update();
  };

  private build() {
    this._refreshing = true;
    if (this.wrapper) {
      if (document.body.contains(this.wrapper)) {
        document.body.removeChild(this.wrapper);
      }
      this.observerWrapper.disconnect();
      this.observerWrapper = null;
      this.wrapper = null;
    }
    this.wrapper = document.createElement("div");
    this.wrapper.style.cssText = `
        overflow: hidden!important;
        background-image:url(${generateImage(this.setting)}) !important;
        position: fixed!important;
        top: 0!important;
        left: 0!important;
        width: 100vw!important;
        height: 100vh!important;
        z-index: 9999!important;
        pointer-events: none!important;`;
    document.body.appendChild(this.wrapper);
    this.observerWrapper = new MutationObserver(this.observerWrapperCallback);
    this.observerWrapper.observe(this.wrapper, {
      attributes: true,
    });
    setTimeout(() => (this._refreshing = false));
  }
}

export default Watermark;
