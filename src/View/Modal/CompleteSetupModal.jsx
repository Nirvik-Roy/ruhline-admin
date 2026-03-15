import React, { useState } from 'react'
import Button from '../../Components/Button'
import { useParams } from 'react-router-dom'
import { postcompleteSetup } from '../../utils/Program'
import Loaders from '../../Components/Loaders/Loaders'

const CompleteSetupModal = ({ setsetupModal, intermediateId }) => {
    const { id } = useParams()
    const [radioTitle, setradioTitle] = useState('global');
    const [loading, setloading] = useState(false)

    const handleSubmit = async () => {
        try {
            setloading(true)
            const res = await postcompleteSetup({
                mode: radioTitle
            }, id, intermediateId)
            console.log(res)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    return (
        <>
            {loading && <Loaders />}
            <div className='modal_wrapper' onClick={(() => setsetupModal(false))}></div>
            <div className='modal_div'>
                <h4>Complete Setup</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setsetupModal(false))}></i>
                <div className='modules_itermediate_steps_wrapperr' style={{
                    marginTop: '30px'
                }}>
                    <div className='modules_radio_wrapper'>
                        <input checked={radioTitle === 'global'} value={'global'} onChange={((e) => setradioTitle(e.target.value))} type='radio' />
                        <p>Global</p>
                    </div>
                    <div className='modules_radio_wrapper'>
                        <input checked={radioTitle === 'specific'} value={'specific'} onChange={((e) => setradioTitle(e.target.value))} type='radio' />
                        <p>Specific</p>
                    </div>
                </div>

                <Button onClick={handleSubmit} children={'Procced'} styles={{
                    marginLeft: 'auto',
                    marginTop: '30px'
                }} />
            </div>
        </>
    )
}

export default CompleteSetupModal
