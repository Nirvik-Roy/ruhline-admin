import React, { useRef, useEffect, useState, useCallback } from "react";
import "./CustomTextEditor.css";

function CustomTextEditor({
    name,
    required,
    defaultValue = "",
    onChange,
    label,
    readOnly = false  // New prop with default value
}) {
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
        if (readOnly) return; // Prevent styling in readOnly mode
        document.execCommand(command, false, value);
        editorRef.current.focus();
        syncContent();
    };

    const handleEditorInput = () => {
        if (readOnly) return; // Prevent input in readOnly mode
        syncContent();
    };

    const handleEditorBlur = () => {
        if (readOnly) return; // Prevent sync in readOnly mode
        syncContent();
    };

    // If you want to keep the clear button functionality but disable it in readOnly mode:
    // const handleClear = () => {
    //     if (readOnly) return;
    //     if (editorRef.current) {
    //         editorRef.current.innerHTML = "";
    //         syncContent("");
    //     }
    // };

    return (
        <div className="input_form">
            <label>
                {label} {required && <span>*</span>}
                {/* Optional: Show read-only indicator */}
                {/* {readOnly && (
                    <span style={{
                        marginLeft: '10px',
                        fontSize: '12px',
                        color: '#666',
                        fontStyle: 'italic'
                    }}>
                        (Read Only)
                    </span>
                )} */}
            </label>

            <div className="editor-container">
                {/* Toolbar - only show when not readOnly */}
                {!readOnly && (
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
                )}

                {/* Hidden textarea for form submission */}
                <textarea
                    ref={textareaRef}
                    name={name}
                    style={{ display: "none" }}
                    defaultValue={defaultValue}
                    readOnly
                />

                {/* Editable Typing Area - conditionally set contentEditable */}
                <div
                    ref={editorRef}
                    className={`editor ${readOnly ? 'editor-readonly' : ''}`} // Add CSS class for styling
                    contentEditable={!readOnly} // Disable editing when readOnly is true
                    suppressContentEditableWarning={true}
                    onInput={handleEditorInput}
                    onBlur={handleEditorBlur}
                    onPaste={(e) => {
                        if (readOnly) {
                            e.preventDefault();
                            return;
                        }
                        e.preventDefault();
                        const text = e.clipboardData.getData('text/plain');
                        document.execCommand('insertText', false, text);
                        syncContent();
                    }}
                    onKeyDown={(e) => {
                        if (readOnly) {
                            // Prevent all keyboard modifications in readOnly mode
                            e.preventDefault();
                            return;
                        }

                        // Allow normal editing operations only when not readOnly
                        if (e.key === 'Backspace' || e.key === 'Delete') {
                            // Let the browser handle it, then sync
                            setTimeout(() => syncContent(), 0);
                        }
                    }}
                    placeholder={readOnly ? "" : "Type here..."} // Remove placeholder in readOnly mode
                />
            </div>
        </div>
    );
}

export default CustomTextEditor; 