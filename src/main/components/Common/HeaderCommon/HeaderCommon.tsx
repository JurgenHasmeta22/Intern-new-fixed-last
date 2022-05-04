// #region "Importing stuff"
import { useEffect, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import "./HeaderCommon.css"
import {RootState} from '../../../store/redux/rootState'
import onLogout from "../../../store/stores/user/login.store.on-logout"

import useGetUser from "../../../hooks/useGetUser/index"
import { useDispatch, useSelector } from "react-redux";
import { navigateTo } from "../../../store/stores/navigation/navigation.store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    setCategorySelected,
    invalidateCategorySelected,
    setProducts
} from "../../../store/stores/dashboard/dashboard.store"
import { TProduct } from "../../../interfaces/TProduct";
import { ICartProduct } from "../../../store/stores/cart/cart.store";
// #endregion


export default function HeaderCommon(this: any) {
    
    const user = useGetUser()
    const navigate = useNavigate()
    const dispatch = useDispatch();

    //@ts-ignore
    const categories: ICategory[] | undefined = useSelector((state: RootState) => state.dashboard.categories);
    
    // #region "For the moment broken features"
    const products: TProduct[] | undefined = useSelector((state: RootState) => state.dashboard.products);
    
    const productsInTheCart: ICartProduct[] = useSelector((state: RootState) => state.cart.products);

    // @ts-ignore
    const categorySelected: string = useSelector((state: RootState) => state.dashboard.categorySelected);

    function filterProductsBasedOnCategory(categoryIdArray: number) {

        const newProducts: TProduct[] | undefined = [...products]
        
        newProducts.filter(product => product.categoryId === categoryIdArray)
        // console.log(newProducts)

        //@ts-ignore
        dispatch(setProducts(newProducts))

    }
    
    function handleCategoryRender() {

        const newCategories: any = [...categories]

        //@ts-ignore
        newCategories.filter(category => category.description === categorySelected)
        // console.log(newCategories)

        // filterProductsBasedOnCategory(newCategories.id)

    }

    function calculateSpanTotalCart() {

        let number = 0

        for (const productCart of productsInTheCart) {
            number += Number(productCart.quantity)
        }

        return number

    }
    // #endregion


    return (

      <>

        <header className="header">
                    
            <div className="header-group-1">

                <Link to="/dashboard">Bank System</Link>
                
                <ul className="list-nav">

                    <div className="div-inside-li">                            
                        <NavLink to = "/dashboard" className="special-uppercase" >Home</NavLink>
                    </div>

                    <div className="div-inside-li-special">

                      <div className="dropdown">

                        <div className="genre-drop">

                            <img src="/assets/logos/list_blu.png" alt="" />
                            
                            <li className="special-uppercase" onClick={function (e) {
                                // e.stopPropagation()
                                // navigate("../genres")
                            }}>Categories</li>

                        </div>
              
                        <div className="dropdown-content">

                            <ul>
                                
                              {
                                //@ts-ignore
                                categories.map(category => 

                                    <li className = "special-list-drop" key={category.id} onClick={function (e: any) {
                                        e.stopPropagation()
                                        dispatch(setCategorySelected(category.description))
                                        handleCategoryRender()
                                    }}>{category.description}</li>

                                )

                              }

                            </ul>

                        </div>

                      </div>

                    </div>


                </ul>

            </div>

            <div className="header-group-2">
                
                <form className="button-search" onSubmit={function (e) {
                }}>

                    <input type="search" name="searchMovie"  placeholder="Search for Products..." aria-label="Search through site content" 
                        onChange={function (e) {  
                    }}/>

                    <button type="submit">
                        <i className="fa fa-search"></i>
                    </button>

                </form>

                { user === null ? (

                      <button className="button-login-header" onClick={function () {
                          navigate("/login")
                      }}>

                          <i className="material-icons special-icon">account_circle</i>
                          
                          Sign In

                      </button>

                    ): (

                      <div className="dropdown">

                        <li
                          className="dropbtn"
                          onClick={function () {
                              navigate(`/profile/${user?.username}`)
                          }}
                        >

                          <img src={"https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png"} />
                          {user.username}
                          
                        </li>
              
                        <div className="dropdown-content">

                          <button
                            className="log-out"
                            onClick={function (e) {
                              e.stopPropagation()
                              dispatch(onLogout())
                            }}
                          >

                            <span>Log Out</span>

                          </button>

                        </div>

                      </div>

                    )}

                  {/* @ts-ignore */}
                  {/* <FontAwesomeIcon icon="fa-solid fa-cart-minus" /> */}
                  
                  <div className="cart-icon-header">

                    <i className ="fa fa-shopping-cart" aria-hidden="true" 
                    onClick={function () {
                      navigate(`/${user.username}/cart`)
                    }}></i>

                    <span id="total-header-span">{calculateSpanTotalCart()}</span>

                  </div>

            </div>

        </header>

      </>

    )

}