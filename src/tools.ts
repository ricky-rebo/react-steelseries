export function definedAndChanged<T = unknown>(prop: T, prev: T) {
	return (prop !== undefined && prop !== prev)
}

export function updateIfChanged<T = unknown>(prop: T, prev: T, updateFunction: (p: T) => unknown) {
	if(definedAndChanged(prop, prev)) {
		updateFunction(prop);
		return true;
	}

	return false;
}