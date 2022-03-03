import { React, useState, useEffect } from 'react'
import operator from '../../assets/Img/operator.jpg'
import logo from '../../assets/Img/logo.jpg'
import certificate from '../../assets/Img/certificate.jpg'
import mec from '../../assets/Img/mec.png'
import Pagination from '@mui/material/Pagination'

const Service = () => {
  const [services, setServices] = useState('')
  const [pageCount, setPageCount] = useState('')

  const onPageChange = (event, value) => {
    getServices(value - 1)
  }
  const getServices = async (pagenumber) => {
    try {
      const rawResponse = await fetch(
        'https://portal-sazmani.com/admin/Services/API/_all?token=test',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            token: 'test',
          },

          body: JSON.stringify({
            limit: '4',
            page: pagenumber,
          }),
        }
      )
      const content = await rawResponse.json()
      if (content.isDone) {
        setServices(content.data.data)
        setPageCount(content.data.pageCount)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getServices(0)
  }, [])

  return (
    <div>
      <div className='mt-5 mx-3' style={{ textAlign: 'right' }}>
        <div
          style={{
            backgroundColor: '#161f3c',
            padding: '15px 30px 30px 30px',
            borderRadius: '15px',
            margin: 'auto',
          }}
          className='row col-lg-10 col-md-12 col-sm-12 col-12 mt-3'
        >
          <p
            style={{
              color: 'white',
              fontWeight: 'bolder',
              fontSize: '20px',
              textAlign: 'center',
              marginTop: '20px',
            }}
          >
            خدمات ما
          </p>
        </div>
        <div
          className='row col-lg-10 col-md-12 col-sm-12 col-12 mt-5'
          style={{ margin: 'auto' }}
        >
          <div className='col-lg-12 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2'>
            {services &&
              services.map((e) => {
                return (
                  <div key={e.id} className='m-3'>
                    <div
                      className='row  mt-3'
                      style={{
                        boxShadow: '0px 0px 5px 0px rgb(0 0 0 / 50%)',
                        borderRadius: '15px',
                      }}
                    >
                      <div className='col-lg-9 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 py-4 px-4'>
                        <p
                          style={{
                            color: '#3b4872',
                            fontWeight: 'bolder',
                            fontSize: '18px',
                          }}
                        >
                          {e.name}
                        </p>
                        <p style={{ lineHeight: '25px' }}>{e.text}</p>
                      </div>
                      <div className='col-lg-3 order-lg-2 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 order-1 p-0'>
                        <img
                          src={e.image}
                          alt={e.id}
                          style={{ width: '100%', borderRadius: '15px' }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        <div className='mt-5' style={{ justifyContent: 'center' }}>
          <Pagination
            onChange={onPageChange}
            count={Number.isInteger(pageCount) ? pageCount : pageCount + 1}
            defaultPage={1}
            siblingCount={6}
          />
        </div>
      </div>
    </div>
  )
}

export default Service
