import { TicTacToe } from "../class/game";
import { Player } from "../class/protocols/protocols";
import { accessActions } from "../main";

import { html } from "../getHtml";
import { UpdateDom } from "../class/updateDOM";

const modal = html.get('[data-js="modal"]') as HTMLDivElement;

const scoreboard = html.getAll('[data-js="scoreboard"]');
const firstPlayer = localStorage.getItem("firstPlayer") as Player;

const updateDOM = new UpdateDom(scoreboard);
const newGame = new TicTacToe(firstPlayer, updateDOM);

export const actions = {
	squareClick(target: Element) {
		const value = target.getAttribute("data-value") as string;
		newGame.updateMoves(+value);
	},
	restartBoard() {
		newGame.restartRound();
	},
	modaQuitButton() {
		modal.style.display = "none";
	},
	modaRestartButton() {
		modal.style.display = "none";
		newGame.restartGame();
	},
};

modal?.addEventListener("click", (e) => accessActions(e, actions));
