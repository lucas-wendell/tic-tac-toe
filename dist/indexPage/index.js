import { accessActions } from "../main.js";
const main = document.querySelector(".main");
const buttons = Array.from(document.querySelectorAll(".chooseButtons button"));
const filterButton = () => {
    return buttons.filter((button) => button.getAttribute("data-js"));
};
const actions = {
    chooseSymbolButton(target) {
        const dataJs = target.getAttribute("data-js");
        const [actualButton] = filterButton();
        if (!(dataJs === "active")) {
            actualButton.removeAttribute("data-js");
            target.setAttribute("data-js", "active");
        }
    },
    choosePlayerButton(target) {
        const [actualButton] = filterButton();
        const firstPlayer = actualButton.getAttribute("value");
        const secondPlayerIs = target.getAttribute("value");
        localStorage.setItem("firstPlayer", firstPlayer);
        localStorage.setItem("secondPlayerIs", secondPlayerIs);
    },
};
main.addEventListener("click", (e) => accessActions(e, actions));
