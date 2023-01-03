import { html } from "../getHtml";

const buttons = Array.from(
	html.getAll(".chooseButtons button"),
) as HTMLButtonElement[];

const filterButton = () => {
	return buttons.filter((button) => button.getAttribute("data-js"));
};

export const actions = {
	chooseSymbolButton(target: Element) {
		const dataJs = target.getAttribute("data-js");
		const [actualButton] = filterButton();

		if (!(dataJs === "active")) {
			actualButton.removeAttribute("data-js");
			target.setAttribute("data-js", "active");
		}
	},

	choosePlayerButton(target: Element) {
		const [actualButton] = filterButton();
		const firstPlayer = actualButton.getAttribute("value") as string;
		const secondPlayerIs = target.getAttribute("value") as string;

		localStorage.setItem("firstPlayer", firstPlayer);
		localStorage.setItem("secondPlayerIs", secondPlayerIs);
	},
};
