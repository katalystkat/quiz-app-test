import React from 'react'
import { useAppSelector } from '../redux/hooks';
type Props = {}

export default function History({}: Props) {
    const { attemptHistory } = useAppSelector(state => state.history)
  return (
    <div>
        <table>
            <thead className="table-header">
                <tr className="table-row">
                    <td>Date</td>
                    <td>Results</td>
                    <td>Score</td>
                </tr>
            </thead>
            <tbody>
                {Object.entries(attemptHistory).map(([attemptId, attemptDetails]) => (
                    <tr key={attemptId} className="table-body">
                    <td>{attemptDetails.date}</td>
                    <td>{JSON.stringify(attemptDetails.userResults)}</td>
                    <td>{attemptDetails.userScore}</td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}