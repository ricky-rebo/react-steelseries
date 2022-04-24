import { MutableRefObject, useEffect } from "react";
import { useDidUpdate } from "./common";

type Ref<T> = MutableRefObject<T>

type Getter = () => unknown
type Setter<G, V> = (value: V) => G | void
type SetterWithCallback<G, V> = (value: V, callback: () => {}) => G | void

/**
 * Base Gauge with specific setter + generic setters and getters
 */
type BG<G, SN extends keyof G, V, _OMNs extends Exclude<keyof G, SN> = Exclude<keyof G, SN>> = {
	[setterName in SN]: Setter<G, V>
} & {
	[methodName in _OMNs]: Getter | Setter<G, unknown> | SetterWithCallback<G, unknown>
}

export function useInitUpdateGaugeProp<V, G extends BG<G, SN, V>, SN extends keyof G> (
	gaugeRef: Ref<G>, setterName: SN, value: V
) {
	useEffect(() => { gaugeRef.current && gaugeRef.current[setterName](value) }, [value])
}

export function useUpdateGaugeProp<V, G extends BG<G, SN, V>, SN extends keyof G> (
	gaugeRef: Ref<G>, setterName: SN, value: V
) {
	useDidUpdate(() => { gaugeRef.current && gaugeRef.current[setterName](value) }, [value])
}
