import React from "react"
import { render } from "react-dom"
import App from "./views"

render(<App />, document.getElementById("app"))

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../sw.js")
    .then((register) => {
      console.log('service worker registered:', register)
    })
    .catch((err) => console.log(`Service worker not registered: ${err}`))
}
