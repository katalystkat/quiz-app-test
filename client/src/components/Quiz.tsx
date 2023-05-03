import React, { useEffect, useState } from "react";
import Questions from "./Questions";
import {} from "react-redux";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  GetNextQuestion,
  GetPrevQuestion,
} from "../customHooks/fetchQuestions";
import { AddQuizResult } from "../customHooks/setQuizResults";
import { useNavigate } from "react-router-dom";
import styles from "../styles/home.module.css";
type Props = {};

export default function Quiz({}: Props) {
  const result = useAppSelector((state) => state.result.result);
  const { queue, trace } = useAppSelector((state) => state.questions);
  const [check, setChecked] = useState<number | undefined>(undefined);
  const [lastQuestion, setLastQuestion] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function onNext() {
    if (trace < queue.length) {
      if (result[trace] !== check && check !== undefined) {
        dispatch(AddQuizResult(trace, check));
        dispatch(GetNextQuestion());
        setChecked(undefined);
      }
    }
    if (trace === queue.length - 2) {
      setLastQuestion(true);
    } else if (lastQuestion) {
      await dispatch(AddQuizResult(trace, check));
      navigate("/results", { replace: true });
    }
  }

  function onPrev() {
    setLastQuestion(false);
    dispatch(GetPrevQuestion());
  }

  function handleChecked(optionChecked: any) {
    setChecked(optionChecked);
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-center h-screen items-center">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h1 className="title text-5xl py-2 text-light">
              Kiwi-rious Quizzers
            </h1>
            <span className="text-xl text-center w-2/3">kiwi-rious... veeeeery kiwi-rious! </span>
            <Questions onChecked={handleChecked} />
            <div className="grid">
              {trace > 0 ? (
                <button className={styles.btn} onClick={onPrev}>
                  Previous
                </button>
              ) : (
                <div></div>
              )}
              <button className={styles.btn} onClick={onNext}>
                {lastQuestion ? "Complete" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
