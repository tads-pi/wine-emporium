import { IsEnum, IsNotEmpty, IsString } from "class-validator"

export type CheckoutViewmodelStatus = "ENDERECO_PENDENTE" | "ENTREGADOR_PENDENTE" | "METODO_DE_PAGAMENTO_PENDENTE" | "AGUARDANDO_PAGAMENTO" | "PAGAMENTO_COM_SUCESSO" | "PAGAMENTO_REJEITADO" | "AGUARDANDO_RETIRADA" | "EM_TRANSITO" | "ENTREGUE" | "CANCELADO"

export class UpdateCheckoutStatusDTO {
    @IsString()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsNotEmpty()
    @IsEnum(["ENDERECO_PENDENTE", "ENTREGADOR_PENDENTE", "METODO_DE_PAGAMENTO_PENDENTE", "AGUARDANDO_PAGAMENTO", "PAGAMENTO_COM_SUCESSO", "PAGAMENTO_REJEITADO", "AGUARDANDO_RETIRADA", "EM_TRANSITO", "ENTREGUE", "CANCELADO"])
    status: CheckoutViewmodelStatus
}