import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

function Footer() {
  return (
      <footer className=' border-top border-warning border-3'>
          <Container fluid>
              <Row className='align-items-center'>
                  <Col xs={9} >
                      <p className='text-light footerlogo ps-4 pt-3 d-inline-block'>
                          Food<span className='text-warning'>i</span>
                      </p>
                      <small className='ps-4'>@ 2022 Foodi. All Rights Reserved</small>

                  </Col>

                  <Col className='text-end'>
                      <i className="bi bi-instagram"></i>
                      <i className="bi bi-facebook" style={{color: 'rgb(0, 132, 255)'}}></i>
                      <i className="bi bi-youtube" style={{color: 'red'}}></i>
                  </Col>
              </Row>
          </Container>

      </footer>

  )
}

export default Footer
