import { useState } from "react";
import tokenList from '../../../../utils/Information/tokenList.json';

// eslint-disable-next-line react/prop-types
export const OptionTokenListBox = ({ onChange, label }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const filteredTokens = tokenList.filter(token =>
        token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isValidAddress = (input) => {
        return input.startsWith("0x") && input.length === 42;
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        setShowDropdown(true); 

        // Se l'indirizzo è valido, restituiscilo tramite onChange
        if (isValidAddress(value)) {
            onChange(value);
        } else {
            onChange(''); 
        }
    };

    const handleSelectToken = (tokenAddress) => {
        setSearchTerm(tokenAddress);
        onChange(tokenAddress);
        setShowDropdown(false); 
    };

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-300" htmlFor="token-search">
                {label}
            </label>
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search by token name or address..."
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-500"
                onFocus={() => setShowDropdown(true)} 
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)} 
            />

            {/* Dropdown dei token filtrati */}
            {showDropdown && filteredTokens.length > 0 && (
                <div className="absolute z-10 w-full mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredTokens.map(({ address, name }) => (
                        <div
                            key={address}
                            className="px-4 py-2 hover:bg-gray-800 cursor-pointer text-gray-100"
                            onMouseDown={() => handleSelectToken(address)} // Usa onMouseDown per evitare conflitti con onBlur
                        >
                            {name} <span className="text-gray-400 text-sm">({address})</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Mostra un messaggio se non ci sono risultati */}
            {showDropdown && searchTerm && filteredTokens.length === 0 && (
                <div className="absolute z-10 w-full mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg px-4 py-2 text-gray-400">
                    No tokens found.
                </div>
            )}
        </div>
    );
};