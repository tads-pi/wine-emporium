import { Container } from '@mui/material'
import React, { PropsWithChildren } from 'react'
import Loading from '../../../../components/loading'

type ProfileWEContainer = PropsWithChildren<{
    isLoading?: boolean
    shouldShowLoading?: boolean
}>

export default function ProfileWEContainer({ isLoading = false, shouldShowLoading = false, children }: ProfileWEContainer) {
    return (
        <Container
            maxWidth="md"
            style={{
                height: '100%',
            }}
        >
            {
                isLoading || shouldShowLoading ?
                    <Loading />
                    : children
            }
        </Container>
    )
};
