import { useEffect, useState } from "react";
import { setApprovalPact } from "../../../utils/BlockchainOperation/IronPactOp";
import { ironFallAddress, newDownAuctionPact } from "../../../utils/BlockchainOperation/IronFall";
import { useEthersSigner } from "../../../utils/helper/ClientToSigner";
import { calculateSecondToDay, NumConvBig } from "../../../utils/helper/helper";

export const NewDownwardAuctionWizardModal = ({ onClose, id, amount, authPact }) => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        sellId: "",
        amount: "",
        startPrice: "",
        duration: "",
        dropTolerance: ""
    });

    const signer = useEthersSigner();

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
        },
        {
            label: "Drop Tolerance",
            placeholder: "Enter percentage (e.g. 0.15)",
            key: "dropTolerance",
            description: "This sets the maximum percentage price drop allowed during the auction."
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
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [current.key]: e.target.value });
    };

    const newAuctionOp = async () => {
        try {
            if (!authPact) {
                await setApprovalPact(ironFallAddress, true, signer);
                alert(`Approval tx submited`);
            }
            await newDownAuctionPact(
                formData.sellId,
                formData.amount,
                NumConvBig(formData.startPrice),
                calculateSecondToDay(formData.duration),
                (formData.dropTolerance * 100).toString(),
                signer
            );
            alert(`New Downward Auction tx submited`);
        } catch (error) {
            console.error(error);
            alert("Transaction failed! Check console for details.");
        }
    };

    const handleNext = async () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            await newAuctionOp();
            onClose();
        }
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-full max-w-md p-6 bg-slate-900 rounded-lg border border-gray-700 text-white shadow-lg relative">
                <h2 className="text-xl font-semibold text-center mb-6">Create New Downward Auction</h2>

                {/* Progress Bar */}
                <div className="relative h-2 w-full bg-gray-700 rounded-full overflow-hidden mb-6">
                    <div
                        className="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-500"
                        style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                    ></div>
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-semibold text-orange-400 mb-1">
                        {current.label}
                    </label>
                    <p className="text-sm text-gray-400 mb-3 italic leading-snug">
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
