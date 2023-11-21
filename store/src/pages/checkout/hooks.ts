import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../config/routes";
import useStore from "../../zustand/store";

type Step = {
    label: string,
    completed: boolean,
    selectable: boolean,
}

let steps: Step[] = [
    {
        label: "Carrinho",
        completed: false,
        selectable: true,
    },
    {
        label: "Forma de Pagamento",
        completed: false,
        selectable: true,
    },
    {
        label: "Finalizar",
        completed: false,
        selectable: true,
    }
]

export default function useCheckout() {
    const { checkoutApi } = useStore()
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        checkoutApi.start().then((c) => {
            switch (c.status) {
                case 'ENDERECO_PENDENTE':
                    setActiveStep(0); break;
                case 'ENTREGADOR_PENDENTE':
                    setActiveStep(0); break;
                case 'METODO_DE_PAGAMENTO_PENDENTE':
                    const newSteps = [...steps];
                    newSteps[0].completed = true;
                    setActiveStep(1); break;
                case 'AGUARDANDO_PAGAMENTO':
                    const newSteps2 = [...steps];
                    newSteps2[0].completed = true;
                    newSteps2[1].completed = true;
                    setActiveStep(2); break;
            }
            setIsLoading(false)
        })
    }, [checkoutApi])

    const handleNext = () => {
        const newSteps: Step[] = [...steps];
        const nextStep = activeStep + 1;
        switch (nextStep) {
            case 1:
                newSteps[activeStep].completed = true;
                newSteps[nextStep].completed = false;
                setActiveStep(nextStep);
                break;
            case 2:
                newSteps[activeStep].completed = true;
                setActiveStep(nextStep);
                break;
        }
        steps = newSteps;
    }
    const handleStep = (step: Step) => () => {
        if (step.selectable) {
            setActiveStep(steps.indexOf(step));
        }
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    function goHome() {
        navigate(routes.LOGIN)
    }

    return {
        isLoading,
        activeStep,
        steps,
        handleNext,
        handleStep,
        handleBack,
        goHome,
    }
};
