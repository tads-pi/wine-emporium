import React from "react"
import { Outlet } from "react-router-dom"
import ProfileWE from "../.."

export default function ProfileWEBanner() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100vh',

            gap: '1rem',
            padding: '2rem',

            // border: '1px solid green'
        }}>
            <ProfileWE />
            <Outlet />
        </div>
    )
}