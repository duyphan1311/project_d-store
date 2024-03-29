import alertify from 'alertifyjs';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import ProductAPI from '../API/ProductAPI';
import Pagination from './Component/Pagination';

function Products(props) {

    const [products, setProducts] = useState([])
    const [loadAPI, setLoadAPI] = useState(false)

    const [pagination, setPagination] = useState({
        page: '1',
        count: '8',
        search: '',
        category: 'all'
    })

    const [search, setSearch] = useState('')

    const onChangeText = (e) => {

        const value = e.target.value

        setPagination({
            page: pagination.page,
            count: pagination.count,
            search: value,
            category: pagination.category
        })

    }

    const [totalPage, setTotalPage] = useState()

    const handlerChangePage = (value) => {
        console.log("Value: ", value)

        setPagination({
            page: value,
            count: pagination.count,
            search: pagination.search,
            category: pagination.category
        })
    }
    useEffect(() => {

        const fetchAllData = async () => {

            const response = await ProductAPI.getAPI()
            console.log(response)


            const totalPage = Math.ceil(parseInt(response.length) / parseInt(pagination.count))
            console.log(totalPage)

            setTotalPage(totalPage)
        }

        fetchAllData()
        setLoadAPI(false)

    }, [pagination, loadAPI])

    useEffect(() => {

        const fetchData = async () => {

            const params = {
                page: pagination.page,
                count: pagination.count,
                search: pagination.search,
                category: pagination.category
            }

            const query = queryString.stringify(params)

            const newQuery = '?' + query

            const response = await ProductAPI.getPagination(newQuery)
            console.log(response)

            setProducts(response)

        }

        fetchData()
        setLoadAPI(false)

    }, [pagination, loadAPI])

    const onDeleteProduct = (id) => {
        console.log("id: " + id)
        const fetchDelete = async () => {
            const response = await ProductAPI.deleteProduct(id)
            console.log(response)
        }

        fetchDelete()

        setLoadAPI(true)

        alertify.set('notifier', 'position', 'bottom-left');
        alertify.error('Bạn Đã Xóa Thành Công: ' + id);
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
                                <h4 className="card-title">Products</h4>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <input className="form-control w-25" onChange={onChangeText} type="text" placeholder="Enter Search!" />
                                    <a style={{
                                        cursor: 'pointer',
                                        color: 'white',
                                        borderRadius: '5px',
                                        width: '100px',
                                        height: '50px',
                                        fontSize: '20px',
                                        fontWeight: 'bold'
                                    }} className="btn btn-success" href='/add-product'>Create</a>
                                </div>
                                <br />
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered no-wrap">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Image</th>
                                                <th>Category</th>
                                                <th>Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                products && products.map(value => (
                                                    <tr key={value._id}>
                                                        <td>{value._id}</td>
                                                        <td>{value.name}</td>
                                                        <td>{value.price}</td>
                                                        <td>
                                                            <img src={value.img1} style={{ height: '60px', width: '60px' }} alt="" />
                                                        </td>
                                                        <td>{value.category}</td>
                                                        <td>
                                                            <a style={{ cursor: 'pointer', color: 'white' }} href={`/product/${value._id}`} className="btn btn-success">View</a>
                                                            &nbsp;
                                                            <a style={{ cursor: 'pointer', color: 'white' }} onClick={() => onDeleteProduct(value._id)} className="btn btn-danger">Delete</a>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination pagination={pagination} handlerChangePage={handlerChangePage} totalPage={totalPage} />
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

export default Products;