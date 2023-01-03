import { html } from "./getHtml";
import { accessActions } from "./main";

import { actions as actionsGamePage } from "./gamePage/index";
import { actions as actionsIndexPage } from "./indexPage/index";

const main = html.get(".main") as HTMLDivElement;
const mainGame = html.get(".main") as HTMLDivElement;

main.addEventListener("click", (e: Event) =>
	accessActions(e, actionsIndexPage),
);
mainGame.addEventListener("click", (e: Event) =>
	accessActions(e, actionsGamePage),
);
