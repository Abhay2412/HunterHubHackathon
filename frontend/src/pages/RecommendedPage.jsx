import React, { useState, useEffect } from "react";



const RecommendedPage = () => {
    const [state, setState] = useState(0);
  
    useEffect(() => {
      fetch('http://localhost:8000/api/recommend').then(res => res.json()).then(data => {
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

export default RecommendedPage