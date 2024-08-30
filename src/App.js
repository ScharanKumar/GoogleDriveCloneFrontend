import { Switch, Route } from "react-router-dom"
import Home from "./components/Home"
import Register from "./components/Register"
import Login from "./components/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import Drive from "./components/Drive"
import InsideFolder from "./components/InsideFolder"



const App = () => {
  return (

    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/drive" component={Drive} />
      <ProtectedRoute exact path="/folder/:id" component={InsideFolder} />
    </Switch>

  )
}

export default App;
