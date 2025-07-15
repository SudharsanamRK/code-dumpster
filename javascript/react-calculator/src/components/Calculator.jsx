import { useState } from 'react';

export default function Calculator() {
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    if (value === 'C') {
      setResult('');
    } else if (value === '=') {
      try {
        setResult(eval(result).toString());
      } catch {
        setResult('Error');
      }
    } else {
      setResult(result + value);
    }
  };

  const buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-80">
      <div className="text-2xl mb-4 text-right p-2 border rounded bg-gray-50 font-mono">
        {result || '0'}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={() => handleClick(btn)}
            className="text-xl p-4 bg-blue-100 rounded-xl hover:bg-blue-200 transition"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
