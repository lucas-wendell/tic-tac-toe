export class TicTacToe {
    constructor(firstPlayer, updateDom) {
        this.updateDom = updateDom;
        this.isThereAWinner = false;
        this.numberOfMoves = 0;
        this.board = ["", "", "", "", "", "", "", "", ""];
        this.sequences = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        this.gameScore = {
            X: 0,
            O: 0,
            ties: 0,
        };
        this.acutalPlayer = firstPlayer;
        this.updateDom.updateTurnDiv(this.acutalPlayer);
    }
    restartBoard() {
        this.board.forEach((_, index) => {
            this.board[index] = "";
        });
    }
    restartRound() {
        this.restartBoard();
        this.updateDom.uncheckSquare();
    }
    restartGame() {
        this.invertPlayer();
        this.restartBoard();
        this.isThereAWinner = false;
        this.numberOfMoves = 0;
        this.updateDom.uncheckSquare();
        this.updateDom.updateTurnDiv(this.acutalPlayer);
    }
    handleOnTies() {
        this.gameScore.ties++;
        this.updateDom.updateScore("ties", this.gameScore);
        this.updateDom.showModal("ties");
        this.isThereAWinner = false;
    }
    handleOnVictory(player, sequenceIndex) {
        this.gameScore[player]++;
        this.updateDom.updateScore(player, this.gameScore);
        this.updateDom.markSquares(this.sequences[sequenceIndex]);
        this.updateDom.showModal(player);
        this.isThereAWinner = true;
    }
    checkWinner(player) {
        this.sequences.forEach((_, index) => {
            const thereIsAWinner = this.board[this.sequences[index][0]] == player &&
                this.board[this.sequences[index][1]] == player &&
                this.board[this.sequences[index][2]] == player;
            if (thereIsAWinner) {
                this.handleOnVictory(player, index);
            }
        });
        if (this.numberOfMoves === 9 && this.isThereAWinner === false) {
            this.handleOnTies();
        }
    }
    invertPlayer() {
        this.acutalPlayer === "X"
            ? (this.acutalPlayer = "O")
            : (this.acutalPlayer = "X");
    }
    updateMoves(position) {
        if (this.board[position] !== "")
            return;
        this.board[position] = this.acutalPlayer;
        this.numberOfMoves++;
        this.checkWinner(this.acutalPlayer);
        this.updateDom.updateSquare(this.acutalPlayer, position);
        this.invertPlayer();
        this.updateDom.updateTurnDiv(this.acutalPlayer);
    }
}
