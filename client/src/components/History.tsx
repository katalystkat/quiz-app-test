import React, {useState, useEffect} from 'react'
import { useAppSelector } from '../redux/hooks';
import styles from '../styles/home.module.css';

export default function History() {
    const { attemptHistory } = useAppSelector(state => state.history);
    const [isLoading, setIsLoading] = useState(true);
    let stateUserId = attemptHistory[0]["userId"];

    useEffect(() => {
      if (stateUserId !== "test") {
        setIsLoading(false);
      }
    }, [attemptHistory]);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <table>
          <thead className="table-header">
            <tr className="table-row">
              <th className={styles.tableHeader}>Date</th>
              <th className={styles.tableHeader}>Results</th>
              <th className={styles.tableHeader}>Score</th>
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
    );
}
