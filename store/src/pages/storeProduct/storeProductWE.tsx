import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import Loading from "../../components/loading"
import { Button, Input, Rating, Typography } from "@mui/material";
import { useStoreProductWE } from "./hooks";
import { VariantType, enqueueSnackbar } from "notistack";
import { Deliverer, Product } from "../../zustand/types";
import { NavBarWE } from "../../components/NavBarWE";
import './storeProductWE.css'
import { formatCurrency } from "../../utils/formatCurrency";

export default function StoreProductWE() {
    const { id } = useParams();
    const {
        currentProduct,
        addCartProduct,
        getDeliverers,
    } = useStoreProductWE(id || '')

    const handleClickVariant = (variant: VariantType, product: Product) => () => {
        // variant could be success, error, warning, info, or default
        addCartProduct(product.id);
        enqueueSnackbar(
            <Typography>Vinho adicionado adicionado ao carrinho.</Typography>,
            { variant }
        );
    };

    const [zipCode, setZipCode] = useState<string>("")
    const [deliverers, setDeliverers] = useState<Deliverer[]>([])

    return (
        <>
            <NavBarWE />

            <div className="container" style={{ display: "flex", flexDirection: "row", marginLeft: '12.5rem', marginTop: '8rem' }}>
                {
                    currentProduct ?
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "650px",
                        }}>
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

                            <div>
                                <Input
                                    placeholder="Digite seu CEP"
                                    value={zipCode}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 8) {
                                            setZipCode(e.target.value)
                                        }
                                    }}
                                />
                                {
                                    zipCode.length >= 8 &&
                                    <Button onClick={() => {
                                        getDeliverers(zipCode).then((d) => {
                                            console.log({ d });
                                            setDeliverers(d)
                                        })
                                    }
                                    }>Calcular Frete</Button>
                                }

                                <ul>
                                    {
                                        deliverers.length > 0 &&
                                        deliverers.map((deliverer) => (
                                            <li key={deliverer.id}>
                                                <div>
                                                    <p>{deliverer.name}</p>
                                                    <p>{formatCurrency(Number(deliverer.fare))}</p>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>

                        : <Loading />
                }
            </div>
        </>
    );
};
