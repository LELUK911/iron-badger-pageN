import { useState } from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export const IronEcosistemCollaps = ({ list, title }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block" onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <button className="font-semibold">
                {title}
            </button>
            {isOpen && (
                <div
                className="
        absolute 
        top-full 
        left-[-4rem]
        bg-slate-800 
        px-4 py-2
        border border-slate-700
        rounded-md
        shadow-lg
        z-10
        "
                >
                    {list.map((item, index) => (
                        <div key={index} className="p-2 h-12 w-40  flex items-center justify-center">
                            <Link to={item.path} className="text-white hover:text-yellow-400 space-x-2">
                                <span>{item.name}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}