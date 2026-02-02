import { useEffect, useState } from 'react'

interface Props {
    setAccount: (account: string) => void
}

const ConnectWallet = ({ setAccount }: Props) => {

    const connect = async () => {
        try {
            // Detect window.ethereum
            if (!window.ethereum) {
                alert("Please install MetaMask!");
                return;
            }

            // Request accounts using 'eth_requestAccounts'
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            // setAccount(address)
            if (accounts.length > 0) {
                setAccount(accounts[0]);
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
            alert("Failed to connect wallet. Please try again.");
        }
    }

    return (
        <button onClick={connect}>
            Connect Wallet
        </button>
    )
}

export default ConnectWallet
