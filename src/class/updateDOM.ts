import { html } from "../getHtml.js";
import { Player, GameScore } from "./protocols/protocols.js";
export class UpdateDom {
	private icons = {
		X: "fa-solid fa-xmark",
		O: "fa-regular fa-circle",
	};

	private board: Element[] = html.getAll('[data-fn="squareClick"]');
	private modal = html.get("[data-js='modal']") as HTMLDivElement;
	constructor(private scoreboard: Element[]) {}

	updateSquare(player: Player, value: number) {
		const [squareToRefresh] = this.board.filter(
			(square) => Number(square.getAttribute("data-value")) === value,
		);
		const icon = document.createElement("i");

		icon.className = this.icons[player];
		squareToRefresh.appendChild(icon);
	}

	updateScore(player: Player | "ties", gameScore: GameScore) {
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

	uncheckSquare() {
		this.board.forEach((square) => {
			square.classList.remove("active");
			square.innerHTML = "";
		});
	}

	showModalOnTies() {
		const h2 = html.get("h2", this.modal);
		const congratulationsParagraph = html.get(
			".congratulationsParagraph",
			this.modal,
		) as HTMLParagraphElement;

		congratulationsParagraph.style.display = "none";
		const span = html.get("h2 span", this.modal) as HTMLSpanElement;
		span.style.display = "none";

		h2.textContent = "nobody won";
		this.modal.style.display = "flex";
	}

	showModal(player: Player | "ties") {
		if (player === "ties") return this.showModalOnTies();
		const span = html.get("h2 span", this.modal) as HTMLSpanElement;

		console.log(span);

		span.style.display = "initial";

		span.innerHTML = player;
		this.modal.style.display = "flex";
	}
}
