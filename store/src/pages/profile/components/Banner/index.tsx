import React from "react"
import { Outlet } from "react-router-dom"
import ProfileWE from "../.."

export default function ProfileWEBanner() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: window.innerWidth > 600 ? 'row' : 'column',
            width: '100%',
            height: '100vh',

            gap: '1rem',
            padding: window.innerWidth > 600 ? '2rem' : '0.25rem',
        }}>
            <ProfileWE />
            <Outlet />
        </div>
    )
}