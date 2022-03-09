import { React, useState } from 'react'
import { ImLocation } from 'react-icons/im'
import { FaEnvelope } from 'react-icons/fa'
import { AiFillPhone } from 'react-icons/ai'
import Swal from 'sweetalert2'
import validator from 'validator'
import Loader from '../../component/Loading/LoginLoading'
import axios from 'axios'
import swal from 'sweetalert'
const ContactUs = () => {
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

  const [email, setEmail] = useState('')
  const [emailReq, setEmailReq] = useState(false)
  const validateEmail = (email) => {
    if (validator.isEmail(email)) {
      setEmailReq(false)
      return true
    } else {
      return false
    }
  }

  const [text, setText] = useState('')
  const [textReq, setTextReq] = useState(false)

  const [file, setFile] = useState('')
  const [fileReq, setFileReq] = useState(false)

  const handleNameChange = (e) => {
    setName(e.target.value)
    if (e.target.value.length > 2) {
      setNameReq(false)
    }
  }
  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handleTextChange = (e) => {
    setText(e.target.value)
    if (e.target.value.length > 4) {
      setTextReq(false)
    }
  }
  const handleFileChange = (e) => {
    setFile(e.target.files[0])
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
    if (!validateEmail(email)) {
      setEmailReq(true)
      return
    }
    if (text.length < 5) {
      setTextReq(true)
      return
    }
    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', name)
    formData.append('mobile', phone)
    formData.append('email', email)
    formData.append('text', text)

    setLoading(true)
    axios
      .post(
        'https://portal-sazmani.com/admin/Tickets/API/_addTicket?token=test',
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
            text: 'پیام شما  با موفقیت ثبت شد',
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
      <div className='mt-5 mx-3' style={{ textAlign: 'right' }}>
        <div
          style={{
            backgroundColor: '#161f3c',
            padding: '15px 30px 30px 30px',
            borderRadius: '15px',
            margin: 'auto',
          }}
          className='row col-10 mt-3'
        >
          <div
            className='col-lg-4 col-md-12 col-sm-12 col-12 d-flex mt-4 contactStyle'
            style={{ justifyContent: 'center' }}
          >
            <span
              style={{
                color: 'white',
                fontWeight: 'bolder',
                marginTop: '8px',
                marginRight: '15px',
                fontSize: '15px',
              }}
              className='contactFont'
            >
              کرج خیابان شهید بهشتی دهقان ویلای دوم
            </span>
            <div
              style={{
                backgroundColor: '#f1a314',
                padding: '5px',
                borderRadius: '5px',
              }}
            >
              <ImLocation size={20} style={{ color: 'white' }} />
            </div>
          </div>
          <div
            className='col-lg-4 col-md-12 col-sm-12 col-12 d-flex mt-4 contactStyle'
            style={{ justifyContent: 'center' }}
          >
            <span
              style={{
                color: 'white',
                fontWeight: 'bolder',
                marginTop: '8px',
                marginRight: '15px',
                fontSize: '15px',
              }}
              className='contactFont'
            >
              aminrayati469gmail.com
            </span>
            <div
              style={{
                backgroundColor: '#f1a314',
                padding: '5px',
                borderRadius: '5px',
              }}
            >
              <FaEnvelope size={20} style={{ color: 'white' }} />
            </div>
          </div>
          <div
            className='col-lg-4 col-md-12 col-sm-12 col-12 d-flex mt-4 contactStyle'
            style={{ justifyContent: 'center' }}
          >
            <span
              style={{
                color: 'white',
                fontWeight: 'bolder',
                marginTop: '8px',
                marginRight: '15px',
                fontSize: '15px',
              }}
              className='contactFont'
            >
              09362625488
            </span>
            <div
              style={{
                backgroundColor: '#f1a314',
                padding: '5px',
                borderRadius: '5px',
              }}
            >
              <AiFillPhone size={20} style={{ color: 'white' }} />
            </div>
          </div>
        </div>

        <div>
          <div
            className='row my-5'
            style={{ width: '100%', justifyContent: 'end' }}
          >
            <div
              className='col-lg-4 order-lg-1 col-md-12 order-md-3 col-sm-12 order-sm-3 col-12 order-3'
              style={{ direction: 'rtl' }}
            >
              <div className='row'>
                <label
                  for='email'
                  className='mt-3 col-lg-8 col-md-11 col-sm-11 col-sm-11'
                  style={{ direction: 'rtl' }}
                >
                  ایمیل :
                </label>
                <input
                  onChange={handleEmailChange}
                  value={email}
                  required
                  className='col-lg-8 col-md-11 col-sm-11 col-11 mt-3 '
                  id='email'
                  type='text'
                  placeHolder='everest@gmail.com'
                  style={
                    !emailReq
                      ? {
                          borderRadius: '0.45rem',
                          border: '1px solid #0000004f',
                          height: '40px',
                          outline: 'none',
                          background: 'white',
                          padding: '10px',
                          textAlign: 'left',
                          boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                        }
                      : {
                          borderRadius: '0.45rem',
                          border: '1px solid #dc3545',
                          height: '40px',
                          outline: 'none',
                          background: 'white',
                          padding: '10px',
                          textAlign: 'left',
                          boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                        }
                  }
                />
              </div>
              {emailReq ? (
                <h5
                  className='mt-2'
                  style={{
                    color: '#dc3545',
                    textAlign: 'right',
                    fontSize: '10px',
                  }}
                >
                  لطفا ایمیل خود را وارد کنید
                </h5>
              ) : null}
            </div>
            <div
              className='col-lg-4 order-lg-2 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2'
              style={{ direction: 'rtl' }}
            >
              <div className='row'>
                <label
                  for='phone'
                  className='mt-3 col-lg-8 col-md-11 col-sm-11 col-sm-11'
                  style={{ direction: 'rtl' }}
                >
                  شماره تماس :
                </label>
                <input
                  onChange={handlePhoneChange}
                  value={phone}
                  required
                  className='col-lg-8 col-md-11 col-sm-11 col-11 mt-3 '
                  id='phone'
                  type='text'
                  placeHolder='09362625488'
                  style={
                    !phoneReq
                      ? {
                          borderRadius: '0.45rem',
                          border: '1px solid #0000004f',
                          height: '40px',

                          outline: 'none',
                          background: 'white',
                          padding: '10px',
                          textAlign: 'left',
                          boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                        }
                      : {
                          borderRadius: '0.45rem',
                          border: '1px solid #dc3545',
                          height: '40px',

                          outline: 'none',
                          background: 'white',
                          padding: '10px',
                          textAlign: 'left',
                          boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
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
              className='col-lg-4 order-lg-3 col-md-12 order-md-1  col-sm-12 order-sm-1 col-12 order-1'
              style={{ direction: 'rtl' }}
            >
              <div className='row'>
                <label
                  for='name '
                  className='col-lg-8 col-md-11 col-sm-11 col-11 mt-3 '
                  style={{ direction: 'ltr' }}
                >
                  : نام و نام خانوادگی
                </label>
                <input
                  onChange={handleNameChange}
                  value={name}
                  required
                  className='col-lg-8 col-md-11 col-sm-11 col-11 mt-3 '
                  id='name'
                  type='text'
                  placeHolder='نام و نام خانوادگی'
                  style={
                    !nameReq
                      ? {
                          borderRadius: '0.45rem',
                          border: '1px solid #0000004f',
                          height: '40px',

                          outline: 'none',
                          background: 'white',
                          padding: '10px',
                          boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                        }
                      : {
                          borderRadius: '0.45rem',
                          border: '1px solid #dc3545',
                          height: '40px',

                          outline: 'none',
                          background: 'white',
                          padding: '10px',
                          boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
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

          <div
            className='row '
            style={{ width: '100%', justifyContent: 'end' }}
          >
            <div
              className='col-lg-10 col-md-12 col-sm-12 col-12'
              style={{ direction: 'rtl' }}
            >
              <p className='mt-3'>متن پیام :</p>
              <div>
                <textarea
                  onChange={handleTextChange}
                  value={text}
                  required
                  className='col--lg-9 col-md-11 col-sm-11 col-11 mt-2 mx-1'
                  id='name'
                  type='text'
                  placeHolder='پیام خود را بنویسید'
                  style={
                    !textReq
                      ? {
                          borderRadius: '0.45rem',
                          border: '1px solid #0000004f',
                          height: '200px',

                          outline: 'none',
                          background: 'white',
                          padding: '10px',
                          boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                        }
                      : {
                          borderRadius: '0.45rem',
                          border: '1px solid #dc3545',
                          height: '200px',

                          outline: 'none',
                          background: 'white',
                          padding: '10px',
                          boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                        }
                  }
                ></textarea>
              </div>
              {textReq ? (
                <h5
                  className='mt-2'
                  style={{
                    color: '#dc3545',
                    textAlign: 'right',
                    fontSize: '10px',
                  }}
                >
                  لطفا متن خود را کامل وارد کنید
                </h5>
              ) : null}
            </div>
            <div className='col-lg-6 col-md-12 col-sm-12 col-12'>
              <p className='mt-3' style={{ direction: 'rtl' }}>
                فایل ضمیمه :
              </p>

              <input
                onChange={handleFileChange}
                required
                className='col-lg-9 col-md-11 col-sm-11 col-11 mt-2 mx-1'
                id='file'
                type='file'
                placeHolder='پیام خود را بنویسید'
                style={{
                  borderRadius: '0.45rem',
                  border: '1px solid #0000004f',

                  outline: 'none',
                  background: 'white',
                  padding: '10px',
                  boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                }}
              />
              <div
                className='felx-column mt-3'
                style={{ justifyContent: 'end' }}
              >
                <p style={{ direction: 'rtl' }}>فایل های مجاز :</p>
                <p className='mx-4' style={{ lineBreak: 'anywhere' }}>
                  PDF,WORD,EXCEL,PPT,ZIP,MP3,MP4,JPEG,JPG
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='my-5' style={{ textAlign: 'center' }}>
          <button
            onClick={submit}
            variant=' my-3 mr-3 '
            className='login-btn px-5 hover-item py-3'
          >
            {Loading ? <Loader /> : 'ارسال  پیام'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
