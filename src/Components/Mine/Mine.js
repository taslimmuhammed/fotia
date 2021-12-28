import React from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { PostContext } from '../../store/PostContext'
import { FireBaseContext, AuthContext } from '../../store/FireBaseContext';
import { SearchContext } from '../../store/SearchContext';
import DeleteButton from './DeleteButton';
import ProNav from '../NavBar/NavBar';
import AOS from 'aos';
import 'aos/dist/aos.css';

function MyProducts() {
    const [MyProducts, setMyProducts] = useState([]);
    const history = useHistory();
    const {firebase} = useContext(FireBaseContext);
    const {user} = useContext(AuthContext);
    const {PostDetails, setPostDetails} = useContext(PostContext);

    useEffect(() => {
        firebase.firestore().collection('products').get().then((snapshot)=>{
           const allPost = snapshot.docs.filter((product)=>(
            product.data().userId == user.uid )).map((pdt)=>{
            return{
                ...pdt.data(), id:pdt.id
              }
           })
          setMyProducts(allPost);
          console.log(`updated`)
          
        })
      },[MyProducts])
  AOS.init();
    return (
        <div className="main">
            <ProNav/>
             <div className="c-main">
        <Row>
            {
                MyProducts.map(product=>{
                    return(
                        <Col lg={3} md={6} sm={6} xs={12} className="c-0"   data-aos="fade-up">
                        <div className="card-main-1">
                         <img src={product.url} className="card-img"></img>
                         <div className="card-heading">{product.name}</div>
                         <div className="card-text">{product.type}</div>
                         <div className="card-text">{product.Location}</div>
                         <div className="card-text">{product.Phone}</div>
                         
                         <Button variant="outline-danger" className="bt1" 
                         onClick={
                             ()=>{
                                firebase.firestore().collection('products').doc(product.id).delete().then(()=>{
                                    alert(`${product.name} deleted succesfully`);
                                    history.push("/myproducts")
                    
                                }).catch(()=>alert(`Error, could not delete the item`)) 
                             }
                         }
                         >Delete Case</Button>
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

export default MyProducts
