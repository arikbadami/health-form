import { useState, useEffect } from 'react';
import './App.css';
import CircleProgressBar from './ProgressBar/ProgressBar';
import questions from "./questionsList.json";
import Header from './Header/Header';
import FormComponent from './Form/FormComponent';
import ThankYou from './Thankyou/Thankyou';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [metadata, setMetadata] = useState({});
  const [answers, setAnswers] = useState({});
  const [thankyou, setThankyou] = useState(false);

  const initForm = async () => {
    //API Call to get form data;
    let totalSections = 0, totalQuestions = 0;
    questions.map(q => {
      totalSections++;
      q.questions.map(sq => {
        totalQuestions++;
      })
    });
    setMetadata({
      totalSections,
      totalQuestions,
      title: questions[0].title
    })
    setAnswers({});
    setCurrentSection(0);
    setCurrentQuestion(0);
  }

  useEffect(() => {
    initForm();
  }, [])

  const onBackClick = () => {
    if (currentQuestion) {
      setCurrentQuestion(currentQuestion-1);
    } else {
      setCurrentQuestion(questions[currentSection-1].questions.length-1);
      setCurrentSection(currentSection-1);
    }
  }

  const onSubmitAnswer = (answer) => {
    const questionData = questions[currentSection].questions[currentQuestion];
    setAnswers({
      ...answers,
      [questionData.id]: answer
    })
    //Call api if submit is done after each question
    if (currentQuestion + 1 == questions[currentSection].questions.length) {
      if (currentSection + 1 == questions.length) {
        //Call api if submit is done only once at the end
        console.log({
          ...answers,
          [questionData.id]: answer
        });
        setThankyou(true);
        return;
      }
      setCurrentQuestion(0);
      setCurrentSection(currentSection+1);
    } else {
      setCurrentQuestion(currentQuestion+1);
    }
  }

  const getPercentage = () => {
    let questionsDone = Object.keys(answers).length;
    return Math.round(((questionsDone / (metadata?.totalQuestions || 1)) * 100) / 5) * 5
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>Arik Health</div>
        This test has been co-created with medical experts 
      </header>
      {thankyou ? <ThankYou /> : <>
        <CircleProgressBar 
          percentage={getPercentage()}
          steps={metadata?.totalSections || 4}
        />
        <Header
          title={`${currentSection+1}. ${questions[currentSection]?.title}`}
          onExitClick={initForm}
          onBackClick={onBackClick}
          hideButtons={!currentQuestion && !currentSection}
        />
        <FormComponent 
          {...questions[currentSection]?.questions[currentQuestion]}
          onSubmit={onSubmitAnswer}
          prefilledAnswer={answers[questions[currentSection].questions[currentQuestion].id] || null}
        />
      </>}
    </div>
  );
}

export default App;
