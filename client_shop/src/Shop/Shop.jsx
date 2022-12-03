import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import ProductAPI from '../API/ProductAPI';
import Pagination from './Component/Pagination';
import Products from './Component/Products';
import Search from './Component/Search';
import SortProduct from './Component/SortProduct';

function Shop(props) {

    const [products, setProducts] = useState([])
    const [temp, setTemp] = useState([])

    const [sort, setSort] = useState('default')

    const [totalPage, setTotalPage] = useState()

    const [pagination, setPagination] = useState({
        page: '1',
        count: '9',
        search: '',
        category: 'all'
    })

    const handlerChangeSort = (value) => {
        console.log("Value: ", value)

        setSort(value)
    }

    const handlerChangePage = (value) => {
        console.log("Value: ", value)

        setPagination({
            page: value,
            count: pagination.count,
            search: pagination.search,
            category: pagination.category
        })
    }

    const handlerSearch = (value) => {
        console.log("Value: ", value)

        setPagination({
            page: pagination.page,
            count: pagination.count,
            search: value,
            category: pagination.category
        })
    }
    const handlerCategory = (value) => {
        console.log("Value: ", value)

        setPagination({
            page: pagination.page,
            count: pagination.count,
            search: pagination.search,
            category: value
        })
    }
    useEffect(() => {

        const fetchAllData = async () => {

            let response
            if (pagination.category === 'all') {

                response = await ProductAPI.getAPI()
                console.log(response)

            } else {
                const params = {
                    page: pagination.page,
                    count: pagination.count,
                    search: pagination.search,
                    category: pagination.category
                }

                const query = queryString.stringify(params)

                const newQuery = '?' + query

                response = await ProductAPI.getPagination(newQuery)
                console.log(response)
            }
            const totalPage = Math.ceil(parseInt(response.length) / parseInt(pagination.count))
            console.log(totalPage)

            setTotalPage(totalPage)
        }

        fetchAllData()

    }, [pagination])

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
            setTemp(response)

        }

        fetchData()

    }, [pagination])

    return (
        <div className="container">
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
                        <div className="col-lg-6">
                            <h1 className="h2 text-uppercase mb-0">Shop</h1>
                        </div>
                        <div className="col-lg-6 text-lg-right">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                                    <li className="breadcrumb-item active" aria-current="page">Shop</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>


            {
                products && products.map(value => (
                    <div className="modal fade show" id={`product_${value._id}`} key={value._id}>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-body p-0">
                                    <div className="row align-items-stretch">
                                        <div className="col-lg-6 p-lg-0">
                                            <img style={{ width: '100%' }} className="product-view d-block h-100 bg-cover bg-center" src={value.img1} data-lightbox={`product_${value._id}`} />
                                            <img className="d-none" href={value.img2} />
                                            <img className="d-none" href={value.img3} />
                                        </div>
                                        <div className="col-lg-6">
                                            <a className="close p-4" type="button" href="#section_product" data-dismiss="modal" aria-label="Close">×</a>
                                            <div className="p-5 my-md-4">
                                                <ul className="list-inline mb-2">
                                                    <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                    <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                    <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                    <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                    <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                </ul>
                                                <h2 className="h4">{value.name}</h2>
                                                <p className="text-muted">{value.price}VND</p>
                                                <p className="text-small mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Vestibulum ultricies aliquam convallis.</p>
                                                <div className="row align-items-stretch mb-4">
                                                    <div className="col-sm-5 pl-sm-0 fix_addwish">
                                                        <a className="btn btn-dark btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0">
                                                            <i className="far fa-heart mr-2"></i>Add Too Wish List</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }


            <section className="py-5">
                <div className="container p-0">
                    <div className="row">
                        <div className="col-lg-3 order-2 order-lg-1">
                            <h5 className="text-uppercase mb-4">Categories</h5>
                            <div className="py-2 px-4 bg-dark text-white mb-3"><strong className="small text-uppercase font-weight-bold">Fashion &amp; Acc</strong></div>
                            <ul className="list-unstyled small text-muted pl-lg-4 font-weight-normal">
                                <li className="mb-2"><a className="reset-anchor" href="#" onClick={() => handlerCategory('all')}>All</a></li>
                                <li className="mb-2"><a className="reset-anchor" href="#" onClick={() => handlerCategory('phone')}>Phone</a></li>
                                <li className="mb-2"><a className="reset-anchor" href="#" onClick={() => handlerCategory('laptop')}>Laptop</a></li>
                                <li className="mb-2"><a className="reset-anchor" href="#" onClick={() => handlerCategory('watch')}>Watch</a></li>
                                <li className="mb-2"><a className="reset-anchor" href="#" onClick={() => handlerCategory('screen')}>Screen</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-9 order-1 order-lg-2 mb-5 mb-lg-0">
                            <div className="row mb-3 align-items-center">

                                {/* ------------------Search----------------- */}
                                <Search handlerSearch={handlerSearch} />
                                {/* ------------------Search----------------- */}

                                <div className="col-lg-8">
                                    <ul className="list-inline d-flex align-items-center justify-content-lg-end mb-0">
                                        <li className="list-inline-item">
                                            <SortProduct handlerChangeSort={handlerChangeSort} />
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <Products products={products} sort={sort} />

                            <Pagination pagination={pagination} handlerChangePage={handlerChangePage} totalPage={totalPage} />

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Shop;