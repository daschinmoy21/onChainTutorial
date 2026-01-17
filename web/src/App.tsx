import { useState } from 'react'
import ConnectWallet from './components/ConnectWallet'
// import RegisterForm from './components/RegisterForm'
import IDCard from './components/IDCard'
import './App.css'

function App() {
    const [account, setAccount] = useState<string>('')

    return (
        <div className="container">
            <h1>University Blockchain Registry</h1>

            {!account ? (
                <ConnectWallet setAccount={setAccount} />
            ) : (
                <>
                    <p>Connected: {account}</p>
                    <div className="grid">
                        <RegisterForm account={account} />
                        <IDCard account={account} />
                    </div>
                </>
            )}
        </div>
    )
}

export default App
