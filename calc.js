
function operation(num1, op, num2){
    switch(op){
        case '+':
            result.textContent = num1+num2
            break
        case '-':
            result.textContent = num1-num2
            break
        case '*':
            result.textContent = num1*num2
            break
        case '/':
            if(num2 === 0)
                result.textContent = "Cant divide by 0 goofball"
            else
                result.textContent = num1/num2
            break
    }
}

const state = {
    firstValue: null,
    operator: null,
    secondValue: null,
    firstInput: false,
    resultShown: false,
}


/* 
1. slice: returns the string value depending on the what value is given, -1 gives the last char or 0 the first.
2. includes: is a loop which loops over an array and then compares it to parameter given to it, and then returns true or false.
3. forEach: another loop whcih just goes over the list 
*/
const buttons = document.querySelectorAll("button")
const display = document.querySelector("#output")
const result = document.querySelector("#result")

buttons.forEach(buttons =>
    buttons.addEventListener("click",()=>{
            if(state.resultShown){
                if(isNaN(buttons.textContent)){
                    state.firstValue = result.textContent
                    state.firstInput = false
                    state.secondValue = null
                    state.resultShown = false
                    output.textContent = result.textContent
                }
                else{
                    state.firstValue = null,
                    state.operator = null,
                    state.secondValue = null,
                    state.firstInput = false,
                    state.resultShown = false,
                    output.textContent = state.firstValue
                    result.textContent = ""
                }
            }
        }
    )
)

buttons.forEach(buttons =>
    buttons.addEventListener("click",()=>{
        if(isNaN(buttons.textContent)){

            if(buttons.textContent === "="){
                if(display.textContent.slice(-1) === "=")
                    return;
                else{
                    display.textContent = display.textContent + buttons.textContent
                    operation(parseFloat(state.firstValue), state.operator, parseFloat(state.secondValue))
                    state.resultShown = true
                }
            }
            else if(buttons.textContent === "C"){
                display.textContent = "0"
                result.textContent = ""
                state.firstValue = null
                state.operator = null
                state.secondValue = null
                state.firstInput = false
                state.resultShown = false
            }
            else if(buttons.textContent === "CE"){
                if(state.secondValue !== null){
                    state.secondValue = null
                    state.firstInput = true
                    display.textContent = state.firstValue + state.operator
                }
                else{
                    state.firstValue = null
                    state.firstInput = false
                    display.textContent = 0
                }
            }
            else if(buttons.textContent === "X"){
                display.textContent = display.textContent.slice(0,-1)
            }
            else if(buttons.textContent === "x^2"){
                display.textContent = state.firstValue+"^2"
                result.textContent = state.firstValue * state.firstValue
                state.resultShown = true
            }
            else if(buttons.textContent === "x^1/2"){
                display.textContent = state.firstValue+"x^1/2"
                result.textContent = Math.sqrt(state.firstValue)
                state.resultShown = true
            }
            else if(buttons.textContent === "1/x"){
                display.textContent = ""
                display.textContent = "1/("+state.firstValue+")"
                result.textContent = 1 / state.firstValue
                state.resultShown = true
            }
            else if(buttons.textContent === "pi"){
                const pi = 3.14159
                if(state.firstInput === false){
                    state.firstValue = pi
                    state.firstInput = true
                }
                else
                    state.secondValue = pi
                display.textContent = display.textContent + pi 
            }
            else if(buttons.textContent === "%"){
                    if(state.firstInput === false){
                        display.textContent = state.firstValue+"%"
                        state.firstValue = parseFloat(state.firstValue)/100
                        result.textContent = state.firstValue
                        state.resultShown = true
                    }
                    else{
                        const length = state.secondValue.length
                        display.textContent = display.textContent.slice(0,-length)
                        display.textContent = display.textContent + state.secondValue+"%"
                        state.secondValue = state.firstValue * (state.secondValue/100)
                        operation(parseFloat(state.firstValue), state.operator, parseFloat(state.secondValue))
                    }
            }
            else{
                const op = ["+", "-", "*", "/"]
                if(op.includes(display.textContent.slice(-1))){
                    state.operator = buttons.textContent
                    display.textContent = display.textContent.slice(0, -1) + buttons.textContent
                }
                else{
                    state.operator = buttons.textContent
                    display.textContent = display.textContent + buttons.textContent
                    state.firstInput = true
                }
            }           
        }
        else{
            if(state.firstInput === false){
                if(state.firstValue === null){
                    state.firstValue = buttons.textContent
                    display.textContent = buttons.textContent
                }
                else{
                    state.firstValue = state.firstValue + buttons.textContent
                    display.textContent = display.textContent + buttons.textContent
                }
            }
            else{
                if(state.secondValue === null){
                    state.secondValue = buttons.textContent
                    display.textContent = display.textContent + buttons.textContent
                }
                else{
                    state.secondValue = state.secondValue + buttons.textContent
                    display.textContent = display.textContent + buttons.textContent
                }
            }
        }
        
    })
)