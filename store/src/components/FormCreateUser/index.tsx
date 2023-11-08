import { Controller, set, useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect, useState } from "react"
import axios from "axios"

const createUserFormSchema = z.object({
  name: z.string().min(3, { message: "nome deve ter no minimo 3 caracteres" })
    .nonempty("nome não pode ser vazio").regex(/^[A-Za-z]{3,}\s[A-Za-z]{3,}$/, { message: "o nome precisa ter nome e sobrenome com 3 caracteres " }),

  email: z.string().email()
    .nonempty("email não pode ser vazio"),

  document: z.string().length(11, { message: "cpf invalido" })
    .nonempty("cpf não pode ser vazio"),
  birthDate: z.string()
    .nonempty("data de aniversario não pode ser vazio"),
  gender: z.string()
    .nonempty("geneo não pode ser vazio"),
  password: z.string()
    .nonempty("senha não pode ser vazio"),

  confirm_password: z.string()
    .nonempty("Comfirmar senha não pode ser vazio"),


  address: z.array(z.object({
    cep: z.string().nonempty("cep is required"),
    logradouro: z.string().nonempty("logradouro invalido"),
    complemento: z.string(),
    numero: z.string().nonempty("numero invalido"),
    cidade: z.string().nonempty("cidade invalido"),
    bairro: z.string().nonempty("bairro invalido"),
    uf: z.string().nonempty("uf invalido"),
    faturamento: z.boolean(),
    principal: z.boolean(),
  }))


})
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "Password doesn't match",
    path: ["confirm_password"]
  })

type createUserFormData = z.infer<typeof createUserFormSchema>

export function FormCreateUser() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { register, handleSubmit, control, formState: { errors } } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  })

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "address",
  })
  const [cep, SetCep] = useState("")
  const [address, setaddress] = useState<any>(null)
  const [nuemero, setNumero] = useState<any>(null)
  const [complemento, setComplemento] = useState<any>(null)
  const [addressFaturamento, setaddressFaturamento] = useState<any>(null)

  function consultarCep() {
    axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        setaddress(response.data)
      })
      .catch(() => console.log("cep invalido"))
  }
  function consultarCepFaturamento() {
    axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        setaddressFaturamento(response.data)
      })
      .catch(() => console.log("cep invalido"))
  }

  useEffect(() => {
    if (fields.length === 0) {
      replace([{
        cep: "",
        logradouro: "",
        complemento: "",
        numero: "",
        cidade: "",
        bairro: "",
        uf: "",
        faturamento: true,
        principal: false
      },
      {
        cep: "",
        logradouro: "",
        complemento: "",
        numero: "",
        cidade: "",
        bairro: "",
        uf: "",
        faturamento: false,
        principal: true
      }])
    }
  }, [])

  const onSubmit = (data: any) => {
    axios.post("https://api.wineemporium.shop/v1/store/register", data)
      .then(() => {

      }).catch((response) => {
        alert(response.response.data.message)

      })
  }

  return (
    <div style={{ padding: "10px 30px" }}>
      <h1 style={{
        textAlign: "center",
        marginBottom: "40px",
        marginTop: "40px"
      }}>Cadastro</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
        }}>
          <div style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            border: "1px solid black",
            borderRadius: "10px"
          }}>
            <h3>Dados Pessoais</h3>
            <label htmlFor="name">Nome Completo</label>
            <input {...register("name")} />
            {errors.name && <span style={{ color: "red" }}>{errors.name.message}</span>}


            <label htmlFor="email">e-mail</label>
            <input {...register("email")} />
            {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}

            <label htmlFor="birthDate">data de nascimento</label>
            <input type="date" {...register("birthDate")} />
            {errors.birthDate && <span style={{ color: "red" }}>{errors.birthDate.message}</span>}

            <label>genero</label>
            <select {...register("gender")}>
              <option value=""></option>
              <option value="Masculino">Masculino</option>
              <option value="feminino">feminino</option>
              <option value="na">n/a</option>
            </select>
            <label htmlFor="document">CPF</label>
            <input {...register("document")} />
            {errors.document && <span style={{ color: "red" }}>{errors.document.message}</span>}

            <label htmlFor="password">Password</label>
            <input type="password" {...register("password")} />
            {errors.password && <span>{errors.password.message}</span>}


            <label htmlFor="confirm_password">Confirm password</label>
            <input type="password" {...register("confirm_password")} />
            {errors.confirm_password && <span>{errors.confirm_password.message}</span>}
          </div>
          <div style={{
            padding: "20px",
            marginLeft: "30px",
            display: "flex",
            flexDirection: "column",
            border: "1px solid black",
            borderRadius: "10px"
          }}>
            <h3>endereço de faturamento</h3>
            <div>
              <div style={{ paddingTop: "10px", flexDirection: "row", }}>
                <label htmlFor="cep">CEP</label>
                <br />
                <Controller
                  control={control}
                  name={`address.0.cep`}
                  render={({ field }) => (
                    <input  {...register(`address.0.cep`)}
                      onChange={(e) => field.onChange(SetCep(e.target.value))} />
                  )}
                />
                <button style={{ marginLeft: "10px" }} type="button" onClick={consultarCepFaturamento}>checar CEP</button>
                <br />
                <input placeholder="logradouro" {...register(`address.0.logradouro`)}
                  value={addressFaturamento ? addressFaturamento.logradouro : ""}
                />

                <Controller
                  control={control}
                  name={`address.0.complemento`}
                  render={({ field }) => (
                    <input  {...register(`address.0.complemento`)}
                      placeholder="complemento"
                      onChange={(e) => field.onChange(setComplemento(e.target.value))} />
                  )}
                />
                <Controller
                  control={control}
                  name={`address.0.numero`}
                  render={({ field }) => (
                    <input  {...register(`address.0.numero`)}
                      placeholder="numero"
                      onChange={(e) => field.onChange(setNumero(e.target.value))} />
                  )}
                />


                <input value={addressFaturamento ? addressFaturamento.localidade : ""}
                  placeholder="cicdade"
                  {...register(`address.0.cidade`)}
                />
                <input value={addressFaturamento ? addressFaturamento.bairro : ""}
                  placeholder="bairro"
                  {...register(`address.0.bairro`)}
                />
                <input value={addressFaturamento ? addressFaturamento.uf : ""}
                  placeholder="uf"
                  {...register(`address.0.uf`)}
                />

              </div>
            </div>
            <div style={{ marginTop: "30px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <h3>endereço de entrega</h3>
              <div>

                <label > copiar dados de endereço de faturamento</label>
                <input style={{ marginLeft: "10px" }} type="checkbox"
                  onChange={(e) => {

                    setIsSubscribed(e.target.checked);
                    console.log(isSubscribed)

                  }} />

              </div>

            </div>
            <div>

              {isSubscribed ? <div>
                <div style={{ paddingTop: "11px", flexDirection: "row" }}>
                  <label htmlFor="cep">CEP</label>
                  <br />
                  <Controller
                    control={control}
                    name={`address.0.cep`}
                    render={({ field }) => (
                      <input  {...register(`address.1.cep`)}
                        onChange={(e) => field.onChange(SetCep(e.target.value))} />
                    )}
                  />
                  <button style={{ marginLeft: "10px" }} type="button" onClick={consultarCep}>checar CEP</button>
                  <br />
                  <input placeholder="logradouro" {...register(`address.1.logradouro`)}
                    value={addressFaturamento ? addressFaturamento.logradouro : ""}
                  />

                  <input  {...register(`address.1.complemento`)}
                    placeholder="complemento"
                    value={complemento}
                  />
                  <input style={{
                    width: "70px"
                  }}   {...register(`address.1.numero`)}
                    placeholder="numero"
                    value={nuemero}

                  />

                  <input value={addressFaturamento ? addressFaturamento.localidade : ""}
                    placeholder="cicdade"
                    {...register(`address.1.cidade`)}
                  />
                  <input value={addressFaturamento ? addressFaturamento.bairro : ""}
                    placeholder="bairro"
                    {...register(`address.1.bairro`)}
                  />
                  <input value={addressFaturamento ? addressFaturamento.uf : ""}
                    placeholder="uf"
                    {...register(`address.1.uf`)}
                  />

                </div>

              </div> :
                <div>
                  <div style={{ paddingTop: "10px", flexDirection: "row" }}>
                    <label htmlFor="cep">CEP</label>
                    <br />
                    <Controller
                      control={control}
                      name={`address.0.cep`}
                      render={({ field }) => (
                        <input  {...register(`address.1.cep`)}
                          onChange={(e) => field.onChange(SetCep(e.target.value))} />
                      )}
                    />
                    <button style={{ marginLeft: "11px" }} type="button" onClick={consultarCep}>checar CEP</button>
                    <br />
                    <input placeholder="logradouro" {...register(`address.1.logradouro`)}
                      value=""
                    />

                    <input  {...register(`address.1.complemento`)}
                      placeholder="complemento"

                    />
                    <input style={{
                      width: "70px"
                    }}  {...register(`address.1.numero`)}
                      placeholder="numero"

                    />

                    <input value=""
                      placeholder="cicdade"
                      {...register(`address.1.cidade`)}
                    />
                    <input
                      value=""
                      placeholder="bairro"
                      {...register(`address.1.bairro`)}
                    />
                    <input
                      value=""
                      placeholder="uf"
                      {...register(`address.1.uf`)}
                    />

                  </div>
                </div>}

            </div>

            <hr />
            {


              fields.map((campo, index) => {
                if (index <= 1) {
                  return
                }
                return (
                  <div key={campo.id}>
                    <div style={{ paddingTop: "10px", flexDirection: "row" }}>
                      <label htmlFor="cep">CEP</label>
                      <br />
                      <Controller
                        control={control}
                        name={`address.${index}.cep`}
                        render={({ field }) => (
                          <input  {...register(`address.${index}.cep`)}
                            onChange={(e) => field.onChange(SetCep(e.target.value))} />
                        )}
                      />
                      <button style={{ marginLeft: "10px" }} type="button" onClick={consultarCep}>checar CEP</button>
                      <br />
                      <input placeholder="logradouro" {...register(`address.${index}.logradouro`)}
                        value={address ? address.logradouro : ""}
                      />

                      <input  {...register(`address.${index}.complemento`)}
                        placeholder="complemento"

                      />
                      <input style={{
                        width: "70px"
                      }}   {...register(`address.${index}.numero`)}
                        placeholder="numero"
                      />

                      <input value={address ? address.localidade : ""}
                        placeholder="cicdade"
                        {...register(`address.${index}.cidade`)}
                      />
                      <input value={address ? address.bairro : ""}
                        placeholder="bairro"
                        {...register(`address.${index}.bairro`)}
                      />
                      <input value={address ? address.uf : ""}
                        placeholder="uf"
                        {...register(`address.${index}.uf`)}
                      />

                    </div>{
                      index !== 1 && <button onClick={() => {
                        remove(index)
                      }} type="button">remover</button>
                    }
                    <hr />
                  </div>
                )
              })
            }

            <button type="button" onClick={() => {
              if (fields.length <= 3) {
                append({
                  cep: "",
                  logradouro: "",
                  complemento: "",
                  numero: "",
                  cidade: "",
                  bairro: "",
                  uf: "",
                  faturamento: false,
                  principal: false
                })
              } else {
                alert("numero maximo de endereços atingido")
              }

            }}>+</button>

          </div>
        </div>
        <button type="submit" style={{ marginTop: "20px" }}>Submit</button>

      </form >
    </div>
  );
}

