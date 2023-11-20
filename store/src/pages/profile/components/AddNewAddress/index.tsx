import React from "react"
import ProfileWEContainer from "../Container"
import useProfileWEAddressAddNewAddress from "./hooks"
import AddNewAddress from "../../../../components/AddNewAddress"
import Loading from "../../../../components/loading"

export default function ProfileWEAddressAddNewAddress() {
    const {
        isLoading,
        onSubmit,
    } = useProfileWEAddressAddNewAddress()

    return (
        <ProfileWEContainer>
            {
                isLoading ? <Loading /> :
                    <AddNewAddress
                        onSubmit={onSubmit}
                        submitText="Salvar Endereço"
                    />
            }
        </ProfileWEContainer >
    )
};