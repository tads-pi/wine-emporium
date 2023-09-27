import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import './verMais.css'

export function VerMais() {
  const [data, setData] = useState(null);

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
      .catch((err) => {});
  }, []);
console.log(data)
  return (
    <div style={{display:"flex", flexDirection:"row", width:"650px"}}>
      <img src={data?.images[0]} alt="" />
      <div>
        <h2 className="name-ver-mais">{data?.name}</h2>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <div>
            <p className="p-editar-verMais">nacionalidade</p>
            <p className="p-editar-verMais">marca</p>
            <p className="p-editar-verMais">tipo</p>
          </div>
          <div>
            <h2 className="preco-verMais">{data?.price}</h2>
          </div>
        </div>
        <p className="recursos-premium-verMais">Recursos Premium</p>
          <div>
            <img src="" alt="" />
            <p className="entrega-imediata-verMais">entega imediata</p>
          </div>
        <div style={{display:"flex", alignItems:"center",justifyContent:"center",marginTop:"40px"}}>
          <button className="adiconar-sacola-verMais">adiconar à sacola</button>
        </div>
      </div>
    </div>
  );
}
