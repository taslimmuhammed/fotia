import React from 'react';
import { useState , useContext} from 'react';
import { FireBaseContext } from '../../store/FireBaseContext';
import './Login.css';
import { useHistory } from 'react-router';
import ProNav from '../NavBar/NavBar'
function Login() {
  const [userName, setuserName] = useState("");
  const [passWord, setpassWord] = useState("");
  const {firebase} = useContext(FireBaseContext);
  const history = useHistory();
  const handleSubmit= (e)=>{
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(userName, passWord).then(()=>{
      history.push("/")
    }).catch((err)=>{
      alert(err.message)
    })
    
    }
  return (
    <div className="l1">
    <ProNav/>
      <div className="loginParentDiv">
        {/* <img width="200px" height="200px" src={Logo}></img> */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            className="in1"
            value ={userName}
            onChange={(e)=>setuserName(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            className="in1"
            defaultValue="Doe"
            value={passWord}
            onChange={e=>setpassWord(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>{history.push("/signup")}}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
