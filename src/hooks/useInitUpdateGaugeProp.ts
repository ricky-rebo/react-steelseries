import { MutableRefObject, useEffect } from "react";

export function useInitUpdateGaugeProp<V, G, S extends keyof G> (gaugeRef: MutableRefObject<G>, setterName: S, value: V) {
	useEffect(() => {
		gaugeRef.current && (<any>gaugeRef.current[setterName])(value)
	}, [value])
}
