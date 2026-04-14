import React, { useEffect, useRef, useState } from 'react'
import Button from '../../Components/Button'
import img from '../../assets/a1380e7f99749ba01d9fdc18ec22e32c85fd5a0e.jpg'
import ellipse from '../../assets/_MoreIcon_.svg'
import Pagination from '../../Components/Pagination/Pagination'
import { useNavigate } from 'react-router-dom'
import CreateInvoiceModal from '../Modal/CreateInvoiceModal'
import EditInvoiceModal from '../Modal/EditInvoiceModal'
import { getBillingDetails } from '../../utils/billings'
import Loaders from '../../Components/Loaders/Loaders.jsx'
import ViewOrderModal from '../Modal/ViewOrderModal.jsx'
const Billings = () => {
  const [index, setIndex] = useState([]);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [billingDetails, setbillingDetails] = useState([])
  const [loading, setloading] = useState(false)
  const [viewId, setviewId] = useState()
  const [viewModal, setviewModal] = useState(false)
  const fetchBillingDetails = async () => {
    setloading(true)
    const res = await getBillingDetails()
    if (res?.success) {
      setbillingDetails(res?.data?.data)
    }
    setloading(false)
  }


  useEffect(() => {
    fetchBillingDetails()
  }, [])

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

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIndex([]);
    }
  };


  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  // Pagination logic & Search Logic...
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500); // 500ms delay
    return () => clearTimeout(timer); // cleanup
  }, [searchTerm]);
  const filteredData = billingDetails?.filter((item) =>
    item?.program?.name?.toLowerCase().includes(debouncedSearch.toLowerCase())
  );
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredData?.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredData?.length / itemsPerPage);
  const handlePageChange = (selectedItem) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <>
      {loading && <Loaders />}
      {viewModal && <ViewOrderModal id={viewId} setviewModal={setviewModal} />}
      {modal.invoice && <CreateInvoiceModal modalFunction={modalFunction} />}
      {modal.edit && <EditInvoiceModal modalFunction={modalFunction} />}
      <div className='dashboard_container'>
        <div className='coaches_head_wrapper'>
          <h2>Billings</h2>
          <div className='coaches_button_wapper'>
            {/* <div onClick={(() => modalFunction(1))}>
              <Button children={'Create invoice'} styles={{
                fontSize: '13px',
                height: '46px'
              }} />
            </div> */}

            <div className='coaches_search_wrapper'>
              <input onChange={((e) => setSearchTerm(e.target.value))} placeholder='Search' />
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
              {currentItems?.length <= 0 && <td colSpan={12}>No Billing data found...</td>}
              {currentItems?.map((e, i) => (
                <tr>
                  <td>
                    #{e?.id}
                  </td>
                  <td>
                    {new Date(e?.created_at)
                      .toLocaleString("en-IN", { dateStyle: "short", timeZone: 'utc' })}
                  </td>
                  <td>{e?.program?.name}</td>
                  <td>
                    <div className='customer_wrapper' style={{
                      justifyContent: 'flex-start'
                    }}>
                      {/* <div className='customer_img_div'>
                        <img src={img} />
                      </div> */}
                      <div className='customer_details_wrapper'>
                        <p>{e?.customer?.user?.name}</p>
                        <p>{e?.customer?.user?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>{e?.currency} {e?.total_amount}</td>
                  <td><p style={e?.status == 'unpaid' ? {
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: '600',
                    borderRadius: '5px',
                    background: 'rgba(231, 62, 69, 1)',
                    padding: '5px',
                    width: 'fit-content',
                    textTransform: 'capitalize',
                    marginInline: 'auto'
                  } : {
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: '600',
                    borderRadius: '5px',
                    background: 'green',
                    padding: '5px',
                    width: 'fit-content',
                    textTransform: 'capitalize',
                    marginInline: 'auto'
                  }}>{e?.status}</p></td>
                  <td ref={dropdownRef}>
                    <img onClick={((e) => {
                      e.stopPropagation()
                      indexFunction(i)
                    })} src={ellipse} />
                    {index.includes(i) && <div className='actions_wrapper' style={{
                      width: '100%',
                      textWrap: 'nowrap',
                      bottom: '-20px'
                    }}>
                      <p style={{
                        padding: '5px 10px'
                      }}
                        onClick={(() => {
                          setviewId(e?.id)
                          setviewModal(true)
                        })}
                      >View</p>
                      {/* <p style={{
                        padding: '5px 10px'
                      }} onClick={(() => modalFunction(2))}>Edit</p>
                      <p style={{
                        padding: '5px 10px'
                      }}>Change Status</p> */}
                    </div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination pageCount={pageCount}
          currentPage={currentPage}
          onPageChange={handlePageChange} />
      </div>
    </>
  )
}

export default Billings
