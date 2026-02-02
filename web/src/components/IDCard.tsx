import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/constants'

interface Props {
    account: string
}

const IDCard = ({ account }: Props) => {
    const [studentData, setStudentData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    // Generate anime profile picture from wallet address
    const getAnimeAvatar = (address: string) => {
        // Using DiceBear's anime/adventurer style with the wallet address as seed
        return `https://api.dicebear.com/7.x/adventurer/svg?seed=${address}&backgroundColor=b6e3f4,c0aede,d1d4f9`
    }

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                setLoading(true);

                // 1. Create Provider (BrowserProvider)
                if (!window.ethereum) {
                    console.error("No ethereum provider found");
                    return;
                }
                const provider = new ethers.BrowserProvider(window.ethereum);

                // 2. Create Contract Instance (Read-only is fine)
                const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

                // 3. Call 'getStudent(account)'
                const [name, rollNumber] = await contract.getStudent(account);

                // 4. setStudentData(result)
                if (name && rollNumber) {
                    setStudentData({ name, rollNumber });
                } else {
                    setStudentData(null);
                }
            } catch (error) {
                console.error("Error fetching student data:", error);
                setStudentData(null);
            } finally {
                setLoading(false);
            }
        };

        if (account) {
            fetchStudent();
        }
    }, [account])

    if (loading) return <div className="id-card loading">Loading your ID...</div>

    if (!studentData || !studentData.name) {
        return (
            <div className="id-card empty">
                <h2>📛 No ID Found</h2>
                <p>No registration found for this address.</p>
                <p>Please register first to mint your ID card!</p>
            </div>
        )
    }

    const avatarUrl = getAnimeAvatar(account);

    return (
        <div className="id-card">
            <div className="id-card-header">
                <h3>🎓 BetaLabs Web3</h3>
                <p>Student ID Card</p>
            </div>

            <div className="id-card-body">
                <div className="avatar-container">
                    <img
                        src={avatarUrl}
                        alt="Student Avatar"
                        className="avatar"
                    />
                </div>

                <div className="student-info">
                    <div className="info-row">
                        <span className="label">Name:</span>
                        <span className="value">{studentData.name}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Roll No:</span>
                        <span className="value">{studentData.rollNumber}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Wallet:</span>
                        <span className="value wallet-address">
                            {account.substring(0, 8)}...{account.substring(account.length - 6)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="id-card-footer">
                <p>⛓️ Verified on Blockchain</p>
            </div>
        </div>
    )
}

export default IDCard
