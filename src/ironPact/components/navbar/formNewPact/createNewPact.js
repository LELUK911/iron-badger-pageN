import {
    prepareContractCall,
    sendTransaction,
} from "thirdweb";
import { contract } from '../../main.jsx'



export const createNewPactTransaction = async (_debtor,
    _tokenLoan,
    _sizeLoan,
    _interest,
    _rewardMaturity,
    _expiredPact,
    _tokenCollateral,
    _collateral,
    _amount,
    _describes, account) => {

    const transaction = await prepareContractCall({
        contract,
        method:
            "function createNewPact(address _debtor, address _tokenLoan, uint256 _sizeLoan, uint256 _interest, uint256[] _rewardMaturity, uint256 _expiredPact, address _tokenCollateral, uint256 _collateral, uint256 _amount, string _describes)",
        params: [
            _debtor,
            _tokenLoan,
            _sizeLoan,
            _interest,
            _rewardMaturity,
            _expiredPact,
            _tokenCollateral,
            _collateral,
            _amount,
            _describes,
        ],
    });
    const { transactionHash } = await sendTransaction({
        transaction,
        account,
    });

    return transactionHash
}



