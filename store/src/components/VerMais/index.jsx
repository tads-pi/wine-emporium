import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import { api } from "../../lib/axios";
import Loading from "../loading/Loading"
import './verMais.css'
import { Rating, Typography } from "@mui/material";
import { useCartStore } from "../../zustand-store/cartState";
import { enqueueSnackbar } from "notistack";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function VerMais() {
  const [data, setData] = useState();
  const { addItem } = useCartStore(store => {
    return {
      addItem: store.addItem,
    }
  })


  const { id } = useParams();

    useEffect(() => {
      api
        .get("/v1/store/product")
        .then((res) => {
          const item = res?.data?.products;
          item.forEach((element) => {
            if (element.id == id) {
              setData(element);
            }
          });
        })
        .catch((err) => { });
    }, []);

    console.log(data)

    const handleClickVariant = (variant, wine) => () => {
      // variant could be success, error, warning, info, or default
      addItem(wine);
      enqueueSnackbar(
        <Typography>Vinho adicionado adicionado ao carrinho.</Typography>,
        { variant }
      );
    };

  return (
    <>
    <Link to='/mercado' style={{ textDecoration: 'none', color: 'black' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ArrowBackIcon fontSize="large" style={{ marginLeft: '1.5rem', marginTop: '2rem' }}  />
        <Typography fontSize={20} style={{ marginLeft: '1rem', marginTop: '2rem' }}>Voltar para o mercado</Typography>
      </div>
    </Link>
    <div className="container" style={{ display: "flex", flexDirection: "row", marginLeft: '12.5rem', marginTop: '8rem' }}>
      {
        data ?
          <div style={{ display: "flex", flexDirection: "row", width: "650px" }}>
            <div className="ver-mais__carrousel-container" >
              {
                data?.images &&
                <Carousel data-bs-theme="dark">
                  {
                    data?.images.map(({ url, key }) => {
                      return (
                        <Carousel.Item key={key}>
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
              <h2 className="name-ver-mais">{data?.name}</h2>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                {/* <div>
              <p className="p-editar-verMais">nacionalidade</p>
              <p className="p-editar-verMais">marca</p>
              <p className="p-editar-verMais">tipo</p>
            </div> */}
                <div>
                  <h2 className="preco-verMais">{data?.price}</h2>
                </div>
              </div>
              {/* <p className="recursos-premium-verMais">Recursos Premium</p> */}
              <p className="description-verMais">{data?.description}</p>
              <Rating name="half-rating-read" defaultValue={data?.ratings} precision={0.5} readOnly />
              <div>
                <img src="" alt="" />
                <p className="entrega-imediata-verMais">entega imediata</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "40px" }}>
                <button className="adiconar-sacola-verMais" onClick={(handleClickVariant("success", data))}>Adicionar à sacola</button>
              </div>
            </div>
          </div>

          : <Loading />
      }
    </div>
    </>
  );
}
