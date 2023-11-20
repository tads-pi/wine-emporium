import React, { useEffect } from "react"
import Carrousel from "../../components/Carrousel"
import useStoreWE from "./hooks/useStoreWE"
import Loading from "../../components/loading"
import { Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { CardWine } from '../../components/CardWine';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Product } from '../../zustand/types';
import { NavBarWE } from "../../components/NavBarWE";
import SearchIcon from '@mui/icons-material/Search';
import useStore from "../../zustand/store";

export default function StoreWE() {
    const {
        products,
        isLoading,
        addProductToCart,
        fetchProducts,
        searchValue,
        setSearchValue,
        handleSearch,
    } = useStoreWE()

    return (
        <div>
            <NavBarWE />
            <CarrouselWE />
            <div>
                <div style={{
                    padding: window.innerWidth > 600 ? '3rem' : '1rem',
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: '100%',
                        padding: '1rem',
                    }}>
                        <div style={{
                            display: 'flex',
                            width: 'min(250px, 100%)',
                        }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                id="input-with-icon-textfield"
                                label="Pesquisar"
                                disabled={isLoading}
                                value={searchValue}
                                onChange={s => setSearchValue(s.target.value)}
                                onKeyDownCapture={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch(e)
                                    }
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>

                    </div>

                    <div style={{
                        display: 'flex',
                    }}>
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'center',
                            flexDirection: window.innerWidth > 600 ? 'row' : 'column',
                        }}>
                            <div style={{
                                width: window.innerWidth > 600 ? 'min(250px, 25%)' : '100%',
                                border: '1px solid red'
                            }}>
                                filtros
                            </div>
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                padding: '0.25rem',
                                width: window.innerWidth > 600 ? '100%' : '100%',
                                gap: window.innerWidth > 600 ? '2rem' : '1rem',
                                minHeight: '100vh',
                                border: '1px solid blue'
                            }}>
                                {!isLoading && products ?
                                    (
                                        products?.length === 0
                                    )
                                        ? <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: '100%',
                                            }}
                                        ><Typography variant="h5" component="span">
                                                Nenhum produto encontrado
                                            </Typography>
                                        </div>

                                        : products?.map((product: Product) => (
                                            <CardWine
                                                key={product.id}
                                                data={product}
                                                addCart={() => addProductToCart(product.id)}
                                            />
                                        ))
                                    :
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
                                        <Loading />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

function CarrouselWE() {
    const { productApi } = useStore()
    const [products, setProducts] = React.useState<Product[]>([])
    useEffect(() => { productApi.list().then(setProducts) }, [productApi])
    return (
        <Carrousel products={products} />
    )
}