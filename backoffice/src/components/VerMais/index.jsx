import { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import './verMais.css'

export function VerMais({ autofill }) {
  const [data, setData] = useState();
  const [images, setImages] = useState([]);

  if (autofill) {
    useEffect(() => {
      setData(autofill);
    }, [autofill])
  }

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
        <div style={{ display: "flex", flexDirection: "row", width: "650px" }}>
          <div className="ver-mais__carrousel-container">
            {
              images &&
              <Carousel data-bs-theme="dark">
                {
                  images.map(({ key, url }) => {
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
      }
    </div>
  );
}
