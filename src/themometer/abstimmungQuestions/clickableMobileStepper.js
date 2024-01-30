import React from 'react';
import { Stack, styled } from '@mui/material';
const ClickableMobileStepper = ({ activeStep, steps, color }) => {
    return (
        <StepsContainer>
            {Array.from(Array(steps).keys()).map(step => (
                <Step key={step} active={activeStep === step} color={color(step)} />

            ))}
        </StepsContainer>
    );
}

export default ClickableMobileStepper;

const StepsContainer = styled(Stack)(({ theme }) => ({
    backgroundColor: 'transparent',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: theme.spacing(0.5),
    padding: theme.spacing(1),
}));

const Step = styled('button')(({ color }) => ({
    height: '16px',
    width: '16px',
    borderRadius: '50%',
    backgroundColor: color,
    cursor: 'default',
    border: 'none',
}));