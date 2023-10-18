import * as React from 'react';
import { Badge, Grid, styled } from '@mui/material';
import { CardWine } from '../CardWine';
import { useCartStore } from '../../zustand-store/cartState';
import { api } from '../../lib/axios';
import { Slider } from '../Slider';
import Loading from "../loading/Loading"
import { Nav } from '../Nav';
import { useWineData } from '../../hooks/useWineData';

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
        <Grid container spacing={2}>
          {
            data ?
              data?.map((wine) => (
                <Grid item key={wine.uuid} xs={12} sm={6} md={4} lg={3}>
                  <CardWine data={wine} addCart={() => addItem(wine)} />
                </Grid>
              ))
              : <Loading />
          }
        </Grid>
      </div>

    </div>
  );
}
