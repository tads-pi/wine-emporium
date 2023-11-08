import React from 'react';
import { Slider } from '../Slider';
import { Product } from '../../zustand/types';

type CarrouselProps = {
    products: Product[] | null
}

export default function Carrousel({ products }: CarrouselProps) {
    return (
        <>
            {
                products &&
                <Slider data={products} />
            }
        </>
    )
}