import alertify from 'alertifyjs';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProductAPI from '../API/ProductAPI';

const AddProduct = (props) => {

    const { id } = useParams()

    const [product, setProduct] = useState({})
    const [loadAPI, setLoadAPI] = useState(false)
    const [add, setAdd] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setAdd(true)
        try {
            const res = await ProductAPI.addProduct({
                ...product
            })
            console.log(res);
            setProduct({ ...res.data })
            alertify.set('notifier', 'position', 'bottom-left');
            alertify.error('Bạn Đã Cập Nhật Thành Công User: ' + id);
        }
        catch (e) {
            console.log(e);
        }
        setAdd(false)
        setRedirect(true)
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
                                            <h4 style={{ textAlign: 'center', marginRight: '10px' }} className="card-title">Product</h4>
                                        </div><br /><div className="table-responsive">
                                                {/* {
                                                    redirect && <Redirect to={`/products`} />
                                                } */}
                                                <form onSubmit={handleSubmit} method="post" enctype="multipart/form-data">
                                                    <label htmlFor="fullname">Name:</label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        onChange={(e) => setProduct({ ...product, name: e.target.value })} />
                                                    <label htmlFor="email">Price:</label>
                                                    <input
                                                        type="text"
                                                        id="price"
                                                        onChange={(e) => setProduct({ ...product, price: e.target.value })} />
                                                    <label htmlFor="email">Image 1:</label>
                                                    <input
                                                        type="text"
                                                        name="img1"
                                                        onChange={(e) => setProduct({ ...product, img1: e.target.value })}
                                                    />
                                                    <label htmlFor="email">Image 2:</label>
                                                    <input
                                                        type="text"
                                                        name="img2"
                                                        onChange={(e) => setProduct({ ...product, img2: e.target.value })}
                                                    />
                                                    <label htmlFor="email">Image 3:</label>
                                                    <input
                                                        type="text"
                                                        name="img3"
                                                        onChange={(e) => setProduct({ ...product, img3: e.target.value })}
                                                    />
                                                    <label htmlFor="email">Image 4:</label>
                                                    <input
                                                        type="text"
                                                        name="img4"
                                                        onChange={(e) => setProduct({ ...product, img4: e.target.value })}
                                                    />
                                                    <label htmlFor="email">Category:</label>
                                                    <input
                                                        type="text"
                                                        id="category"
                                                        value={product.category}
                                                        onChange={(e) => setProduct({ ...product, category: e.target.value })} />
                                                    <button className="btn btn-primary">{add ? "Adding" : "Add"}</button>
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
        input[type="file"] {
            border-bottom: none;
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

export default AddProduct