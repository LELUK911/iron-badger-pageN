import { useState } from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export const IronEcosistemCollaps = ({ list, title }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative inline-block text-left"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button className="px-4 py-2 text-white rounded-lg font-bold hover:bg-slate-700">
                {title}
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 w-48 bg-slate-900 rounded-lg shadow-lg border border-gray-700 z-50">
                    <ul className="py-2">
                        {list.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.path}
                                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors duration-200 font-semibold"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
