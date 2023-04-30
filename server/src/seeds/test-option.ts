import { getRepository } from 'typeorm';
import { Option } from '../entities/option.js';
import { AppDataSource } from '../data-source.js';

const optionRepository = AppDataSource.getRepository(Option);

const options: Partial<Option>[] = [
    // Question 1
    {
      text: 'Apteryx australis',
      isCorrect: false,
      questionId: '1',
      optionIndex: 0,
    },
    {
      text: 'Apteryx owenii',
      isCorrect: true,
      questionId: '1',
      optionIndex: 1,
    },
    {
      text: 'Apteryx mantelli',
      isCorrect: false,
      questionId: '1',
      optionIndex: 2,
    },
    {
      text: 'Apteryx haastii',
      isCorrect: false,
      questionId: '1',
      optionIndex: 3,
    },
  
    // Question 2
    {
      text: 'North Island brown kiwi',
      isCorrect: true,
      questionId: '2',
      optionIndex: 0,
    },
    {
      text: 'Great spotted kiwi',
      isCorrect: false,
      questionId: '2',
      optionIndex: 1,
    },
    {
      text: 'Rowi',
      isCorrect: false,
      questionId: '2',
      optionIndex: 2,
    },
    {
      text: 'Little spotted kiwi',
      isCorrect: false,
      questionId: '2',
      optionIndex: 3,
    },
  
    // Question 3
    {
      text: 'Beak',
      isCorrect: false,
      questionId: '3',
      optionIndex: 0,
    },
    {
      text: 'Gizzard',
      isCorrect: true,
      questionId: '3',
      optionIndex: 1,
    },
    {
      text: 'Crop',
      isCorrect: false,
      questionId: '3',
      optionIndex: 2,
    },
    {
      text: 'Proventriculus',
      isCorrect: false,
      questionId: '3',
      optionIndex: 3,
    },
  
    // Question 4
    {
      text: 'Nocturnal',
      isCorrect: true,
      questionId: '4',
      optionIndex: 0,
    },
    {
      text: 'Diurnal',
      isCorrect: false,
      questionId: '4',
      optionIndex: 1,
    },
    {
      text: 'Crepuscular',
      isCorrect: false,
      questionId: '4',
      optionIndex: 2,
    },
    {
      text: 'Cathemeral',
      isCorrect: false,
      questionId: '4',
      optionIndex: 3,
    },
  
    // Question 5
    {
      text: 'Flightless',
      isCorrect: true,
      questionId: '5',
      optionIndex: 0,
    },
    {
      text: 'Able to fly',
      isCorrect: false,
      questionId: '5',
      optionIndex: 1,
    },
    {
      text: 'Partially flighted',
      isCorrect: false,
      questionId: '5',
      optionIndex: 2,
    },
    {
      text: 'None of the above',
      isCorrect: false,
      questionId: '5',
      optionIndex: 3,
    },
  ];
  

export const seedOptionData = async () => {
    for (const option of options) {
        const newOptions = optionRepository.create(option);
        await optionRepository.save(newOptions);
    }
};
