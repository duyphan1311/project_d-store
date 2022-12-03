import alertify from 'alertifyjs';
import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
import HistoryAPI from '../API/HistoryAPI';
const socket = io("http://localhost:3000/api");

function History(props) {

    const [history, setHistory] = useState([])

    const [histor, setHistor] = useState([])

    const [load, setLoad] = useState(false)

    const [text, setText] = useState('')

    useEffect(() => {

        const fetchData = async () => {

            const response = await HistoryAPI.getAll()
            console.log(response)

            setHistory(response)

        }

        fetchData()

    }, [])

    //Hàm này dùng để nhận socket từ server gửi lên
    useEffect(() => {

        //Nhận dữ liệu từ server gửi lên thông qua socket với key receive_order
        socket.on('receive_order', (data) => {

            setText('User ID: ' + data + ' Vừa Đặt Hàng')

            setTimeout(() => {
                window.location.reload()
            }, 4000)



        })

    }, [])

    const handleSubmit = async (id) => {
        try {
            const res = await HistoryAPI.updateHistory(id, {
                ...histor
            })
            setHistor({ ...res.data })
            alertify.set('notifier', 'position', 'bottom-left');
            alertify.error('Bạn Đã Cập Nhật Thành Công: ' + id);
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="page-wrapper">
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-7 align-self-center">
                        <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">Basic Initialisation</h4>
                        <div className="d-flex align-items-center">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0 p-0">
                                    <li className="breadcrumb-item"><a href="/" className="text-muted">History</a></li>
                                    <li className="breadcrumb-item text-muted active" aria-current="page">Table</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">History</h4>
                                <h3>{text}</h3>
                                <input className="form-control w-25" type="text" placeholder="Enter Search!" />
                                <br />
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered no-wrap">
                                        <thead>
                                            <tr>
                                                <th>ID User</th>
                                                <th>Name</th>
                                                <th>Phone</th>
                                                <th>Address</th>
                                                <th>Total</th>
                                                <th>Delivery</th>
                                                <th>Status</th>
                                                <th>Detail</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                history && history.map(value => (
                                                    <tr key={value._id}>
                                                        <td>{value.idUser}</td>
                                                        <td>{value.fullname}</td>
                                                        <td>{value.phone}</td>
                                                        <td>{value.address}</td>
                                                        <td>{value.total}</td>
                                                        <td>
                                                            <select
                                                                name="delivery"
                                                                id="delivery"
                                                                onChange={(e) => setHistor({ ...histor, delivery: e.target.value })}
                                                            >
                                                                {value.delivery ? (
                                                                    <><option value={true}>Đã Vận Chuyển</option><option value={false}>Chưa Vận Chuyển</option></>
                                                                ) : (
                                                                    <><option value={false}>Chưa Vận Chuyển</option><option value={true}>Đã Vận Chuyển</option></>
                                                                )}
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select
                                                                name="status"
                                                                id="status"
                                                                onChange={(e) => setHistor({ ...histor, status: e.target.value })}
                                                            >
                                                                {value.status ? (
                                                                    <><option value={true}>Đã Thanh Toán</option><option value={false}>Chưa Thanh Toán</option></>
                                                                ) : (
                                                                    <><option value={false}>Chưa Thanh Toán</option><option value={true}>Đã Thanh Toán</option></>
                                                                )}
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <a style={{ cursor: 'pointer', color: 'white' }} onClick={() => handleSubmit(value._id)} className="btn btn-success">Edit</a>
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

export default History;