import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { createNewPactTransaction } from './createNewPact';
import { ethers } from 'ethers';
import { readContract, prepareContractCall, getContract, defineChain } from "thirdweb";
import { client } from '../../utils/client';
import { OptionTokenListBox } from './optionTokenListBox';
import { RewardMaturityElement } from './RewardMaturityElement';

export const NewPactForm = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const activeAccount = useActiveAccount();
    const { mutate: sendTransaction } = useSendTransaction();
    const secondXday = 86400

    useEffect(() => {
        if (activeAccount) {
            setValue("debtor", activeAccount.address); // Imposta il valore dell'indirizzo emittente automaticamente
        }
    }, [activeAccount, setValue]);

    const onSubmit = async (data) => {


        const expiredPact = Math.floor(Date.now() / 1000) + (data.expiredPact * secondXday);


        const rewardMaturityArray = () => {
            return data.rewardMaturity.map((item) => {
                item = Math.floor(Date.now() / 1000) + (item * secondXday);
                console.log(item.toString())
                return item.toString()
            })
        }
        try {
            // Contratto per Token Collaterale
            const contractErc20 = getContract({
                client,
                chain: defineChain(11155111),
                address: data.tokenCollateral,
            });
            let allowance
            console.log(data.tokenCollateral)
            try {
                allowance = await readContract({
                    contract: contractErc20,
                    method: "function allowance(address owner, address spender) view returns (uint256)",
                    params: [data.debtor, "0x70884a2C51b00bA41a9d212fDaA9b558EbE366C3"],
                });
                ;
            } catch (error) {
                console.error(`Transaction failed -> ${error.message}`);
                console.error('Params:', data.debtor, 'Spender:', "0x70884a2C51b00bA41a9d212fDaA9b558EbE366C3");
            }


            const powerOfSpend = allowance.toString() || "0";

            if (powerOfSpend < ethers.parseUnits(data.collateral)) {

                const transaction = prepareContractCall({
                    contract: contractErc20,
                    method: "function approve(address spender, uint256 value) returns (bool)",
                    params: ['0x70884a2C51b00bA41a9d212fDaA9b558EbE366C3', ethers.parseUnits(data.collateral)],
                });

                const transactionHash = sendTransaction(transaction).then((data) => alert(`Transaction submitted -> ${data}`));
                alert(`Transaction submitted -> ${transactionHash}`);
            }
            console.log("prima della transazione del nuovo bonf")

            const transactionHash = await createNewPactTransaction(
                data.debtor,
                data.tokenLoan,
                ethers.parseEther(data.sizeLoan),
                ethers.parseEther(data.interest),
                rewardMaturityArray(),
                expiredPact,
                data.tokenCollateral,
                ethers.parseEther(data.collateral),
                data.amount,
                data.describes,
                activeAccount
            );

            alert(`Transaction submitted -> ${transactionHash}`);
        } catch (e) {
            console.error(`Transaction failed -> ${e.message || JSON.stringify(e)}`);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-gray-200 shadow-xl rounded-lg">
            <h1 className="text-2xl font-bold text-gray-100 mb-6 text-center">Create New Pact</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300" htmlFor="debtor">
                        Debtor Address
                    </label>
                    <input
                        type="text"
                        id="debtor"
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-500"
                        {...register("debtor", { required: true })}
                        readOnly
                    />
                    {errors.debtor && <span className="text-sm text-red-500">This field is required</span>}
                </div>

                <OptionTokenListBox label="Token Loan Address" onChange={(value) => setValue("tokenLoan", value)} />
                <input
                    type="hidden"
                    {...register("tokenLoan", { required: true })}
                />
                {errors.tokenLoan && <span className="text-sm text-red-500">This field is required</span>}

                <div>
                    <label className="block text-sm font-medium text-gray-300" htmlFor="sizeLoan">
                        Size of Loan
                    </label>
                    <input
                        type="number"
                        step="any"
                        id="sizeLoan"
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-500"
                        {...register("sizeLoan", { required: true })}
                    />
                    {errors.sizeLoan && <span className="text-sm text-red-500">This field is required</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300" htmlFor="interest">
                        Interest Rate
                    </label>
                    <input
                        type="number"
                        step="any"
                        id="interest"
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-500"
                        {...register("interest", { required: true })}
                    />
                    {errors.interest && <span className="text-sm text-red-500">This field is required</span>}
                </div>

                <RewardMaturityElement onChange={(value) => setValue("rewardMaturity", value)} />
                <input
                    type="hidden"
                    {...register("rewardMaturity", { required: true })}
                />
                {errors.rewardMaturity && <span className="text-sm text-red-500">This field is required</span>}

                <div>
                    <label className="block text-sm font-medium text-gray-300" htmlFor="expiredPact">
                        Expired Pact (in days)
                    </label>
                    <input
                        type="number"
                        id="expiredPact"
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-500"
                        {...register("expiredPact", { required: true })}
                    />
                    {errors.expiredPact && <span className="text-sm text-red-500">This field is required</span>}
                </div>

                <OptionTokenListBox label="Token Collateral Address" onChange={(value) => setValue("tokenCollateral", value)} />
                <input
                    type="hidden"
                    {...register("tokenCollateral", { required: true })}
                />
                {errors.tokenCollateral && <span className="text-sm text-red-500">This field is required</span>}

                <div>
                    <label className="block text-sm font-medium text-gray-300" htmlFor="collateral">
                        Collateral Amount
                    </label>
                    <input
                        type="number"
                        step="any"
                        id="collateral"
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-500"
                        {...register("collateral", { required: true })}
                    />
                    {errors.collateral && <span className="text-sm text-red-500">This field is required</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300" htmlFor="amount">
                        Pact Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-500"
                        {...register("amount", { required: true })}
                    />
                    {errors.amount && <span className="text-sm text-red-500">This field is required</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300" htmlFor="describes">
                        Pact Description
                    </label>
                    <textarea
                        id="describes"
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-500"
                        {...register("describes")}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                >
                    Create New Pact
                </button>
            </form>
        </div>
    );
};

/**
 *  user 0x9E157eD74a826D93318F2a3669917A1fC827358d
 * 
 * Token Loan Address 0xc48218e6c6ad46e55739ab6d5e0fd2c075eaaff2 dai
 * 
 * Token Collateral Address 0x8cd94ea35225fe7bda2d9574940cced4fa3e4af8 btc
 * 
 * scadenze 1728000, 3456000, 5184000
 * 
 * scadenza finale 10368000
 * 
 * 
 */