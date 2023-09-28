import { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import { api } from "../../lib/axios";
import Loading from "../loading/Loading"
import './verMais.css'

export function VerMais({ autofill }) {
  const [data, setData] = useState();

  if (autofill) {
    useEffect(() => {
      setData(autofill);
    }, [autofill])
  }

  if (!autofill) {
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
  }


  return (
    <div className="container">
      {
        data ?
          <div style={{ display: "flex", flexDirection: "row", width: "650px" }}>
            <div className="ver-mais__carrousel-container">
              {
                data?.images &&
                <Carousel data-bs-theme="dark">
                  {
                    data?.images.map((image, i) => {
                      return (
                        <Carousel.Item key={i}>
                          <div className="ver-mais__image-container">
                            <img className="ver-mais__image" src={image} alt="" />
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
              <div>
                <img src="" alt="" />
                <p className="entrega-imediata-verMais">entega imediata</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "40px" }}>
                <button className="adiconar-sacola-verMais">adiconar à sacola</button>
              </div>
            </div>
          </div>

          : <Loading />
      }
    </div>
  );
}
