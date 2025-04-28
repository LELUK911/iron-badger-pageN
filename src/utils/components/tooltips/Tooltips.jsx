import React, { useState, useRef, useEffect } from "react";

export const Tooltips = ({ information }) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const tooltipRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
                setTooltipVisible(false);
            }
        };


        if (isTooltipVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isTooltipVisible]);

    return (
        <section className="flex justify-center items-center shadow-lg">
            <div
                className="group flex justify-center transition-all rounded-full p-1 relative"
                ref={tooltipRef}
            >
                <label
                    className="text-white text-sm"
                    onClick={() => setTooltipVisible(!isTooltipVisible)}
                    aria-label="Mostra informazioni"
                >
                    ?
                </label>
                {isTooltipVisible && (
                    <span
                        className="absolute bg-slate-900 p-4 w-72 text-white opacity-100 -translate-y-7 duration-700 text-sm max-w-xs break-words whitespace-normal z-50"
                        style={{ top: "100%", left: "50%", transform: "translateX(-50%)" }}
                    >
                        {information ? information : ""}
                    </span>
                )}
            </div>
        </section>
    );
};