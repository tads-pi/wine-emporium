import { useEffect, useState } from "react"
import useStore from "../../../zustand/store"
import { Gender } from "../../../zustand/types"

export default function useRegisterWEAutofill() {
    const {
        genderApi,
        addressApi,
    } = useStore()

    const [genders, setGenders] = useState<Gender[] | null>(null)
    useEffect(() => {
        genderApi.getGenderOptions().then(setGenders)
    }, [genderApi])

    return {
        genders,
    }
};
