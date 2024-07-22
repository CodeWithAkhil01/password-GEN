import { useState, useCallback, useEffect, useRef } from "react";
function App() {
  
  const [length, setLength] = useState(6);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  //   use REFHOOK
  const passwordRef = useRef(null);

  // using callback hook & adding state values
  const passwordGenerator = useCallback(() => {
    let pswrd = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*+-[]{}";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pswrd += str.charAt(char);
    }
    setPassword(pswrd);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    // for optimization of copying value ,select krke b dikhata h  
    passwordRef.current?.select()
 // passwordRef.current?.setSelectionRange(0,3);

    // to save pw to clipboard of device we need to access window obj
    window.navigator.clipboard.writeText(Password)
  }, [Password]);

  // inme kuch b ho to dubara se run krdo - lenght, numberallowed vgara
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <>
      <div className="w-full  max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 ">
        <h1 className="text-white text-center my-3">password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={Password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            // reference is passwordRef of ref hook
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0 hover:bg-lime-600"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm  gap-x-2">
          <div className="flex  items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1 ">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setnumberAllowed(
                  (prev) =>
                    // reversing prev value
                    !prev
                );
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                // fired a callback bcoz isme hme previous value ka access milta h
                setcharAllowed((prev) => !prev);
                // we cant do like  setCharAllowed(true)  bcoz ek bar checkbox p tick krne k bad true hi rh jayga
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
