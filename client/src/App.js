import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Home from './Components/Home/Home';
import CardDetail from "./Components/CardDetail/CardDetail"
import {CreateDog} from './Components/CreateDog/CreateDog';
import LandingPage from "./Components/LandingPage/LandingPage";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/home/:id" component={CardDetail} />
      <Route path='/create' component={CreateDog} />
    </div>
    </BrowserRouter>
  );
}

export default App;