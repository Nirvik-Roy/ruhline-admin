import React, { useState, useRef, useEffect } from "react";
import "./Dashboard.css";
import DashboardCard from "./DashboardCard";
import img from "../../assets/a1380e7f99749ba01d9fdc18ec22e32c85fd5a0e.jpg";
import ellipse from "../../assets/_MoreIcon_.svg";
import { getDashboardDataApi } from "../../utils/dashboard";
import Loader from "../../Components/Loaders/Loaders.jsx";
import {formatDate} from '../../utils/timeFormatter'
const Dashboard = () => {
  const [dropdown, setdropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setloading] = useState(false);

  const getDashboardData = async () => {
    setloading(true);
    const res = await getDashboardDataApi();
    if (res?.success) {
      setDashboardData(res?.data);
      setloading(false);
        }
    setloading(false);
  };

  useEffect(() => {
    getDashboardData();
  }, []);
  useEffect(() => {
    if (!dropdown) return;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setdropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdown]);

  return (
    <>
    {loading && <Loader />}
    {!loading &&  <div className="dashboard_container">
        <h2>Dashboard</h2>
        <div className="dashboard_cards_wrapper">
          <DashboardCard dashboardData={dashboardData} />
        </div>
        <div className="total_order_wrapper">
          <div className="total_order_head_wrapper">
            <h1>Total orders</h1>
            <div className="total_orders_select_wrapper">
              <div
                ref={dropdownRef}
                onClick={() => setdropdown(!dropdown)}
                style={{
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <p>Last 7 days</p>
                <i class="fa-solid fa-angle-down"></i>

                {dropdown && (
                  <div className="dropdown_wrapper">
                    <p>Last month</p>
                    <p>Last 7 days</p>
                  </div>
                )}
              </div>
              <div>
                <p>View All</p>
              </div>
            </div>
          </div>
          <div className="table_container">
            <table className="total_table_order_wrapper">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Purchase Date</th>
                  <th>Programs</th>
                  <th>Customer</th>
                  <th>Amout</th>
                  <th>Payment Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData?.recent_orders?.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.id}</td>
                    <td>{formatDate(item?.created_at)}</td>
                    <td>{item?.program?.name}</td>
                    <td>
                      <div className="customer_wrapper">
                        {/* <div className="customer_img_div">
                          <img src={img} />
                        </div> */}
                        <div className="customer_details_wrapper">
                          <p>{item?.customer?.user?.name}</p>
                          <p>{item?.customer?.user?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>SAR 300</td>
                    <td>
                      <button style={{
                        textTransform: 'capitalize',
                      }}>{item?.status}</button>
                    </td>
                    <td>
                      <img src={ellipse} />
                    </td>
                  </tr>
                ))}

                {dashboardData?.recent_orders?.length === 0 && !loading && (
                  <tr>
                    <td colSpan={7} style={{textAlign: 'center'}}>No data found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>}
    </>
  );
};

export default Dashboard;
