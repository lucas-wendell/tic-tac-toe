import { html } from "../getHtml.js";
import { Player, GameScore } from "./protocols/protocols.js";
export class UpdateDom {
	private icons = {
		X: "fa-solid fa-xmark",
		O: "fa-regular fa-circle",
	};

	private board: Element[] = html.getAll('[data-fn="squareClick"]');
	private modal = html.get("[data-js='modal']") as HTMLDivElement;

	private winnerModal = html.get(".winnerModal", this.modal) as HTMLDivElement;
	private tiesModal = html.get(".tiesModal", this.modal) as HTMLDivElement;
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
		this.winnerModal.style.display = "none";
		this.tiesModal.style.display = "flex";

		this.modal.style.display = "flex";
	}

	showModal(player: Player | "ties") {
		if (player === "ties") return this.showModalOnTies();
		const span = html.get("h2 span", this.winnerModal) as HTMLSpanElement;

		this.winnerModal.style.display = "flex";
		this.tiesModal.style.display = "none";

		span.innerHTML = player;
		this.modal.style.display = "flex";
	}
}
