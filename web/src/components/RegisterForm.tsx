import { useState } from 'react'
import { ethers } from 'ethers'
// TODO: Import contract address and ABI
// import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/constants'

interface Props {
    account: string
}

const RegisterForm = ({ account }: Props) => {
    const [name, setName] = useState('')
    const [rollNo, setRollNo] = useState('')

    const register = async () => {
        // TODO: Create a Provider
        // const provider = new ethers.BrowserProvider(window.ethereum)

        // TODO: Get Signer
        // const signer = await provider.getSigner()

        // TODO: Create Contract Instance
        // const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

        // TODO: Call register function
        // const tx = await contract.register(name, rollNo)
        // await tx.wait()

        console.log("Registration logic goes here", name, rollNo)
    }

    return (
        <div className="card">
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Roll Number"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
            />
            <button onClick={register}>Mint ID</button>
        </div>
    )
}

export default RegisterForm
