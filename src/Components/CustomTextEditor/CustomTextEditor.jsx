import React, { useRef, useEffect, useState } from "react";
import "./CustomTextEditor.css"; // optional for styling

function CustomTextEditor({ label, required, defaultValue, onChange }) {
    const editorRef = useRef(null);
    const textareaRef = useRef(null);
    const [content, setContent] = useState(defaultValue || "");

    // Sync contentEditable div with textarea
    const syncContent = () => {
        if (editorRef.current && textareaRef.current) {
            const htmlContent = editorRef.current.innerHTML;
            setContent(htmlContent);

            // Call onChange prop if provided
            if (onChange) {
                onChange(htmlContent);
            }

            // Sync with hidden textarea
            textareaRef.current.value = htmlContent;
        }
    };

    // Initialize content
    useEffect(() => {
        if (editorRef.current && defaultValue) {
            editorRef.current.innerHTML = defaultValue;
            syncContent();
        }
    }, [defaultValue]);

    const applyStyle = (command, value = null) => {
        document.execCommand(command, false, value);
        editorRef.current.focus();
        syncContent();
    };

    const handleEditorInput = () => {
        syncContent();
    };

    const handleEditorBlur = () => {
        syncContent();
    };

    return (
        <div className="input_form">
            <label>
                {label} {required && <span>*</span>}
            </label>

            <div className="editor-container">
                {/* Toolbar */}
                <div className="toolbar">
                    <button type="button" onClick={() => applyStyle("bold")}>B</button>
                    <button type="button" onClick={() => applyStyle("italic")}>I</button>
                    <button type="button" onClick={() => applyStyle("underline")}>U</button>

                    {/* LIST BUTTONS */}
                    <button type="button" onClick={() => applyStyle("insertOrderedList")}>
                        <i className="fa-solid fa-list"></i>
                    </button>
                </div>

                {/* Hidden textarea for form submission */}
                <textarea
                    ref={textareaRef}
                    name={`${label}`}
                    style={{ display: "none" }}
                    value={content}
                    readOnly
                />

                {/* Editable Typing Area (still contentEditable for rich text) */}
                <div
                    ref={editorRef}
                    className="editor"
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    onInput={handleEditorInput}
                    onBlur={handleEditorBlur}
                    dangerouslySetInnerHTML={{ __html: defaultValue }}
                />
            </div>
        </div>
    );
}

export default CustomTextEditor;