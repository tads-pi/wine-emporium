import * as React from 'react';
import { Badge, Grid, Typography, styled } from '@mui/material';
import { CardWine } from '../CardWine';
import { useCartStore } from '../../zustand-store/cartState';
import { api } from '../../lib/axios';
import { Slider } from '../Slider';
import Loading from "../loading/Loading"
import { Nav } from '../Nav';
import { useWineData } from '../../hooks/useWineData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export function NavBar() {
  // const [data, setData] = React.useState(null);
  const { addItem } = useCartStore(store => {
    return {
      addItem: store.addItem,
    }
  })

  const { data, isLoading, status } = useWineData()

  // React.useEffect(() => {
  //   api.get('/v1/store/product')
  //     .then((res) => {
  //       setData(res?.data?.products)
  //     })
  //     .catch((err) => {
  //     })
  // }, [])

  return (
    <div>
      <Slider data={data} />

      <div style={{ padding: '100px' }}>
        <Typography variant="h4" component="h2" gutterBottom>Produtos</Typography>
        <Grid container spacing={2}>
          <Swiper
              spaceBetween={30}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              
              slidesPerView={2.5}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              style={{ background: 'transparent'}}
            >
            {
              data ?
              data?.map((wine) => (
                <SwiperSlide key={wine.id}>
                  <CardWine data={wine} addCart={() => addItem(wine)} />
                </SwiperSlide>
              ))
              : <Loading />
            }
        </Swiper>
          {/* {
            data ?
              data?.map((wine) => (
                <Grid item key={wine.uuid} xs={12} sm={6} md={4} lg={3}>
                  <CardWine data={wine} addCart={() => addItem(wine)} />
                </Grid>
              ))
              : <Loading />
          } */}
        </Grid>
      </div>

    </div>
  );
}
