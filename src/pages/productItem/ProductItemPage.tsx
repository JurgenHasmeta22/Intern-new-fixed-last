// #region "Importing stuff"
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TProduct } from "../../main/interfaces/TProduct";
import {RootState} from "../../main/store/redux/rootState"
import ReactLoading from 'react-loading';
import "./ProductItemPage.css"

import { 
    setProductItem,
    invalidateProductItem,
    setCategories,
    invalidateCategories
} from "../../main/store/stores/dashboard/dashboard.store"

import {
    addProduct,
    deleteProductById,
    changeProductQuantity,
    invalidateCart
} from "../../main/store/stores/cart/cart.store"

import HeaderCommon from "../../main/components/Common/HeaderCommon/HeaderCommon";
import FooterCommon from "../../main/components/Common/FooterCommon/FooterCommon";
import useGetUser from "../../main/hooks/useGetUser";
import ICategory from "../../main/interfaces/ICategory";
// #endregion


const randColour = ["green", "red", "blue", "yellow"][
    Math.floor(Math.random() * 4)
];


export default function ProductItemPage() {


    // #region "React hooks"
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()
    // #endregion


    // #region "State redux and axios etc"

    //@ts-ignore
    const productItem: TProduct = useSelector((state: RootState) => state.dashboard.productItem);

    //@ts-ignore
    const categories: ICategory[] | undefined = useSelector((state: RootState) => state.dashboard.categories);

    const [ selectQuantity, setSelectQuantity ] = useState<any>(1)

    const user = useGetUser()

    async function getProductItemFromServer() {
        let result = await (await axios.get(`/product/${params.id}`));
        dispatch(setProductItem(result.data))
    }

    useEffect(()=> {
        getProductItemFromServer()
    }, [params.id])

    // #endregion


    // #region "Checking if product came and loading if it still loading the res from server"

    if (productItem?.name === null && productItem === null || productItem?.name === undefined) {

        return (
            <div className="loading-wrapper">
                <ReactLoading type={"spin"} color={"#000"} height={200} width={100} className="loading" />
            </div>
        )    
    
    }

    // #endregion
    

    // #region "Filtering categories and doing join in front end to replace categoryId"
    const productCategoryName: any = categories.find(category => category.id === productItem.categoryId)
    // console.log(productCategoryName)
    // #endregion

    
    return (

        <>

            <section className='container-product-item'>

                <HeaderCommon />
                
                <main className='main-container'>

                    <div className='product-ribbon'>
                        <span className='ribbon-span'>Products / </span>
                        <span className='ribbon-span'>{productItem?.categoryId} / </span>
                        <span className='ribbon-span'>{productItem?.name}</span>
                    </div>

                    <section className="product-detail main-wrapper">

                        <img
                            src={`data:image/jpeg;base64,${productItem?.base64Image}`}
                            alt={`${productItem?.name}`}
                        />

                        <div className="product-detail__side" style={{ borderColor: `var(--${randColour})` }}>

                            <h3>{productItem?.name}</h3>

                            <h2><span className='special-product-span'>Product Name</span> : {productItem?.name}</h2>

                            <p>
                                <span className='special-product-span'>Short Description</span> : {productItem?.shortDescription}
                            </p>

                            <p>
                                <span className='special-product-span'>Long Description</span> : {productItem?.longDescription}
                            </p>

                            <p>
                                <span className='special-product-span'>
                                    Item Price
                                </span> : ${productItem?.price}
                            </p>

                            <p>
                                <span className='special-product-span'>
                                    CategoryId
                                </span> : {productItem?.categoryId}
                            </p>

                            <p>
                                <span className='special-product-span'>
                                    Category name
                                </span> : {productCategoryName?.description}
                            </p>

                            <div className='button-wish-wrapper'>
                                
                                <button onClick={function (e) {
                                    dispatch(addProduct({ product: productItem, quantity: selectQuantity }))
                                    navigate(`/${user?.username}/cart`)
                                }}>

                                    Add to Cart

                                </button>

                                <select name="quantity-select" id="quantity-select" 
                                onChange={function (e: any) {
                                    // const quantityFromSelect = Number(e.target.value)
                                    setSelectQuantity(e.target.value)
                                    // dispatch(changeProductQuantity({ productId: productItem?.id, quantity: quantityFromSelect }))
                                }}>
                                     
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>

                                </select>

                            </div>

                        </div>

                    </section>

                </main>

                <FooterCommon />

            </section>
            
        </>

    )

}