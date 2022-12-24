type GetHtml = {
	get(element: string, target?: Element): Element;
	getAll(element: string, targte?: Element): Element[];
};

export const html: GetHtml = {
	get(element, target) {
		if (target) return target.querySelector(element) as Element;
		return document.querySelector(element) as Element;
	},
	getAll(element, target) {
		if (target) return Array.from(target.querySelectorAll(element));
		return Array.from(document.querySelectorAll(element));
	},
};
