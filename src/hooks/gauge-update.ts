import { MutableRefObject, DependencyList, useEffect } from "react"
import { useDidUpdate } from "./common"

type Ref<T> = MutableRefObject<T>

type Callback = () => void
type Getter = () => unknown
type Setter<G, V> = (value: V) => G | void
type CallbackSetter<G, V> = (value: V, callback: Callback) => G | void

type Gauge<G, SN extends keyof G, V> = {
  [setterName in SN]: Setter<G, V>
} & {
  [methodName in Exclude<keyof G, SN>]: Getter | Setter<G, unknown> | CallbackSetter<G, unknown>
}

/** Base gauge with setValue and setValueAnimated methods + generic setters and getters */
type ValueSetterName = "setValue" | "setValueAnimated"
type AnimatableGauge<G, V> = {
  setValue: Setter<G, V>
  setValueAnimated: CallbackSetter<G, V>
} & {
  [methodName in Exclude<keyof G, ValueSetterName>]: Getter | Setter<G, unknown> | CallbackSetter<G, unknown>
}

/**
 * It calls a setter on a gauge, passing it a value, whenever the value changes
 * @param gaugeRef - Ref<G>
 * @param setterName - The name of the setter function to call on the gauge.
 * @param value - The value to set the gauge property to.
 */
export function useSetGaugeProp<V, G extends Gauge<G, SN, V>, SN extends keyof G>(
  gaugeRef: Ref<G>,
  setterName: SN,
  value: V
) {
  useEffect(() => {
    gaugeRef.current && gaugeRef.current[setterName](value)
  }, [value])
}

/**
 * It sets the value of a gauge, and optionally animates the change
 * @param gaugeRef - Ref<G> - a ref to the gauge
 * @param value - The value to set the gauge to.
 * @param animate - boolean - whether to animate the gauge or not
 * @param callback - Callback
 * @param additionalDeps - Additional dependencies of the effect
 */
export function useSetGaugeValue<V, G extends AnimatableGauge<G, V>>(
  gaugeRef: Ref<G>,
  value: V,
  animate: boolean,
  callback: Callback,
  additionalDeps: DependencyList = []
) {
  useEffect(() => {
    if (gaugeRef.current) {
      if (animate) {
        gaugeRef.current.setValueAnimated(value, callback)
      } else {
        gaugeRef.current.setValue(value)
      }
    }
  }, [value, ...additionalDeps])
}

/**
 * It updates a gauge property when the value changes
 * @param gaugeRef - Ref<G>
 * @param setterName - The name of the setter function to call on the gauge.
 * @param value - V
 */
export function useUpdateGaugeProp<V, G extends Gauge<G, SN, V>, SN extends keyof G>(
  gaugeRef: Ref<G>,
  setterName: SN,
  value: V
) {
  useDidUpdate(() => {
    gaugeRef.current && gaugeRef.current[setterName](value)
  }, [value])
}
