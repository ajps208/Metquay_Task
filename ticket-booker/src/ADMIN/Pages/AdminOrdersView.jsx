import React from 'react'
import Sidebar from '../Components/Sidebar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OrderTable from '../Components/OrderTable';

function AdminOrdersView() {
  return (
    <>
    <Row className=' w-100'>
    <Col  xs={12} md={2} lg={2} ><Sidebar/></Col>
     <Col  xs={12} md={10} lg={10}><Container className=' d-flex flex-column align-items-center justify-content-center' >
          <h1 className='mt-5'>ALL ORDERS</h1>
          <OrderTable/>
        </Container></Col>
      </Row>
    
    </>
  )
}

export default AdminOrdersView