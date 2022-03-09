import { React, useState, useEffect } from 'react'
import MainSlider from '../../component/Slider/MainSlider'
import DoreSlider from '../../component/Slider/DoreSlider'
import ServiceSlider from '../../component/Slider/ServiceSlider'
import MojavezSlider from '../../component/Slider/MojavezSlider'
import logo from '../../assets/Img/logo.jpg'
import ax4 from '../../assets/Img/ax4.jpg'
import footer from '../../assets/Img/footer.PNG'
import ax1 from '../../assets/Img/ax1.jpg'
import { LinkContainer } from 'react-router-bootstrap'
import certificate from '../../assets/Img/certificate.jpg'
import axios from 'axios'
import Swal from 'sweetalert2'
import Loader from '../../component/Loading/LoginLoading'

const Home = () => {
  const [Loading, setLoading] = useState(false)

  const [serivces, setServices] = useState('')
  const [mojavez, setMojavez] = useState('')
  const [client, setClient] = useState('')
  const [courses, setCourses] = useState('')
  const getServices = async () => {
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
            limit: '10',
            page: '0',
          }),
        }
      )
      const content = await rawResponse.json()
      if (content.isDone) {
        setServices(content.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getMojavez = async () => {
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
            limit: '10',
            page: '0',
          }),
        }
      )
      const content = await rawResponse.json()
      if (content.isDone) {
        setMojavez(content.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getClient = async () => {
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
            limit: '10',
            page: '0',
          }),
        }
      )
      const content = await rawResponse.json()
      if (content.isDone) {
        setClient(content.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getCourses = async () => {
    try {
      const rawResponse = await fetch(
        'https://portal-sazmani.com/admin/Courses/API/_featuredCourses?token=test',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            token: 'test',
          },
        }
      )
      const content = await rawResponse.json()
      if (content.isDone) {
        // console.log(content.data)
        setCourses(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [phone, setPhone] = useState('')
  const [phoneReq, setPhoneReq] = useState(false)
  const validateMobilephone = (input) => {
    let mobile = /^09{1}[\d]{9}$/
    if (mobile.test(input)) {
      setPhoneReq(false)
      return true
    } else {
      return false
    }
  }

  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  }
  const submit = () => {
    if (!validateMobilephone(phone)) {
      setPhoneReq(true)
      return
    }

    const formData = new FormData()
    formData.append('mobile', phone)
    setLoading(true)
    axios
      .post(
        'https://portal-sazmani.com/admin/ConsultingRequests/API/_addRequest?token=test',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data', token: 'test' },
        }
      )

      .then((response) => {
        if (response.data.isDone) {
          setLoading(false)
          Swal.fire({
            type: 'success',
            text: 'درخواست شما  با موفقیت ثبت شد',
            confirmButtonText: 'فهمیدم',
          })
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    getServices()
    getMojavez()
    getClient()
    getCourses()
  }, [])

  console.log(courses.length)

  return (
    <>
      <div>
        <div className='d-flex mx-5 my-3' style={{ justifyContent: 'center' }}>
          <h5
            className='mx-5 d-lg-block d-md-block d-sm-none d-none'
            style={{ marginTop: '13px' }}
          >
            جستجو
          </h5>
          <button
            style={{
              outline: 'none',
              border: 'none',
              color: 'white',
              backgroundColor: '#161f3c',
              padding: '0px 50px',
            }}
            className='searchBtn'
          >
            جستجو
          </button>
          <input
            type='text'
            placeholder='عنوان مورد نظر را جستجو کنید...'
            style={{
              border: 'none',
              outline: 'none',
              width: '70%',
              height: '50px',
              boxShadow: 'inset 0px 1px 4px -1px rgb(0 0 0 / 45%)',
              direction: 'rtl',
              padding: '20px',
            }}
          />
        </div>
      </div>

      <MainSlider />

      <div className='my-5 py-5 px-1' style={{ backgroundColor: '#eff2f9' }}>
        <h4
          style={{ color: 'black', textAlign: 'center', fontWeight: 'bolder' }}
        >
          دوره های پیشنهادی
        </h4>

        {courses.length > 3 ? (
          <DoreSlider courses={courses} />
        ) : (
          <>
            <div className='row'>
              {courses > 0
                ? courses.map((e) => {
                    return (
                      <div
                        key={e.id}
                        className='col-xl-3 col-lg-8 col-md-8 col-sm-10  col-10 my-5 mx-auto'
                      >
                        <img
                          src={e.image}
                          alt={e.id}
                          style={{
                            width: '100%',
                            borderRadius: '20px 20px 0px 0px',
                            height: '250px',
                          }}
                        />
                        <div
                          style={{
                            backgroundColor: '#fff',
                            textAlign: 'end',
                            padding: '10px',
                            borderRadius: '0px 0px 20px 20px',
                          }}
                        >
                          <p style={{ fontSize: '15px', fontWeight: 'bolder' }}>
                            {e.name}
                          </p>
                          <p
                            style={{
                              lineHeight: '30px',
                              textAlign: 'justify',
                              direction: 'rtl',
                            }}
                          >
                            {e.text}
                          </p>
                        </div>
                      </div>
                    )
                  })
                : null}
            </div>
          </>
        )}

        <div style={{ textAlign: 'center' }}>
          <LinkContainer
            to='/courses/1'
            style={{
              borderRadius: '10px',
              padding: '10px 15px ',
              backgroundColor: '#f1a314',
              border: 'none',
            }}
          >
            <button>مشاهده بیشتر</button>
          </LinkContainer>
        </div>
      </div>

      <div className='my-5 py-5  px-1'>
        <h4
          style={{ color: 'black', textAlign: 'center', fontWeight: 'bolder' }}
        >
          خدمات ما
        </h4>
        {serivces.length > 3 ? (
          <ServiceSlider serivces={serivces} />
        ) : (
          <div className='row'>
            {serivces &&
              serivces.map((e) => {
                return (
                  <div
                    className='col-xl-3 col-lg-8 col-md-8 col-sm-10  col-10 my-5 mx-auto'
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: '15px',
                      padding: '20px 0px',
                      boxShadow: '0px 0px 13px -2px rgb(0 0 0 / 50%)',
                      textAlign: 'center',
                    }}
                  >
                    <p style={{ fontSize: '19px', fontWeight: 'bolder' }}>
                      {e.name}
                    </p>
                    <img
                      src={e.image}
                      alt={e.name}
                      style={{
                        width: '80%',
                        borderRadius: '15px',
                        margin: 'auto',
                        height: '200px',
                      }}
                    />
                    <p
                      className='mt-3 mx-5'
                      style={{
                        lineHeight: '30px',
                        textAlign: 'justify',
                        direction: 'rtl',
                        lineBreak: 'anywhere',
                        height: '150px',
                      }}
                    >
                      {e.text}
                    </p>
                  </div>
                )
              })}
          </div>
        )}
        <div style={{ textAlign: 'center' }}>
          <LinkContainer
            to='/service'
            style={{
              borderRadius: '10px',
              padding: '10px 15px ',
              backgroundColor: '#f1a314',
              border: 'none',
            }}
          >
            <button>مشاهده بیشتر</button>
          </LinkContainer>
        </div>
      </div>

      <div className='my-5 py-5 px-1' style={{ backgroundColor: '#eff2f9' }}>
        <h4
          style={{ color: 'black', textAlign: 'center', fontWeight: 'bolder' }}
        >
          مشتریان ما
        </h4>
        <div
          className='mx-5 my-5 p-4'
          style={{
            backgroundColor: '#fff',
            boxShadow: 'rgb(0 0 0 / 50%) 0px -3px 6px -5px',
            borderRadius: '10px',
          }}
        >
          <div className='row' style={{ justifyContent: 'right' }}>
            {client &&
              client.map((e) => {
                return (
                  <div
                    key={e.id}
                    className='col-lg-2 col-md-4 col-sm-4 col-12 text-center mt-2'
                  >
                    <img alt='logo' src={e.image} style={{ width: '70%' }} />
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
        </div>
        <div style={{ textAlign: 'center' }}>
          <LinkContainer
            style={{
              borderRadius: '10px',
              padding: '10px 15px ',
              backgroundColor: '#f1a314',
              border: 'none',
            }}
            to='/customers'
          >
            <button>مشاهده بیشتر</button>
          </LinkContainer>
        </div>
      </div>

      <div className='my-5 py-5  px-1'>
        <h4
          style={{ color: 'black', textAlign: 'center', fontWeight: 'bolder' }}
        >
          مجوز های ما
        </h4>
        {mojavez.length > 3 ? (
          <MojavezSlider mojavez={mojavez} />
        ) : (
          <div className='row'>
            {mojavez &&
              mojavez.map((e) => {
                return (
                  <div
                    className='col-lg-3 col-md-4 col-sm-6  col-12 my-5'
                    style={{
                      textAlign: 'center',
                      fontSize: '15px',
                      fontWeight: 'bolder',
                      justifyContent: 'center',
                      margin: 'auto',
                    }}
                  >
                    <p>{e.name}</p>
                    <img
                      src={e.image}
                      alt='certificate'
                      style={{ width: '70%', margin: 'auto' }}
                    />
                  </div>
                )
              })}
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          <LinkContainer
            style={{
              borderRadius: '10px',
              padding: '10px 15px ',
              backgroundColor: '#f1a314',
              border: 'none',
            }}
            to='/certificate'
          >
            <button>مشاهده بیشتر</button>
          </LinkContainer>
        </div>
      </div>

      <div className='my-5 py-5 px-5' style={{ backgroundColor: '#eff2f9' }}>
        <h4
          style={{ color: 'black', textAlign: 'right', fontWeight: 'bolder' }}
        >
          درخواست مشاوره
        </h4>

        <div className='row' style={{ justifyContent: 'space-evenly' }}>
          <div className='col-lg-4 order-lg-1 col-md-10 order-md-2 col-sm-10 order-sm-2 co-10 order-2 mt-4  '>
            <div
              style={{
                backgroundColor: '#fff',
                borderRadius: '15px',
                padding: '50px  25px',
                textAlign: 'right',
              }}
            >
              <p style={{ fontWeight: 'bolder' }}>
                شماره موبایل خود را وارد کنید
              </p>
              <div className='text-center'>
                <input
                  onChange={handlePhoneChange}
                  value={phone}
                  type='text'
                  placeholder='09** *** ** **'
                  style={
                    !phoneReq
                      ? {
                          border: 'none',
                          borderRadius: '15px',
                          boxShadow: '0px 0px 8px -2px rgb(0 0 0 / 50%)',
                          width: '70%',
                          height: '40px',
                          outline: 'none',
                          padding: '20px',
                        }
                      : {
                          border: '1px solid #dc3545',
                          borderRadius: '15px',
                          boxShadow: '0px 0px 8px -2px rgb(0 0 0 / 50%)',
                          width: '70%',
                          height: '40px',
                          outline: 'none',
                          padding: '20px',
                        }
                  }
                />
              </div>
              {phoneReq ? (
                <h5
                  className='mt-2'
                  style={{
                    color: '#dc3545',
                    textAlign: 'right',
                    fontSize: '10px',
                  }}
                >
                  لطفا شماره موبایل خود را وارد کنید
                </h5>
              ) : null}

              <div className='mt-3' style={{ textAlign: 'center' }}>
                <button
                  onClick={submit}
                  style={{
                    borderRadius: '10px',
                    padding: '10px 40px ',
                    backgroundColor: '#f1a314',
                    border: 'none',
                    width: '70%',
                  }}
                >
                  {Loading ? <Loader /> : ' ثبت درخواست'}
                </button>
              </div>
            </div>
          </div>
          <div className='col-lg-4 order-lg-2 col-md-10 order-md-1 col-sm-10 order-sm-1 co-10 order-1 mt-4  '>
            <img
              src={ax4}
              alt='ax4'
              style={{ width: '100%', borderRadius: '15px' }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
