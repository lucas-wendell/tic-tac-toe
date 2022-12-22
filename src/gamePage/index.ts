import { TicTacToe } from "../class/game.js";
import { Player } from "../class/game.js";

const main = document.querySelector(".main") as HTMLDivElement;
const firstPlayer = localStorage.getItem("firstPlayer") as Player;
const newGame = new TicTacToe(firstPlayer);

const actions = {
	squareClick(target: Element) {
		const value = target.getAttribute("data-value") as string;
		newGame.updateMoves(+value);
	},
};

main.addEventListener("click", (e) => {
	type AllowedKeys = keyof typeof actions;

	const target = e.target as Element;
	const funcName = target.getAttribute("data-fn");

	const fun = actions[funcName as AllowedKeys];
	fun?.(target);
});
