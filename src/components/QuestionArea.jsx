import React,{useState, useEffect} from 'react';

const QuestionArea = props => {

    const [qNo, setQNo] = useState(1);
    const [currentQues, setCurrentQues] = useState({})
    const [currentAns, setCurrentAns] = useState('')
    const [disableNext, setDisableNext] = useState(true)

    const [submit, setSubmit] = useState(false);





             
    useEffect(() => {
        
        if(qNo <= props.quesRange){


            let randDigits = {
        
                digitOne : Math.floor(Math.random()*10),
                digitTwo : Math.floor(Math.random()*10)
            };
            
            let randOperator = {
                "operators" : ['*','-','+','/'],
                "index" : Math.floor(Math.random()*4)
            }
            
            const calculate = (num1,num2,op) => {
                switch (op) {
                    case "+":
                        return num1 + num2;
                        case "-":
                            return num1 - num2;
                            case "*":
                                return num1 * num2;
                                case "/":
                                    return Math.floor((num1/num2)*100)/100;
                                    default:
                                        break;
                                    }
                                }
                                
                                
            let question = {
                "statement" : randDigits.digitOne + randOperator.operators[randOperator.index] + randDigits.digitTwo,
                "correctAnswer" : calculate(randDigits.digitOne,randDigits.digitTwo,randOperator.operators[randOperator.index])
            }
            setCurrentQues(question);

        }
    }, [qNo,props.quesRange])


    const questionNextHandler = () => {
        if(qNo <= props.quesRange) {

            props.updateQues(currentQues,currentAns);

            if(Number(currentAns) === currentQues.correctAnswer){
                props.updateScore(true);
            }
            if(qNo === props.quesRange){
                setSubmit(true);
                
            }else{
                setQNo(qNo + 1);

                setCurrentAns('');
            }


        }
    }

    const inputHandler = e => {
        let val = e.target.value;
        setCurrentAns(val);
        if(val === '') {
            setDisableNext(true);
        } else {
            setDisableNext(false)
        }
    }


        if(!submit) {
            return (
                <>
                <p className="statement">
                    Q{qNo})  
                    {currentQues.statement}
                    =
                    <input type="number" 
                    className="stmtInput"
                    onChange={inputHandler} 
                    value={currentAns}
                    />
                </p>
    
                <button 
                    onClick={questionNextHandler} 
                    disabled={disableNext}>
                    Next
                </button>
           </>)
        } else {
            return <button onClick={()=>{props.finishQuiz(true)}}>Submit</button>
        }
       
    
}
export default QuestionArea;