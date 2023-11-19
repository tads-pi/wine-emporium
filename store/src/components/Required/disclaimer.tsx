import React from "react"
import Required from "."

export default function RequiredDisclaimer() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '0.25rem',
        }}>
            <Required />
            <p
                style={{
                    fontSize: '0.75rem',
                    color: 'gray',
                }}
            >indica que o campo é obrigatório</p>
        </div>
    )
};
