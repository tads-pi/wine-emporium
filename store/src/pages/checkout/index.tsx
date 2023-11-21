import React, { useEffect, useState } from "react";
import useCheckout from "./hooks";
import { Button, Step, StepButton, Stepper } from "@mui/material";
import CheckoutCart from "./components/cart";
import CheckoutDeliveryAddress from "./components/deliveryAddress";
import CheckoutPaymentMethod from "./components/paymentMethod";
import CheckoutResume from "./components/resume";
import CheckoutFinish from "./components/finish";
import './styles.css'

export default function Checkout() {
    const {
        activeStep,
        steps,
        handleStep,
        handleNext,
        goHome,
    } = useCheckout()

    const [currentStepComponent, setCurrentStepComponent] = useState<React.JSX.Element | null>(null);
    useEffect(() => {
        setCurrentStepComponent(
            getCurrentStepComponent(activeStep, handleNext, goHome)
        )
    }, [activeStep])

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            // height: '100vh',
            // border: '1px solid red'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                paddingTop: '2rem',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{
                    display: 'flex',
                    width: 'min(60ch, 100%)',
                    overflowX: 'scroll',
                    overflowY: 'hidden',
                }}>
                    <Stepper nonLinear activeStep={activeStep}>
                        {
                            steps.map((step, i) => (
                                <Step key={i} completed={step.completed}>
                                    <StepButton
                                        color="inherit"
                                        onClick={handleStep(step)}
                                    >
                                        {step.label}
                                    </StepButton>
                                </Step>
                            ))
                        }
                    </Stepper>
                </div>

                {currentStepComponent}
            </div>
        </div >
    )
}


function getCurrentStepComponent(
    activeStep: number,
    handleNext: () => void,
    goHome: () => void,
): React.JSX.Element {
    switch (activeStep) {
        case 0:
            return (
                <StepWrapper>
                    <CheckoutCart
                        handleNext={handleNext}
                        goHome={goHome}
                    />
                </StepWrapper>
            )
        case 1:
            return (
                <StepWrapper>
                    <CheckoutDeliveryAddress
                        handleNext={handleNext}
                        goHome={goHome}
                    />
                </StepWrapper>
            )
        case 2:
            return (
                <StepWrapper>
                    <CheckoutPaymentMethod
                        handleNext={handleNext}
                        goHome={goHome}
                    />
                </StepWrapper>
            )
        case 3:
            return (
                <StepWrapper>
                    <CheckoutResume
                        handleNext={handleNext}
                        goHome={goHome}
                    />
                </StepWrapper>
            )
        case 4:
            return (
                <StepWrapper>
                    <CheckoutFinish
                        handleNext={handleNext}
                        goHome={goHome}
                    />
                </StepWrapper>
            )
    }

    return <div>
        <Button
            variant="contained"
            color="primary"
            onClick={goHome}
        >
            Voltar para Loja
        </Button>
    </div>
}

function StepWrapper(props: any) {
    return (
        <div style={{
            padding: '2rem 1rem',
            // border: '1px solid purple'
        }}>
            {props.children}
        </div>
    )
}