import React, { useEffect, useRef, useState } from 'react'
import './Disputes.css'
import ellipse from '../../assets/_MoreIcon_.svg'
import Loaders from '../../Components/Loaders/Loaders.jsx'
import Pagination from '../../Components/Pagination/Pagination.jsx'
import DisputeViewModal from '../Modal/DisputeViewModal.jsx'
import { getAllDisputes, getSingleDisputes, markDisputeStatus } from '../../utils/dispute.js'
const Disputes = () => {
    const [index, setIndex] = useState([]);
    const [disputes, setdisputes] = useState(false);
    const dropdownRef = useRef()
    const [loading, setloading] = useState(false);
    const [changeLoading,setchangeLoading] = useState(false)
    const [disputesData, setdisputesData] = useState([])
    const [singleDisputeData, setsingleDisputeData] = useState([])
    const [disputeId, setdisputeId] = useState();
    const indexFunction = (i) => {
        if (index.includes(i)) {
            setIndex(prev => prev.filter((e) => e != i))
        } else {
            setIndex([...index, i])
        }
    }

    const callDisputeFunc = async () => {
        try {
            setloading(true)
            const res = await getAllDisputes();
            setdisputesData(res?.data?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    const callSingleDispute = async (i) => {
        try {
            setloading(true)
            const res = await getSingleDisputes(i)
            setsingleDisputeData(res?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        callDisputeFunc()
    }, [])


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


    const changeDisputeStatus = async () => {
        try {
            setchangeLoading(true)
            const res = await markDisputeStatus({
                status: "closed"
            }, disputeId
            )
            if (res?.success) {
                callDisputeFunc()
                setdisputes(false)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setchangeLoading(false)
        }
    }
    // Pagination logic & Search Logic...
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500); // 500ms delay
        return () => clearTimeout(timer); // cleanup
    }, [searchTerm]);
    const filteredData = disputesData?.filter((item) =>
        item?.ticket_number.toLowerCase().includes(debouncedSearch.toLowerCase())
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
            {disputes && <DisputeViewModal changeLoading={changeLoading} loading={loading} changeDisputeStatus={changeDisputeStatus} singleDisputeData={singleDisputeData} setdisputes={setdisputes} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <h2>Disputes</h2>
                    <div className='coaches_button_wapper'>
                        <div className='coaches_search_wrapper'>
                            <input onChange={((e) => setSearchTerm(e?.target?.value))} placeholder='Search' />
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                </div>

                <div className='table_container'>
                    <table className='total_table_order_wrapper coaches_table_wrapper'>
                        <thead>
                            <tr>
                                <th>Dispute ID</th>
                                <th>Raised by</th>
                                <th>Date & Time</th>
                                <th>Status</th>
                                <th style={{
                                    textAlign: 'center'
                                }}>Actions</th>
                            </tr>
                        </thead>
                        {!loading && <tbody>
                            {(currentItems?.length <= 0 && !loading) && <td style={{
                                color: 'var(--primary-color)',
                                fontWeight: '600'
                            }} colSpan={12}>No disputes found...</td>}

                            {(currentItems?.length <= 0 && loading) && <td style={{
                                color: 'var(--primary-color)',
                                fontWeight: '600'
                            }} colSpan={12}>Searching...</td>}
                            {currentItems?.map((e, i) => (
                                <tr>
                                    <td>#{e.ticket_number}</td>
                                    <td>
                                        <div className='customer_wrapper' style={{
                                            justifyContent: 'flex-start'
                                        }}>
                                            <div className='customer_details_wrapper'>
                                                <p>{e?.customer?.name}</p>
                                                <p>#{e?.customer?.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{new Date(e?.created_at)
                                        .toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</td>
                                    <td><p style={e?.status == 'open' ? {
                                        fontSize: '11px',
                                        color: '#fff',
                                        width: 'fit-content',
                                        background: 'rgba(231, 62, 69, 1)',
                                        padding: '5px',
                                        textTransform: 'capitalize',
                                        borderRadius: '5px',
                                        fontWeight: '600'
                                    } : {
                                        fontSize: '11px',
                                        color: '#fff',
                                        width: 'fit-content',
                                        background: 'green',
                                        padding: '5px',
                                        borderRadius: '5px',
                                        fontWeight: '600',
                                        textTransform: 'capitalize'
                                    }}>{e?.status}</p></td>
                                    <td ref={dropdownRef}>
                                        <img onClick={((e) => {
                                            e.stopPropagation()
                                            indexFunction(i)
                                        })} src={ellipse} />
                                        {index.includes(i) && <div className='actions_wrapper' style={{
                                            bottom: '-30px'
                                        }}>
                                            <p onClick={(() => {
                                                callSingleDispute(e?.id)
                                                setdisputes(true)
                                                setdisputeId(e?.id)
                                            })}>View</p>
                                        </div>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>}
                    </table>
                </div>

                <Pagination pageCount={pageCount}
                    currentPage={currentPage}
                    onPageChange={handlePageChange} />
            </div>
        </>
    )
}

export default Disputes
