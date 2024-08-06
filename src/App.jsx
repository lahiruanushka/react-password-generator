import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [butttonText, setButtonText] = useState("copy");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumberAllowed) str += "0123456789";
    if (isCharAllowed) str += "!@#$%^&*()_+";

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, isCharAllowed, isNumberAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, isNumberAllowed, isCharAllowed]);

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      passwordRef.current?.select();
      setButtonText("Copied");
      setTimeout(() => setButtonText("Copy"), 2000);
    });
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Password Generator
      </h1>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={password}
          placeholder="Generated Password"
          readOnly
          className="flex-1 px-4 py-2 border border-gray-600 rounded-l-md bg-gray-800 text-gray-300"
          ref={passwordRef}
        />
        <button
          className="ml-2 px-4 py-2 bg-orange-500 text-white rounded-r-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          onClick={copyPasswordToClipboard}
        >
          {butttonText}
        </button>
      </div>
      <div className="mb-6">
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="w-full"
        />
        <div className="flex justify-between mt-2 text-gray-400 text-sm">
          <span>Length: {length}</span>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isNumberAllowed}
            onChange={() => setIsNumberAllowed((prev) => !prev)}
            id="number"
            className="mr-2"
          />
          <label htmlFor="number" className="text-gray-300">
            Include Numbers
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isCharAllowed}
            onChange={() => setIsCharAllowed((prev) => !prev)}
            id="characters"
            className="mr-2"
          />
          <label htmlFor="characters" className="text-gray-300">
            Include Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
