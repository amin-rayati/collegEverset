import { React, useState, useEffect } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { BiWorld } from 'react-icons/bi'
import Login from '../LoginRegister/Login'
import { useProjectContext } from '../../context/ProjectProvider'
import { Cookies, useCookies } from 'react-cookie'
import Swal from 'sweetalert2'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const {
    loginModalShow,
    loginModal,

    userData,
    setUserData,
  } = useProjectContext()

  const [department, setDepartment] = useState('')
  const [industry, setIndustry] = useState('')

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
        setDepartment(content.data)
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
        setIndustry(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const logOut = () => {
    Swal.fire({
      text: 'آیا میخواهید از سیات خارج شوید؟',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'red',
      cancelButtonText: 'خیر',
      confirmButtonText: 'بله',
      preConfirm: () => {
        removeCookie('user')
        setUserData(null)
      },
    })
  }

  useEffect(() => {
    getDepartmentList()
    getIndustryList()
  }, [])

  return (
    <>
      <Navbar
        collapseOnSelect
        expand='lg'
        variant='dark'
        className='px-5 py-3  showNav1'
        style={{ justifyContent: 'space-between', backgroundColor: '#161f3c' }}
      >
        {!userData ? (
          <>
            <button
              style={{
                borderRadius: '10px',
                padding: '10px 15px ',
                backgroundColor: '#f1a314',
                border: 'none',
              }}
              onClick={() => {
                loginModalShow()
              }}
            >
              ورود و ثبت نام
            </button>
            {loginModal ? <Login /> : null}{' '}
          </>
        ) : (
          <NavDropdown
            className={'active-nav-name mx-2 nav-font'}
            title={userData['firstName'] + ' ' + userData['lastName']}
            id='collasible-nav-dropdown '
            style={{
              right: '0px',
              borderRadius: '20px',
              backgroundColor: 'white',
            }}
          >
            <LinkContainer to='/dashboard' style={{ textAlign: 'right' }}>
              <NavDropdown.Item>داشبورد</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <NavDropdown.Item
              onClick={() => logOut()}
              style={{ textAlign: 'right' }}
            >
              خروج
            </NavDropdown.Item>
          </NavDropdown>
        )}

        <h4 style={{ color: 'white' }}>
          {' '}
          مرکز تخصصی آموزش سازمان ها و شرکت ها
        </h4>
        <BiWorld style={{ color: '#f1a314' }} size={50} />
      </Navbar>

      <Navbar
        collapseOnSelect
        expand='lg'
        style={{ backgroundColor: '#e6ebef ' }}
        variant='dark'
        className='showNav1'
      >
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse
          id='responsive-navbar-nav'
          style={{ justifyContent: 'right' }}
        >
          <Nav className='px-5'>
            <LinkContainer
              className='mx-3'
              style={{ color: 'black', fontWeight: 'bolder' }}
              to='/contact'
            >
              <Nav.Link>تماس با ما</Nav.Link>
            </LinkContainer>

            <LinkContainer
              className='mx-3'
              style={{ color: 'black', fontWeight: 'bolder' }}
              to='/teacherregister'
            >
              <Nav.Link>ثبت نام مدرس</Nav.Link>
            </LinkContainer>

            <LinkContainer
              to='/about'
              className='mx-3'
              style={{ color: 'black', fontWeight: 'bolder' }}
            >
              <Nav.Link>درباره ما</Nav.Link>
            </LinkContainer>

            <LinkContainer
              className='mx-3'
              style={{ color: 'black', fontWeight: 'bolder' }}
              to='/askcourse'
            >
              <Nav.Link>درخواست دوره</Nav.Link>
            </LinkContainer>

            <LinkContainer
              className='mx-3'
              style={{ color: 'black', fontWeight: 'bolder' }}
              to='/consult'
            >
              <Nav.Link>درخواست مشاوره</Nav.Link>
            </LinkContainer>

            <NavDropdown
              style={{ color: 'black' }}
              title='خدمات ما'
              id='collasible-nav-dropdown'
              className='mx-3 '
            >
              <div className='px-3'>
                <LinkContainer to='/courses/1' style={{ textAlign: 'right' }}>
                  <NavDropdown.Item>آموزش حضوری در محل شما</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Divider />
              </div>
            </NavDropdown>

            <NavDropdown
              style={{ color: 'black' }}
              title='دوره'
              id='collasible-nav-dropdown'
              className='mx-3'
            >
              <div className='d-flex px-3'>
                <div>
                  <div className='d-flex' style={{ justifyContent: 'end' }}>
                    <p style={{ color: 'white' }}>دپارتمان</p>
                  </div>
                  {department &&
                    department.map((e) => {
                      return (
                        <>
                          <LinkContainer
                            style={{ textAlign: 'right', color: '#000' }}
                            to={`/courses/2/${e.id}`}
                          >
                            <NavDropdown.Item>{e.name}</NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Divider />
                        </>
                      )
                    })}
                </div>
                <div>
                  <div className='d-flex' style={{ justifyContent: 'end' }}>
                    <p style={{ color: 'white' }}>صنایع</p>
                  </div>
                  {industry &&
                    industry.map((e) => {
                      return (
                        <>
                          <LinkContainer
                            style={{ textAlign: 'right', color: '#000' }}
                            to={`/courses/1/${e.id}`}
                          >
                            <NavDropdown.Item>{e.name}</NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Divider />
                        </>
                      )
                    })}
                </div>
              </div>
            </NavDropdown>

            <LinkContainer
              to='/'
              className='mx-3'
              style={{ color: 'black', fontWeight: 'bolder' }}
            >
              <Nav.Link>خانه</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Navbar
        collapseOnSelect
        expand='lg'
        style={{ backgroundColor: '#161f3c' }}
        variant='dark'
        className='showNav2 p-3'
      >
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse
          id='responsive-navbar-nav'
          style={{ justifyContent: 'right' }}
        >
          <Nav className='px-5'>
            <LinkContainer
              className='mx-3'
              style={{
                color: 'white',
                fontWeight: 'bolder',
                textAlign: 'end',
                width: 'fit-content',
              }}
              to='/'
            >
              <Nav.Link>خانه</Nav.Link>
            </LinkContainer>

            <NavDropdown
              style={{ color: 'black' }}
              title='دوره'
              id='collasible-nav-dropdown'
              className='mx-3'
            >
              <div className='d-flex px-3'>
                <div>
                  <div className='d-flex' style={{ justifyContent: 'end' }}>
                    <p style={{ color: 'black' }}>دپارتمان</p>
                  </div>
                  {department &&
                    department.map((e) => {
                      return (
                        <>
                          <LinkContainer
                            style={{ textAlign: 'right', color: '#000' }}
                            to={`/courses/2/${e.id}`}
                          >
                            <NavDropdown.Item>{e.name}</NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Divider />
                        </>
                      )
                    })}
                </div>
                <div>
                  <div className='d-flex' style={{ justifyContent: 'end' }}>
                    <p style={{ color: 'black' }}>صنایع</p>
                  </div>
                  {industry &&
                    industry.map((e) => {
                      return (
                        <>
                          <LinkContainer
                            style={{ textAlign: 'right', color: '#000' }}
                            to={`/courses/1/${e.id}`}
                          >
                            <NavDropdown.Item>{e.name}</NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Divider />
                        </>
                      )
                    })}
                </div>
              </div>
            </NavDropdown>

            <NavDropdown
              style={{ color: 'black' }}
              title='خدمات ما'
              id='collasible-nav-dropdown'
              className='mx-3 '
            >
              <div className='px-3'>
                <NavDropdown.Item
                  href='#action/3.1'
                  style={{ textAlign: 'right' }}
                >
                  آموزش حضوری در محل شما
                </NavDropdown.Item>
              </div>
            </NavDropdown>

            <LinkContainer
              className='mx-3'
              style={{
                color: 'white',
                fontWeight: 'bolder',
                textAlign: 'end',
                width: 'fit-content',
              }}
              to='/consult'
            >
              <Nav.Link> درخواست مشاوره</Nav.Link>
            </LinkContainer>

            <LinkContainer
              className='mx-3'
              style={{
                color: 'white',
                fontWeight: 'bolder',
                textAlign: 'end',
                width: 'fit-content',
              }}
              to='/askcourse'
            >
              <Nav.Link> درخواست دوره</Nav.Link>
            </LinkContainer>

            <LinkContainer
              className='mx-3'
              style={{
                color: 'white',
                fontWeight: 'bolder',
                textAlign: 'end',
                width: 'fit-content',
              }}
              to='/about'
            >
              <Nav.Link> درباره ما</Nav.Link>
            </LinkContainer>

            <LinkContainer
              className='mx-3'
              style={{
                color: 'white',
                fontWeight: 'bolder',
                textAlign: 'end',
                width: 'fit-content',
              }}
              to='/teacherregister'
            >
              <Nav.Link> ثبت نام مدرس</Nav.Link>
            </LinkContainer>

            <LinkContainer
              className='mx-3'
              style={{
                color: 'white',
                fontWeight: 'bolder',
                textAlign: 'end',
                width: 'fit-content',
              }}
              to='/contact'
            >
              <Nav.Link> تماس با ما</Nav.Link>
            </LinkContainer>

            {!userData ? (
              <>
                <div style={{ textAlign: 'left' }}>
                  <button
                    style={{
                      borderRadius: '10px',
                      padding: '10px 15px ',
                      backgroundColor: '#f1a314',
                      border: 'none',
                    }}
                    onClick={() => {
                      loginModalShow()
                    }}
                  >
                    ورود و ثبت نام
                  </button>
                </div>
                {loginModal ? <Login /> : null}{' '}
              </>
            ) : (
              <NavDropdown
                className={'active-nav-name mx-2 nav-font'}
                title={userData['firstName'] + ' ' + userData['lastName']}
                id='collasible-nav-dropdown '
              >
                <LinkContainer to='/dashboard' style={{ textAlign: 'right' }}>
                  <NavDropdown.Item>داشبورد</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => logOut()}
                  style={{ textAlign: 'right' }}
                >
                  خروج
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Header
