import React, { Activity, useState } from 'react'
import Button from '../../../../Components/Button'
import menu from '../../../../assets/menu.svg'
import edit from '../../../../assets/Pencil.svg'
import deleteicon from '../../../../assets/delete.svg'
import './ProgramModule.css'
import AddProgramModule from '../../../Modal/AddProgramModule'
const ProgramModule = () => {
    const [modalIsOpen, setmodalIsOpen] = useState(false)
    return (
        <>

            <Activity mode={modalIsOpen ? 'visible' : 'hidden'}>
                <AddProgramModule setmodalIsOpen={setmodalIsOpen} />
            </Activity>
            <div className='program_modules_wrapper'>
                <div className='program_module_head_wrapper'>
                    <h2>Modules</h2>
                    <div onClick={(() => setmodalIsOpen(true))}>
                        <Button children={'Add Module'} styles={{
                            border: '1px solid var(--primary-color)',
                            color: 'var(--text-color)',
                            background: 'transparent'
                        }} />
                    </div>
                </div>
                <div className='added_modules_wrapper'>
                    <div className='add_modules_enu_wrapper'>
                        <img src={menu} />
                        <p>Values</p>
                    </div>
                    <div className='edit_modules_wrapper'>
                        <img src={edit} />
                        <img src={deleteicon} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProgramModule
