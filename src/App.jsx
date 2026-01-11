import React,{ useState, useCallback, useEffect, useRef } from 'react'
import './index.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllow, setNumberAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  let passwordGenerator = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllow) str+="0987654321"
    if(charAllow) str+="!@#$%^&*(){}[]"

    for(let i=1; i<=length;i++){
      let chari = Math.floor(Math.random()*str.length + 1)
      pass+=str[chari]
    }

    setPassword(pass)

  },[length, numberAllow, charAllow, setPassword])

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,5)
    window.navigator.clipboard.writeText(password)
  },[password])


  useEffect(() =>{passwordGenerator()}
  ,[length, numberAllow, charAllow, passwordGenerator])
  return (
    <>
      <div className='w-full h-screen bg-black px-3 py-6 flex justify-center mt-50'>
        <div className='w-150 h-45 bg-gray-800 px-3 py-5 rounded-2xl mb-4'>
          <h1 className='text-3xl text-amber-50 flex justify-center'>Password Generator</h1>
          <div className='flex mt-4 justify-center'>
           <input 
           type="text"
           value={password}
           className='ml-6 bg-amber-50 w-100 py-1 px-3'
           placeholder='Password'
           readOnly
           ref={passwordRef}
           />
           <button 
           onClick={copyToClipboard}
           className='bg-blue-700 py-1 px-3 text-amber-50 text-2xl'>Copy</button>
          </div>
          <div className='text-2xl text-amber-50 flex gap-x-2 mt-5 '>
          <div className='flex items-center gap-x-1 ml-5.5'>
            <input
            type='range'
            value={length}
            min={0}
            max={50}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label className='ml-1'>Length: {length}</label>
          </div>
          <div className='ml-7'>
            <input
            type='checkbox'
            defaultChecked={numberAllow}
            onChange={() => {setNumberAllow((prev) => !prev)}}
            />
            <label>Number</label>
          </div>
          <div className='ml-7'>
            <input
            type='checkbox'
            defaultChecked={charAllow}
            onChange={() => {setCharAllow((prev) => !prev)}}
            />
            <label>Character</label>
          </div>
         </div>
        </div>
      </div>
    </>
  )
}

export default App
