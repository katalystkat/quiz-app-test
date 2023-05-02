import React, {useState, useEffect} from 'react'
import { useAppSelector } from '../redux/hooks';
type Props = {}

// export default function History({}: Props) {
//     const { attemptHistory } = useAppSelector(state => state.history)
//     console.log('attempt history: ' + attemptHistory);
//     console.log(useAppSelector(state=>state));
//   return (
//     <div>
//         <table>
//             <thead className="table-header">
//                 <tr className="table-row">
//                     <td>Date</td>
//                     <td>Results</td>
//                     <td>Score</td>
//                 </tr>
//             </thead>
//             <tbody>
//                 {Object.entries(attemptHistory).map(([attemptId, attemptDetails]) => (
//                     <tr key={attemptId} className="table-body">
//                     <td>{attemptDetails.date}</td>
//                     <td>{JSON.stringify(attemptDetails.userResults)}</td>
//                     <td>{attemptDetails.userScore}</td>
//                 </tr>
//                 ))}
//             </tbody>
//         </table>
//     </div>
//   )
// }

export default function History({}: Props) {
    const { attemptHistory } = useAppSelector(state => state.history);
    const [isLoading, setIsLoading] = useState(true);
    let stateUserId = attemptHistory[0]["userId"];
    console.log(attemptHistory)

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
    );
}
