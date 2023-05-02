
type Answers = {
    [questionId: string]: number | undefined;
  }
 
export function calculateScore(userAnswers: Answers, correctAnswers: Answers) {
    const totalQuestions = Object.keys(correctAnswers).length;
    console.log('totalQuestions: '+ totalQuestions);
    let correctCount = 0;
    for (const questionId in userAnswers) {
      if (userAnswers.hasOwnProperty(questionId)) {
        if (userAnswers[questionId] === correctAnswers[questionId]) {
          correctCount++;
        }
      }
    }
    // console.log('correctCount: ' + correctCount);
    let percentage = (correctCount / totalQuestions) * 100;
    if (correctCount === 0) percentage = 0;
    // console.log('percentage: '+percentage)
    return {
      correctCount,
      totalQuestions,
      percentage
    };
  }