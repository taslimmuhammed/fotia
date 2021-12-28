import React, { Fragment } from 'react';
import './Create.css';
import ProNav from '../NavBar/NavBar';
import { useState, useContext, useEffect } from 'react';
import { FireBaseContext, AuthContext } from '../../store/FireBaseContext';
import { useHistory } from 'react-router';
import { Col, Row } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
const Create = () => {
    const history = useHistory();
    const { firebase } = useContext(FireBaseContext);
    const { user } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [type, settype] = useState('');
    const [Location, setLocation] = useState('newDelhi');
    const [Phone, setPhone] = useState('');
    const [image, setimage] = useState(null);
    const [location1, setLocation1] = useState({});
    const date = new Date();

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation1({
            latitude,
            longitude,
        });
    };

    const error = () => {
        alert(' Unable to retrieve your location. London is set as default location.');
    };

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error, {
                timeout: 5000,
                enableHighAccuracy: true,
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    useEffect(() => {
        getUserLocation();
    }, [location1]);

    const handleSubmit = () => {
        firebase
            .storage()
            .ref(`/image/${image.name}`)
            .put(image)
            .then(({ ref }) =>
                ref.getDownloadURL().then((url) => {
                    console.log(url);
                    firebase
                        .firestore()
                        .collection('products')
                        .add({
                            name,
                            Location,
                            Phone,
                            url,
                            type,
                            createdAt: date.toDateString(),
                            userId: user.uid,
                            location: location1,
                        })
                        .then(history.push('/'));
                })
            );
    };
    return (
        <div className='l1'>
            <Fragment>
                {/* <ProNav /> */}
                <card>
                    <div className='centerDiv'>
                        {/* <Row><Col lg={6} md={6} sm={12} xs={12}> */}
                        <label htmlFor='fname'>first Name</label>
                        <br />
                        <input
                            className='input'
                            type='text'
                            id='fname'
                            name='Name'
                            defaultValue='John'
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            className='in1'
                            maxLength='10'
                        />
                        {/* </Col>
            <Col lg={6} md={6} sm={12} xs={12}> */}
                        <br></br>
                        <label htmlFor='fname'>Type of incident</label>
                        <br />
                        <input
                            className='input'
                            type='text'
                            id='fname'
                            name='Name'
                            defaultValue='Flood'
                            value={type}
                            onChange={(e) => {
                                settype(e.target.value);
                            }}
                            className='in1'
                            maxLength='25'
                        />
                        {/* </Col>
           </Row> */}
                        <br />
                        <label htmlFor='fname'>Location</label>
                        <br />
                        <select
                            className='input'
                            id='fname'
                            name='Location'
                            defaultValue='cars'
                            value={Location}
                            onChange={(e) => {
                                setLocation(e.target.value);
                            }}
                            className='in1'
                            style={{ color: 'black' }}
                        >
                            <option value='NewDelhi'>NewDelhi</option>
                            <option value='Calicut'>Calicut</option>
                            <option value='Thrissur'>Thrissur</option>
                            <option value='Kochi'>Kochi</option>
                            <option value='Thiruvandapuram'>Thiruvandapuram</option>
                            <option value='Banglore'>Banglore</option>
                            <option value='Mumbai'>Mumbai</option>
                        </select>
                        <br />
                        <label htmlFor='fname'>Phone</label>
                        <br />
                        <input
                            className='input'
                            type='number'
                            id='fname'
                            name='Phone'
                            value={Phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                            className='in1'
                        />
                        <br />
                        <img
                            alt='Posts'
                            width='200px'
                            height='200px'
                            src={image ? URL.createObjectURL(image) : null}
                        ></img>

                        <br />
                        <input
                            type='file'
                            onChange={(e) => {
                                setimage(e.target.files[0]);
                            }}
                            className='in1'
                        />
                        <br />
                        <button onClick={handleSubmit} className='uploadBtn'>
                            upload and Submit
                        </button>
                    </div>
                </card>
            </Fragment>
        </div>
    );
};

export default Create;
