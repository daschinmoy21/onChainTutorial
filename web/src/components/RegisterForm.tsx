import { useState } from 'react'
import { ethers } from 'ethers'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/constants'

interface Props {
    account: string
}

const RegisterForm = ({ account }: Props) => {
    const [name, setName] = useState('')
    const [rollNo, setRollNo] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const register = async () => {
        if (!name || !rollNo) {
            setMessage("Please fill in all fields");
            return;
        }

        try {
            setLoading(true);
            setMessage("Waiting for transaction approval...");

            // Create a Provider
            if (!window.ethereum) {
                setMessage("Please install MetaMask!");
                return;
            }
            const provider = new ethers.BrowserProvider(window.ethereum);

            // Get Signer
            const signer = await provider.getSigner();

            // Create Contract Instance
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

            // Call register function
            setMessage("Sending transaction...");
            const tx = await contract.register(name, rollNo);

            setMessage("Transaction sent! Waiting for confirmation...");
            await tx.wait();

            setMessage("✅ Registration successful!");
            setName('');
            setRollNo('');

            // Refresh the page after 2 seconds to see the new ID card
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error: any) {
            console.error("Registration error:", error);
            if (error.code === 'ACTION_REJECTED') {
                setMessage("Transaction rejected by user");
            } else if (error.message?.includes("already registered")) {
                setMessage("❌ Already registered!");
            } else {
                setMessage(`❌ Error: ${error.message || 'Registration failed'}`);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="card">
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
            />
            <input
                type="text"
                placeholder="Roll Number"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                disabled={loading}
            />
            <button onClick={register} disabled={loading}>
                {loading ? 'Processing...' : 'Mint ID'}
            </button>
            {message && <p className="message">{message}</p>}
        </div>
    )
}

export default RegisterForm
