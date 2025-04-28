import { useState } from 'react'

export const CollapsobleMenuIronEcosistem = () => {
    const listEcosistem = [
        { name: "Badger Brotherhood", path: "/" },
        { name: "Iron Pact", path: "/app.ironPact" },
        { name: "Iron Forge", path: "/app.ironForge" },
        { name: "Iron Rise", path: "/app.ironRise" },
        { name: "Iron Fall", path: "/app.ironfall" },
    ];

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative inline-block text-left z-50"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button className="px-4 py-2 text-white rounded-lg font-bold hover:bg-slate-700">
                Ecosystem
            </button>

            {isOpen && (
                <div className="absolute left-0 w-48 bg-slate-900 rounded-lg shadow-lg border border-gray-700 z-50">
                    <ul className="py-2">
                        {listEcosistem.map((item, index) => (
                            <li key={index}>
                                <a
                                    href={item.path}
                                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors duration-200"
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );

}
