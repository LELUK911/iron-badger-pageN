import { Link } from 'react-router-dom';
import { FaInfoCircle, FaExclamationTriangle, FaShieldAlt, FaCoins, FaHistory, FaBookOpen } from 'react-icons/fa';

const ReportHelper = () => (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-yellow-400">
            <FaInfoCircle className="w-6 h-6 mr-2" />
            How to Use the Report
        </h2>
        <ul className="space-y-4 text-gray-300 text-sm">
            <li className="flex items-start">
                <FaShieldAlt className="w-5 h-5 mt-1 mr-2 text-blue-400" />
                <div>
                    <strong>General Info:</strong> Shows data about the debtor’s past activity like <em>Trust Points</em> and <em>Rank</em>. These help understand if the user usually repays on time or has a history of liquidation.
                    <br />
                    ⚠️ Please note: These scores can be artificially influenced using mock or scam tokens. Always verify the use of legitimate tokens yourself.
                </div>
            </li>
            <li className="flex items-start">
                <FaExclamationTriangle className="w-5 h-5 mt-1 mr-2 text-red-400" />
                <div>
                    <strong>Liquidation Penalties:</strong> Indicates fees paid during minting and fees users pay when redeeming or if liquidation occurs.
                </div>
            </li>
            <li className="flex items-start">
                <FaCoins className="w-5 h-5 mt-1 mr-2 text-green-400" />
                <div>
                    <strong>Collateral History:</strong> Displays all tokens used as collateral by the debtor. These values are on-chain and immutable.
                    <br />
                    ✅ The "Verified" badge only means the token appears in a front-end reference list it does not guarantee legitimacy or value. Users must perform their own checks.
                </div>
            </li>
            <li className="flex items-start">
                <FaCoins className="w-5 h-5 mt-1 mr-2 text-purple-400" />
                <div>
                    <strong>Loan History:</strong> Shows tokens requested in past Pacts. Just like for collateral, these are immutable blockchain records.
                    <br />
                    ⚠️ A "Verified" badge is based on our front-end list and is not an endorsement or financial guarantee. Always research token legitimacy.
                </div>
            </li>
            <li className="flex items-start">
                <FaHistory className="w-5 h-5 mt-1 mr-2 text-orange-400" />
                <div>
                    <strong>Minted Pacts:</strong> Lists all Pacts issued by this debtor, offering a complete history of their activity.
                </div>
            </li>
        </ul>

        <p className="mt-6 text-gray-400">
            🔍 <strong>Disclaimer:</strong> This report is for informational purposes only. Every user is responsible for their own actions. We strongly recommend conducting your own research before interacting with any Pact.
            More details in the{' '}
            <Link to="/documentation" className="underline text-blue-400 hover:text-blue-300 font-semibold">
                documentation
            </Link>.
        </p>
    </div>
);

export default ReportHelper;
