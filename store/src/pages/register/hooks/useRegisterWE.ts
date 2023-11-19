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
        newSteps[activeStep].completed = true;
        newSteps[activeStep].selectable = false;
        steps = newSteps;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
