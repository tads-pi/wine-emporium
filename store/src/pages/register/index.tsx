import React, { useEffect, useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import PersonalInfo from './components/personalInfo';
import LoginInfo from './components/loginInfo';
import AddressInfo from './components/addressInfo';
import useRegisterWE from './hooks/useRegisterWE';

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
                width: 'min(60ch, 100%)',
                height: '100%',
                paddingTop: '2rem',
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
            </div>
        </div >
    );
};

function getCurrentStepComponent(
    activeStep: number,
    handleNext: () => void,
    goHome: () => void,
): React.JSX.Element {
    switch (activeStep) {
        case 0:
            return (
                <StepWrapper>
                    <PersonalInfo
                        handleNext={handleNext}
                        goHome={goHome}
                    />
                </StepWrapper>
            )
        case 1:
            return (
                <StepWrapper>
                    <LoginInfo
                        handleNext={handleNext}
                    />
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
            padding: '2rem 1rem',
            // border: '1px solid purple'
        }}>
            {props.children}
        </div>
    )
}