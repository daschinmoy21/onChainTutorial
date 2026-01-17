import { useEffect, useState } from 'react'

interface Props {
    setAccount: (account: string) => void
}

const ConnectWallet = ({ setAccount }: Props) => {

    const connect = async () => {
        // YOUR CODE HERE:
        // Detect window.ethereum
        // Request accounts using 'eth_requestAccounts'
        // setAccount(address)
    }

    return (
        <button onClick={connect}>
            Connect Wallet
        </button>
    )
}

export default ConnectWallet
