import { html } from "../getHtml.js";
import { Player, GameScore } from "./protocols/protocols.js";
export class UpdateDom {
	private icons = {
		X: "fa-solid fa-xmark",
		O: "fa-regular fa-circle",
	};

	private board: Element[] = html.getAll('[data-fn="squareClick"]');
	constructor(private scoreboard: Element[]) {}

	updateSquare(player: Player, value: number) {
		const [squareToRefresh] = this.board.filter(
			(square) => Number(square.getAttribute("data-value")) === value,
		);
		const icon = document.createElement("i");

		icon.className = this.icons[player];
		squareToRefresh.appendChild(icon);
	}

	updateScore(player: Player, gameScore: GameScore) {
		const [winner] = this.scoreboard.filter(
			(item) => item.getAttribute("data-value") === player,
		);

		const paragraphScore = html.get(".score", winner);
		paragraphScore.textContent = gameScore[player].toString();
	}

	markSquares(sequence: number[]) {
		sequence.forEach((sequenceNumber) => {
			this.board.forEach((square) => {
				const squareValue = Number(square.getAttribute("data-value"));
				if (squareValue === sequenceNumber) {
					square.classList.add("active");
				}
			});
		});
	}
}
