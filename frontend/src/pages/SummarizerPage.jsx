import React, { useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const SummarizerPage = () => {
    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState(null);

    function onFileChange(event) {
        setFile(event.target.files[0]);
    }

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div className="App" style={{ display: "flex", flexDirection: "row", height: "100vh", backgroundColor: "white" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center"}}>
                <div style={{ overflowY: "scroll", height: "50vh", width: "90%", scrollbarWidth: "thin" }}>
                    <input type="file" onChange={onFileChange} accept="application/pdf" />
                    {file && (
                        <Document
                            file={file}
                            onLoadSuccess={onDocumentLoadSuccess}
                        >
                            {Array.from(new Array(numPages), (el, index) => (
                                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                            ))}
                        </Document>
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
