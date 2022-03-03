import { React, useState, useEffect } from 'react'
import operator from '../../assets/Img/operator.jpg'
import logo from '../../assets/Img/logo.jpg'
import certificate from '../../assets/Img/certificate.jpg'
import Pagination from '@mui/material/Pagination'

const Certificate = () => {
  const [certificat, setCertificate] = useState('')
  const [pageCount, setPageCount] = useState('')

  const onPageChange = (event, value) => {
    getClient(value - 1)
  }
  const getClient = async (pagenumber) => {
    try {
      const rawResponse = await fetch(
        'https://portal-sazmani.com/admin/Certificates/API/_all?token=test',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            token: 'test',
          },

          body: JSON.stringify({
            limit: '12',
            page: pagenumber,
          }),
        }
      )
      const content = await rawResponse.json()
      if (content.isDone) {
        setCertificate(content.data.data)
        setPageCount(content.data.pageCount)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getClient(0)
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
            مجوز های ما
          </p>
        </div>
        <div
          className='row col-lg-10 col-md-12 col-sm-12 col-12 mt-5'
          style={{ margin: 'auto' }}
        >
          {certificat &&
            certificat.map((e) => {
              return (
                <div
                  className='col-lg-3 col-md-4 col-sm-4 col-12 text-center mt-2'
                  style={{
                    textAlign: 'center',
                    fontSize: '15px',
                    fontWeight: 'bolder',
                    justifyContent: 'center',
                  }}
                >
                  <p>{e.name}</p>
                  <img
                    src={e.image}
                    alt={e.name}
                    style={{ width: '70%', margin: 'auto' }}
                  />
                </div>
              )
            })}
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

export default Certificate
