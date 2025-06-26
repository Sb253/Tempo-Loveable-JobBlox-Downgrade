import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TempoDevtools } from "tempo-devtools";

// Initialize Tempo Devtools
TempoDevtools.init();

// Initialize Capacitor plugins for mobile only when available
const initializeCapacitor = async () => {
  try {
    // Check if we're in a browser environment first
    if (typeof window === "undefined") {
      return;
    }

    // Use Function constructor to avoid Vite pre-transform resolution
    const dynamicImport = new Function("specifier", "return import(specifier)");

    // Try to import Capacitor core
    let Capacitor;
    try {
      const capacitorModule = await dynamicImport("@capacitor/core");
      Capacitor = capacitorModule.Capacitor;
    } catch (error) {
      console.log("Capacitor core not available, running in web mode");
      return;
    }

    if (Capacitor && Capacitor.isNativePlatform()) {
      console.log(
        "Running on native platform - initializing Capacitor plugins",
      );

      // StatusBar plugin
      try {
        const statusBarModule = await dynamicImport("@capacitor/status-bar");
        const { StatusBar, Style } = statusBarModule;
        await StatusBar.setStyle({ style: Style.Dark }).catch(console.warn);
        await StatusBar.setBackgroundColor({ color: "#1e293b" }).catch(
          console.warn,
        );
      } catch (error) {
        console.warn("StatusBar plugin not available:", error);
      }

      // SplashScreen plugin
      try {
        const splashScreenModule = await dynamicImport(
          "@capacitor/splash-screen",
        );
        const { SplashScreen } = splashScreenModule;
        await SplashScreen.hide().catch(console.warn);
      } catch (error) {
        console.warn("SplashScreen plugin not available:", error);
      }

      // App plugin
      try {
        const appModule = await dynamicImport("@capacitor/app");
        const { App } = appModule;
        App.addListener("appStateChange", ({ isActive }) => {
          console.log("App state changed. Is active?", isActive);
        }).catch(console.warn);

        App.addListener("appUrlOpen", (event) => {
          console.log("App opened with URL:", event.url);
        }).catch(console.warn);
      } catch (error) {
        console.warn("App plugin not available:", error);
      }
    } else {
      console.log("Running in web mode - Capacitor plugins not needed");
    }
  } catch (error) {
    console.log("Capacitor initialization failed, running in web mode:", error);
  }
};

// Initialize Capacitor after a short delay to ensure DOM is ready
setTimeout(initializeCapacitor, 100);

// Register service worker for PWA functionality
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
