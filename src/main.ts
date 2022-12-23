type ObjectType = { [key: string]: (...args) => unknown };

export const accessActions = (e: Event, object: ObjectType) => {
	type AllowedKeys = keyof typeof object;

	const target = e.target as Element;
	const funcName = target.getAttribute("data-fn");

	const fun = object[funcName as AllowedKeys];
	fun?.(target);
};
