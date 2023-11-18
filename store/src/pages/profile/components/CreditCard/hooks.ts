import { useEffect, useState } from "react";
import { CreditCard } from "../../../../zustand/types";
import useStore from "../../../../zustand/store";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../config/routes";
import { useSnackbar } from "notistack";

export default function useProfileWECreditCard() {
    const { paymentApi } = useStore();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [creditCards, setCreditCards] = useState<CreditCard[] | null>(null)
    useEffect(() => {
        paymentApi.listCreditCards().then(setCreditCards)
    }, [paymentApi])

    function goToAddNewCreditCard() {
        navigate(routes.ACCOUNT_CREDIT_CARD_NEW_CARD)
    }

    function deleteCreditCard(card: CreditCard) {
        const ok = confirm("Tem certeza que deseja deletar esse endereço?") &&
            paymentApi.deleteCreditCard(card.id).then(() => {
                setCreditCards(creditCards?.filter(c => c.id !== card.id) ?? null)

                enqueueSnackbar(
                    'Cartão de Crédito deletado com sucesso!',
                    { variant: 'success' },
                )
            })
    }

    return {
        creditCards,
        goToAddNewCreditCard,
        deleteCreditCard,
    }
};
