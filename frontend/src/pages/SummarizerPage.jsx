import React, { useState } from "react";

const SummarizerPage = () => {
    const [file, setFile] = useState(null);

    function onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            setFile(URL.createObjectURL(file));
        }
    }

    return (
        <div className="App" style={{ display: "flex", flexDirection: "row", height: "100vh", backgroundColor: "white" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ overflowY: "scroll", height: "50vh", width: "90%" }}>
                    <input type="file" onChange={onFileChange} accept="application/pdf" />
                    {file && (
                        <iframe 
                            src={file} 
                            style={{ width: "100%", height: "100%" }}
                            title="PDF Viewer"
                        ></iframe>
                    )}
                </div>
                <div style={{ height: "50vh", width: "90%", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ color: "#B8E4BC" }}>Flashcard UI Placeholder</p>
                </div>
            </div>
            <div style={{ flex: 1, padding: "10px", height: "100vh" }}>
                <h2 style={{ color: "#3B8070" }}>Chatbot Interface</h2>
                <textarea style={{ width: "100%", height: "90%", borderColor: "#B8E4BC" }} placeholder="Chatbot will go here"></textarea>
            </div>
        </div>
    );
}

export default SummarizerPage;
