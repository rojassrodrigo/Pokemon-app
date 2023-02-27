import './App.css';
import { BrowserRouter , Route , Switch} from "react-router-dom";
import LandingPage from './components/LandingPage.jsx';
import Home from "./components/Home.jsx"
import Detail from './components/Detail.jsx';
import Create from './components/Create.jsx';


function App() {
  return (
    <BrowserRouter>
      <div className="app"> 
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route path="/home" component={Home} ></Route>
        <Route path="/create" component={Create}></Route>
        <Route path="/pokemons/:id" component={Detail} ></Route> 
      </Switch >
      </div>
    </BrowserRouter>
  );
}

export default App;
