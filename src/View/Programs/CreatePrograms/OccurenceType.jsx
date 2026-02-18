
import Input from '../../../Components/Input'

const OccurenceType = ({ setoccurenceType, occurenceType, handleChange, staticdata }) => {
    return (
        <>

            <div className='occurence_radio_wrapper'>
                <div className='occurence_radio'>
                    <input value={'One Time'} onClick={(() => setoccurenceType('One Time'))} checked={occurenceType === 'One Time'} type='radio' />
                    <label>One time</label>
                </div>

                <div className='occurence_radio'>
                    <input value={'recurring'} onClick={(() => setoccurenceType('recurring'))} checked={occurenceType === 'recurring'} type='radio' />
                    <label>Recurring</label>
                </div>
            </div>

            {occurenceType === 'One Time' && <div className='input_form' style={{
                marginTop: '20px'
            }}>
                <label>Session Duration <span>*</span></label>
                <select name='oneTimeSession' onChange={handleChange}>
                    <option value={''}>--Select-duration--</option>
                    {[30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240]?.map((e, i) => (
                        <option key={i} value={e}>{e} mins</option>
                    ))}
                </select>
            </div>}

            {occurenceType === 'recurring' &&
                <div className='occurence_form_wrapper'>
                    <div className='other_details_grid_wrapper'>
                        <div className='input_form' style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0px'
                        }}>
                            <label style={{
                                fontSize: '13px'
                            }}>Tenure <small style={{
                                fontSize: '10px'
                            }}>(weeks)</small> <span>*</span></label>
                            <Input value={staticdata.tenureWeeks} onChange={handleChange} name={'tenureWeeks'} placeholder={'Enter tenure'} />
                        </div>

                        <div className='input_form' style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0px'
                        }}>
                            <label style={{
                                fontSize: '13px'
                            }}>No of sessions <small style={{
                                fontSize: '10px'
                            }}>per week</small> <span>*</span></label>
                            <Input name={'noofSessions'} onChange={handleChange} value={staticdata.noofSessions} placeholder={'Enter sessions'} />
                        </div>
                    </div>

                    <div className='input_form'>
                        <label style={{
                            fontSize: '13px'
                        }}>Session Duration<span>*</span></label>
                        <select onChange={handleChange} name='recurringSession'>
                        <option value={''}>--select-duration--</option>
                            {[30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240]?.map((e, i) => (
                                <option key={i} value={e}>{e} mins</option>
                            ))}
                        </select>
                    </div>
                </div>}
        </>
    )
}

export default OccurenceType
