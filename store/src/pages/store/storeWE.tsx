import React from "react"
import Carrousel from "../../components/Carrousel"
import useStoreWE from "./hooks/useStoreWE"
import Loading from "../../components/loading"
import { Grid, Typography } from '@mui/material';
import { CardWine } from '../../components/CardWine';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Product } from '../../zustand/types';
import { NavBarWE } from "../../components/NavBarWE";

export default function StoreWE() {
    const {
        products,
        addProductToCart,
    } = useStoreWE()

    return (
        <>
            <NavBarWE />
            {
                products ?
                    <>
                        <Carrousel products={products} />
                        <div>
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
                                        style={{ background: 'transparent' }}
                                    >
                                        {
                                            products?.map((product: Product) => (
                                                <SwiperSlide key={product.id}>
                                                    <CardWine data={product} addCart={() => addProductToCart(product.id)} />
                                                </SwiperSlide>
                                            ))
                                        }

                                    </Swiper>
                                </Grid>
                            </div>
                        </div>
                    </>
                    : <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                        width: '100%',
                        height: '100vh',
                    }}>
                        <Loading />
                    </div>
            }
        </>
    )
};
