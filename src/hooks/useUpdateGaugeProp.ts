import { MutableRefObject } from "react";
import { useDidUpdate } from "./useDidUpdate";

export function useUpdateGaugeProp<V, G> (gaugeRef: MutableRefObject<G>, setterName: keyof G, value: V) {
	useDidUpdate(() => {
		gaugeRef.current && (<any>gaugeRef.current[setterName])(value)
	}, [value])
}
