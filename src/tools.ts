export function definedAndChanged<T = unknown>(prop: T, prev: T) {
	return ((prop !== undefined || prev !== undefined) && prop !== prev)
}

export function updateIfChanged<T = unknown>(prop: T, prev: T, updateFunction: (p: T) => unknown) {
	if(definedAndChanged(prop, prev)) {
		updateFunction(prop);
		return true;
	}

	return false;
}

export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getSetterName(prop: string) {
	return `set${capitalize(prop)}`;
}