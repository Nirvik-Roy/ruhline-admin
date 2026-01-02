import React, { useRef } from "react";
import "./CustomTextEditor.css"; // optional for styling

function CustomTextEditor({ label, required,defaultValue }) {
    const editorRef = useRef(null);

    const applyStyle = (command) => {
        document.execCommand(command, false, null);
        editorRef.current.focus();
    };

    return (
        <div className="input_form">
            <label>{label} {required && <span>*</span>}</label>
            <div className="editor-container">
                {/* Toolbar */}
                <div className="toolbar">
                    <button onClick={() => applyStyle("bold")}>B</button>
                    <button onClick={() => applyStyle("italic")}>I</button>
                    <button onClick={() => applyStyle("underline")}>U</button>
                </div>

                {/* Editable Typing Area */}
                <div
                onChange={((e)=>console.log(e.target))}
                    ref={editorRef}
                    className="editor"
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    
                ></div>
            </div>
        </div>

    );
}

export default CustomTextEditor;
