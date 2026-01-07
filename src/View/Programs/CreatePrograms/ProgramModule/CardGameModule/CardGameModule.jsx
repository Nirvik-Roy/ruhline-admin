import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../../../../Components/Button'
import ellipse from '../../../../../assets/_MoreIcon_.svg'
import Pagination from '../../../../../Components/Pagination/Pagination';
import CardViewModal from '../../../../Modal/CardViewModal';

const CardGameModule = () => {
    const [index, setIndex] = useState([]);
    const [modal, setModal] = useState({
        viewCard: false,
        editCard: false
    })
    const navigate = useNavigate()
    const indexFunction = (i) => {
        if (index.includes(i)) {
            setIndex(prev => prev.filter((e) => e != i))
        } else {
            setIndex([...index, i])
        }
    }

    const Modalfunc = (i) => {
        setModal({
            viewCard: i === 1 ? true : false,
            editCard: i === 2 ? true : false
        })
    }
    return (
        <>
            {modal.viewCard && <CardViewModal setModal={setModal} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Card Game</h2>
                        <small>Program Creation / Yoga Program 1 / Card Game</small>
                    </div>

                    <div className='coaches_button_wapper'>
                        <div>
                            <Button children={'Questions'} styles={{
                                fontSize: '13px'
                            }} />
                        </div>
                    </div>
                </div>

                <div className='table_container'>
                    <table className='total_table_order_wrapper coaches_table_wrapper'>
                        <thead>
                            <tr>
                                <th>Card Name</th>
                                <th>Description</th>
                                <th style={{
                                    width: '170px',
                                    minWidth: '170px',
                                    textAlign: 'center'
                                }}>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((e, i) => (
                                <tr>
                                    <td>
                                        <div className='customer_wrapper' style={{
                                            justifyContent: 'flex-start'
                                        }}>

                                            <div className='customer_details_wrapper'>
                                                <p>Anxiety</p>
                                                <p>Card 1</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi...</td>
                                    <td>
                                        <div style={{
                                            position: 'relative'
                                        }}>
                                            <img onClick={(() => indexFunction(i))} src={ellipse} />
                                            {index.includes(i) && <div className='actions_wrapper' style={{
                                                bottom: '-90px'
                                            }}>
                                                <p onClick={(() => {
                                                    Modalfunc(1)
                                                })}>View</p>
                                                <p onClick={(() => { Modalfunc(2) })}>Edit</p>
                                            </div>}

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination />
            </div>
        </>
    )
}

export default CardGameModule
