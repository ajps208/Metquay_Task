import React, { useEffect,useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import { Link, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// import { SERVER_URL } from '../Services/baseURL';

import nodata from '../../Assets/nodata.png'
import { BASE_URL } from '../../USER/Services/baseURL';
import { EventDeleteAPI } from '../../USER/Services/allApi';
import { deleteStatus } from '../../USER/Context/AuthContext';

function AEpost({event}) {
  const{setDeleteStaus}=useContext(deleteStatus)
  const [loading, setLoading] = useState(true);
  const[displayEvent,setDisplayEvent]=useState({})
  const[logged,setLogged]=useState(false)
  const navigate = useNavigate();
  const handleButtonClick = (id) => {
    navigate(`/ticket/${id}`);
    };
  const handleLoginClick=()=>{
    navigate('/login');
  }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (item) => {
      setShow(true);
     setDisplayEvent(item)}
     
    useEffect(() => {
      if (event && event.length > 0) {
        setLoading(false);
      }
    }, [event]);
    useEffect(()=>{
      if(sessionStorage.getItem('token')){
        setLogged(true)
      }else{
        setLogged(false)
      }
     },[logged])

    //  delete event
    const handleDelete=async(id)=>{
      console.log(id);
      const result=await EventDeleteAPI(id)
      if (result.status===200) {
        setDeleteStaus(result.data)
        handleClose()
      }

    }
  return (
    <>
    <Container className='mt-4'>
    <div className='d-flex align-items-center justify-content-between'>
        {/* <h3 className='fs-2 ' >The Latest </h3> */}
   </div>
       <Row className='mt-4'> 
       {loading ? (
            <Skeleton count={5}/>
          ):
           event.length>0?event.map((item)=>( <Col sm={12} md={3} lg={3} onClick={()=>handleShow(item)}>
                
                <div className='d-flex flex-column ' style={{width:"100%"}}>
                    <div style={{width:"100%",position:"relative",height:"25vh",boxShadow: '0 4px 8px rgba(255, 255, 0, 0.5)'}}>
                        <img className='img-fluid h-100'width={'100%'} style={{ objectFit: 'cover', borderRadius: '8px'}} src={`${BASE_URL}/uploads/${item.image}`} alt="" />
                        <div style={{position:"absolute",width:"100%",height:"40px",bottom:"0px",borderRadius: '8px',backgroundColor:"rgba(0, 0, 0, 0.608)"}} className='text-light p-2'><i class="fa-solid fa-calendar-days" style={{color:"yellow"}}></i>  {item.date}</div>
                    </div>
                    <div className='w-100' >
                        <h5 className='mt-2 text-uppercase w-100 '>{item.name}</h5>
                        <p className='text-muted w-100 '>{item.location}</p>
                        <p className='text-muted ' style={{width:"240px"}}>₹ {item.price[2]} onwards</p>

                    </div>
                </div>
        </Col>)):<div className='d-flex justify-content-center align-items-center'><img className='img-fluid' width={"150px"} src={nodata} alt="" /> <h2 className='text-primary'>No data found !!!</h2></div>}
       </Row>
    </Container>
        {/* MODAL */}
        <Modal
        key={displayEvent._id}
        size='lg'
        show={show}
        onHide={handleClose}
      
        keyboard={false}
      >
        <Modal.Header className='d-flex flex-column position-relative'style={{height:"400px",backgroundImage: `url(${BASE_URL}/uploads/${displayEvent.image})`,backgroundSize:"cover",backgroundPosition:"center"}} >
          
          <Modal.Title  closeButton className='w-100 d-flex  justify-content-between align-items-center'  >
           <div className='d-flex flex-column mt-3 '>
            {displayEvent.subcategory?  <h5 style={{color:"yellow",
                  textShadow:
                    "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
                }}>{displayEvent.subcategory}</h5>:null}
              <h1 className='text-light  ' style={{
                  textShadow:
                    "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000", textTransform: "uppercase"
                }}>{displayEvent.name} </h1>
           </div><div><Badge bg="info">{displayEvent.category}</Badge></div></Modal.Title>
          <div  style={{width:"100%",height:"80px",backgroundColor:"rgba(0, 0, 0, 0.608)"}} className='fixed-bottom text-light  position-absolute'>
            <div className='d-flex justify-content-between align-items-center'>
            <div className='p-2'>
                <h6><i class="fa-regular fa-calendar-days" style={{color:"yellow"}}></i> {displayEvent.date}</h6>
                <p><i class="fa-regular fa-clock" style={{color:"yellow"}}></i>  {displayEvent.time}</p>
            </div>
            <p className='pe-2'><i class="fa-solid fa-location-dot" style={{color:"red"}}></i> {displayEvent.location} </p>
            </div>
             </div>
        </Modal.Header>
        <Modal.Body>
            <h5>About</h5>
         {displayEvent.description}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='text-dark' onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleDelete(displayEvent._id)}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AEpost