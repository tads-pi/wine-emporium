import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { routes } from "../../../config/routes";

type Step = {
    label: string,
    completed: boolean,
    selectable: boolean,
}

let steps: Step[] = [
    {
        label: "Dados Pessoais",
        completed: false,
        selectable: true,
    },
    {
        label: "Dados de Login",
        completed: false,
        selectable: false,
    },
    {
        label: "Endereços",
        completed: false,
        selectable: false,
    }
]

export default function useRegisterWE() {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        const newSteps: Step[] = [...steps];
        const nextStep = activeStep + 1;
        switch (nextStep) {
            case 1:
                newSteps[activeStep].completed = true;
                newSteps[activeStep].selectable = true;

                newSteps[nextStep].completed = false;
                newSteps[nextStep].selectable = true;
                setActiveStep(nextStep);
                break;
            case 2:
                // desabilita selecao dos passos anteriores
                newSteps[activeStep - 1].selectable = false;
                newSteps[activeStep].selectable = false;
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

    function goHome() {
        navigate(routes.LOGIN)
    }

    return {
        activeStep,
        steps,
        handleNext,
        handleStep,
        goHome,
    }
};
