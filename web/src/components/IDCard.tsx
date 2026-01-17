import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

interface Props {
    account: string
}

const IDCard = ({ account }: Props) => {
    const [studentData, setStudentData] = useState<any>(null)

    useEffect(() => {
        // YOUR CODE HERE
        // 1. Create Provider (BrowserProvider)
        // 2. Create Contract Instance (Read-only is fine)
        // 3. Call 'getStudent(account)'
        // 4. setStudentData(result)
    }, [account])

    if (!studentData) return <div>No ID Found</div>

    return (
        <div className="id-card">
            <h2>Student ID</h2>
            {/* 
        YOUR CODE HERE
        Display Name and Roll Number from studentData
       */}
        </div>
    )
}

export default IDCard
