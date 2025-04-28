import { useState } from "react";

export const FeedbackDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 text-white  rounded-lg transition"
            >
                📝 Feedback
                <span className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}>
                    ▼
                </span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                    <ul className="py-2">
                        <li>
                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLSesPiWgyJMeksNgbS6QYVIgKm11zbjEVf5ZbF_Zhte4zlWlig/viewform?usp=dialog"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2 hover:bg-gray-100"
                            >
                                🖥️ Website Feedback
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLSfejZUZMNxYvgsIQw6Aut8iQUTwt3ZQpHypuAds1Vmzd60ffg/viewform?usp=dialog"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2 hover:bg-gray-100"
                            >
                                ⛓️ Smart Contracts Feedback
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLSfnms17YBMB7HGYv4t90DVr8rbnRIKFGDbBp7SsHOvGMiueTw/viewform?usp=dialog"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2 hover:bg-gray-100"
                            >
                                🐛 Bugs & Issues
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

