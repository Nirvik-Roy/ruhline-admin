import React, { useRef, useEffect, useState, useCallback } from "react";
import "./CustomTextEditor.css";

function CustomTextEditor({
    name,
    required,
    defaultValue = "",
    onChange,
    label,
    readOnly = false
}) {
    const editorRef = useRef(null);
    const textareaRef = useRef(null);
    const [content, setContent] = useState(defaultValue);
    const [isDirty, setIsDirty] = useState(false);

    // Helper function to normalize empty content
    const normalizeContent = useCallback((htmlContent) => {
        if (!htmlContent) return "";

        // Remove all whitespace, <br> tags, and empty divs
        const testDiv = document.createElement('div');
        testDiv.innerHTML = htmlContent;

        // Check if there's any visible text content
        const hasContent = testDiv.textContent && testDiv.textContent.trim().length > 0;

        // Check if there are any meaningful elements (not just formatting)
        const meaningfulElements = testDiv.querySelectorAll('*');
        let hasMeaningfulElements = false;

        meaningfulElements.forEach(el => {
            // If element has text content, attributes, or is not just a line break
            if (el.textContent && el.textContent.trim().length > 0) {
                hasMeaningfulElements = true;
            }
            if (el.hasAttributes() && el.attributes.length > 0) {
                hasMeaningfulElements = true;
            }
        });

        // If no content and no meaningful elements, return empty string
        if (!hasContent && !hasMeaningfulElements) {
            return "";
        }

        return htmlContent;
    }, []);

    // Memoized sync function
    const syncContent = useCallback((newContent) => {
        const rawContent = newContent || (editorRef.current ? editorRef.current.innerHTML : '');
        const normalizedContent = normalizeContent(rawContent);

        setContent(normalizedContent);

        if (textareaRef.current) {
            textareaRef.current.value = normalizedContent;
        }

        if (onChange) {
            onChange(normalizedContent);
        }

        setIsDirty(true);
    }, [onChange, normalizeContent]);

    // Clean up empty content in the editor
    const cleanEditorContent = useCallback(() => {
        if (!editorRef.current) return;

        const html = editorRef.current.innerHTML;
        const normalized = normalizeContent(html);

        if (html !== normalized) {
            editorRef.current.innerHTML = normalized;
        }
    }, [normalizeContent]);

    // Initialize with defaultValue
    useEffect(() => {
        if (editorRef.current && defaultValue && !isDirty) {
            const normalizedDefault = normalizeContent(defaultValue);
            editorRef.current.innerHTML = normalizedDefault;
            syncContent(normalizedDefault);
        }
    }, [defaultValue, isDirty, syncContent, normalizeContent]);

    // Reset when defaultValue is cleared (e.g., form reset)
    useEffect(() => {
        if (editorRef.current && defaultValue === "" && content !== "") {
            editorRef.current.innerHTML = "";
            syncContent("");
            setIsDirty(false);
        }
    }, [defaultValue, content, syncContent]);

    const applyStyle = (command, value = null) => {
        if (readOnly) return;
        document.execCommand(command, false, value);

        // Clean up after applying style
        setTimeout(cleanEditorContent, 0);

        editorRef.current.focus();
        syncContent();
    };

    const handleEditorInput = () => {
        if (readOnly) return;

        // Clean up the content during input
        setTimeout(cleanEditorContent, 0);

        syncContent();
    };

    const handleEditorBlur = () => {
        if (readOnly) return;

        // Final cleanup on blur
        cleanEditorContent();
        syncContent();
    };

    const handleEditorPaste = (e) => {
        if (readOnly) {
            e.preventDefault();
            return;
        }

        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);

        // Clean up after paste
        setTimeout(() => {
            cleanEditorContent();
            syncContent();
        }, 0);
    };

    return (
        <div className="input_form">
            <label>
                {label} {required && <span>*</span>}
            </label>

            <div className="editor-container">
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

                <textarea
                    ref={textareaRef}
                    name={name}
                    style={{ display: "none" }}
                    defaultValue={defaultValue}
                    readOnly
                />

                <div
                    ref={editorRef}
                    className={`editor ${readOnly ? 'editor-readonly' : ''}`}
                    contentEditable={!readOnly}
                    suppressContentEditableWarning={true}
                    onInput={handleEditorInput}
                    onBlur={handleEditorBlur}
                    onPaste={handleEditorPaste}
                    onKeyDown={(e) => {
                        if (readOnly) {
                            e.preventDefault();
                            return;
                        }

                        if (e.key === 'Backspace' || e.key === 'Delete') {
                            setTimeout(() => {
                                cleanEditorContent();
                                syncContent();
                            }, 0);
                        }
                    }}
                    placeholder={readOnly ? "" : "Type here..."}
                />
            </div>
        </div>
    );
}

export default CustomTextEditor;