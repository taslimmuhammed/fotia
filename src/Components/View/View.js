import './View.css'
import {Row, Col, Button } from 'react-bootstrap'
import { useState, useContext, useEffect } from 'react';
import { PostContext } from '../../store/PostContext'
import { FireBaseContext, AuthContext } from '../../store/FireBaseContext';
import ProNav from '../NavBar/NavBar';
import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
function View() {
  AOS.init();
  const [setuserDetails] = useState();
  const {PostDetails, setPostDetails} = useContext(PostContext);
  const {firebase} = useContext(FireBaseContext);
  useEffect(() => {
    const {userId} = PostDetails;
    firebase.firestore().collection('users').where('id','==',userId)
    .get().then((res)=>{
      res.forEach(doc =>{
        setuserDetails(doc.data());
        console.log(`updated`)
      })
      })
  }, [PostDetails])
    return (
        <div className="main">
          <ProNav/>
            <Row className="view">
                <Col lg={6} md={12} sm={12} xs={12} data-aos="fade-left">
                   <div className="view-img">
                   <img
          src={PostDetails.url}
          alt="Product image"
          className="Product"
        />
       
                   </div>
         <div className="btn-5">
        <a href={`tel: ${PostDetails.Phone}`}>
        <Button variant="success" ><div className="btn-6"> Contact </div></Button></a>
        </div>
                </Col>
                <Col lg={6} md={12} sm={12} xs={12}  data-aos="fade-left">
                  <div className="text-main">
                  <div className="t5">Name:</div>
                  <div className="t6">{PostDetails.name} </div><div className="hr"></div>
                  <div className="t5">Location:</div>
                  <div className="t6">{PostDetails.Location}</div><div className="hr"></div>
                  <div className="t5">Type of incident:</div>
                  <div className="t6">{PostDetails.type}</div><div className="hr"></div>
                  <div className="t5">Phone Number:</div>
                  <div className="t6">{PostDetails.Phone}</div><div className="hr"></div>
                  <div className="t5">Date:</div>
                  <div className="t6">{PostDetails.createdAt}</div><div className="hr"></div>
                  
                 {
                   PostDetails.location1? 
                     <>
                     <div className="t5">Longitude:</div>
                    <div className="t6">{PostDetails.location1.longitude}</div><div className="hr"></div>
                    <div className="t5">Latitude:</div>
                    <div className="t6">{PostDetails.location1.latitude}</div><div className="hr"></div></>: null
                   };
            
                  
               </div> </Col>
            </Row>
            <div className="t7" data-aos="fade-up">Location:</div>
            <div className="map-1"  data-aos="fade-up">
               <img  className="map-2" src="https://xmonkeys360.com/wp-content/uploads/2020/02/Googlemap-600x551-1.jpg"></img>
            </div>
        </div>
    )
}

export default View
