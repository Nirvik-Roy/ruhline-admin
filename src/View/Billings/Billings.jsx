import React, { useState } from 'react'
import Button from '../../Components/Button'
import img from '../../assets/a1380e7f99749ba01d9fdc18ec22e32c85fd5a0e.jpg'
import ellipse from '../../assets/_MoreIcon_.svg'
import Pagination from '../../Components/Pagination/Pagination'
import { useNavigate } from 'react-router-dom'
import CreateInvoiceModal from '../Modal/CreateInvoiceModal'
import EditInvoiceModal from '../Modal/EditInvoiceModal'
const Billings = () => {
  const [index, setIndex] = useState([]);
  const navigate = useNavigate();
  const [modal, setModal] = useState({
    invoice: false,
    edit: false,
  })
  const indexFunction = (i) => {
    if (index.includes(i)) {
      setIndex(prev => prev.filter((e) => e != i))
    } else {
      setIndex([...index, i])
    }
  }
  const modalFunction = (i) => {
    setModal({
      invoice: i === 1 ? true : false,
      edit: i === 2 ? true : false
    })
  }
  return (
    <>
      {modal.invoice && <CreateInvoiceModal modalFunction={modalFunction} />}
      {modal.edit && <EditInvoiceModal modalFunction={modalFunction} />}
      <div className='dashboard_container'>
        <div className='coaches_head_wrapper'>
          <h2>Billings</h2>
          <div className='coaches_button_wapper'>
            <div onClick={(() => modalFunction(1))}>
              <Button children={'Create invoice'} styles={{
                fontSize: '13px',
                height: '46px'
              }} />
            </div>

            <div className='coaches_search_wrapper'>
              <input placeholder='Search' />
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>

        <div className='table_container'>
          <table className='total_table_order_wrapper coaches_table_wrapper'>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Purchase Date</th>
                <th>Programs</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Payment Status</th>
                <th>Actions</th>

              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6].map((e, i) => (
                <tr>
                  <td>
                    #Order56666
                  </td>
                  <td>
                    27/10/2025
                  </td>
                  <td>Program 1</td>
                  <td>
                    <div className='customer_wrapper' style={{
                      justifyContent: 'flex-start'
                    }}>
                      <div className='customer_img_div'>
                        <img src={img} />
                      </div>
                      <div className='customer_details_wrapper'>
                        <p>Bidisha Bhowmick</p>
                        <p>#ST456666</p>
                      </div>
                    </div>
                  </td>
                  <td>SAR 300</td>
                  <td><p style={{
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: '600',
                    borderRadius: '5px',
                    background: 'rgba(231, 62, 69, 1)',
                    padding: '5px',
                    width: 'fit-content',
                  }}>Pending</p></td>
                  <td>
                    <img onClick={(() => indexFunction(i))} src={ellipse} />
                    {index.includes(i) && <div className='actions_wrapper' style={{
                      width: '100%',
                      textWrap: 'nowrap',
                      bottom:'-70px'
                    }}>
                      <p style={{
                        padding:'5px 10px'
                      }} onClick={(() => {
                        navigate(`/dashboard/billings/single-bill/${i + 1}`)
                      })}>View</p>
                      <p style={{
                        padding:'5px 10px'
                      }} onClick={(() => modalFunction(2))}>Edit</p>
                      <p style={{
                        padding:'5px 10px'
                      }}>Change Status</p>
                    </div>}
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

export default Billings
