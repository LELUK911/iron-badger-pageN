import { Link } from 'react-router-dom';
import { NewPactForm } from './components/NewPactForm/NewPactForm';
import { FaPlus, FaCheckCircle, FaUsers, FaGavel, FaCoins } from 'react-icons/fa';

export default function BodyNewPact() {


    return (
        <div className="flex flex-col justify-center p-8 ">
            <h1 className='text-6xl text-center font-bold text-white'>New Pact Section</h1>
            <div className="w-full max-w-4xl 0 p-8 rounded-lg shadow-lg space-y-6">
                <h4 className="text-2xl font-semibold text-yellow-300 mb-4 border-b border-gray-700 pb-2">
                    Pact Lifecycle Instructions
                </h4>

                <ul className="space-y-5 text-gray-200 text-lg">
                    <li className="flex items-start space-x-3">
                        <FaPlus className="text-blue-400 mt-1" />
                        <span>Create a new pact by filling out the form below.</span>
                    </li>

                    <li className="flex items-start space-x-3">
                        <FaCheckCircle className="text-green-400 mt-1" />
                        <span>Admins can view your Pact in the dashboard, inside the Pact Card.</span>
                    </li>

                    <li className="flex items-start space-x-3">
                        <FaUsers className="text-yellow-400 mt-1" />
                        <span>
                            Once minted, your Pacts will appear in the {' '}
                            <Link to="/app.ironPact/wallet" className="underline text-blue-400 hover:text-blue-300 font-semibold">
                                Wallet section
                            </Link>
                            .
                        </span>
                    </li>

                    <li className="flex items-start space-x-3">
                        <FaGavel className="text-red-400 mt-1" />
                        <div className="space-y-1">
                            <span>Manage your minted Pacts by depositing time tokens for rewards and repayments.
                                You can also withdraw your collateral after expiration (15 days, or 90 days in case of liquidation).</span>

                        </div>
                    </li>

                    <li className="flex items-start space-x-3">
                        <FaCoins className="text-yellow-400 mt-1" />
                        <span>
                            After minting, sell your Pacts on the{' '}
                            <Link to="/app.ironForge/board" className="underline text-blue-400 hover:text-blue-300 font-semibold">
                                Iron Forge
                            </Link>{' '}
                            to collect liquidity.
                        </span>
                    </li>
                </ul>
            </div>
            <NewPactForm />
        </div>
    );
}
