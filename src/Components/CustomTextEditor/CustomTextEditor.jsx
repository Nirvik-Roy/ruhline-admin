import React, { useRef, useEffect, useState, useCallback } from "react";
import "./CustomTextEditor.css";

function CustomTextEditor({ name, required, defaultValue = "", onChange, label }) {
    const editorRef = useRef(null);
    const textareaRef = useRef(null);
    const [content, setContent] = useState(defaultValue);
    const [isDirty, setIsDirty] = useState(false);

    // Memoized sync function
    const syncContent = useCallback((newContent) => {
        const htmlContent = newContent || (editorRef.current ? editorRef.current.innerHTML : '');

        setContent(htmlContent);

        if (textareaRef.current) {
            textareaRef.current.value = htmlContent;
        }

        if (onChange) {
            onChange(htmlContent);
        }

        setIsDirty(true);
    }, [onChange]);

    // Initialize with defaultValue
    useEffect(() => {
        if (editorRef.current && defaultValue && !isDirty) {
            editorRef.current.innerHTML = defaultValue;
            syncContent(defaultValue);
        }
    }, [defaultValue, isDirty, syncContent]);

    // Reset when defaultValue is cleared (e.g., form reset)
    useEffect(() => {
        if (editorRef.current && defaultValue === "" && content !== "") {
            editorRef.current.innerHTML = "";
            syncContent("");
            setIsDirty(false);
        }
    }, [defaultValue, content, syncContent]);

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

    // const handleClear = () => {
    //     if (editorRef.current) {
    //         editorRef.current.innerHTML = "";
    //         syncContent("");
    //     }
    // };

    return (
        <div className="input_form">
            <label>
                {label} {required && <span>*</span>}
                {/* <button
                    type="button"
                    onClick={handleClear}
                    style={{ marginLeft: '10px', fontSize: '12px' }}
                    title="Clear content"
                >
                    Clear
                </button> */}
            </label>

            <div className="editor-container">
                {/* Toolbar */}
                <div className="toolbar">
                    <button type="button" onClick={() => applyStyle("bold")} title="Bold">
                        <strong>B</strong>
                    </button>
                    <button type="button" onClick={() => applyStyle("italic")} title="Italic">
                        <em>I</em>
                    </button>
                    <button type="button" onClick={() => applyStyle("underline")} title="Underline">
                        <u>U</u>
                    </button>
                    <button type="button" onClick={() => applyStyle("insertOrderedList")} title="Ordered List">
                        <i className="fa-solid fa-list-ol"></i>
                    </button>
                    <button type="button" onClick={() => applyStyle("insertUnorderedList")} title="Bulleted List">
                        <i className="fa-solid fa-list"></i>
                    </button>
                </div>

                {/* Hidden textarea for form submission */}
                <textarea
                    ref={textareaRef}
                    name={name}
                    style={{ display: "none" }}
                    defaultValue={defaultValue}
                    readOnly
                />

                {/* Editable Typing Area */}
                <div
                    ref={editorRef}
                    className="editor"
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    onInput={handleEditorInput}
                    onBlur={handleEditorBlur}
                    onPaste={(e) => {
                        e.preventDefault();
                        const text = e.clipboardData.getData('text/plain');
                        document.execCommand('insertText', false, text);
                        syncContent();
                    }}
                    onKeyDown={(e) => {
                        // Allow normal editing operations
                        if (e.key === 'Backspace' || e.key === 'Delete') {
                            // Let the browser handle it, then sync
                            setTimeout(() => syncContent(), 0);
                        }
                    }}
                    placeholder="Type here..."
                />
            </div>
        </div>
    );
}

export default CustomTextEditor;