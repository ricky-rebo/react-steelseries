import React, { useEffect, useRef } from "react";

/**
 * Similar to useEffect hook, but don't run the effect on first render
 * @param effect effect function to execute
 * @param deps hook dependency lisy
 */
export function useDidUpdate(effect: React.EffectCallback, deps?: React.DependencyList) {
	const firstRender = useRef(true)

	useEffect(() => {
		if (!firstRender.current) {
			effect()
		} else {
			firstRender.current = false
		}
	}, deps)
}
