import React, { useEffect } from "react";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import useStore from "../../../zustand/store";
import { Client } from "../../../zustand/types";

type AvatarProps = {
    handleOpenUserMenu: (event: any) => void
}

export default function AvatarWE({ handleOpenUserMenu }: AvatarProps) {
    const { isLoggedIn, authApi } = useStore()
    let userData: Client = {} as Client;

    useEffect(() => {
        if (isLoggedIn) {
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

                // src="/static/images/avatar/2.jpg"
                />
            </IconButton>
        </Tooltip>
    )
};
