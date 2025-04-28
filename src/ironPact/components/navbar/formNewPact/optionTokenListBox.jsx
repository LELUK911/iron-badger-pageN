// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import tokenList from '../../information/tokenList.json'


// eslint-disable-next-line react/prop-types
export const OptionTokenListBox = ({ onChange, label }) => {
    const [selectToken, setSelectToken] = useState('')

    const handleSelectChange = (event) => {
        const selectedAddress = event.target.value;
        setSelectToken(selectedAddress)
        onChange(selectedAddress)
    }
    return (
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="debtor">
                {label}
            </label>
            <select
                value={selectToken}
                onChange={handleSelectChange}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-500"
            >
                <option value='' disabled>
                    0x
                </option>
                {tokenList.map((item, index) => {return(
                    <option value={item.address} key={index}>
                        {item.name}
                    </option>)
                })}
            </select>
        </div>
    )
}
