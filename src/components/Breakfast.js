import React from 'react'
import Header from './layout/Header';
import Footer from './layout/Footer';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

function Breakfast() {
  return (
      <>
          <Header />

          <Container fluid className='breakfastTheme'>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
          </Container>


          <Container fluid='lg' className='border border-success border-5 vh-100'>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
          </Container>

          <Footer />
      </>


    
  )
}

export default Breakfast
