import React from 'react';
import { useState, useContext } from 'react';
import './Signup.css';
import { FireBaseContext } from '../../store/FireBaseContext';
import { useHistory } from 'react-router';
import ProNav from '../NavBar/NavBar'
export default function Signup() {
  const {firebase} = useContext(FireBaseContext);
  const history = useHistory();
 const [name, setName] = useState("");
 const [userName, setuserName] = useState("");
 const [passWord, setpassWord] = useState("");
 const [phone, setphone] = useState("");
 const handleSubmit= (e)=>{
   e.preventDefault();
   firebase.auth().createUserWithEmailAndPassword(userName, passWord).then((res)=>{
     res.user.updateProfile({displayName:userName}).then(()=>{
       firebase.firestore().collection('users').add({
         id:res.user.uid,
         userName:userName,
         phone:phone
       }).then(()=>history.push("/login"))
    
     })
   })
 };
 
  return (
    <div className="l1">
      <ProNav/>
      <div className="signupParentDiv">
        <form  onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            className="in1"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={userName}
            onChange={e=>setuserName(e.target.value)}
            className="in1"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
            value={phone}
            onChange={
              e=>setphone(e.target.value)
            }
            className="in1"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={passWord}
            onChange={e=>setpassWord(e.target.value)}
            className="in1"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>history.push("/login")}>Login</a>
      </div>
    </div>
  );
}
