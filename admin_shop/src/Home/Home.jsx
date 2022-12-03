import React, { useEffect, useState } from 'react';
import HistoryAPI from '../API/HistoryAPI';
import ProductAPI from '../API/ProductAPI';
import UserAPI from '../API/UserAPI';


function Home(props) {

    const [users, setUsers] = useState([])
    const [loadAPI, setLoadAPI] = useState(false)
    const [history, setHistory] = useState([])
    const [topUser, setTopUser] = useState([])
    const [product, setProduct] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const resHistory = await HistoryAPI.getAll()
            setHistory(resHistory)
            const resUser = await UserAPI.getAllData()
            setUsers(resUser)
            const resProduct = await ProductAPI.getAPI()
            setProduct(resProduct)

        }

        fetchData()

        setLoadAPI(false)
    }, [loadAPI])

    useEffect(() => {
        const fetchData = async () => {
            const newUsers = users.map(user => {
                const totalPrice = history.reduce(function (sum, record) {
                    return (record.idUser === user._id) ? sum : sum + parseInt(record.total)
                }, 0);

                return { ...user, totalPrice: totalPrice }
            })
            setTopUser(newUsers)
        }
        fetchData()
        setLoadAPI(false)
    }, [history, loadAPI, users])


    return (
        <div className="page-wrapper">
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-7 align-self-center">
                        <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">Good Morning!</h3>
                        <div className="d-flex align-items-center">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0 p-0">
                                    <li className="breadcrumb-item"><a href="index.html">Dashboard</a>
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="card-group">
                    <div className="card border-right">
                        <div className="card-body">
                            <div className="d-flex d-lg-flex d-md-block align-items-center">
                                <div>
                                    <div className="d-inline-flex align-items-center">
                                        <h2 className="text-dark mb-1 font-weight-medium">{users.length}</h2>
                                        {/* <span
                                            className="badge bg-primary font-12 text-white font-weight-medium badge-pill ml-2 d-lg-block d-md-none">+18.33%</span> */}
                                    </div>
                                    <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Clients</h6>
                                </div>
                                <div className="ml-auto mt-md-3 mt-lg-0">
                                    <span className="opacity-7 text-muted"><i data-feather="user-plus"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card border-right">
                        <div className="card-body">
                            <div className="d-flex d-lg-flex d-md-block align-items-center">
                                <div>
                                    <h2 className="text-dark mb-1 w-100 text-truncate font-weight-medium">
                                        {history.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.total),
                                            0)} VND
                                    </h2>
                                    <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Earnings of Month
                                    </h6>
                                </div>
                                <div className="ml-auto mt-md-3 mt-lg-0">
                                    <span className="opacity-7 text-muted"><i data-feather="dollar-sign"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card border-right">
                        <div className="card-body">
                            <div className="d-flex d-lg-flex d-md-block align-items-center">
                                <div>
                                    <div className="d-inline-flex align-items-center">
                                        <h2 className="text-dark mb-1 font-weight-medium">{history.length}</h2>
                                        {/* <span
                                            className="badge bg-danger font-12 text-white font-weight-medium badge-pill ml-2 d-md-none d-lg-block">-18.33%</span> */}
                                    </div>
                                    <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Histories</h6>
                                </div>
                                <div className="ml-auto mt-md-3 mt-lg-0">
                                    <span className="opacity-7 text-muted"><i data-feather="file-plus"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex d-lg-flex d-md-block align-items-center">
                                <div>
                                    <h2 className="text-dark mb-1 font-weight-medium">{product.length}</h2>
                                    <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Products</h6>
                                </div>
                                <div className="ml-auto mt-md-3 mt-lg-0">
                                    <span className="opacity-7 text-muted"><i data-feather="globe"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-4">
                                    <h4 className="card-title">Top Leaders</h4>
                                    <div className="ml-auto">
                                        <div className="dropdown sub-dropdown">
                                            <button className="btn btn-link text-muted dropdown-toggle" type="button"
                                                id="dd1" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i data-feather="more-vertical"></i>
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dd1">
                                                <a className="dropdown-item" href="#">Insert</a>
                                                <a className="dropdown-item" href="#">Update</a>
                                                <a className="dropdown-item" href="#">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table no-wrap v-middle mb-0">
                                        <thead>
                                            <tr className="border-0">
                                                <th className="border-0 font-14 font-weight-medium text-muted">Team Lead
                                                </th>
                                                <th className="border-0 font-14 font-weight-medium text-muted px-2">Role
                                                </th>
                                                <th className="border-0 font-14 font-weight-medium text-muted text-center">
                                                    Status
                                                </th>
                                                <th className="border-0 font-14 font-weight-medium text-muted text-center">
                                                    Weeks
                                                </th>
                                                <th className="border-0 font-14 font-weight-medium text-muted">Budget</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                topUser && topUser.map(user => (
                                                    <tr>
                                                        <td className="border-top-0 px-2 py-4">
                                                            <div className="d-flex no-block align-items-center">
                                                                <div className="mr-3"><img src="https://img.icons8.com/color/36/000000/administrator-male.png"
                                                                    alt="user" className="rounded-circle" width="45"
                                                                    height="45" /></div>
                                                                <div className="">
                                                                    <h5 className="text-dark mb-0 font-16 font-weight-medium">{user.fullname}
                                                                    </h5>
                                                                    <span
                                                                        className="text-muted font-14">{user.email}</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="border-top-0 text-muted px-2 py-4 font-14">{user.role === 1 ? 'Admin' : 'Customer'}</td>

                                                        <td className="border-top-0 text-center px-2 py-4"><i
                                                            className="fa fa-circle text-primary font-12" data-toggle="tooltip"
                                                            data-placement="top" title="In Testing"></i></td>
                                                        <td
                                                            className="border-top-0 text-center font-weight-medium text-muted px-2 py-4">
                                                            35
                                                        </td>
                                                        <td className="font-weight-medium text-dark border-top-0 px-2 py-4">{user.totalPrice} VND
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer text-center text-muted">
                All Rights Reserved by Adminmart. Designed and Developed by Duy Phan.
            </footer>
        </div>
    );
}

export default Home;