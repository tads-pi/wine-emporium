import React, { useEffect, useState } from "react"
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Rating, Slider, SliderThumb, Typography, styled } from '@mui/material';
import useStore from "../../../../zustand/store";
import { ListProductsParams, ProductTotals } from "../../../../zustand/types";
import Loading from "../../../../components/loading";

interface FilterWrapperProps {
    fetchProducts: (input: ListProductsParams) => void
}

export default function FilterWrapper(props: FilterWrapperProps) {
    const { productApi } = useStore()
    const [totals, setTotals] = useState<ProductTotals | null>(null)

    useEffect(() => {
        productApi.totals().then(setTotals)
    }, [productApi])

    type Slice = {
        min: number,
        max: number,
    }

    function getSlices(): Slice[] {
        const slices: Slice[] = [{ min: 0, max: 0 }]
        if (totals) {
            const parts = 6
            const sliceSize = totals.mostExpensive / parts;

            for (let i = 1; i < parts - 1; i++) {
                slices.push({
                    min: sliceSize * (i - 1),
                    max: sliceSize * (i),
                })
            }

            slices.push({
                min: sliceSize * (parts - 2),
                max: 0,
            })
        }
        return slices
    }

    // Filter handler
    const [input, setInput] = useState({
        category: 'TODOS',
        ratingsFrom: 1,
        ratingsTo: 5,
        priceFrom: 0,
        priceTo: 0,
    })
    function handleUpdateCategory(event: React.ChangeEvent<HTMLInputElement>) {
        const value = (event.target as HTMLInputElement).value
        setInput({
            ...input,
            category: value,
        })
    }

    function handleUpdatePrice(event: React.ChangeEvent<HTMLInputElement>) {
        const value = (event.target as HTMLInputElement).value
        const [min, max] = value.split(':')
        setInput({
            ...input,
            priceFrom: Number(min),
            priceTo: Number(max),
        })
    }

    useEffect(() => {
        let timeoutId: number;

        timeoutId = setTimeout(() => {
            props.fetchProducts(input)
        }, 1000)

        return () => clearTimeout(timeoutId)
    }, [input])

    return (
        <>
            {
                totals ?
                    <div>
                        <Typography
                            variant="h5"
                            component="span"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                padding: '0.25rem',
                                fontFamily: 'Roboto',
                            }}
                        >
                            Filtros
                        </Typography>

                        <div>
                            <FormControl sx={{ padding: '0.25rem', width: '100%' }} component="fieldset" variant="standard">
                                <FormLabel component="legend">Categoria</FormLabel>
                                <RadioGroup
                                    aria-labelledby="category-radio-group"
                                    name="category-radio-buttons-group"
                                    value={input.category}
                                    onChange={handleUpdateCategory}
                                >
                                    <FormControlLabel value="TODOS" control={<Radio color='error' />} label="Todos" />
                                    <FormControlLabel value="VINHOS" control={<Radio />} label="Vinhos" />
                                    <FormControlLabel value="UTILITARIOS" control={<Radio />} label="Utilitários" />
                                    <FormControlLabel value="OUTROS" control={<Radio />} label="Outros" />
                                </RadioGroup>
                            </FormControl>
                        </div >
                        <div>
                            <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                <FormLabel component="legend">Avaliação</FormLabel>
                                <FormGroup>
                                    <Rating
                                        name="ratings-filter"
                                        value={input.ratingsFrom}
                                        precision={1}
                                        size='medium'
                                        onChange={(e, newValue) => {
                                            setInput({
                                                ...input,
                                                ratingsFrom: newValue as number,
                                            })
                                        }}
                                    />
                                </FormGroup>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                                <FormLabel component="legend">Preço</FormLabel>
                                <RadioGroup
                                    aria-labelledby="price-radio-group"
                                    name="price-radio-buttons-group"
                                    value={`${Number(input.priceFrom).toFixed(2)}:${Number(input.priceTo).toFixed(2)}`}
                                    onChange={handleUpdatePrice}
                                >
                                    {
                                        getSlices().map((slice, i) => {
                                            const min = Math.floor(slice.min).toFixed(2)
                                            const max = Math.floor(slice.max).toFixed(2)
                                            return (
                                                <FormControlLabel
                                                    key={i}
                                                    control={<Radio color={Number(max) === 0 ? 'error' : 'info'} />}
                                                    value={`${min}:${max}`}
                                                    label={
                                                        <Typography variant="body2" color="text.secondary">
                                                            {
                                                                (
                                                                    () => {
                                                                        switch (i) {
                                                                            case 0: return <>{`Todos`}</>
                                                                            case 1: return <>{`Até R$${max}`}</>
                                                                            case 5: return <>{`Maior que R$${min}`}</>
                                                                            default: return <>{`R$${min}-R$${max}`}</>
                                                                        }
                                                                    }
                                                                )()
                                                            }
                                                        </Typography>
                                                    }
                                                />
                                            )
                                        })
                                    }
                                </RadioGroup>

                            </FormControl>
                        </div>
                    </div >
                    : <Loading />
            }
        </>
    )
}
