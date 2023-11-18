import React, { useEffect } from "react";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import useStore from "../../../zustand/store";
import { Client } from "../../../zustand/types";

type AvatarProps = {
    handleOpenUserMenu: (event: any) => void
}

export default function AvatarWE({ handleOpenUserMenu }: AvatarProps) {
    const { authApi } = useStore()
    let userData: Client = {} as Client;

    useEffect(() => {
        if (authApi.isLoggedIn) {
            authApi.getMe()
                .then((user) => {
                    userData = user
                })
        }
    }, [])

    return (
        <Tooltip title="Abrir configurações">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                    alt={userData?.name}
                />
            </IconButton>
        </Tooltip>
    )
};
