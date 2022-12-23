import { TicTacToe } from "../class/game.js";
import { Player } from "../class/game.js";
import { accessActions } from "../main.js";

const main = document.querySelector(".main") as HTMLDivElement;
const firstPlayer = localStorage.getItem("firstPlayer") as Player;
const newGame = new TicTacToe(firstPlayer);

const actions = {
	squareClick: (target: Element) => {
		const value = target.getAttribute("data-value") as string;
		newGame.updateMoves(+value);
	},
};

main.addEventListener("click", (e) => accessActions(e, actions));
