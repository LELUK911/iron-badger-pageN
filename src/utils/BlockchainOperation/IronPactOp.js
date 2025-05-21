import { ethers } from "ethers";
import contractJSON from '../Information/ABI/PactContract.json'
import { takeMeProvider } from "../helper/helper";




export const ironPactAddress = "0xA54AB187eb479aebbDD2a89681b495DCd38BD0E5"

const abi = contractJSON.abi


export const claimRewardForUser = async (_id, _indexReward, signer) => {

    try {
        const contract = new ethers.Contract(ironPactAddress, abi, signer)
        const tx = await contract.claimRewardForUSer(_id, _indexReward)
        await tx.wait()
        return tx
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
}

export const claimLoan = async (_id, _amount, signer) => {
    try {
        const contract = new ethers.Contract(ironPactAddress, abi, signer)
        const tx = await contract.claimLoan(_id, _amount)
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
}
export const depositTokenForInterest = async (_id, _amount, signer) => {
    try {
        const contract = new ethers.Contract(ironPactAddress, abi, signer);
        const tx = await contract.depositTokenForInterest(_id, _amount)
        await tx.wait()
        return tx
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
}
export const claimScorePoint = async (_id, signer) => {
    try {
        const contract = new ethers.Contract(ironPactAddress, abi, signer);
        const tx = await contract.claimScorePoint(_id);
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
};
export const withdrawCollateral = async (_id, signer) => {
    try {
        const contract = new ethers.Contract(ironPactAddress, abi, signer);
        const tx = await contract.withdrawCollateral(_id);
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
};
export const setApprovalPact = async (operator, approved, signer) => {
    try {
        const contract = new ethers.Contract(ironPactAddress, abi, signer);
        const tx = await contract.setApprovalForAll(operator, approved);
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
};
export const createNewPactTransaction = async (
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
    signer
) => {
    try {
        const contract = new ethers.Contract(ironPactAddress, abi, signer);
        const tx = await contract.createNewPact(
            //_debtor,
            _tokenLoan,
            _sizeLoan,
            _interest,
            _rewardMaturity,
            _expiredPact,
            _tokenCollateral,
            _collateral,
            _amount,
            _describes
        );
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Transaction failed:", error)
        return false
    }
};
export const safeTransferFromPact = async (from, to, id, amount, data, account) => {
    try {
        const contract = new ethers.Contract(ironPactAddress, abi, account.signer);
        const tx = await contract.safeTransferFrom(from, to, id, amount, data);
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
};
export const readId = async () => {
    try {
        let provider = takeMeProvider()

        const contract = new ethers.Contract(ironPactAddress, abi, provider);
        const data = await contract.viewPactID()
        return data
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
}
export const pactDetails = async (_id, account = null) => {
    try {
        let provider = takeMeProvider()
        const contract = new ethers.Contract(ironPactAddress, abi, provider)
        const data = await contract.showDeatailPactForId(_id)
        return data
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
}
export const pointDebtor = async (debtor) => {
    try {
        let provider = takeMeProvider()

        const contract = new ethers.Contract(ironPactAddress, abi, provider);
        const data = await contract.checkStatusPoints(debtor);
        return data;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
};
export const balancePactForId = async (account, id,) => {
    try {
        let provider = takeMeProvider()

        const contract = new ethers.Contract(ironPactAddress, abi, provider);
        const data = await contract.balanceOf(account, id);
        return data;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
};
export const supplyPactForID = async (id) => {
    try {
        let provider = takeMeProvider()

        const contract = new ethers.Contract(ironPactAddress, abi, provider);
        const data = await contract.totalSupply(id);
        return data;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
};
export const isApprovalForAll = async (account, operator,) => {
    try {
        let provider = takeMeProvider()
        const contract = new ethers.Contract(ironPactAddress, abi, provider);
        const data = await contract.isApprovedForAll(account, operator);
        return data;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
};
export const totalSupply = async (id) => {
    try {
        let provider = takeMeProvider()
        const contract = new ethers.Contract(ironPactAddress, abi, provider);
        const data = await contract.totalSupply(id);
        return data;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
};

export const getMissQtaInterest = async (id) => {
    try {
        let provider = takeMeProvider()
        const contract = new ethers.Contract(ironPactAddress, abi, provider);
        const data = await contract.getMissQtaInterest(id);
        return data;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
};

export const getMaxQtaInterest = async (id) => {
    try {
        let provider = takeMeProvider()
        const contract = new ethers.Contract(ironPactAddress, abi, provider);
        const data = await contract.getMaxQtaInterest(id);
        return data;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
};


export const _showLiquidationFees = async () => {
    try {
        let provider = takeMeProvider();
        const contract = new ethers.Contract(ironPactAddress, abi, provider);
        const data = await contract.showLiquidationFees();
        return data;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
}

export const _showRewardFee = async () => {
    try {
        let provider = takeMeProvider();
        const contract = new ethers.Contract(ironPactAddress, abi, provider);
        const data = await contract.showCouponFee();
        return data;
    } catch (error) {
        console.error("Transaction failed:", error.reason)
        return false
    }
}

export const newPactIussuerHistory = async (id = null, address = null) => {
    try {

        const provider = takeMeProvider();
        const contract = new ethers.Contract(ironPactAddress, abi, provider);

        const latestBlock = await provider.getBlockNumber();
        const blockStep = 10000;
        const fromBlock = 5565379;

        const filter = contract.filters.PactCreated(id, address);

        const blockRanges = [];
        for (let i = fromBlock; i < latestBlock; i += blockStep) {
            blockRanges.push([i, Math.min(i + blockStep - 1, latestBlock)]);
        }


        const results = await Promise.allSettled(
            blockRanges.map(([start, end]) =>
                contract.queryFilter(filter, start, end)
            )
        );

        let allEvents = [];

        for (const result of results) {
            if (result.status === "fulfilled") {
                const events = result.value;

                const parsed = events.map((event) => {
                    const debtor = ethers.getAddress(event.topics[2].slice(-40));
                    const decodedData = contract.interface.parseLog(event);

                    return {
                        id: decodedData.args.id.toString(),
                        debtor,
                        tokenLoan: decodedData.args.tokenLoan,
                        amount: ethers.formatUnits(decodedData.args.amount, 18),
                        blockNumber: event.blockNumber,
                        transactionHash: event.transactionHash
                    };
                });

                allEvents = allEvents.concat(parsed);
            } else {
                console.warn("Errore nel blocco", result.reason);
            }
        }

        return allEvents;
    } catch (e) {
        console.error("Errore generale:", e);
        return [];
    }
};




