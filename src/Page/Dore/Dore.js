import { React, useState, useEffect } from 'react'
import mec from '../../assets/Img/mec.png'
import Pagination from '@mui/material/Pagination'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
const Dore = () => {
  let history = useHistory()
  const { pathname } = useLocation()
  const activeCat = pathname.split('/')[2]
  const activeSubCat = pathname.split('/')[3]

  const [pageCount, setPageCount] = useState('')
  const onPageChange = (event, value) => {
    getAllList(value - 1)
  }

  const [list, setList] = useState('')
  const [compeleteList, setCompeleteList] = useState('')

  const getDepartmentList = async () => {
    try {
      const rawResponse = await fetch(
        'https://portal-sazmani.com/admin/Courses/API/_allDepartments?token=test',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            token: 'test',
          },

          body: JSON.stringify({
            limit: '10',
            page: '0',
          }),
        }
      )
      const content = await rawResponse.json()
      if (content.isDone) {
        setList(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getIndustryList = async () => {
    try {
      const rawResponse = await fetch(
        'https://portal-sazmani.com/admin/Courses/API/_allIndustries?token=test',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            token: 'test',
          },

          body: JSON.stringify({
            limit: '10',
            page: '0',
          }),
        }
      )
      const content = await rawResponse.json()
      if (content.isDone) {
        setList(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getAllList = async (pagenumber) => {
    if (activeSubCat) {
      try {
        const rawResponse = await fetch(
          'https://portal-sazmani.com/admin/Courses/API/_all?token=test',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              token: 'test',
            },

            body: JSON.stringify({
              limit: '4',
              page: pagenumber,
              departmentId: activeCat === '2' ? activeSubCat : 0,
              industryId: activeCat === '1' ? activeSubCat : 0,
            }),
          }
        )
        const content = await rawResponse.json()

        if (content.isDone) {
          setCompeleteList(content.data.data)
          setPageCount(content.data.pageCount)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const rawResponse = await fetch(
          'https://portal-sazmani.com/admin/Courses/API/_all?token=test',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              token: 'test',
            },

            body: JSON.stringify({
              limit: '4',
              page: pagenumber,
              departmentId: 0,
              industryId: 0,
            }),
          }
        )
        const content = await rawResponse.json()

        if (content.isDone) {
          setCompeleteList(content.data.data)
          setPageCount(content.data.pageCount)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (activeCat === '2') {
      getDepartmentList()
    }
    if (activeCat === '1') {
      getIndustryList()
    }
  }, [activeCat])

  useEffect(() => {
    getAllList(0)
  }, [activeCat, activeSubCat])

  return (
    <div>
      <div className='mt-5 mx-3' style={{ textAlign: 'right' }}>
        <h1>لیست دوره ها</h1>
        <div className='mt-3' style={{ textAlign: '-webkit-right' }}>
          <div className='col-lg-6 col-md-12 col-sm-12 col-12'>
            <div
              style={{
                padding: '5px 15px',
                backgroundColor: '#161f3c',
              }}
              className='row py-4'
            >
              <LinkContainer
                to='/courses/2'
                className='col-lg-6 mt-2 '
                style={{ textAlign: 'center' }}
              >
                <div className='col-lg-6 mt-2 ' style={{ textAlign: 'center' }}>
                  <h5
                    style={
                      activeCat === '2'
                        ? {
                            color: 'white',
                            fontWeight: 'bolder',
                            backgroundColor: 'gray',
                            padding: '10px',
                            cursor: 'pointer',
                          }
                        : {
                            color: 'white',
                            fontWeight: 'bolder',
                            padding: '10px',
                            cursor: 'pointer',
                          }
                    }
                  >
                    لیست دوره ها طبق دپارتمان
                  </h5>
                </div>
              </LinkContainer>
              <LinkContainer
                to='/courses/1'
                className='col-lg-6 mt-2 '
                style={{ textAlign: 'center' }}
              >
                <div>
                  <h5
                    style={
                      activeCat === '1'
                        ? {
                            color: 'white',
                            fontWeight: 'bolder',
                            backgroundColor: 'gray',
                            padding: '10px',
                            cursor: 'pointer',
                          }
                        : {
                            color: 'white',
                            fontWeight: 'bolder',
                            padding: '10px',
                            cursor: 'pointer',
                          }
                    }
                  >
                    لیست دوره ها طبق صنعت
                  </h5>
                </div>
              </LinkContainer>
            </div>
          </div>
        </div>
        <div className='row' style={{ justifyContent: 'end' }}>
          <div className='col-lg-8 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2'>
            <p className='my-3' style={{ color: 'gray', fontWeight: 'bolder' }}>
              دپارتمان {compeleteList.length} دوره
            </p>

            <div className='m-3'>
              {compeleteList.length > 0 ? (
                compeleteList.map((e) => {
                  return (
                    <div
                      className='row  mt-3'
                      style={{ border: '1px solid black' }}
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
                        <p>{e.text}</p>
                        <div style={{ textAlign: 'left' }}>
                          <button
                            style={{
                              color: 'white',
                              border: 'none',
                              padding: '10px 20px',
                              background: '#161f3c',
                              borderRadius: '15px',
                            }}
                          >
                            اطلاعات بیشتر
                          </button>
                        </div>
                      </div>
                      <div className='col-lg-3 order-lg-2 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 order-1 p-0'>
                        <img
                          src={e.image}
                          alt={e.id}
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>
                  )
                })
              ) : (
                <div
                  className='col-12'
                  style={{
                    padding: '70px',
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    textAlign: 'center',
                    boxShadow: '0px 0px 20px 0px rgb(0 0 0 / 50%)',
                  }}
                >
                  <p style={{ fontWeight: 'bolder' }}>هیچ دوره ای یافت نشد</p>
                </div>
              )}
            </div>
          </div>
          <div
            className='col-lg-3 order-lg-2 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 order-1'
            style={{
              backgroundColor: '#e3e3e3',
              padding: '10px',
              textAlign: '-webkit-right',
            }}
          >
            {list &&
              list.map((e) => {
                return (
                  <LinkContainer
                    className='mt-4'
                    style={
                      activeSubCat != e.id
                        ? {
                            fontWeight: 'bolder',
                            fontSize: '15px',
                            width: 'fit-content',
                            cursor: 'pointer',
                            background: 'none',
                            borderRadius: '15px',
                            padding: '0px',
                          }
                        : {
                            fontWeight: 'bolder',
                            fontSize: '15px',
                            width: 'fit-content',
                            cursor: 'pointer',
                            backgroundColor: 'none',
                            background: '#f1a314',
                            padding: '5px 30px',
                            borderRadius: '15px',
                            color: 'white',
                          }
                    }
                    to={`/courses/${activeCat}/${e.id}`}
                  >
                    <p>{e.name}</p>
                  </LinkContainer>
                )
              })}
          </div>
        </div>
        {compeleteList.length > 0 ? (
          <div className='mt-5' style={{ justifyContent: 'center' }}>
            <Pagination
              onChange={onPageChange}
              count={
                Number.isInteger(pageCount)
                  ? parseInt(pageCount)
                  : parseInt(pageCount) + 1
              }
              defaultPage={1}
              siblingCount={6}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Dore
