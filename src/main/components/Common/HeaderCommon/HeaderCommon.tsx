// #region "Importing stuff"
import { useEffect, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import "./HeaderCommon.css";
import { RootState } from "../../../store/redux/rootState";
import onLogout from "../../../store/stores/user/login.store.on-logout";

import useGetUser from "../../../hooks/useGetUser/index";
import { useDispatch, useSelector } from "react-redux";
import { navigateTo } from "../../../store/stores/navigation/navigation.store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  setCategorySelected,
  invalidateCategorySelected,
  setProducts,
  setProductsFiltered,
  setSearchTerm,
  invalidateSearchTerm,
  setCategorySelectedObject,
  invalidateCategorySelectedObject,
} from "../../../store/stores/dashboard/dashboard.store";

import { TProduct } from "../../../interfaces/TProduct";
import { ICartProduct } from "../../../store/stores/cart/cart.store";
// #endregion

export default function HeaderCommon(this: any) {
  // #region "React hooks"
  const user = useGetUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // #endregion

  // #region "Redux state getting"

  //@ts-ignore
  const categories: ICategory[] | undefined = useSelector(
    (state: RootState) => state.dashboard.categories
  );

  const products: TProduct[] | undefined = useSelector(
    (state: RootState) => state.dashboard.products
  );
  const productsInTheCart: ICartProduct[] = useSelector(
    (state: RootState) => state.cart.products
  );

  //@ts-ignore
  const searchTerm: string = useSelector(
    (state: RootState) => state.dashboard.searchTerm
  );

  // @ts-ignore
  const categorySelected: string = useSelector(
    (state: RootState) => state.dashboard.categorySelected
  );

  // #endregion

  // #region "Helpers functions"

  // function filterProductsBasedOnCategory(categoryIdArray: number) {

  //     const newProducts: TProduct[] | undefined = [...products]

  //     const finalProducts = newProducts.filter(product => product.categoryId === categoryIdArray)

  //     console.log(finalProducts)

  //     //@ts-ignore
  //     dispatch(setProductsFiltered(finalProducts))

  // }

  function handleCategoryRender(categoryDesc: any) {
    const newCategories: any = [...categories];

    //@ts-ignore
    const categoryFound = newCategories.find(
      (category: any) => category.description === categoryDesc
    );

    // console.log(categoryFound)

    dispatch(setCategorySelected(categoryDesc));
    dispatch(setCategorySelectedObject(categoryFound));
  }

  function calculateSpanTotalCart() {
    let number = 0;

    for (const productCart of productsInTheCart) {
      number += Number(productCart.quantity);
    }

    return number;
  }

  function handleResetSearch(e: any) {
    if (searchTerm === "") {
      dispatch(setCategorySelected("Default"));
    }
  }

  // #endregion

  return (
    <>
      <header className="header">
        <div className="header-group-1">
          <Link
            to="/dashboard"
            onClick={() => {
              dispatch(setCategorySelected("Default"));
              dispatch(setSearchTerm(""));
            }}
          >
            Bank System
          </Link>

          <ul className="list-nav">
            <div
              className="div-inside-li"
              onClick={() => {
                dispatch(setCategorySelected("Default"));
                dispatch(setSearchTerm(""));
              }}
            >
              <NavLink to="/dashboard" className="special-uppercase">
                Home
              </NavLink>
            </div>

            <div className="div-inside-li-special">
              <div className="dropdown">
                <div className="genre-drop">
                  <img src="/assets/logos/list_blu.png" alt="" />

                  <li className="special-uppercase">Categories</li>
                </div>

                <div className="dropdown-content">
                  <ul>
                    <li
                      onClick={() => {
                        dispatch(setCategorySelected("Default"));
                      }}
                    >
                      Show All
                    </li>

                    {
                      //@ts-ignore
                      categories.map((category) => (
                        <li
                          className="special-list-drop"
                          key={category?.id}
                          onClick={function (e: any) {
                            handleCategoryRender(category.description);
                          }}
                        >
                          {category.description}
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </div>
          </ul>
        </div>

        <div className="header-group-2">
          <form
            className="button-search"
            onSubmit={function (e) {
              e.preventDefault();
            }}
          >
            <input
              type="search"
              name="searchMovie"
              placeholder="Search for Products..."
              aria-label="Search through site content"
              onChange={function (e) {
                dispatch(setSearchTerm(e.target.value));
              }}
              onKeyDown={function (e: any) {
                handleResetSearch(e);
              }}
            />

            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>

          {user === null ? (
            <button
              className="button-login-header"
              onClick={function () {
                navigate("/login");
              }}
            >
              <i className="material-icons special-icon">account_circle</i>
              Sign In
            </button>
          ) : (
            <div className="dropdown">
              <li
                className="dropbtn"
                onClick={function () {
                  navigate(`/profile/${user?.username}`);
                }}
              >
                <img
                  src={
                    "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png"
                  }
                />

                {user.username}
              </li>

              <div className="dropdown-content">
                <button
                  className="log-out"
                  onClick={function (e) {
                    e.stopPropagation();
                    dispatch(onLogout());
                  }}
                >
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}

          <div className="cart-icon-header">
            <i
              className="fa fa-shopping-cart"
              aria-hidden="true"
              onClick={function () {
                navigate(`/${user.username}/cart`);
              }}
            ></i>

            <span id="total-header-span">{calculateSpanTotalCart()}</span>
          </div>
        </div>
      </header>
    </>
  );
}
