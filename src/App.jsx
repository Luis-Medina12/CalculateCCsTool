import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [current, setCurrent] = useState(null)
  const [currValue, setCurrValue] = useState(0);
  const [result, setResult] = useState(0);

  function CalculateCCS(orignalInput){
    setCurrValue(orignalInput);
    let electricHP = 0;

    if(document.getElementById("current").value == "Wattage"){
      // calculate electric HP first

      electricHP = Math.ceil(orignalInput*.00134);
    }else{
      electricHP = orignalInput;
    }

    // Convert to gasoline HP and then to CCs
    // 100 CCS is the minimum rated power, anything below it is rated the same
    if((electricHP*5)*12 <100){
      setResult(100);
    }else{
      setResult((electricHP*5)*12);
    }
    console.log(currValue)
  }

  function handleOriginalChange(original){
    setCurrent(original);
    setCurrValue(0)
    setResult(0);
    document.getElementById("currentValue").value = ''

  }

  return (
    <>
      
      <body>
        <div className='toolContainer'>
          <header>
          <img className = 'logo' src='https://static1.st8fm.com/en_US/dxl-1x/prod/css/images/header/state-farm-logo-4.svg' alt= "State Farm Insurance"></img>
          <div className='tooltitle'>Electric Motorcycle CCs Calculator</div>
          </header>

          <hr></hr>
          
            <div className='inputs'>
              <label for = "current">Which power rating was provided?:  
                <select name='current' id='current' onChange={e => handleOriginalChange(e.target.value)}>
                  <option value='default' selected disabled>Select an Option</option>
                  <option value='Wattage'>Watts</option>
                  <option value='Electric HP'>Electric HP</option>
                </select>
            </label>

            {current!= null && 
              <label for = 'currentValue'> Enter provided {current}:
                <input type='number' id = 'currentValue' onChange={e => CalculateCCS(e.target.value)}></input>
               </label>
            }

            {result != 0 && currValue != "" &&
              <label for = "result"> Calculated CCs from {current}:
                <text> {result}</text>
              </label>
            }

          </div>
        </div>
      </body>
    </>
  )
}

export default App
