
type Answers = {
    [questionId: string]: number | undefined;
  }
 
export function calculateScore(userAnswers: Answers, correctAnswers: Answers) {
    const totalQuestions = Object.keys(correctAnswers).length;
    let correctCount = 0;
    for (const questionId in userAnswers) {
      if (userAnswers.hasOwnProperty(questionId)) {
        if (userAnswers[questionId] === correctAnswers[questionId]) {
          correctCount++;
        }
      }
    }
    let percentage = (correctCount / totalQuestions) * 100;
    if (correctCount === 0) percentage = 0;
    return {
      correctCount,
      totalQuestions,
      percentage
    };
  }