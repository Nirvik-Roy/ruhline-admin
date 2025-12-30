import React, { useState } from 'react'
import Button from '../../Components/Button'
import img from '../../assets/a1380e7f99749ba01d9fdc18ec22e32c85fd5a0e.jpg'
import ellipse from '../../assets/_MoreIcon_.svg'
import Pagination from '../../Components/Pagination/Pagination'
import { Link, useNavigate } from 'react-router-dom'
const EditInvoiceModal = ({ modalFunction, setModal }) => {
    const [index, setIndex] = useState([]);
    const navigate = useNavigate()
    const indexFunction = (i) => {
        if (index.includes(i)) {
            setIndex(prev => prev.filter((e) => e != i))
        } else {
            setIndex([...index, i])
        }
    }
    return (
        <>
            <div className='modal_wrapper' onClick={(() => {
                if (setModal) {
                    setModal(false)
                }
                modalFunction(0)


            })}></div>
            <div className='modal_div'>
                <h4>#3492</h4>
                <i onClick={(() => {
                    if (setModal) {
                        setModal(false)
                    }
                    modalFunction(0)
                })} class="fa-solid fa-xmark"></i>
                <form className='modal_form'>
                    <div className='input_form'>
                        <label>Select Customer<span>*</span></label>
                        <select>
                            <option>Bidisha Bhowmick</option>
                        </select>
                    </div>
                    <div className='input_form'>
                        <label>Select Program<span>*</span></label>
                        <select>
                            <option>Program 1</option>
                        </select>
                    </div>
                    <h3 style={{
                        fontWeight: '600',
                        color: 'var(--text-color)'
                    }}>Coupon</h3>

                    <div className='coupon_input_wrapper'>
                        <input type='text' placeholder='Have a code? type it here...' />
                        <Link>Apply</Link>
                    </div>
                    <div className='order_summary_wrapper'>
                        <h3>Order Summary</h3>

                        <div className='order_summary_list_wrapper'>
                            <p>Customer ID: <span>#CUS85630</span></p>
                            <p>Program Price <span>SAR128.78</span></p>
                            <p>Coupon Discount <span>-SAR4.78</span></p>
                        </div>

                        <div className='total_wrapper'>
                            <h4>Total</h4>
                            <h4>SAR20</h4>
                        </div>
                    </div>
                    <div className='change_cancel_wrapper' onClick={(() => {
                        if (setModal) {
                            setModal(false)
                        }
                        modalFunction(0)
                    })}>
                        <Button children={'Update'} />
                    </div>


                </form>
            </div>
        </>
    )
}

export default EditInvoiceModal
