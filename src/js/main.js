import Alert from "./Alert.js";
import { loadHeaderFooter } from "./utils.mjs";

const alerts = new Alert();
await alerts.loadAndRender();
 
loadHeaderFooter();
