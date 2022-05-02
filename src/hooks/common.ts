import React, { useEffect, useRef } from "react";

/**
 * It runs the effect callback only after the first render
 * @param effect - React.EffectCallback
 * @param [deps] - An array of dependencies that will be used to determine if the
 * effect should be re-run.
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
