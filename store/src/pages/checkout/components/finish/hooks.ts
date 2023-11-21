interface useCheckoutFinishProps {
    handleNext: () => void
}

export default function useCheckoutFinish(props: useCheckoutFinishProps) {

    function onSubmit(e: any) {
        if (e.preventDefault) e.preventDefault()
    }

    return {
        onSubmit,
    }
};
