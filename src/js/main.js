import Alert from "./Alert.js";
import { loadHeaderFooter } from "./utils.mjs";

(async function init() {
	const alerts = new Alert();
	await alerts.loadAndRender();

	loadHeaderFooter();
})();
