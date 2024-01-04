import React, { useEffect, useState } from "react";

export const ParsePage = () => {
    const [state, setState] = useState(0);
  
    useEffect(() => {
      fetch('https://scholarly-akool.koyeb.app/api/parse').then(res => res.json()).then(data => {
        setState(data.data);
      });
    }, []);
  
    return (
      <div className="App">
        <header className="App-header">
            <p>{state}</p>
        </header>
      </div>
    );
}