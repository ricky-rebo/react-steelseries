import { MutableRefObject } from "react";

export const mockRef = jest.fn(<T>(refValue: T) => (<MutableRefObject<T>>{ current: refValue }))

export type TMockGauge = { setAttr: (newAttr: number) => TMockGauge, getAttr: () => number}
export const MockGauge = jest.fn<TMockGauge, [_canvas: string | HTMLCanvasElement, _params: { attr?: number; }]> (
  function (_canvas: string | HTMLCanvasElement, _params: { attr?: number; }) {
    let attr = _params.attr ?? 0;

    this.setAttr = function (newAttr: number) {
      attr = newAttr;
    };

    this.getAttr = function () {
      return attr;
    };

    return this
  }
)

export type TMockGaugeAnimatable = {
  setValue: (newValue: number) => TMockGaugeAnimatable
  setValueAnimated: (newValue: number, callback?: () => void) => TMockGaugeAnimatable
  getValue: () => number
  getAnimated: () => boolean
}
export const MockGaugeAnimatable = jest.fn<TMockGaugeAnimatable, []>(
  function () {
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

    return this
  }
)
