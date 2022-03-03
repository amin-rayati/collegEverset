import { React, useState, useEffect } from 'react'
import operator from '../../assets/Img/operator.jpg'
import logo from '../../assets/Img/logo.jpg'
import Pagination from '@mui/material/Pagination'

const Customers = () => {
  const [client, setClient] = useState('')
  const [pageCount, setPageCount] = useState('')

  const onPageChange = (event, value) => {
    getClient(value - 1)
  }
  const getClient = async (pagenumber) => {
    try {
      const rawResponse = await fetch(
        'https://portal-sazmani.com/admin/Clients/API/_all?token=test',
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
        setClient(content.data.data)
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
            مشتریان ما
          </p>
        </div>
        <div
          className='row col-lg-10 col-md-12 col-sm-12 col-12 mt-5'
          style={{ margin: 'auto', justifyContent: 'right' }}
        >
          {client &&
            client.map((e) => {
              return (
                <div
                  key={e.id}
                  className='col-lg-3 col-md-4 col-sm-4 col-12 text-center mt-2'
                  style={{ cursor: 'pointer' }}
                >
                  <img alt='e.id' src={e.image} style={{ width: '70%' }} />
                  <p
                    className='mt-2'
                    style={{
                      direction: 'rtl',
                      textAlign: 'justify',
                      lineBreak: 'anywhere',
                    }}
                  >
                    {e.text}
                  </p>
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

export default Customers
