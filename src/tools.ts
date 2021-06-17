
export function definedAndChanged<T = unknown>(prop: T, prev: T) {
	return (prop !== undefined && prop !== prev)
}