import React from 'react'

const AuthenticationInput = ({ name, label, onChange, value, type }) => {
    return (
        <div className="input-box">
            <label htmlFor={name}>{label || name}</label>
            <input type={type}
                className="btn transparentInDark"
                id={name} name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default AuthenticationInput
