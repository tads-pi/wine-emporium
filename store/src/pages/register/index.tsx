import React, { useEffect, useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import PersonalInfo from './components/personalInfo';
import LoginInfo from './components/loginInfo';
import AddressInfo from './components/addressInfo';
import useRegisterWE from './hooks/useRegisterWE';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button } from '@mui/material';

export default function RegisterWE() {
    const {
        activeStep,
        steps,
        handleStep,
        handleNext,
        goHome,
    } = useRegisterWE()

    const [currentStepComponent, setCurrentStepComponent] = useState<React.JSX.Element | null>(null);
    useEffect(() => {
        setCurrentStepComponent(
            getCurrentStepComponent(activeStep, handleNext)
        )
    }, [activeStep])

    return (
        <div style={{
            width: '100%',
            height: '100vh',
            // border: '1px solid red'
        }}>
            <div style={{
                margin: '2rem 5rem',
            }}>
                <div>
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((step, i) => (
                            <Step key={i} completed={step.completed}>
                                <StepButton
                                    color="inherit"
                                    onClick={handleStep(step)}
                                >
                                    {step.label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                </div>

                {currentStepComponent}

                {
                    activeStep === 0 &&
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        marginTop: '2rem',
                    }}>
                        <Button
                            onClick={goHome}
                            variant="outlined"
                            color="inherit"
                            size="large"
                        >
                            <ArrowBackIosIcon />
                            Voltar
                        </Button>
                    </div>
                }
            </div>
        </div >
    );
};

function getCurrentStepComponent(activeStep: number, handleNext: () => void): React.JSX.Element {
    switch (activeStep) {
        case 0:
            return (
                <StepWrapper>
                    <PersonalInfo
                        handleNext={handleNext}
                    />
                </StepWrapper>
            )
        case 1:
            return (
                <StepWrapper>
                    <LoginInfo />
                </StepWrapper>
            )
        case 2:
            return (
                <StepWrapper>
                    <AddressInfo />
                </StepWrapper>
            )
    }

    return <div>Erro</div>
}

function StepWrapper(props: any) {
    return (
        <div style={{
            padding: '2rem',
            // border: '1px solid green'
        }}>
            {props.children}
        </div>
    )
}