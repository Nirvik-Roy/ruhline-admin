import React, { useState } from 'react'
import './Payouts.css'
const Payouts = () => {
    const [index,setIndex]=useState(0)
    const [dropdown,setdropdown]=useState({
        dropdown1:false,
        dropdown2:false
    })
    const dropdownfunc = (i) =>{
        setIndex(i)
        if(index === i ){
            dropdownfunc(0)
        }else{

            setdropdown({
                dropdown1 : i === 1 ? true :  false,
                dropdown2 : i === 2 ? true : false
            })
        }
    }
    return (
        <>
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Find your Motivation</h2>
                        <small>Program Creation / Yoga Program 1 / Find your Motivation</small>
                    </div>

                    <div className='coaches_button_wapper'>

                        <div className='total_orders_select_wrapper'>
                            <div onClick={(()=>{dropdownfunc(1)})}  style={{
                                position: 'relative',
                                cursor: 'pointer'
                            }}>
                                <p>
                                   Payout frequency
                                </p>
                                <i class="fa-solid fa-angle-down"></i>

                                {dropdown.dropdown1 && <div onClick={((e) => e.stopPropagation())} className='dropdown_wrapper'>
                                    <p>Last month</p>
                                    <p>Last 7 days</p>
                                </div>}
                            </div>
                        </div>

                        <div className='total_orders_select_wrapper'>
                            <div onClick={(()=>dropdownfunc(2))}  style={{
                                position: 'relative',
                                cursor: 'pointer'
                            }}>
                                <p>
                                Commission %
                                </p>
                                <i class="fa-solid fa-angle-down"></i>

                                {dropdown.dropdown2 && <div onClick={((e) => e.stopPropagation())} className='dropdown_wrapper' style={{
                                    height:'150px',
                                    overflowY:'auto',
                                    bottom:'-160px'
                                }}>
                                   {[1,2,3,4,5,6,7,8,9,1,2,3,4,5].map((e,i)=>{
                                    return(
                                    <p>{e}</p>
                                    )
                                   })}
                                </div>}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Payouts
