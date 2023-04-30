// import "reflect-metadata";
// import { createConnection } from "typeorm";
// import { Quiz } from "./entities/quiz";
// import { Question } from "./entities/question";
// import { Option } from "./entities/option";

// createConnection()
//   .then(async (connection) => {
//     console.log("Connected to database");

//     const kiwiQuestions = [
//       new Question(1, "What is the scientific name for kiwi?"),
//       new Question(2, "Where are kiwis native to?"),
//       new Question(3, "What is the size of a kiwi bird?"),
//       new Question(4, "What is the lifespan of a kiwi bird?"),
//       new Question(5, "What are kiwis commonly used for in cooking?"),
//     ];

//     const kiwiOptions = [
//       new Option(1, "Apteryx mantelli", true),
//       new Option(1, "Apteryx australis", false),
//       new Option(1, "Apteryx haastii", false),
//       new Option(1, "Apteryx owenii", false),
//       new Option(2, "Australia", false),
//       new Option(2, "New Zealand", true),
//       new Option(2, "Papua New Guinea", false),
//       new Option(2, "Indonesia", false),
//       new Option(3, "2-3 cm", false),
//       new Option(3, "10-20 cm", false),
//       new Option(3, "30-40 cm", true),
//       new Option(3, "50-60 cm", false),
//       new Option(4, "5-10 years", false),
//       new Option(4, "15-20 years", true),
//       new Option(4, "25-30 years", false),
//       new Option(4, "35-40 years", false),
//       new Option(5, "Salads", false),
//       new Option(5, "Sauces", false),
//       new Option(5, "Smoothies", true),
//       new Option(5, "Candies", false),
//     ];

//     const kiwiQuiz = new Quiz(
//       1,
//       "Kiwis Quiz",
//       kiwiQuestions.map((question) => {
//         question.options = kiwiOptions.filter(
//           (option) => option.questionId === question.id
//         );
//         return question;
//       })
//     );

//     await connection.manager.save(kiwiQuiz);
//     console.log("Quiz seeded successfully");

//     await connection.close();
//     console.log("Connection closed");
//   })
//   .catch((error) => console.log(error));
