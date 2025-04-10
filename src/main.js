import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";

// Add a global error handler for dynamic imports
window.addEventListener("error", (event) => {
  if (
    event.error &&
    (event.error.message.includes(
      "Failed to fetch dynamically imported module",
    ) ||
      event.error.message.includes("Importing a module script failed"))
  ) {
    window.location.reload();
  }
});

createApp(App).mount("#app");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope,
        );
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });
}
