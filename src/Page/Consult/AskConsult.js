import { React, useState, useEffect } from 'react'
import operator from '../../assets/Img/operator.jpg'
import logo from '../../assets/Img/logo.jpg'
import certificate from '../../assets/Img/certificate.jpg'
import mec from '../../assets/Img/mec.png'
import Pagination from '@mui/material/Pagination'
import Swal from 'sweetalert2'
import validator from 'validator'
import Loader from '../../component/Loading/LoginLoading'
import axios from 'axios'
const AskConsult = () => {
  const [Loading, setLoading] = useState(false)

  const [name, setName] = useState('')
  const [nameReq, setNameReq] = useState(false)

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
  const handleNameChange = (e) => {
    setName(e.target.value)
    if (e.target.value.length > 2) {
      setNameReq(false)
    }
  }
  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  }
  const submit = () => {
    if (name.length < 3) {
      setNameReq(true)
      return
    }
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
  return (
    <div>
      <div className='my-5 mx-3' style={{ textAlign: 'right' }}>
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
            درخواست مشاوره
          </p>
        </div>
        <div
          className='row col-lg-10 col-md-12 col-sm-12 col-12 mx-auto my-5'
          style={{ justifyContent: 'center' }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '30px',
              boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
            }}
          >
            <div
              className='row my-2'
              style={{ width: '100%', justifyContent: 'end' }}
            >
              <div
                className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 my-2'
                style={{ direction: 'rtl' }}
              >
                <div className='row' style={{ textAlign: 'right' }}>
                  <label
                    for='phone'
                    className='mt-4 col-lg-4 col-md-12 col-sm-12 col-12'
                    style={{ direction: 'rtl' }}
                  >
                    شماره تماس :
                  </label>
                  <input
                    onChange={handlePhoneChange}
                    value={phone}
                    required
                    className='col-lg-7 col-md-12 col-sm-12 col-12  mt-3 '
                    id='phone'
                    type='text'
                    placeHolder='09362625488'
                    style={
                      !phoneReq
                        ? {
                            borderRadius: '20px',
                            border: '1px solid #0000004f',
                            height: '40px',
                            outline: 'none',
                            background: 'white',
                            padding: '10px',
                            textAlign: 'left',
                            boxShadow:
                              'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                          }
                        : {
                            borderRadius: '20px',
                            border: '1px solid #dc3545',
                            height: '40px',
                            outline: 'none',
                            background: 'white',
                            padding: '10px',
                            textAlign: 'left',
                            boxShadow:
                              'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
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
                    لطفا شماره خود را وارد کنید
                  </h5>
                ) : null}
              </div>
              <div
                className='col-lg-6 order-lg-2  col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 order-1 my-2'
                style={{ direction: 'rtl' }}
              >
                <div className='row' style={{ textAlign: 'right' }}>
                  <label
                    for='name '
                    className='mt-4 col-lg-4 col-md-12 col-sm-12 col-12'
                    style={{ direction: 'ltr' }}
                  >
                    {' '}
                    : نام و نام خانوادگی
                  </label>
                  <input
                    onChange={handleNameChange}
                    value={name}
                    required
                    className='col-lg-7 col-md-12 col-sm-12 col-12  mt-3 '
                    id='name'
                    type='text'
                    placeHolder='نام و نام خانوادگی'
                    style={
                      !nameReq
                        ? {
                            borderRadius: '20px',
                            border: '1px solid #0000004f',
                            height: '40px',

                            outline: 'none',
                            background: 'white',
                            padding: '10px',
                            boxShadow:
                              'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                          }
                        : {
                            borderRadius: '20px',
                            border: '1px solid #dc3545',
                            height: '40px',

                            outline: 'none',
                            background: 'white',
                            padding: '10px',
                            boxShadow:
                              'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                          }
                    }
                  />
                </div>
                {nameReq ? (
                  <h5
                    className='mt-2'
                    style={{
                      color: '#dc3545',
                      textAlign: 'right',
                      fontSize: '10px',
                    }}
                  >
                    لطفا نام خود را کامل وارد کنید
                  </h5>
                ) : null}
              </div>
            </div>
            <div className='my-5' style={{ textAlign: 'center' }}>
              <button
                onClick={submit}
                variant=' my-3 mr-3 '
                className='login-btn px-5 hover-item py-3'
              >
                {Loading ? <Loader /> : 'ثبت درخواست'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AskConsult
