import { createApp } from "vue";
import App from "./App.vue";

// Icons and Styles
// import FontAwesomePlugin from "./plugins/FontAwesome";
import "./assets/main.pcss";

// App Wide Components
import AppButton from "./components/AppButton.vue";
import AppCountInput from "./components/AppCountInput.vue";
import AppModalOverlay from "./components/AppModalOverlay.vue";

import { createPinia } from "pinia";
import { PiniaHistoryPlugin } from './plugins/PiniaHistoryPlugin'
import { toolTipPlugin } from "./plugins/toolTipPlugin";
const pinia = createPinia();
pinia.use(PiniaHistoryPlugin)

import directive from './directives/click-outside-directive.js'

// const directive = {
//   mounted(el, binding) {
//     el.__ClickOutSideHandler__ = (event) => {
//       if (!(el == event.target || el.contains(event.target))) {
//         binding.value(event)
//       }
//     }
//     document.body.addEventListener("click", el.__ClickOutSideHandler__)

//   },
//   unmounted(el) {
//     document.body.removeEventListener("click", el.__ClickOutSideHandler__)

//   }
// }
// Init App

let app = createApp(App)
app.config.globalProperties.$environment = 'development'
app.directive('click-outside', directive)

  .use(pinia)
  .use(toolTipPlugin, { option1: true })
  // .use(FontAwesomePlugin())

  .component("AppButton", AppButton)
  .component("AppCountInput", AppCountInput)
  .component("AppModalOverlay", AppModalOverlay)
  .mount("#app");
