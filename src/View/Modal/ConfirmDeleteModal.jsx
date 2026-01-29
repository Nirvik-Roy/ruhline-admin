import React from 'react'
import Button from '../../Components/Button'
import './Modal.css'

const ConfirmDeleteModal = ({ open, onClose, onConfirm, message, confirmLabel = 'Delete', loading = false }) => {
    if (!open) return null
    return (
        <>
            <div className='modal_wrapper' onClick={onClose} style={{ zIndex: 10000 }}></div>
            <div className='modal_div' style={{ maxWidth: '420px', zIndex: 10001 }}>
                <h4>Delete shift</h4>
                <i className="fa-solid fa-xmark" onClick={onClose}></i>
                <p style={{ margin: '20px 0 24px', fontSize: '15px', color: 'var(--text-color)' }}>
                    {message}
                </p>
                <div className='change_cancel_wrapper'>
                    <button type="button" onClick={onClose}>Cancel</button>
                    <Button
                        children={loading ? 'Deleting...' : confirmLabel}
                        onClick={() => !loading && onConfirm()}
                        styles={loading ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
                    />
                </div>
            </div>
        </>
    )
}

export default ConfirmDeleteModal
