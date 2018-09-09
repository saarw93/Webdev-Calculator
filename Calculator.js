//Name: Saar Weitzman
//Date:	28/08/2018
//ID:	204175137


var buttonListener = function (e) {
    var display = document.querySelector(".display");  //get the content of the calculator display

    if (e.target.matches("button"))   //check if a button was pressed
    {
        var key = e.target;
        var action = key.dataset.action;

        var calculator = document.querySelector(".calculator");
        var keyContent = key.textContent;


        if (display.textContent === "Math Error: division by 0" || display.textContent === "Press AC to continue") {
            display.textContent = "Press AC to continue";

            if (action === "clean") {
                display.textContent = "0";
                calculator.dataset.prevKeyType = "clean";
                calculator.dataset.firstNum = "0";
                calculator.dataset.secondNum = "0";
                calculator.dataset.whichNumFlag = 1;
            }
        }


        else {

            if (!action)    //it's a number
            {
                if (display.textContent === "0" && (calculator.dataset.prevKeyType == undefined || calculator.dataset.whichNumFlag == 1))  //first number, when we build a new equation from scratch
                {
                    display.textContent = keyContent;
                    calculator.dataset.firstNum = display.textContent;
                    calculator.dataset.whichNumFlag = 1;   //flag to know if we are in the first or the second number. 1: first, 2: second
                }

                else if (calculator.dataset.prevKeyType === "operator") {
                    display.textContent = keyContent;
                    calculator.dataset.secondNum = display.textContent;
                    calculator.dataset.whichNumFlag = 2;
                }

                else if (calculator.dataset.prevKeyType === "calculate") {
                    display.textContent = keyContent;
                    calculator.dataset.firstNum = display.textContent;
                    calculator.dataset.whichNumFlag = 1;
                }

                else {
                    display.textContent = display.textContent + keyContent;    //appending the string
                    if (calculator.dataset.whichNumFlag == 1)
                        calculator.dataset.firstNum = display.textContent;
                    else
                        calculator.dataset.secondNum = display.textContent;
                }
                calculator.dataset.prevKeyType = "number";
            }

            if (action === "add" || action === "sub" || action === "multiply" || action === "divide")  //the action is an operator key
            {
                if (calculator.dataset.prevKeyType !== "operator") {

                    if (display.textContent === "0" && calculator.dataset.whichNumFlag == 1) {
                        calculator.dataset.firstNum = display.textContent;
                    }


                    if (calculator.dataset.whichNumFlag == 2) {
                        var result = calculate(calculator.dataset.firstNum, calculator.dataset.operator, calculator.dataset.secondNum);
                        display.textContent = result;
                        calculator.dataset.firstNum = display.textContent;
                    }

                    calculator.dataset.prevKeyType = "operator";      // add custom attribute, to know a operator button was pressed
                    calculator.dataset.whichNumFlag = 2;
                }
                calculator.dataset.operator = action;
            }

            if (action === "dot")     //the action is the dot key
            {
                if (display.textContent === "0" && calculator.dataset.whichNumFlag == 1) {
                    display.textContent = "0" + keyContent;
                    calculator.dataset.whichNumFlag = 1;
                }
                else {
                    if (display.textContent.includes(".")) {
                        return;
                    }

                    if (calculator.dataset.prevKeyType === "calculate") {
                        display.textContent = "0" + keyContent;
                        calculator.dataset.firstNum = display.textContent;
                        calculator.dataset.whichNumFlag = 1;
                    }

                    else
                        if (calculator.dataset.prevKeyType === "operator")      //the previous key was operator, need to put "0." when press "."
                        {
                            display.textContent = "0" + keyContent;
                            calculator.dataset.secondNum = display.textContent; //update the second number
                            calculator.dataset.whichNumFlag = 2;
                        }

                        else {
                            display.textContent = display.textContent + keyContent;   //add the "." to the number on display screen
                            if (calculator.dataset.whichNumFlag == 1) {
                                calculator.dataset.firstNum = display.textContent; //update the first number
                            }
                            else {
                                calculator.dataset.secondNum = display.textContent;   //update the second number
                            }
                        }
                }
                calculator.dataset.prevKeyType = "dot";
            }

            if (action === "clean") {
                display.textContent = "0";
                calculator.dataset.prevKeyType = "clean";
                calculator.dataset.firstNum = "0";
                calculator.dataset.secondNum = "0";
                calculator.dataset.whichNumFlag = 1;
            }

            if (action === "calculate") {
                if ((display.textContent === "0" && (calculator.dataset.whichNumFlag == 1 || calculator.dataset.whichNumFlag == undefined)) || calculator.dataset.prevKeyType === "calculate") { }

                else if (calculator.dataset.prevKeyType === "number" && calculator.dataset.whichNumFlag == 1) {
                    calculator.dataset.firstNum = display.textContent;
                    calculator.dataset.prevKeyType = "calculate";
                }

                else {
                    if (calculator.dataset.prevKeyType === "operator")    //an operator was pressed before the equal button
                    {
                        calculator.dataset.secondNum = calculator.dataset.firstNum;
                    }
                    var result = calculate(calculator.dataset.firstNum, calculator.dataset.operator, calculator.dataset.secondNum);
                    display.textContent = result;

                    calculator.dataset.prevKeyType = "calculate";
                    calculator.dataset.firstNum = display.textContent;
                    calculator.dataset.whichNumFlag = 1;
                }
            }
        }
    }
}


function calculate(num1, act, num2) {
    var firstNum = parseFloat(num1);

    var operator = act;

    var secondNum = parseFloat(num2);

    var result;
    if (operator === "add")
        result = firstNum + secondNum;
    else if (operator === "sub")
        result = firstNum - secondNum;
    else if (operator === "multiply")
        result = firstNum * secondNum;
    else {
        if (secondNum === 0)
            result = "Math Error: division by 0";
        else
            result = firstNum / secondNum;
    }
    return result.toString();
}


var loadPage = function () {
    var calculator = document.querySelector(".calculator");
    var keys = calculator.querySelector(".calc-keys");
    keys.addEventListener("click", buttonListener, false);
};