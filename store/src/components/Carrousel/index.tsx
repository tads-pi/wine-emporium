import React from 'react';
import { Slider } from '../Slider';
import { Product } from '../../zustand/types';
import { Skeleton } from '@mui/material';
import Loading from '../loading';

type CarrouselProps = {
    products: Product[] | null
}

export default function Carrousel({ products }: CarrouselProps) {
    return (
        <>
            {
                products && products.length > 0
                    ?
                    <Slider data={products} />
                    :
                    <div style={{
                        display: 'grid'
                    }}>
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            height: '300px',
                            gridArea: '1 / 1'
                        }}>
                            <Loading color='inherit' />
                        </div>
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            height: '300px',
                            gridArea: '1 / 1'
                        }}>
                            <Skeleton
                                animation="wave"
                                variant="rectangular"
                                width={'100%'}
                                height={300}
                            />
                        </div>
                    </div >
            }
        </>
    )
}