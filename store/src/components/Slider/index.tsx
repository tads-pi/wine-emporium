import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Parallax, Pagination, Navigation } from 'swiper/modules';
import { Product } from '../../zustand/types';

type SliderProps = {
  data: Product[]
}

export function Slider({ data }: SliderProps) {

  if (!data) return null
  return (
    <>
      <Swiper
        style={{
          // '--swiper-navigation-color': '#fff',
          // '--swiper-pagination-color': '#fff',
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
        className="mySwiper"
      >
        {data?.map((item) => (
          <SwiperSlide key={item.id}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              // border: '1px solid red',
            }}>
              <div>
                <div className="title" data-swiper-parallax="-300">
                  {item.name}
                </div>
                <div className="subtitle" data-swiper-parallax="-200">
                  {item.price}
                </div>
                <div className="text" data-swiper-parallax="-100">
                  <p>
                    {item.description}
                  </p>
                </div>
              </div>

              <div className='imageContainer'>
                <div className='imageWrapper'>
                  <img
                    src={item.images[0].url}
                    alt={`imagem de ${item.name}`}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
