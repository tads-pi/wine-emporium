import { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import './verMais.css'
import { Rating } from "@mui/material";

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function VerMais({ autofill }) {
  const [data, setData] = useState(autofill);
  const [images, setImages] = useState([]);

  if (autofill) {
    useEffect(() => {
      setData(autofill);
    }, [autofill])
  }

  console.log({ data });
  // sort images by 'marked' field
  useEffect(() => {
    if (data?.images) {
      function compare(a, b) {
        if (a.marked && !b.marked) {
          return -1;
        }
        if (!a.marked && b.marked) {
          return 1;
        }
        return 0;
      }

      const sortedImages = data?.images?.toSorted(compare);
      setImages(sortedImages)
    }
  }, [data])

  return (
    <div className="container">
      {
        data &&
        <div style={{ display: "flex", flexDirection: "row", width: "650px", gap: '1rem' }}>
          <div className="ver-mais__carrousel-container">
            {
              images &&
              <Carousel data-bs-theme="dark">
                {
                  images.map(({ id, url, data_url }) => {
                    return (
                      <Carousel.Item key={id}>
                        <div className="ver-mais__image-container">
                          <img className="ver-mais__image" src={url || data_url} alt="" />
                        </div>
                      </Carousel.Item>
                    )
                  })
                }
              </Carousel>
            }
          </div>

          <div>
            <h2 className="name-ver-mais">{data?.name}</h2>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              {/* <div>
              <p className="p-editar-verMais">nacionalidade</p>
              <p className="p-editar-verMais">marca</p>
              <p className="p-editar-verMais">tipo</p>
            </div> */}
              <div>
                <h2 className="preco-verMais">{formatCurrency(data?.price || 0)}</h2>
              </div>
            </div>
            {/* <p className="recursos-premium-verMais">Recursos Premium</p> */}
            <p className="description-verMais">{data?.description}</p>
            <Rating value={data?.ratings || 0} precision={0.5} readOnly />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "40px" }}>
              <button className="adiconar-sacola-verMais">adiconar à sacola</button>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
