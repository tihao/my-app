import React, { useReducer } from "react";



function reducer(state, action) {
    switch(action.type) {
        case 'C':
            return {result: '', counter: 0}
        case '*':
            if(state.result === '' || state.isEqual) {
                return {...state,result: ''}
            }
            if (state.symbol === true) {
               return {...state, result: state.result.slice(0, -1) + '*'}
            }
            return {result: state.result + '*', symbol: true, counter: state.counter + 1}
        case '/':
            if(state.result === '' || state.isEqual) {
                return {...state, result: ''}
            }
            if (state.symbol === true) {
                return {...state, result: state.result.slice(0, -1) + '/'}
            }   
            return {result: state.result + '/', symbol: true, counter: state.counter + 1}
        case 'num':
            if (state.isEqual === true) {
                return {result: action.value, isEqual: false, counter: state.counter + 1}
            }
            return {result : state.result + action.value, counter: state.counter + 1}
        case '%':
            if(state.result === '' || state.isEqual) {
                return {...state,result: ''}
            }
            if (state.symbol === true) {
                return {...state, result: state.result.slice(0, -1) + '%'}
            }
            return {result: state.result + '%', symbol: true, counter: state.counter + 1}
        case '.':
            if (state.symbol === true) {
                return {...state, result: state.result.slice(0, -1) + '.'}
            }
            return {result: state.result + '.', symbol: true, counter: state.counter + 1}
        case '-':
            if (state.symbol === true) {
                return {...state, result: state.result.slice(0, -1) + '-'}
            }
            return {result: state.result + '-', symbol: true, counter: state.counter + 1}
        case '+':
            if (state.symbol === true) {
                return {...state, result: state.result.slice(0, -1) + '+'}
            }
            return {result: state.result + '+', symbol: true, counter: state.counter + 1}
        case '=':
            if (state.symbol === true) {
                return {result: eval(state.result.slice(0, -1)), isEqual: true, counter: 0}
            }
            return {result: eval(state.result), isEqual: true, counter: 0}
        case 'DEL':
            if(state.result === '' || state.isEqual) {
                return {...state,result: ''}
            }
            return {result: state.result.slice(0, -1), counter: state.counter - 1}
        default:
            throw new Error()

    }
}

const Calculator = () => {
    let max_length = 30
    const [state, dispatch] = useReducer(reducer, {result: '', symbol: false, isEqual: false, counter: 0})
    
    return (
        <div className="calculator">              
                <div className="inner">
                    <div className="display">
                        {(state.counter >= max_length) && state.result.substr(-max_length)}
                        {state.counter < max_length && state.result}
                    </div>
                    <button className="btn" onClick={() => dispatch({type: 'C'})}>C</button>
                    <button className="btn" onClick={() => dispatch({type: '*'})}>*</button>
                    <button className="btn" onClick={() => dispatch({type: '/'})}>/</button>
                    <button className="btn" onClick={() => dispatch({type: '%'})}>%</button>
                    <button className="btn" value="1" onClick={(e) => dispatch({type: 'num', value: e.target.value})}>1</button>
                    <button className="btn" value="2" onClick={(e) => dispatch({type: 'num', value: e.target.value})}>2</button>
                    <button className="btn" value="3" onClick={(e) => dispatch({type: 'num', value: e.target.value})}>3</button>
                    <button className="btn" onClick={() => dispatch({type: '-'})}>-</button>
                    <button className="btn" value="4" onClick={(e) => dispatch({type: 'num', value: e.target.value})}>4</button>
                    <button className="btn" value="5" onClick={(e) => dispatch({type: 'num', value: e.target.value})}>5</button>
                    <button className="btn" value="6" onClick={(e) => dispatch({type: 'num', value: e.target.value})}>6</button>
                    <button className="btn" onClick={() => dispatch({type: '+'})}>+</button>
                    <button className="btn" value="7" onClick={(e) => dispatch({type: 'num', value: e.target.value})}>7</button>
                    <button className="btn" value="8" onClick={(e) => dispatch({type: 'num', value: e.target.value})}>8</button>
                    <button className="btn" value="9" onClick={(e) => dispatch({type: 'num', value: e.target.value})}>9</button>
                    <button className="btn" value="0" onClick={(e) => dispatch({type: 'num', value: e.target.value})}>0</button>
                    <button className="btn" onClick={() => dispatch({type: '.'})}>.</button>
                    <button className="btn" onClick={() => dispatch({type: 'DEL'})}>DEL</button>
                    <button className="btn equal" onClick={() => dispatch({type: '='})}>=</button>
                </div>
        </div>
        
    );
}

export default Calculator