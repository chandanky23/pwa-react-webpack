import React from "react"
import { Switch, Route } from "react-router-dom"
import Home from "./Home"
import About from "./About"
import Contact from "./Contact"
import Experiences from "./Experiences"
import Error from "./Error"

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/conact">
        <Contact />
      </Route>
      <Route path="/experiences">
        <Experiences />
      </Route>
      <Route path="*">
        <Error />
      </Route>
    </Switch>
  )
}

export default Routes
