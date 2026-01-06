
import Textarea from '../../Components/Textarea'
import Button from '../../Components/Button'
import crossIcon from '../../assets/Frame 1984078314.svg'
import Input from '../../Components/Input'
const SingleChoiceModal = ({tabsFunction}) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => tabsFunction(0))}></div>
            <div className='modal_div'>
                <h4>Single Choice</h4>
                <i class="fa-solid fa-xmark" onClick={(() => tabsFunction(0))}></i>
                <div style={{
                    margin: '20px 0 0 0'
                }}>
                    <Textarea styles={{
                        height: '70px'
                    }} label={'Question'} required={true} />
                </div>

                <div className='options_wrapper466885'>
                    <h3>Options</h3>
                    <Button children={'Add Option'} styles={{
                        backgroundColor: 'transparent',
                        border: '1px solid var(--primary-color)',
                        color: 'var(--text-color)',
                        padding: '10px',
                        fontSize: '12px'
                    }} />
                </div>

                <div className='options_list_wrapper46656'>
                    <div className='options_1_wrapper456'>
                        <div className='option_left_wrapper'>
                            <Textarea label={'Option 1'} required={true} styles={{
                                height: '70px'
                            }} placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod '} />
                        </div>
                        <div className='option_right_wrapper'>
                            <img src={crossIcon} />
                        </div>
                    </div>




                    <div className='options_1_wrapper456'>
                        <div className='option_left_wrapper'>
                            <Textarea label={'Option 2'} required={true} styles={{
                                height: '70px'
                            }} placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod '} />
                        </div>
                        <div className='option_right_wrapper'>
                            <img src={crossIcon} />
                        </div>
                    </div>



                    <div className='options_1_wrapper456'>
                        <div className='option_left_wrapper'>
                            <Textarea label={'Option 3'} required={true} styles={{
                                height: '70px'
                            }} placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod '} />
                        </div>
                        <div className='option_right_wrapper'>
                            <img src={crossIcon} />
                        </div>
                    </div>


                    <div className='options_1_wrapper456'>
                        <div className='option_left_wrapper'>
                            <Textarea label={'Option 4'} required={true} styles={{
                                height: '70px'
                            }} placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod '} />
                        </div>
                        <div className='option_right_wrapper'>
                            <img src={crossIcon} />
                        </div>
                    </div>

                    <div className='change_cancel_wrapper' style={{
                        margin: '20px 0 0 0'
                    }}>
                        <Button children={'Add'} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleChoiceModal
