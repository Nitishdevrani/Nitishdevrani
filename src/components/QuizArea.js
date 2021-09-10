import React,{useState} from 'react';
import QuestionArea from './QuestionArea';

const QuizArea = (props) => {
    const [strtQz,setStrtQz] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [score, setScore] = useState(0);
    const [quesLimit, setQuesLimit] = useState(20)

    const [data,setData] = useState([]);



    const scoreHandler = (isTrue) => {
        if(isTrue){
            setScore(score+1);
        }
    }

    const questionsHandler = (ques, ans) => {
        setData([...data,{...ques,userAnswer:ans}]);

    }


    const toggleLimitHandler = (sign) => {
        if(sign === '-'){

            if(quesLimit > 1) { setQuesLimit(quesLimit-1)}
        } else {
            if(quesLimit < 100) { setQuesLimit(quesLimit+1)}
        }
    }


    return(
        <div className={strtQz?"QuizBlock QzActive":"QuizBlock QzInactive"}>
            <h1>{props.name}</h1>
            {!submit
            ?
            !strtQz
                ?
                <>
                <button type="submit" onClick={()=>{setStrtQz(true)}}>
                    Start Quiz
                 </button>
                     <p>How many question you want?</p>
                 <div className="range">
                     <button onClick={()=>{toggleLimitHandler('-')}}>-</button>
                     {quesLimit}
                     <button onClick={()=>{toggleLimitHandler('+')}}>+</button>
                 </div>
                 <p>You can max the limit to 100 questions only!</p>
                </>
                :
                <div>

                    <QuestionArea 
                        finishQuiz={setSubmit} 
                        updateScore={scoreHandler}
                        updateQues={questionsHandler}
                        quesRange={quesLimit}/>
                    <h2>Current Score: {score}</h2>
                </div>


            : 
            <>
            <h2>Your Total score : {score}</h2>
            <div className="Answers">
            {data.map((k)=>{
               let key = data.indexOf(k)
                return (
                    <>
                        <p className="question" key={key}>Q{key+1}) {k.statement} = _</p>
                        {k.correctAnswer === Number(k.userAnswer) ? 
                        <p className="rightAns">Answer : {k.userAnswer}</p> : 
                        <>
                            <p className="wrongAns">Your Awnser is : {k.userAnswer}</p>
                            <p className="rightAns">Correct Awnser is : {k.correctAnswer}</p>
                        </>}
                        <hr/>
                    </>
                )
            })}
            </div>
            </>
            }
            
        </div>
    )
}
export default QuizArea;