import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';

function WishList() {
  return (
    <>
  
 <Container className='d-flex flex-column justify-content-center align-items-center'>
        <h2 className='text-start text-primary mt-5 mb-3'> Wishlist <i class="fa-regular fa-heart"></i></h2>
        <Row style={{width:"85%"}} className='border rounded shadow  d-flex align-items-center justify-content-center '>
          <Col  xs={1} md={1} lg={1}><span className='text-success'>#:</span> <br /><span className='text-muted mt-1'>1</span></Col>
          <Col  xs={3} md={3} lg={3}><span className='text-success '>Event:</span> <br /><span className='text-muted mt-1 text-uppercase'>IND VS AUS</span></Col>
          <Col  xs={3} md={3} lg={3} className='p-1'><img
          style={{width:"100px"}}
                  className="img-fluid rounded shadow "
                  src="https://img.etimg.com/thumb/width-640,height-480,imgsize-9102,resizemode-75,msid-99188557/news/sports/icc-reveals-logo-for-cricket-world-cup-2023-india-on-12th-anniversary-of-cwc-2011-triumph.jpg"
                  alt=""
                /></Col>
          <Col  xs={3} md={3} lg={3}><button className='btn btn-primary shadow '>Get Tickets</button></Col>
          <Col className='ps-3'  xs={2} md={2} lg={2}><i class="fa-solid fa-delete-left fs-4" style={{color:"red"}}></i></Col>
         

        </Row>
      </Container>

    </>
  )
}

export default WishList