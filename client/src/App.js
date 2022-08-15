import { Route, Switch } from "react-router-dom";
import './App.css';
import Landing from './components/Landing/Landing';
import DogDetails from "./components/DogDetails/DogDetails";
import Home from "./components/Home/Home";
import Create from "./components/Create/Create";

function App() {
  return (
    <div className="App">
      <Switch>
          <Route exact path="/"><Landing /></Route>
          <Route path="/home"><Home /></Route>
          <Route path="/detail/:dogId" 
                 render={({match}) => {
                   return (
                    <DogDetails id={match.params.dogId}/>
                   )
                 }}
          />
          <Route path="/create"><Create /></Route>
      </Switch>
    </div>
  );
}

export default App;