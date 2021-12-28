import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import './Body.css'
import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { PostContext } from '../../store/PostContext'
import { FireBaseContext } from '../../store/FireBaseContext';
import { SearchContext } from '../../store/SearchContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
function Body() {
    const [location, setLocation] = useState("NewDelhi");
    const Locations= ["NewDelhi", "Calicut", "Thrissur", "Kochi", "Thiruvandapuram", "Banglore", "Mumbai"]
    const {proSearch, setproSearch} = useContext(SearchContext);
    const history = useHistory();
    const {firebase} = useContext(FireBaseContext);
    const [products , setProducts]=useState([]);
    const {setPostDetails} = useContext(PostContext);
    
    useEffect(() => {
        firebase.firestore().collection('products').get().then((snapshot)=>{
           const allPost = snapshot.docs.filter((product)=>(
            //    product.data().name.toLowerCase().includes(proSearch) ||
               product.data().Location.toLowerCase().includes(proSearch)
           )).map((pdt)=>{
            return{
                ...pdt.data(), id:pdt.id
              }
           })
          setProducts(allPost);
          console.log(`updated`)
          
        })
      },[proSearch])
     AOS.init();
    return (
        <div className="main">
            {/* Top Part */}
         <div className="f1">
             
             <div className= "f11"><div className="f2">
             <div className="placeSearch dropbtn" onClick={
          ()=>{
            document.getElementById("myDropdown").classList.toggle("show");

        }}>{proSearch}  ^</div></div>
             <div className="dropdown-content" id="myDropdown">
            {Locations.map(e =>(
                  <div onClick={()=>{setproSearch(e.toLowerCase());
                    document.getElementById("myDropdown").classList.toggle("show");
                  }} className="drop-box">
                      {e}</div>
         ))}
          </div>
             </div>
             <div className="f12" onClick={()=>{history.push("/create")}}>+Add</div>
         </div>
        
    {/* Mid-Part */}




    <div className="c-main">
        <Row>
            {
                products.map(product=>{
                    return(
                        <Col lg={3} md={6} sm={6} xs={12} className="c-0"   data-aos="fade-up" onClick={
                            ()=>{
                                setPostDetails(product);
                                history.push('/view')
                            }
                        }>
                        <div className="card-main">
                         <img src={product.url} className="card-img"></img>
                         <div className="card-heading">{product.name}</div>
                         <div className="card-text">{product.type}</div>
                         <div className="card-text">{product.Location}</div>
                         <div className="card-text">{product.Phone}</div>
                         </div>
                         </Col>
                    )
                })
            }
       
        </Row>
    </div>
        </div>
    )
}

export default Body
