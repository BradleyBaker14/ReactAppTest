import React, { useState } from 'react'
import './Calculator.css'

function Calculator(){
    const [displayValue, setDisplayValue] = useState("0"); //Whats shown on the screen
    const [previousValue, setPreviousValue] = useState(null); //the stored oparand
    const [operator, setOperator] = useState(null); //the operator the user chose (=, -, x, /)
    const [waitingForNewValue, setWaitingForNewValue] = useState(false); // if set to true, a fresh input is being done

    //Handle number and decimal clicks
    const handleNumberClick = (num) => {
        //If we click the = or an operator, we need to add/show a new value
        if(waitingForNewValue){
            setDisplayValue(num);
            setWaitingForNewValue(false);
        }
        else{
            //apped the digit to the display for a larger number to show
            setDisplayValue(displayValue === "0" ? num : displayValue + num)
        }
    }

    //Handle the Operator
    const handleOperatorClick = (nextOperator) => {
        //Convert the displayedNumber to an inter/float to do math with it
        const currentValue = parseFloat(displayValue);

        //If an exisiting operator, perform the operation first
        if (operator && previousValue !==null && !waitingForNewValue){
            const result = performCalculation(previousValue, currentValue, operator);
            setDisplayValue(String(result));
            setPreviousValue(result);
        }
        else{
             // No stored operator yet, just store the number
            setPreviousValue(currentValue);
        }

        setOperator(nextOperator);
        setWaitingForNewValue(true);
    }

     // Perform the chosen math operation
     const performCalculation = (first, second, op) => {
        switch(op){
            case "+":
                return first + second
            case "-":
                return first - second
            case "*":
                return first * second
            case "/":
                return second === 0 ? 0 : first / second

            default:
                return second
        }
     }

      // When "=" is clicked, finalize the calculation
      const handleEqualsClick = () =>{
        if(operator && previousValue !==null){
            const currentValue = parseFloat(displayValue);
            const result = performCalculation(previousValue, currentValue, operator)
            setDisplayValue(String(result));
            setPreviousValue(result);
            setOperator(null);
            setWaitingForNewValue(true);
        }
      }

       // Reset the calculator to default state
        const handleClearClick = () => {
            setDisplayValue("0");
            setPreviousValue(null);
            setOperator(null);
            setWaitingForNewValue(false);
        };

        return (
            <div className='calculator'>
                <div className='calculator-display'>{displayValue}</div>
                <div className='calculator-buttons'>
                     {/* Row 1 */}
                    <button onClick={() => handleClearClick()}>C</button>
                    <button onClick={() => handleOperatorClick("/")}>÷</button>
                    <button onClick={() => handleOperatorClick("*")}>×</button>
                    <button onClick={() => handleOperatorClick("-")}>−</button>

                    {/* Row 2 */}
                    <button onClick={() => handleNumberClick("7")}>7</button>
                    <button onClick={() => handleNumberClick("8")}>8</button>
                    <button onClick={() => handleNumberClick("9")}>9</button>
                    <button onClick={() => handleOperatorClick("+")}>+</button>

                    {/* Row 3 */}
                    <button onClick={() => handleNumberClick("4")}>4</button>
                    <button onClick={() => handleNumberClick("5")}>5</button>
                    <button onClick={() => handleNumberClick("6")}>6</button>
                    <button onClick={handleEqualsClick}>=</button>

                    {/* Row 4 */}
                    <button onClick={() => handleNumberClick("1")}>1</button>
                    <button onClick={() => handleNumberClick("2")}>2</button>
                    <button onClick={() => handleNumberClick("3")}>3</button>
                    <button onClick={() => handleNumberClick("0")}>0</button>
                </div>
            </div>
        )
}

export default Calculator;