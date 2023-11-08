import React from "react";
import { useParams } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import Loading from "../../components/loading"
import { Rating, Typography } from "@mui/material";
import { useStoreProductWE } from "./hooks";
import { VariantType, enqueueSnackbar } from "notistack";
import { Product } from "../../zustand/types";
import { NavBarWE } from "../../components/NavBarWE";
import './storeProductWE.css'

export default function StoreProductWE() {
    const { id } = useParams();
    const {
        currentProduct,
        addCartItem
    } = useStoreProductWE(id || '')

    const handleClickVariant = (variant: VariantType, product: Product) => () => {
        // variant could be success, error, warning, info, or default
        addCartItem(product, 1);
        enqueueSnackbar(
            <Typography>Vinho adicionado adicionado ao carrinho.</Typography>,
            { variant }
        );
    };

    return (
        <>
            <NavBarWE />

            <div className="container" style={{ display: "flex", flexDirection: "row", marginLeft: '12.5rem', marginTop: '8rem' }}>
                {
                    currentProduct ?
                        <div style={{ display: "flex", flexDirection: "row", width: "650px" }}>
                            <div className="ver-mais__carrousel-container" >
                                {
                                    currentProduct?.images &&
                                    <Carousel data-bs-theme="dark">
                                        {
                                            currentProduct?.images.map(({ id, url }) => {
                                                return (
                                                    <Carousel.Item key={id}>
                                                        <div className="ver-mais__image-container">
                                                            <img className="ver-mais__image" src={url} alt="" />
                                                        </div>
                                                    </Carousel.Item>
                                                )
                                            })
                                        }
                                    </Carousel>
                                }
                            </div>

                            {/* <img className="ver-mais__image" src={data?.images[0]} alt="" /> */}
                            <div>
                                <h2 className="name-ver-mais">{currentProduct?.name}</h2>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                    <div>
                                        <h2 className="preco-verMais">{currentProduct?.price}</h2>
                                    </div>
                                </div>
                                {/* <p className="recursos-premium-verMais">Recursos Premium</p> */}
                                <p className="description-verMais">{currentProduct?.description}</p>
                                <Rating name="half-rating-read" defaultValue={currentProduct?.ratings} precision={0.5} readOnly />
                                <div>
                                    <img src="" alt="" />
                                    <p className="entrega-imediata-verMais">entega imediata</p>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "40px" }}>
                                    <button className="adiconar-sacola-verMais" onClick={(handleClickVariant("success", currentProduct))}>Adicionar à sacola</button>
                                </div>
                            </div>
                        </div>

                        : <Loading />
                }
            </div>
        </>
    );
};
