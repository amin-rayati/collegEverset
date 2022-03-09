import { React, useState, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import validator from 'validator'
import DatePicker from 'react-datepicker2'
import axios from 'axios'
import { FaPlus } from 'react-icons/fa'
import { FaMinus } from 'react-icons/all'
import Swal from 'sweetalert2'
import Loader from '../../component/Loading/LoginLoading'

const AskDore = () => {
  const [showState, setShowState] = useState(false)
  const [value, setValue] = useState('female')
  const handleChange = (event) => {
    setValue(event.target.value)
    if (event.target.value === 'state') {
      setShowState(true)
    } else {
      setShowState(false)
    }
  }

  let [historyList, setHistoryList] = useState([])
  const [state, setState] = useState('')
  const [city, setCity] = useState('')

  const getState = async () => {
    try {
      const rawResponse = await fetch(
        'https://portal-sazmani.com/admin/States/API/_all?token=test',
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
        setState(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleStateChange = (e) => {
    getCityByState(document.getElementById('state').value)
    let STATE = document.getElementById('state').value
    if (STATE !== '0') {
      setStateReq(false)
    }
  }
  const getCityByState = async (id) => {
    try {
      const rawResponse = await fetch(
        'https://portal-sazmani.com/admin/Cities/API/_allByState?token=test',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            token: 'test',
          },
          body: JSON.stringify({
            stateId: id,
          }),
        }
      )
      const content = await rawResponse.json()
      if (content.isDone) {
        setCity(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [Loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const [profileImg, setProfileImg] = useState([])

  const [name, setName] = useState('')
  const [nameReq, setNameReq] = useState(false)
  const handleNameChange = (e) => {
    setName(e.target.value)
    if (e.target.value.length > 4) {
      setNameReq(false)
    }
  }

  const [birth, setBirth] = useState('')
  const [birthReq, setBirthReq] = useState(false)
  const handleBirthChange = (e) => {
    setBirth(document.getElementsByClassName('datepicker-input')[0].value)
    setBirthReq(false)
  }

  const [nationCode, setNationCode] = useState('')
  const [nationCodeReq, setNationCodeReq] = useState(false)
  const handleNationCodeChange = (e) => {
    setNationCode(e.target.value)
    if (e.target.value.length >= 10) {
      setNationCodeReq(false)
    }
  }

  const [religion, setReligion] = useState('')
  const [religionReq, setReligionReq] = useState(false)
  const handleReligionChange = (e) => {
    setReligion(e.target.value)
    if (e.target.value.length > 4) {
      setReligionReq(false)
    }
  }

  const [stateReq, setStateReq] = useState(false)

  const [cityReq, setCityReq] = useState(false)
  const handleCityChange = (e) => {
    let CITY = document.getElementById('city').value
    if (CITY !== '0') {
      setCityReq(false)
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
    setPhoneReq(false)
  }

  const [tell, setTell] = useState('')
  const [tellReq, setTellReq] = useState(false)
  const handleTellChange = (e) => {
    setTell(e.target.value)
    if (e.target.value.length > 10) {
      setTellReq(false)
    }
  }

  const [major, setMajor] = useState('')
  const [majorReq, setMajorReq] = useState(false)
  const handleMajorChange = (e) => {
    setMajor(e.target.value)
    if (e.target.value.length > 4) {
      setMajorReq(false)
    }
  }

  const [uni, setUni] = useState('')
  const [uniReq, setUniReq] = useState(false)
  const handleUniChange = (e) => {
    setUni(e.target.value)
    if (e.target.value.length > 4) {
      setUniReq(false)
    }
  }

  const [maqta, setMaqta] = useState('')
  const [maqtaReq, setMataReq] = useState(false)
  const handleMaqtaChange = (e) => {
    setMaqta(e.target.value)
    if (e.target.value.length > 4) {
      setMataReq(false)
    }
  }

  const [sabeqe, setSabeqe] = useState('')
  const [sabeqeReq, setSabeqeReq] = useState(false)
  const handleSabeqeChange = (e) => {
    setSabeqe(e.target.value)
    if (e.target.value.length > 4) {
      setSabeqeReq(false)
    }
  }

  const [desc, setDesc] = useState('')
  const [descReq, setDescReq] = useState(false)
  const handleDescChange = (e) => {
    setDesc(e.target.value)
    if (e.target.value.length > 4) {
      setDescReq(false)
    }
  }

  const [file, setFile] = useState('')
  const handleFileChange = (e) => {
    setFile(e.target.value)
  }

  const [cityPlaceReq, setCityPlaceReq] = useState(false)
  const handleCityPlaceChange = (e) => {
    let CITYPLACE = document.getElementById('cityPlace').value
    if (CITYPLACE !== '0') {
      setCityPlaceReq(false)
    }
  }

  const onDrop = async (acceptedFiles) => {
    if (profileImg.length < 1) {
      profileImg.push(...acceptedFiles)
      setProfileImg(profileImg)
    } else {
      profileImg.length = 0
      profileImg.push(acceptedFiles.pop())
      setProfileImg(profileImg)
    }

    const convertBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
          resolve(fileReader.result)
        }

        fileReader.onerror = (error) => {
          reject(error)
        }
      })
    }
    let base64Images = await profileImg.map(async (e) => {
      let tmp = await convertBase64(e)
      setImageUrl(tmp.split(',')[1])
    })

    Promise.all(base64Images).then((res) => {})
  }

  const submit = async (e) => {
    let stateId = document.getElementById('state').value
    let cityId = document.getElementById('city').value

    if (showState) {
      var cityPlace = document.getElementById('cityPlace').value
    }
    if (name.length < 5) {
      setNameReq(true)
      return
    }
    if (
      document.getElementsByClassName('datepicker-input')[0].value.length < 5
    ) {
      setBirthReq(true)
      return
    }
    if (nationCode.length <= 9) {
      setNationCodeReq(true)
      return
    }
    if (religion.length < 5) {
      setReligionReq(true)
      return
    }
    if (stateId === '0') {
      setStateReq(true)
      return
    }
    if (cityId === '0') {
      setCityReq(true)
      return
    }
    if (!validateMobilephone(phone)) {
      setPhoneReq(true)
      return
    }
    if (tell.length < 11) {
      setTellReq(true)
      return
    }
    if (major.length < 5) {
      setMajorReq(true)
      return
    }
    if (maqta.length < 5) {
      setMataReq(true)
      return
    }
    if (uni.length < 5) {
      setUniReq(true)
      return
    }
    if (sabeqe.length < 5) {
      setSabeqeReq(true)
      return
    }
    if (desc.length < 5) {
      setDescReq(true)
      return
    }
    if (cityPlace === '0') {
      setCityPlaceReq(true)
      return
    }
    const formData = new FormData(document.getElementById('teacherForm'))
    formData.append(
      'birthdate',
      document.getElementsByClassName('datepicker-input')[0].value
    )
    if (showState) {
      formData.append('cityTeachId', document.getElementById('cityPlace').value)
    }
    setLoading(true)
    await axios({
      method: 'post',
      url: 'https://portal-sazmani.com/admin/Teachers/API/_registerTeacher',
      data: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: 'test',
      },
    }).then(function (response) {
      if (response.data.isDone) {
        setLoading(false)
        Swal.fire({
          type: 'success',
          text: 'ثبت نام شما با موفقیت انجام شد',
          confirmbuttonText: 'فهمیدم',
        })
      }
    })
  }

  useEffect(() => {
    getState()
  }, [])

  const addHistoryRow = (e) => {
    e.preventDefault()
    setHistoryList([...historyList, historyList.length])
  }
  const removeLast = (e) => {
    e.preventDefault()
    historyList.pop()
    setHistoryList([...historyList])
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
            ثبت نام مدرس
          </p>
        </div>
        <form id='teacherForm'>
          <div
            className='row col-lg-8 col-md-12 col-sm-12 col-12 mx-auto my-5'
            style={{ justifyContent: 'center' }}
          >
            <div
              className='row my-2'
              style={{ width: '100%', justifyContent: 'end' }}
            >
              <div>
                <p style={{ fontWeight: 'bolder', fontSize: '19px' }}>
                  اطلاعات شخصی
                </p>
              </div>

              <div className='row'>
                <div
                  className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 my-2'
                  style={{ direction: 'rtl' }}
                >
                  <div className='row ' style={{ textAlign: 'right' }}>
                    <label className='col-lg-3  col-md-12 col-sm-12 col-12 mt-4 '>
                      تاریخ تولد :
                    </label>

                    <div className='col-lg-8 col-md-12 col-sm-12 col-12 mx-1 mt-3'>
                      <div>
                        <DatePicker
                          onChange={handleBirthChange}
                          timePicker={false}
                          isGregorian={false}
                          className={!birthReq ? 'form-input2' : 'form-input1'}
                        />
                      </div>
                    </div>
                    {birthReq ? (
                      <h5
                        className='mt-2'
                        style={{
                          color: '#dc3545',
                          textAlign: 'right',
                          fontSize: '10px',
                        }}
                      >
                        لطفا تاریخ تولد خود را وارد کنید
                      </h5>
                    ) : null}
                  </div>
                </div>

                <div
                  className='col-lg-6 order-lg-2 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 oder-1 my-2'
                  style={{ direction: 'rtl' }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <label className='col-lg-3 col-md-12 col-sm-12 col-12 mt-3 '>
                      نام و نام خانوادگی :
                    </label>
                    <input
                      onChange={handleNameChange}
                      value={name}
                      required
                      className='col-lg-8 col-md-12 col-sm-12 col-12 mt-3 mx-1'
                      id='fullName'
                      name='fullName'
                      type='text'
                      placeHolder='نام و نام خانوادگی'
                      style={
                        !nameReq
                          ? {
                              borderRadius: '10px',
                              border: '1px solid #0000004f',
                              height: '50px',
                              outline: 'none',
                              background: 'white',
                              padding: '10px',
                              textAlign: 'right',
                              boxShadow:
                                'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                            }
                          : {
                              borderRadius: '10px',
                              border: '1px solid #dc3545',
                              height: '50px',
                              outline: 'none',
                              background: 'white',
                              padding: '10px',
                              textAlign: 'right',
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
                      لطفا نام خود را وارد کنید
                    </h5>
                  ) : null}
                </div>
              </div>

              <div className='row'>
                <div
                  className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 my-2'
                  style={{ direction: 'rtl' }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <label
                      htmlFor='email'
                      className='col-lg-3 col-md-12 col-sm-12 col-12 mt-3 '
                    >
                      دین :
                    </label>

                    <input
                      onChange={handleReligionChange}
                      value={religion}
                      required
                      name='religion'
                      className='col-lg-8 col-md-12 col-sm-12 col-12 mt-3 mx-1'
                      id='email'
                      type='text'
                      placeholder='دین'
                      style={
                        !religionReq
                          ? {
                              borderRadius: '10px',
                              border: '1px solid #0000004f',
                              height: '50px',
                              outline: 'none',
                              background: 'white',
                              padding: '10px',
                              textAlign: 'right',
                              boxShadow:
                                'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                            }
                          : {
                              borderRadius: '10px',
                              border: '1px solid #dc3545',
                              height: '50px',
                              outline: 'none',
                              background: 'white',
                              padding: '10px',
                              textAlign: 'right',
                              boxShadow:
                                'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                            }
                      }
                    />
                  </div>
                  {religionReq ? (
                    <h5
                      className='mt-2'
                      style={{
                        color: '#dc3545',
                        textAlign: 'right',
                        fontSize: '10px',
                      }}
                    >
                      لطفا دین خود را وارد کنید
                    </h5>
                  ) : null}
                </div>
                <div
                  className='col-lg-6 order-lg-2 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 oder-1 my-2'
                  style={{ direction: 'rtl' }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <label
                      htmlFor='email'
                      className='col-lg-3 col-md-12 col-sm-12 col-12 mt-3 '
                    >
                      کد ملی :
                    </label>
                    <input
                      onChange={handleNationCodeChange}
                      value={nationCode}
                      required
                      name='nationalCode'
                      className='col-lg-8 col-md-12 col-sm-12 col-12 mt-3 mx-1'
                      id='email'
                      type='text'
                      placeHolder='کد ملی'
                      style={
                        !nationCodeReq
                          ? {
                              borderRadius: '10px',
                              border: '1px solid #0000004f',
                              height: '50px',
                              outline: 'none',
                              background: 'white',
                              padding: '10px',
                              textAlign: 'right',
                              boxShadow:
                                'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                            }
                          : {
                              borderRadius: '10px',
                              border: '1px solid #dc3545',
                              height: '50px',
                              outline: 'none',
                              background: 'white',
                              padding: '10px',
                              textAlign: 'right',
                              boxShadow:
                                'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                            }
                      }
                    />
                  </div>
                  {nationCodeReq ? (
                    <h5
                      className='mt-2'
                      style={{
                        color: '#dc3545',
                        textAlign: 'right',
                        fontSize: '10px',
                      }}
                    >
                      لطفا کد ملی خود را وارد کنید
                    </h5>
                  ) : null}
                </div>
              </div>

              <div className='row'>
                <div
                  className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 my-2'
                  style={{ direction: 'rtl' }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <label
                      htmlFor='email'
                      className='col-lg-3 col-md-12 col-sm-12 col-12 mt-3 '
                    >
                      شهر :
                    </label>
                    <select
                      onChange={handleCityChange}
                      id='city'
                      required
                      name='cityId'
                      className='col-lg-8 col-md-12 col-sm-12 col-12 mt-3 mx-1'
                      type='text'
                      placeHolder=''
                      style={
                        !cityReq
                          ? {
                              borderRadius: '10px',
                              border: '1px solid #0000004f',
                              height: '50px',
                              outline: 'none',
                              background: 'white',
                              padding: '10px',
                              textAlign: 'right',
                              boxShadow:
                                'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                            }
                          : {
                              borderRadius: '10px',
                              border: '1px solid #dc3545',
                              height: '50px',
                              outline: 'none',
                              background: 'white',
                              padding: '10px',
                              textAlign: 'right',
                              boxShadow:
                                'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                            }
                      }
                    >
                      <option key='0' value='0' disabled selected>
                        شهر خود را انتخاب کنید
                      </option>
                      {city &&
                        city.map((e) => {
                          return (
                            <option key={e.id} value={e.id}>
                              {e.name}
                            </option>
                          )
                        })}
                    </select>
                  </div>
                  {cityReq ? (
                    <h5
                      className='mt-2'
                      style={{
                        color: '#dc3545',
                        textAlign: 'right',
                        fontSize: '10px',
                      }}
                    >
                      لطفا شهر خود را انتخاب کنید
                    </h5>
                  ) : null}
                </div>
                <div
                  className='col-lg-6 order-lg-2 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 oder-1 my-2'
                  style={{ direction: 'rtl' }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <label
                      htmlFor='email'
                      className='col-lg-3 col-md-12 col-sm-12 col-12 mt-3 '
                    >
                      استان :
                    </label>
                    <select
                      onChange={handleStateChange}
                      id='state'
                      required
                      name='stateId'
                      className='col-lg-8 col-md-12 col-sm-12 col-12 mt-3 mx-1'
                      type='text'
                      placeHolder=''
                      style={
                        !stateReq
                          ? {
                              borderRadius: '10px',
                              border: '1px solid #0000004f',
                              height: '50px',
                              outline: 'none',
                              background: 'white',
                              padding: '10px',
                              textAlign: 'right',
                              boxShadow:
                                'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                            }
                          : {
                              borderRadius: '10px',
                              border: '1px solid #dc3545',
                              height: '50px',
                              outline: 'none',
                              background: 'white',
                              padding: '10px',
                              textAlign: 'right',
                              boxShadow:
                                'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                            }
                      }
                    >
                      <option key='0' value='0' disabled selected>
                        استان خود را انتخاب کنید
                      </option>
                      {state &&
                        state.map((e) => {
                          return (
                            <option key={e.id} value={e.id}>
                              {e.name}
                            </option>
                          )
                        })}
                    </select>
                  </div>
                  {stateReq ? (
                    <h5
                      className='mt-2'
                      style={{
                        color: '#dc3545',
                        textAlign: 'right',
                        fontSize: '10px',
                      }}
                    >
                      لطفا استان خود را انتخاب کنید
                    </h5>
                  ) : null}
                </div>
              </div>

              <div className='row'>
                <div
                  className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 my-2'
                  style={{ direction: 'rtl' }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <label
                      htmlFor='email'
                      className='col-lg-3 col-md-12 col-sm-12 col-12 mt-3 '
                    >
                      تلفن ثابت :
                    </label>
                    <input
                      onChange={handleTellChange}
                      value={tell}
                      required
                      name='tel'
                      className='col-lg-8 col-md-12 col-sm-12 col-12 mt-3 mx-1'
                      id='email'
                      type='text'
                      placeHolder='026-32280430'
                      style={
                        !tellReq
                          ? {
                              borderRadius: '10px',
                              border: '1px solid #0000004f',
                              height: '50px',
                              outline: 'none',
                              background: 'white',
                              padding: '10px',
                              textAlign: 'right',
                              boxShadow:
                                'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                            }
                          : {
                              borderRadius: '10px',
                              border: '1px solid #dc3545',
                              height: '50px',
                              outline: 'none',
                              background: 'white',
                              padding: '10px',
                              textAlign: 'right',
                              boxShadow:
                                'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                            }
                      }
                    />
                  </div>
                  {tellReq ? (
                    <h5
                      className='mt-2'
                      style={{
                        color: '#dc3545',
                        textAlign: 'right',
                        fontSize: '10px',
                      }}
                    >
                      لطفا شماره خود را درست وارد کنید
                    </h5>
                  ) : null}
                </div>
                <div
                  className='col-lg-6 order-lg-2 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 oder-1 my-2'
                  style={{ direction: 'rtl' }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <label
                      htmlFor='email'
                      className='col-lg-3 col-md-12 col-sm-12 col-12 mt-3 '
                    >
                      شماره موبایل :
                    </label>
                    <input
                      onChange={handlePhoneChange}
                      value={phone}
                      required
                      className='col-lg-8 col-md-12 col-sm-12 col-12 mt-3 mx-1'
                      id='phone'
                      type='text'
                      name='phone'
                      placeHolder='شماره موبایل'
                      style={
                        !phoneReq
                          ? {
                              borderRadius: '10px',
                              border: '1px solid #0000004f',
                              height: '50px',
                              outline: 'none',
                              background: 'white',
                              padding: '10px',
                              textAlign: 'right',
                              boxShadow:
                                'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                            }
                          : {
                              borderRadius: '10px',
                              border: '1px solid #dc3545',
                              height: '50px',
                              outline: 'none',
                              background: 'white',
                              padding: '10px',
                              textAlign: 'right',
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
                      لطفا شماره خود را درست وارد کنید
                    </h5>
                  ) : null}
                </div>
              </div>

              <div className='row'>
                <div
                  className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 my-2'
                  style={{ direction: 'rtl' }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <label
                      htmlFor='email'
                      className='col-lg-3 col-md-12 col-sm-12 col-12 mt-3 '
                    >
                      مقطع تحصیلی :
                    </label>
                    <input
                      onChange={handleMaqtaChange}
                      value={maqta}
                      name='major'
                      required
                      className='col-lg-8 col-md-12 col-sm-12 col-12 mt-3 mx-1'
                      id='email'
                      type='text'
                      placeHolder='مقطع تحصیلی'
                      style={
                        !maqtaReq
                          ? {
                              borderRadius: '10px',
                              border: '1px solid #0000004f',
                              height: '50px',
                              outline: 'none',
                              background: 'white',
                              padding: '10px',
                              textAlign: 'right',
                              boxShadow:
                                'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                            }
                          : {
                              borderRadius: '10px',
                              border: '1px solid #dc3545',
                              height: '50px',
                              outline: 'none',
                              background: 'white',
                              padding: '10px',
                              textAlign: 'right',
                              boxShadow:
                                'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                            }
                      }
                    />
                  </div>
                  {maqtaReq ? (
                    <h5
                      className='mt-2'
                      style={{
                        color: '#dc3545',
                        textAlign: 'right',
                        fontSize: '10px',
                      }}
                    >
                      لطفا مقطع تحصیلی خود را وارد کنید
                    </h5>
                  ) : null}
                </div>
                <div
                  className='col-lg-6 order-lg-2 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 oder-1 my-2'
                  style={{ direction: 'rtl' }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <label
                      htmlFor='email'
                      className='col-lg-3 col-md-12 col-sm-12 col-12 mt-3 '
                    >
                      رشته تحصیلی :
                    </label>
                    <input
                      onChange={handleMajorChange}
                      value={major}
                      required
                      name='studyField'
                      className='col-lg-8 col-md-12 col-sm-12 col-12 mt-3 mx-1'
                      id='email'
                      type='text'
                      placeHolder='رشته تحصیلی'
                      style={
                        !majorReq
                          ? {
                              borderRadius: '10px',
                              border: '1px solid #0000004f',
                              height: '50px',
                              outline: 'none',
                              background: 'white',
                              padding: '10px',
                              textAlign: 'right',
                              boxShadow:
                                'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                            }
                          : {
                              borderRadius: '10px',
                              border: '1px solid #dc3545',
                              height: '50px',
                              outline: 'none',
                              background: 'white',
                              padding: '10px',
                              textAlign: 'right',
                              boxShadow:
                                'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                            }
                      }
                    />
                  </div>
                  {majorReq ? (
                    <h5
                      className='mt-2'
                      style={{
                        color: '#dc3545',
                        textAlign: 'right',
                        fontSize: '10px',
                      }}
                    >
                      لطفا رشته تحصیلی خود را وارد کنید
                    </h5>
                  ) : null}
                </div>
              </div>

              <div className='row'>
                <div
                  className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 my-2'
                  style={{ direction: 'rtl' }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <label
                      htmlFor='email'
                      className='col-lg-3 col-md-12 col-sm-12 col-12 mt-3 '
                    >
                      سابقه :
                    </label>
                    <input
                      onChange={handleSabeqeChange}
                      value={sabeqe}
                      required
                      className='col-lg-8 col-md-12 col-sm-12 col-12 mt-3 mx-1'
                      id='email'
                      type='text'
                      name='history'
                      placeHolder='سابقه'
                      style={
                        !sabeqeReq
                          ? {
                              borderRadius: '10px',
                              border: '1px solid #0000004f',
                              height: '50px',
                              outline: 'none',
                              background: 'white',
                              padding: '10px',
                              textAlign: 'right',
                              boxShadow:
                                'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                            }
                          : {
                              borderRadius: '10px',
                              border: '1px solid #dc3545',
                              height: '50px',
                              outline: 'none',
                              background: 'white',
                              padding: '10px',
                              textAlign: 'right',
                              boxShadow:
                                'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                            }
                      }
                    />
                  </div>
                  {sabeqeReq ? (
                    <h5
                      className='mt-2'
                      style={{
                        color: '#dc3545',
                        textAlign: 'right',
                        fontSize: '10px',
                      }}
                    >
                      لطفا سابقه تحصیلی خود را وارد کنید
                    </h5>
                  ) : null}
                </div>
                <div
                  className='col-lg-6 order-lg-2 col-md-12 order-md-1 col-sm-12 order-sm-1 col-12 oder-1 my-2'
                  style={{ direction: 'rtl' }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <label
                      htmlFor='email'
                      className='col-lg-3 col-md-12 col-sm-12 col-12 mt-3 '
                    >
                      دانشگاه :
                    </label>
                    <input
                      onChange={handleUniChange}
                      value={uni}
                      required
                      className='col-lg-8 col-md-12 col-sm-12 col-12 mt-3 mx-1'
                      id='email'
                      name='university'
                      type='text'
                      placeHolder='دانشگاه'
                      style={
                        !uniReq
                          ? {
                              borderRadius: '10px',
                              border: '1px solid #0000004f',
                              height: '50px',
                              outline: 'none',
                              background: 'white',
                              padding: '10px',
                              textAlign: 'right',
                              boxShadow:
                                'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                            }
                          : {
                              borderRadius: '10px',
                              border: '1px solid #dc3545',
                              height: '50px',
                              outline: 'none',
                              background: 'white',
                              padding: '10px',
                              textAlign: 'right',
                              boxShadow:
                                'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                            }
                      }
                    />
                  </div>
                  {uniReq ? (
                    <h5
                      className='mt-2'
                      style={{
                        color: '#dc3545',
                        textAlign: 'right',
                        fontSize: '10px',
                      }}
                    >
                      لطفا نام دانشگاه خود را وارد کنید
                    </h5>
                  ) : null}
                </div>
              </div>

              {/* sabeqe */}
              <div>
                <div className='row mt-5 text-center'>
                  <p
                    className='col-6 '
                    style={{ fontWeight: 'bolder', fontSize: '19px' }}
                  >
                    میزان تسلط
                  </p>
                  <p
                    className='col-6 '
                    style={{ fontWeight: 'bolder', fontSize: '19px' }}
                  >
                    مهارت
                  </p>
                </div>
                <div className='row'>
                  <div
                    className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 my-1'
                    style={{ direction: 'rtl' }}
                  >
                    <div style={{ textAlign: 'right' }}>
                      <label
                        htmlFor='email'
                        className='mt-3'
                        style={{ direction: 'rtl', width: '5%' }}
                      >
                        1 :
                      </label>
                      <select
                        id='level1'
                        name='level[0]'
                        required
                        className='col-10 mt-3 mx-1'
                        style={{
                          borderRadius: '10px',
                          border: '1px solid #0000004f',
                          height: '50px',
                          outline: 'none',
                          background: 'white',
                          padding: '10px',
                          textAlign: 'right',
                          boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                        }}
                      >
                        <option key='1' value='عالی'>
                          عالی
                        </option>
                        <option key='2' value='متوسط'>
                          متوسط
                        </option>
                        <option key='3' value='ضعیف'>
                          ضعیف
                        </option>
                      </select>
                    </div>
                  </div>

                  <div
                    className='col-lg-6 order-lg-2 col-md-12 order-md-1   col-sm-12 order-sm-1 col-12 order-1 my-1'
                    style={{ direction: 'rtl' }}
                  >
                    <div style={{ textAlign: 'right' }}>
                      <label
                        htmlFor='email'
                        className='mt-3'
                        style={{ direction: 'rtl', width: '5%' }}
                      >
                        1 :
                      </label>
                      <input
                        required
                        name='skill[0]'
                        className='col-10 mt-3 mx-1'
                        type='text'
                        id='skill1'
                        placeHolder=''
                        style={{
                          borderRadius: '10px',
                          border: '1px solid #0000004f',
                          height: '50px',
                          outline: 'none',
                          background: 'white',
                          padding: '10px',
                          textAlign: 'right',
                          boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div
                    className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 my-1'
                    style={{ direction: 'rtl' }}
                  >
                    <div style={{ textAlign: 'right' }}>
                      <label
                        htmlFor='email'
                        className='mt-3'
                        style={{ direction: 'rtl', width: '5%' }}
                      >
                        2 :
                      </label>
                      <select
                        id='level2'
                        required
                        name='level[1]'
                        className='col-10 mt-3 mx-1'
                        type='text'
                        placeHolder=''
                        style={{
                          borderRadius: '10px',
                          border: '1px solid #0000004f',
                          height: '50px',
                          outline: 'none',
                          background: 'white',
                          padding: '10px',
                          textAlign: 'right',
                          boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                        }}
                      >
                        <option key='1' value='عالی'>
                          عالی
                        </option>
                        <option key='2' value='متوسط'>
                          متوسط
                        </option>
                        <option key='3' value='ضعیف'>
                          ضعیف
                        </option>
                      </select>
                    </div>
                  </div>

                  <div
                    className='col-lg-6 order-lg-2 col-md-12 order-md-1   col-sm-12 order-sm-1 col-12 order-1 my-1'
                    style={{ direction: 'rtl' }}
                  >
                    <div style={{ textAlign: 'right' }}>
                      <label
                        htmlFor='email'
                        className='mt-3'
                        style={{ direction: 'rtl', width: '5%' }}
                      >
                        2 :
                      </label>
                      <input
                        name='skill[1]'
                        required
                        className='col-10 mt-3 mx-1'
                        id='skill1'
                        type='text'
                        placeHolder=''
                        style={{
                          borderRadius: '10px',
                          border: '1px solid #0000004f',
                          height: '50px',
                          outline: 'none',
                          background: 'white',
                          padding: '10px',
                          textAlign: 'right',
                          boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div
                    className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 my-1'
                    style={{ direction: 'rtl' }}
                  >
                    <div style={{ textAlign: 'right' }}>
                      <label
                        htmlFor='email'
                        className='mt-3'
                        style={{ direction: 'rtl', width: '5%' }}
                      >
                        3 :
                      </label>
                      <select
                        name='level[2]'
                        id='level3'
                        required
                        className='col-10 mt-3 mx-1'
                        type='text'
                        placeHolder=''
                        style={{
                          borderRadius: '10px',
                          border: '1px solid #0000004f',
                          height: '50px',
                          outline: 'none',
                          background: 'white',
                          padding: '10px',
                          textAlign: 'right',
                          boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                        }}
                      >
                        <option key='1' value='عالی'>
                          عالی
                        </option>
                        <option key='2' value='متوسط'>
                          متوسط
                        </option>
                        <option key='3' value='ضعیف'>
                          ضعیف
                        </option>
                      </select>
                    </div>
                  </div>

                  <div
                    className='col-lg-6 order-lg-2 col-md-12 order-md-1   col-sm-12 order-sm-1 col-12 order-1 my-1'
                    style={{ direction: 'rtl' }}
                  >
                    <div style={{ textAlign: 'right' }}>
                      <label
                        htmlFor='email'
                        className='mt-3'
                        style={{ direction: 'rtl', width: '5%' }}
                      >
                        3 :
                      </label>
                      <input
                        name='skill[2]'
                        required
                        className='col-10 mt-3 mx-1'
                        id='skill3'
                        type='text'
                        placeHolder=''
                        style={{
                          borderRadius: '10px',
                          border: '1px solid #0000004f',
                          height: '50px',
                          outline: 'none',
                          background: 'white',
                          padding: '10px',
                          textAlign: 'right',
                          boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div
                    className='col-lg-6 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12 order-2 my-1'
                    style={{ direction: 'rtl' }}
                  >
                    <div style={{ textAlign: 'right' }}>
                      <label
                        htmlFor='email'
                        className='mt-3'
                        style={{ direction: 'rtl', width: '5%' }}
                      >
                        4 :
                      </label>
                      <select
                        name='level[3]'
                        id='level4'
                        required
                        className='col-10 mt-3 mx-1'
                        type='text'
                        placeHolder=''
                        style={{
                          borderRadius: '10px',
                          border: '1px solid #0000004f',
                          height: '50px',
                          outline: 'none',
                          background: 'white',
                          padding: '10px',
                          textAlign: 'right',
                          boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                        }}
                      >
                        <option key='1' value='عالی'>
                          عالی
                        </option>
                        <option key='2' value='متوسط'>
                          متوسط
                        </option>
                        <option key='3' value='ضعیف'>
                          ضعیف
                        </option>
                      </select>
                    </div>
                  </div>

                  <div
                    className='col-lg-6 order-lg-2 col-md-12 order-md-1   col-sm-12 order-sm-1 col-12 order-1 my-1'
                    style={{ direction: 'rtl' }}
                  >
                    <div style={{ textAlign: 'right' }}>
                      <label
                        htmlFor='email'
                        className='mt-3'
                        style={{ direction: 'rtl', width: '5%' }}
                      >
                        4 :
                      </label>
                      <input
                        name='skill[3]'
                        required
                        className='col-10 mt-3 mx-1'
                        id='skill4'
                        type='text'
                        style={{
                          borderRadius: '10px',
                          border: '1px solid #0000004f',
                          height: '50px',
                          outline: 'none',
                          background: 'white',
                          padding: '10px',
                          textAlign: 'right',
                          boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* sabeqe */}
            </div>

            <div className='row my-3'>
              <div className='d-flex flex-wrap row mt-5 text-end '>
                <button
                  onClick={addHistoryRow}
                  className='btn btn-success'
                  style={{ width: 'fit-content' }}
                >
                  <FaPlus />
                </button>
                <button
                  onClick={removeLast}
                  className='btn btn-danger ml-2 mr-2'
                  style={{ width: 'fit-content' }}
                >
                  <FaMinus />
                </button>
                <label style={{ fontWeight: 'bolder', fontSize: '19px' }}>
                  سوابق تدریس
                </label>
              </div>
              {historyList.map((e) => {
                return (
                  <div
                    id={'history_' + e}
                    className='history-div mt-3'
                    style={{ direction: 'rtl' }}
                  >
                    {historyList.indexOf(e) + 1}

                    <input name='histories[]' className='form-control' />
                  </div>
                )
              })}
            </div>
            <div className='my-3'>
              <div className='my-3'>
                <p style={{ fontWeight: 'bolder', fontSize: '19px' }}>
                  توضیح درمورد درس
                </p>
                <div style={{ textAlign: 'right' }}>
                  <textarea
                    onChange={handleDescChange}
                    value={desc}
                    name='desc'
                    required
                    className='col-12 mt-3 mx-1'
                    type='text'
                    placeHolder=''
                    style={
                      !descReq
                        ? {
                            borderRadius: '10px',
                            border: '1px solid #0000004f',
                            height: '100px',
                            outline: 'none',
                            background: 'white',
                            padding: '10px',
                            textAlign: 'right',
                            boxShadow:
                              'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                          }
                        : {
                            borderRadius: '10px',
                            border: '1px solid #dc3545',
                            height: '100px',
                            outline: 'none',
                            background: 'white',
                            padding: '10px',
                            textAlign: 'right',
                            boxShadow:
                              'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                          }
                    }
                  />
                </div>
                {descReq ? (
                  <h5
                    className='mt-2'
                    style={{
                      color: '#dc3545',
                      textAlign: 'right',
                      fontSize: '10px',
                    }}
                  >
                    لطفا توضیحات را کامل وارد کنید
                  </h5>
                ) : null}
              </div>
            </div>

            <div
              className='col-lg-6 col-md-12 col-sm-12 col-12 my-2'
              style={{ direction: 'rtl' }}
            >
              <div className='my-3'>
                <p style={{ fontWeight: 'bolder', fontSize: '19px' }}>
                  آپلود تصویر
                </p>
                <Dropzone
                  onDrop={onDrop}
                  accept='image/png,image/jpeg,image/jpg'
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      style={{
                        height: '11em',
                        width: '80%',
                        borderRadius: '25px',
                        border: '2px solid rgb(194 194 194)',
                      }}
                      className='mt-2 text-center container'
                    >
                      <div {...getRootProps()}>
                        <input name='image' {...getInputProps()} />
                        <p className='mt-2'>عکس خود را اپلود کنید</p>
                        <br />
                        <div className='d-flex flex-wrap justify-content-center'>
                          {profileImg.map((e) => {
                            return (
                              <div className='col-md-12'>
                                <img
                                  style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                  }}
                                  alt='b'
                                  src={URL.createObjectURL(e)}
                                />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>
            </div>

            <div
              className='col-lg-6 col-md-12 col-sm-12 col-12 my-2'
              style={{ direction: 'rtl' }}
            >
              <div className='my-3'>
                <p style={{ fontWeight: 'bolder', fontSize: '19px' }}>
                  آپلود رزومه
                </p>
                <div style={{ textAlign: 'right' }}>
                  <input
                    onChange={handleFileChange}
                    value={file}
                    required
                    name='cv'
                    className='col-12 mt-3 mx-1'
                    type='file'
                    placeHolder=''
                    style={{
                      borderRadius: '10px',
                      border: '1px solid #0000004f',
                      height: '50px',
                      outline: 'none',
                      background: 'white',
                      padding: '10px',
                      textAlign: 'right',
                      boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className='col-lg-6 col-md-12 col-sm-12 col-12 my-2'
              style={{ direction: 'rtl' }}
            >
              <div className='my-3'>
                <p style={{ fontWeight: 'bolder', fontSize: '19px' }}>
                  در چه مناطقی تمایل دارم تدریس کنم
                </p>
                <div style={{ textAlign: 'right' }}>
                  <RadioGroup
                    aria-labelledby='demo-controlled-radio-buttons-group'
                    name='controlled-radio-buttons-group'
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value='all'
                      control={<Radio />}
                      label='کل کشور'
                      style={{ fontSize: '15px' }}
                    />
                    <FormControlLabel
                      value='state'
                      control={<Radio />}
                      style={{ fontSize: '15px' }}
                      label='شهر خود را انتخاب کنید'
                    />
                  </RadioGroup>
                  {showState ? (
                    <div>
                      <select
                        onChange={handleCityPlaceChange}
                        required
                        id='cityPlace'
                        className='col-10 mt-3 mx-1'
                        type='text'
                        placeHolder=''
                        style={
                          !cityPlaceReq
                            ? {
                                borderRadius: '10px',
                                border: '1px solid #0000004f',
                                height: '50px',
                                outline: 'none',
                                background: 'white',
                                padding: '10px',
                                textAlign: 'right',
                                boxShadow:
                                  'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                              }
                            : {
                                borderRadius: '10px',
                                border: '1px solid #dc3545',
                                height: '50px',
                                outline: 'none',
                                background: 'white',
                                padding: '10px',
                                textAlign: 'right',
                                boxShadow:
                                  'rgb(0 0 0 / 50%) 0px 0px 12px -5px inset',
                              }
                        }
                      >
                        <option key='0' value='0' disabled selected>
                          شهر خود را انتخاب کنید
                        </option>
                        {city &&
                          city.map((e) => {
                            return (
                              <option key={e.id} value={e.id}>
                                {e.name}
                              </option>
                            )
                          })}
                      </select>
                      {cityPlaceReq ? (
                        <h5
                          className='mt-2'
                          style={{
                            color: '#dc3545',
                            textAlign: 'right',
                            fontSize: '10px',
                          }}
                        >
                          لطفا شهر خود را انتخاب کنید
                        </h5>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </form>
        <div className='my-5' style={{ textAlign: 'center' }}>
          <button
            onClick={submit}
            variant=' my-3 mr-3 '
            className='login-btn px-5 hover-item py-3'
          >
            {Loading ? <Loader /> : 'ثبت نام'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AskDore
