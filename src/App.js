import logo from './logo.svg';
import './App.css';
import ProNav from './Components/NavBar/NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './Components/Home/Home';
import Seacher from './store/SearchContext'
import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import Create from './Components/Create/Create'
import { AuthContext, FireBaseContext } from './store/FireBaseContext';
import { useContext, useEffect } from 'react';
import MyProducts from './Components/Mine/Mine'
import View from './Components/View/View';
import { Redirect } from 'react-router';
function App() {
  const {setUser} = useContext(AuthContext)
const {firebase} = useContext(FireBaseContext)
 useEffect(() => {
  firebase.auth().onAuthStateChanged((user)=>{
    setUser(user)
  })}
)
  return (


  <Router>
    <div>
  <Seacher>
   <Switch>
    <Route exact path="/" ><HomeScreen/></Route>
    <Route path="/signup" ><Signup></Signup></Route>
    <Redirect to='/' path="/fotia"> </Redirect>
        <Route path="/login" ><Login></Login></Route>
        <Route path="/create" ><Create></Create></Route>
        <Route path="/view"><View></View> </Route>
        <Route path="/myproducts"><MyProducts></MyProducts></Route>
        </Switch>
 </Seacher>
</div>
  </Router>

  );
}
export default App;
