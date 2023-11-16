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
        <div className="App" style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
            <div style={{ flex: 1, overflowY: "scroll" }}>
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
            <div style={{ flex: 1, backgroundColor: "#f0f0f0", padding: "10px" }}>
                <h2>Chatbot Interface</h2>
                {/* Placeholder for chatbot interface */}
                <textarea style={{ width: "100%", height: "90%" }} placeholder="Chatbot will go here"></textarea>
            </div>
        </div>
    );
}

export default SummarizerPage;
