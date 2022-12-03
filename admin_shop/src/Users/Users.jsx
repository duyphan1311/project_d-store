
import alertify from 'alertifyjs';
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import UserAPI from '../API/UserAPI';

function Users(props) {

    const [users, setUsers] = useState([])
    const [loadAPI, setLoadAPI] = useState(false)

    useEffect(() => {
        const fetchData = async () => {

            const response = await UserAPI.getAllData()
            console.log(response)

            setUsers(response)

        }

        fetchData()
        setLoadAPI(false)

    }, [loadAPI])

    const onDeleteUser = (id) => {
        console.log("idUser: " + id)
        const fetchDelete = async () => {
            const response = await UserAPI.deleteUser(id)
            console.log(response)
        }

        fetchDelete()

        //Sau đó thay đổi state loadAPI và load lại hàm useEffect
        setLoadAPI(true)

        alertify.set('notifier', 'position', 'bottom-left');
        alertify.error('Bạn Đã Xóa Thành Công User: ' + id);
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
                                    <li className="breadcrumb-item"><a href="/" className="text-muted">Home</a></li>
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
                                <h4 className="card-title">Users</h4>
                                <input className="form-control w-25" type="text" placeholder="Enter Search!" />
                                <br />
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered no-wrap">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Fullname</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Role</th>
                                                <th>Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users && users.map(value => (
                                                    <tr key={value._id}>
                                                        <td>{value._id}</td>
                                                        <td>{value.fullname}</td>
                                                        <td>{value.email}</td>
                                                        <td>{value.phone}</td>
                                                        <td>{value.role === 1 ? <Admin>Admin</Admin> : <Customer>Customer</Customer>}</td>
                                                        <td>
                                                            <a style={{ cursor: 'pointer', color: 'white' }} href={`/user/${value._id}`} className="btn btn-success">View</a>
                                                            &nbsp;
                                                            <a style={{ cursor: 'pointer', color: 'white' }} onClick={() => onDeleteUser(value._id)} className="btn btn-danger">Delete</a>
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

const Admin = styled.div`
    color: rgba(253, 182, 40);
    background: rgba(253, 181, 40, 0.12);
    padding: 3px 5px;
    text-align: center;
    border-radius: 3px;
    font-size: 14px;
`
const Customer = styled.div`
    color: rgba(38, 198, 249);
    background: rgba(38, 198, 249, 0.12);
    padding: 3px 5px;
    text-align: center;
    border-radius: 3px;
    font-size: 14px;
`

export default Users;