/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/class/game.ts":
/*!***************************!*\
  !*** ./src/class/game.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.TicTacToe = void 0;\nclass TicTacToe {\n    constructor(firstPlayer, updateDom) {\n        this.updateDom = updateDom;\n        this.isThereAWinner = false;\n        this.numberOfMoves = 0;\n        this.board = [\"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\"];\n        this.sequences = [\n            [0, 1, 2],\n            [3, 4, 5],\n            [6, 7, 8],\n            [0, 3, 6],\n            [1, 4, 7],\n            [2, 5, 8],\n            [0, 4, 8],\n            [2, 4, 6],\n        ];\n        this.gameScore = {\n            X: 0,\n            O: 0,\n            ties: 0,\n        };\n        this.acutalPlayer = firstPlayer;\n        this.updateDom.updateTurnDiv(this.acutalPlayer);\n    }\n    restartBoard() {\n        this.board.forEach((_, index) => {\n            this.board[index] = \"\";\n        });\n    }\n    restartRound() {\n        this.restartBoard();\n        this.updateDom.uncheckSquare();\n        this.numberOfMoves = 0;\n    }\n    restartGame() {\n        this.invertPlayer();\n        this.restartBoard();\n        this.isThereAWinner = false;\n        this.numberOfMoves = 0;\n        this.updateDom.uncheckSquare();\n        this.updateDom.updateTurnDiv(this.acutalPlayer);\n    }\n    handleOnTies() {\n        this.gameScore.ties++;\n        this.updateDom.updateScore(\"ties\", this.gameScore);\n        this.updateDom.showModal(\"ties\");\n        this.isThereAWinner = false;\n    }\n    handleOnVictory(player, sequenceIndex) {\n        this.gameScore[player]++;\n        this.updateDom.updateScore(player, this.gameScore);\n        this.updateDom.markSquares(this.sequences[sequenceIndex]);\n        this.updateDom.showModal(player);\n        this.isThereAWinner = true;\n    }\n    checkWinner(player) {\n        this.sequences.forEach((_, index) => {\n            const thereIsAWinner = this.board[this.sequences[index][0]] == player &&\n                this.board[this.sequences[index][1]] == player &&\n                this.board[this.sequences[index][2]] == player;\n            if (thereIsAWinner) {\n                this.handleOnVictory(player, index);\n            }\n        });\n        if (this.numberOfMoves === 9 && this.isThereAWinner === false) {\n            this.handleOnTies();\n        }\n    }\n    invertPlayer() {\n        this.acutalPlayer === \"X\"\n            ? (this.acutalPlayer = \"O\")\n            : (this.acutalPlayer = \"X\");\n    }\n    updateMoves(position) {\n        if (this.board[position] !== \"\")\n            return;\n        this.board[position] = this.acutalPlayer;\n        this.numberOfMoves++;\n        this.checkWinner(this.acutalPlayer);\n        this.updateDom.updateSquare(this.acutalPlayer, position);\n        this.invertPlayer();\n        this.updateDom.updateTurnDiv(this.acutalPlayer);\n    }\n}\nexports.TicTacToe = TicTacToe;\n\n\n//# sourceURL=webpack://tic-tac-toe/./src/class/game.ts?");

/***/ }),

/***/ "./src/class/updateDOM.ts":
/*!********************************!*\
  !*** ./src/class/updateDOM.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.UpdateDom = void 0;\nconst getHtml_1 = __webpack_require__(/*! ../getHtml */ \"./src/getHtml.ts\");\nclass UpdateDom {\n    constructor(scoreboard) {\n        this.scoreboard = scoreboard;\n        this.board = getHtml_1.html.getAll('[data-fn=\"squareClick\"]');\n        this.modal = getHtml_1.html.get(\"[data-js='modal']\");\n        this.winnerModal = getHtml_1.html.get(\".winnerModal\", this.modal);\n        this.tiesModal = getHtml_1.html.get(\".tiesModal\", this.modal);\n        this.turnDiv = getHtml_1.html.get(\".main .turnDiv\");\n        this.icons = {\n            X: \"fa-solid fa-xmark\",\n            O: \"fa-regular fa-circle\",\n        };\n    }\n    getSquareToRefresh(value) {\n        return this.board.filter((square) => Number(square.getAttribute(\"data-value\")) === value);\n    }\n    updateSquare(player, value) {\n        const [squareToRefresh] = this.getSquareToRefresh(value);\n        const icon = document.createElement(\"i\");\n        icon.className = this.icons[player];\n        squareToRefresh.appendChild(icon);\n    }\n    updateScore(player, gameScore) {\n        const [winner] = this.scoreboard.filter((item) => item.getAttribute(\"data-value\") === player);\n        const paragraphScore = getHtml_1.html.get(\".score\", winner);\n        paragraphScore.textContent = gameScore[player].toString();\n    }\n    markSquares(sequence) {\n        sequence.forEach((sequenceNumber) => {\n            this.board.forEach((square) => {\n                const squareValue = Number(square.getAttribute(\"data-value\"));\n                if (squareValue === sequenceNumber) {\n                    square.classList.add(\"active\");\n                }\n            });\n        });\n    }\n    uncheckSquare() {\n        this.board.forEach((square) => {\n            square.classList.remove(\"active\");\n            square.innerHTML = \"\";\n        });\n    }\n    showModalOnTies() {\n        this.winnerModal.style.display = \"none\";\n        this.tiesModal.style.display = \"flex\";\n        this.modal.style.display = \"flex\";\n    }\n    showModal(player) {\n        if (player === \"ties\")\n            return this.showModalOnTies();\n        const span = getHtml_1.html.get(\"h2 span\", this.winnerModal);\n        this.winnerModal.style.display = \"flex\";\n        this.tiesModal.style.display = \"none\";\n        span.innerHTML = player;\n        this.modal.style.display = \"flex\";\n    }\n    updateTurnDiv(player) {\n        const span = getHtml_1.html.get(\"p span\", this.turnDiv);\n        if (span) {\n            span.innerHTML = `<i class=\"${this.icons[player]}\"></i>`;\n        }\n    }\n}\nexports.UpdateDom = UpdateDom;\n\n\n//# sourceURL=webpack://tic-tac-toe/./src/class/updateDOM.ts?");

/***/ }),

/***/ "./src/gamePage/index.ts":
/*!*******************************!*\
  !*** ./src/gamePage/index.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.actions = void 0;\nconst game_1 = __webpack_require__(/*! ../class/game */ \"./src/class/game.ts\");\nconst main_1 = __webpack_require__(/*! ../main */ \"./src/main.ts\");\nconst getHtml_1 = __webpack_require__(/*! ../getHtml */ \"./src/getHtml.ts\");\nconst updateDOM_1 = __webpack_require__(/*! ../class/updateDOM */ \"./src/class/updateDOM.ts\");\nconst modal = getHtml_1.html.get('[data-js=\"modal\"]');\nconst scoreboard = getHtml_1.html.getAll('[data-js=\"scoreboard\"]');\nconst firstPlayer = localStorage.getItem(\"firstPlayer\");\nconst updateDOM = new updateDOM_1.UpdateDom(scoreboard);\nconst newGame = new game_1.TicTacToe(firstPlayer, updateDOM);\nexports.actions = {\n    squareClick(target) {\n        const value = target.getAttribute(\"data-value\");\n        newGame.updateMoves(+value);\n    },\n    restartBoard() {\n        newGame.restartRound();\n    },\n    modaQuitButton() {\n        modal.style.display = \"none\";\n    },\n    modaRestartButton() {\n        modal.style.display = \"none\";\n        newGame.restartGame();\n    },\n};\nmodal === null || modal === void 0 ? void 0 : modal.addEventListener(\"click\", (e) => (0, main_1.accessActions)(e, exports.actions));\n\n\n//# sourceURL=webpack://tic-tac-toe/./src/gamePage/index.ts?");

/***/ }),

/***/ "./src/getHtml.ts":
/*!************************!*\
  !*** ./src/getHtml.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.html = void 0;\nexports.html = {\n    get(element, target) {\n        if (target)\n            return target.querySelector(element);\n        return document.querySelector(element);\n    },\n    getAll(element, target) {\n        if (target)\n            return Array.from(target.querySelectorAll(element));\n        return Array.from(document.querySelectorAll(element));\n    },\n};\n\n\n//# sourceURL=webpack://tic-tac-toe/./src/getHtml.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst getHtml_1 = __webpack_require__(/*! ./getHtml */ \"./src/getHtml.ts\");\nconst main_1 = __webpack_require__(/*! ./main */ \"./src/main.ts\");\nconst index_1 = __webpack_require__(/*! ./gamePage/index */ \"./src/gamePage/index.ts\");\nconst index_2 = __webpack_require__(/*! ./indexPage/index */ \"./src/indexPage/index.ts\");\nconst main = getHtml_1.html.get(\".main\");\nconst mainGame = getHtml_1.html.get(\".main\");\nmain.addEventListener(\"click\", (e) => (0, main_1.accessActions)(e, index_2.actions));\nmainGame.addEventListener(\"click\", (e) => (0, main_1.accessActions)(e, index_1.actions));\n\n\n//# sourceURL=webpack://tic-tac-toe/./src/index.ts?");

/***/ }),

/***/ "./src/indexPage/index.ts":
/*!********************************!*\
  !*** ./src/indexPage/index.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.actions = void 0;\nconst getHtml_1 = __webpack_require__(/*! ../getHtml */ \"./src/getHtml.ts\");\nconst buttons = Array.from(getHtml_1.html.getAll(\".chooseButtons button\"));\nconst filterButton = () => {\n    return buttons.filter((button) => button.getAttribute(\"data-js\"));\n};\nexports.actions = {\n    chooseSymbolButton(target) {\n        const dataJs = target.getAttribute(\"data-js\");\n        const [actualButton] = filterButton();\n        if (!(dataJs === \"active\")) {\n            actualButton.removeAttribute(\"data-js\");\n            target.setAttribute(\"data-js\", \"active\");\n        }\n    },\n    choosePlayerButton(target) {\n        const [actualButton] = filterButton();\n        const firstPlayer = actualButton.getAttribute(\"value\");\n        const secondPlayerIs = target.getAttribute(\"value\");\n        localStorage.setItem(\"firstPlayer\", firstPlayer);\n        localStorage.setItem(\"secondPlayerIs\", secondPlayerIs);\n    },\n};\n\n\n//# sourceURL=webpack://tic-tac-toe/./src/indexPage/index.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.accessActions = void 0;\nconst accessActions = (e, object) => {\n    const target = e.target;\n    const funcName = target.getAttribute(\"data-fn\");\n    const fun = object[funcName];\n    fun === null || fun === void 0 ? void 0 : fun(target);\n};\nexports.accessActions = accessActions;\n\n\n//# sourceURL=webpack://tic-tac-toe/./src/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;