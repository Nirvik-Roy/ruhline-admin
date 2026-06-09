import React, { useEffect, useState } from 'react'
import Button from '../../Components/Button'
import { postPayoutFrequency } from '../../utils/payouts'
import Loaders from '../../Components/Loaders/Loaders'
import toast from 'react-hot-toast'

const PayoutFrequencyModal = ({ setmodalIsOpen, callPayoutFunction, payoutFrequency }) => {
    const [radioData, setradioData] = useState('')
    const [loading, setloading] = useState(false)
    

    useEffect(()=>{
        setradioData(payoutFrequency)
    }, [payoutFrequency])
    const callPostPrequency = async () => {
        if (radioData != '') {
            setloading(true)
            const res = await postPayoutFrequency({
                payout_frequency: radioData
            })
            if (res?.success) {
                setmodalIsOpen(false)
                callPayoutFunction()
            }
            setloading(false)
        } else {
            toast.error('Plz make any one selection...')
        }
    }
    return (
        <>
            <div className='modal_wrapper'></div>
            <div className='modal_div'>
                <h4>Payout frequency</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setmodalIsOpen(false))}></i>
                <div className='payouts_radio_buttons_wrapper' style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '30px',
                    margin: '30px 0 20px 0'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <input value={'7_days'} checked={radioData == '7_days'} onChange={((e) => setradioData(e.target.value))} type='radio' style={{
                            width: '17px',
                            height: '17px',
                            accentColor: 'var(--primary-color)'
                        }} />
                        <p style={{
                            fontSize: '15px',
                            color: 'var(--text-color)',
                            fontWeight: '600'
                        }}>7 Days</p>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <input value={'14_days'} checked={radioData == '14_days'} onChange={((e) => setradioData(e.target.value))} type='radio' style={{
                            width: '15px',
                            height: '15px',
                            accentColor: 'var(--primary-color)'
                        }} />
                        <p style={{
                            fontSize: '15px',
                            color: 'var(--text-color)',
                            fontWeight: '600'
                        }}>14 Days</p>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <input value={'monthly'} checked={radioData == 'monthly'} onChange={((e) => setradioData(e.target.value))} type='radio' style={{
                            width: '15px',
                            height: '15px',
                            accentColor: 'var(--primary-color)'
                        }} />
                        <p style={{
                            fontSize: '15px',
                            color: 'var(--text-color)',
                            fontWeight: '600'
                        }}>Monthly</p>
                    </div>
                </div>

                <Button loading={loading} loadingText='Saving...' onClick={callPostPrequency} styles={{
                    marginLeft: 'auto'
                }} children={'Save'} />
            </div>
        </>
    )
}

export default PayoutFrequencyModal
