import { React, useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import banner from '../../assets/Img/banner.PNG'
import axios from 'axios'
export default function Carousel() {
  const slickDefaults = {
    rtl: true,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rtl: true,
          autoplay: true,
          autoplaySpeed: 3000,
          dots: true,
          infinite: false,
          speed: 500,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rtl: true,
          autoplay: true,
          autoplaySpeed: 3000,
          dots: false,
          infinite: false,
          speed: 500,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rtl: true,
          autoplay: true,
          autoplaySpeed: 3000,
          dots: false,
          infinite: false,
          speed: 500,
        },
      },
    ],
  }
  const [banners, setBanners] = useState('')

  const getBanners = async () => {
    try {
      const rawResponse = await fetch(
        'https://portal-sazmani.com/admin/Banners/API/_all?token=test',
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
        setBanners(content.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBanners()
  }, [])
  return (
    <Slider {...slickDefaults}>
      {banners &&
        banners.map((e) => {
          return (
            <div key={e.id}>
              <div className=' mx-auto Adslider'>
                <div className=''>
                  <img src={e.image} alt={e.id} style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          )
        })}
    </Slider>
  )
}
