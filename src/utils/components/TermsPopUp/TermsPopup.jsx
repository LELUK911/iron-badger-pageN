import { useEffect, useRef, useState } from "react";
import { TermsOfUse } from "../../../documentationPage/components/termOfUse/TermOfUseDoc";

export const TermsPopup = ({ onAccept }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [canAccept, setCanAccept] = useState(false);
    const termsRef = useRef(null);

    useEffect(() => {
        const termsAccepted = localStorage.getItem("termsAccepted");
        if (!termsAccepted) {
            setIsVisible(true);
        }
    }, []);

    const handleScroll = () => {
        const div = termsRef.current;
        if (div) {
            const { scrollTop, scrollHeight, clientHeight } = div;
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                setCanAccept(true);
            }
        }
    };

    const acceptTerms = () => {
        localStorage.setItem("termsAccepted", "true");
        setIsVisible(false);
        if (onAccept) onAccept();
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-slate-800 text-white p-6 rounded-lg w-11/12 md:w-3/4 lg:w-2/3 max-h-[80vh] flex flex-col">
                <h2 className="text-2xl font-bold mb-4">Terms of Use</h2>
                <div
                    ref={termsRef}
                    onScroll={handleScroll}
                    className="overflow-y-auto p-4 bg-slate-700 rounded mb-4"
                    style={{ maxHeight: "50vh" }}
                >
                    <TermsOfUse />
                </div>

                <button
                    onClick={acceptTerms}
                    disabled={!canAccept}
                    className={`w-full py-3 rounded-lg font-bold transition ${canAccept
                            ? "bg-green-500 hover:bg-green-600 cursor-pointer"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                >
                    Accept Terms
                </button>
            </div>
        </div>
    );
};
