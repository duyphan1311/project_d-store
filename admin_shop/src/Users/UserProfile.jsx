import alertify from 'alertifyjs';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import UserAPI from '../API/UserAPI';

const UserProfile = (props) => {

    const { id } = useParams()

    const [user, setUser] = useState({})
    const [loadAPI, setLoadAPI] = useState(false)
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        setLoadAPI(true)
        const fetchData = async () => {

            const response = await UserAPI.getDetailData(id)
            console.log(response)

            setUser(response)

        }

        fetchData()
        setLoadAPI(false)

    }, [id, loadAPI])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setUpdate(true)
        try {
            const res = await UserAPI.updateUser(id, {
                ...user
            })
            console.log(res);
            setUser({ ...res.data })
            alertify.set('notifier', 'position', 'bottom-left');
            alertify.error('Bạn Đã Cập Nhật Thành Công User: ' + id);
        }
        catch (e) {
            console.log(e);
        }
        setUpdate(false)
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
                                    <li className="breadcrumb-item text-muted active" aria-current="page">User</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <ProfileContainer>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">

                                    {loadAPI ? (<p>Loading</p>) : (
                                        <><div style={{ display: 'flex', alignItems: '' }}>
                                            <h4 style={{ textAlign: 'center', marginRight: '10px' }} className="card-title">User</h4>
                                            {user.role === 1 ? (
                                                <Admin>Admin</Admin>
                                            ) : (
                                                <Customer>Customer</Customer>
                                            )}
                                        </div><br /><div className="table-responsive">
                                                <form onSubmit={handleSubmit} method="post" enctype="multipart/form-data">
                                                    <label htmlFor="fullname">Name:</label>
                                                    <input
                                                        type="text"
                                                        id="fullname"
                                                        value={user.fullname}
                                                        onChange={(e) => setUser({ ...user, fullname: e.target.value })} />
                                                    <label htmlFor="email">Email:</label>
                                                    <input
                                                        type="text"
                                                        id="email"
                                                        value={user.email}
                                                        onChange={(e) => setUser({ ...user, email: e.target.value })} />
                                                    <label htmlFor="email">Password:</label>
                                                    <input
                                                        type="text"
                                                        id="password"
                                                        value={user.password}
                                                        onChange={(e) => setUser({ ...user, password: e.target.value })} />
                                                    <label htmlFor="email">Phone:</label>
                                                    <input
                                                        type="text"
                                                        id="phone"
                                                        value={user.phone}
                                                        onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                                                    <button className="btn btn-primary">{update ? "Updating" : "Update"}</button>
                                                </form>
                                            </div></>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ProfileContainer>
            <footer className="footer text-center text-muted">
                All Rights Reserved by Adminmart. Designed and Developed by Duy Phan.
            </footer>
        </div>
    )
}

const ProfileContainer = styled.div`
    width: 100%;
    height: 78vh;
    padding-top: 1rem;
    display: flex;
    border-radius: 5px;
    form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;;
        h3 {
            margin-bottom: 0.2rem;
        }
        label {
            margin-top: 0.2rem;
            color: gray;
        }
        input {
            margin-bottom: 1rem;
            outline: none;
            border: none;
            border-bottom: 1px solid gray;
        }
    }
`

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

export default UserProfile