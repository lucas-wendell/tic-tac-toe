import { accessActions } from "../main.js";

const main = document.querySelector(".main") as HTMLDivElement;
const buttons = Array.from(
	document.querySelectorAll(".chooseButtons button"),
) as HTMLButtonElement[];

const filterButton = () => {
	return buttons.filter((button) => button.getAttribute("data-js"));
};

const actions = {
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

main.addEventListener("click", (e: Event) => accessActions(e, actions));
