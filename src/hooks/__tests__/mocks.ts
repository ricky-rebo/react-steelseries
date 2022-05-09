import { MutableRefObject } from "react";

export function mockRef<T>(refValue: T) {
  return <MutableRefObject<T>>{ current: refValue }
}

export class MockGauge {
  setAttr: (newAttr: number) => void;
  getAttr: () => number;

  constructor(_canvas: string | HTMLCanvasElement, _params: { attr?: number; }) {
    let attr = _params.attr ?? 0;

    this.setAttr = function (newAttr: number) {
      attr = newAttr;
    };

    this.getAttr = function () {
      return attr;
    };
  }
}

export class MockGaugeAnimatable {
  setValue: (newValue: number) => void
  setValueAnimated: (newValue: number, callback?: () => void) => void
  getValue: () => number
  getAnimated: () => boolean

  constructor() {
    let value = 0
    let animated = false

    this.setValue = function (newValue: number) {
      value = newValue
      animated = false
    }

    this.setValueAnimated = function (newValue: number, callback?: () => void) {
      value = newValue
      animated = true

      if (callback)
        callback()
    }

    this.getValue = function () {
      return value
    }

    this.getAnimated = function () {
      return animated
    }
  }
}
