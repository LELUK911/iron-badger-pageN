import { useEffect, useState } from "react";

export const NewAuctionWizardModal = ({ onClose, onSubmit, id, amount }) => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        sellId: "",
        amount: "",
        startPrice: "",
        duration: "",
    });

    const steps = [
        {
            label: "Pact ID",
            placeholder: "Enter Pact ID",
            key: "sellId",
            description: "This is the ID of the pact you want to auction. It uniquely identifies your tokenized agreement."
        },
        {
            label: "Amount",
            placeholder: "Amount",
            key: "amount",
            description: "Enter how many units of the selected pact you want to sell in the auction."
        },
        {
            label: "Starting Price",
            placeholder: "0 mdai",
            key: "startPrice",
            description: "Set the minimum price you’re willing to accept to start the auction. Bids will start from here."
        },
        {
            label: "Auction Duration (days)",
            placeholder: "e.g. 5",
            key: "duration",
            description: "Specify how long the auction will remain open, in days."
        }
    ];


    const current = steps[step];

    useEffect(() => {
        if (id) {
            setFormData((prev) => ({ ...prev, sellId: id }));
        }
        if (amount) {
            setFormData((prev) => ({ ...prev, amount: amount }));
        }
    }, [])



    const handleChange = (e) => {
        setFormData({ ...formData, [current.key]: e.target.value });
    };

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            onSubmit(formData);
            onClose();
        }
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-full max-w-md p-6 bg-slate-900 rounded-lg border border-gray-700 text-white shadow-lg">
                <h2 className="text-xl font-semibold text-center mb-6">Create New Auction</h2>

                <div className="mb-4">
                    <label className="block text-lg font-semibold text-orange-400 mb-1">
                        {current.label}
                    </label>
                    <p className="text-sm text-gray-400 mb-3 italic">
                        {current.description}
                    </p>
                    <input
                        type="number"
                        placeholder={current.placeholder}
                        value={formData[current.key]}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                    />
                </div>


                <div className="flex justify-between mt-4">
                    <button
                        onClick={handleBack}
                        disabled={step === 0}
                        className="px-4 py-2 bg-red-700 text-sm rounded-lg hover:bg-red-600 disabled:opacity-30"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleNext}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-sm font-bold rounded-lg shadow-md transition-all"
                    >
                        {step === steps.length - 1 ? "Submit" : "Next"}
                    </button>
                </div>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg font-bold"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};
