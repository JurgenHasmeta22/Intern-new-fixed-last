import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../main/store/redux/rootState";
import { useNavigate, useParams } from "react-router-dom";
import HeaderCommon from "../../main/components/Common/HeaderCommon/HeaderCommon";
import FooterCommon from "../../main/components/Common/FooterCommon/FooterCommon";
import axios from "axios";
import "../dashboard/DashboardPage.css";
import ReactLoading from "react-loading";
import {
  setProducts,
  setCategories,
  setProductsFiltered,
} from "../../main/store/stores/dashboard/dashboard.store";
import { TProduct } from "../../main/interfaces/TProduct";
import { toast } from "react-toastify";

const DashboardPage: FC = () => {
  const params = useParams();
  const [pageNumber, setPageNumber] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  let pagesVisited = pageNumber * itemsPerPage;
  let pageCount;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //@ts-ignore
  const categories: ICategory[] | undefined = useSelector(
    (state: RootState) => state.dashboard.categories
  );
  //@ts-ignore
  const categorySelected: string = useSelector(
    (state: RootState) => state.dashboard.categorySelected
  );
  //@ts-ignore
  const categorySelectedObject: string = useSelector(
    (state: RootState) => state.dashboard.categorySelectedObject
  );
  //@ts-ignore
  const searchTerm: string = useSelector(
    (state: RootState) => state.dashboard.searchTerm
  );
  //@ts-ignore
  const products: TProduct[] = useSelector(
    (state: RootState) => state.dashboard.products
  );
  //@ts-ignore
  const productsFiltered: TProduct[] = useSelector(
    (state: RootState) => state.dashboard.productsFiltered
  );
  //@ts-ignore
  const productItem: TProduct = useSelector(
    (state: RootState) => state.dashboard.productItem
  );

  function handleChangingPageNumber(selected: any) {
    setPageNumber(selected);
  }

  const changePage = ({ selected }: any) => {
    if (params.sort === undefined && params.query === undefined) {
      handleChangingPageNumber(selected);
      navigate(`../movies/page/${selected + 1}`);
    } else if (params.sort && params.query === undefined) {
      handleChangingPageNumber(selected);
      navigate(`../movies/sortBy/${params.sort}/page/${selected + 1}`);
    } else {
      handleChangingPageNumber(selected);
      navigate(`../movies/search/${params.query}/page/${selected + 1}`);
    }
  };

  async function getProductsFromServer() {
    let result = await (
      await axios.get(`/product/get-all?PageNumber=1&PageSize=10`)
    ).data;
    dispatch(setProducts(result.data));
    dispatch(setProductsFiltered(result.data));
  }

  async function getCategoriesFromServer() {
    let result = await (
      await axios.get(`/category/get-all?PageNumber=1&PageSize=20`)
    ).data;
    if (result.status === 200) {
      toast.success("Promise resolved");
    }
    dispatch(setCategories(result.data));
  }

  function findingCategoriesNamesForProducts(categoryId: number) {
    const productCategoryName: any = categories?.find(
      (category) => category.id === categoryId
    );
    return productCategoryName.description;
  }

  function filteringProductsBySearchTerm(itemsToDisplay: any) {
    return itemsToDisplay.filter(function (item: any) {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  function filteringProductsByCategory(itemsToDisplayParam: any) {
    //@ts-ignore
    return itemsToDisplayParam.filter(
      //@ts-ignore
      (item: any) => item.categoryId === categorySelectedObject?.id
    );
  }

  function showItems() {
    let initialFilteredItems = JSON.parse(JSON.stringify(products));
    let itemToDisplayFiltered = [];
    if (searchTerm === "" && categorySelected === "Default") {
      return initialFilteredItems;
    } else if (searchTerm === "" && categorySelected !== "Default") {
      itemToDisplayFiltered = filteringProductsByCategory(initialFilteredItems);
      return itemToDisplayFiltered;
    } else if (
      searchTerm !== "" &&
      (categorySelected === "Default" || categorySelected !== "Default")
    ) {
      itemToDisplayFiltered =
        filteringProductsBySearchTerm(initialFilteredItems);
      return itemToDisplayFiltered;
    }
  }

  useEffect(() => {
    getProductsFromServer();
    getCategoriesFromServer();
  }, []);

  if (products[0]?.name === undefined) {
    return (
      <div className="loading-wrapper">
        <ReactLoading
          type={"spin"}
          color={"#000"}
          height={200}
          width={100}
          className="loading"
        />
      </div>
    );
  }
  return (
    <div className="dashboard-main-wrapper">
      <HeaderCommon />
      <div className="dashboard-wrapper">
        {showItems().length !== 0 ? (
          <div className="products-wrapper">
            {
              // @ts-ignore
              showItems().map((product) => (
                <div
                  className="product-item"
                  key={product?.id}
                  onClick={() => {
                    navigate(`/products/${product?.id}`);
                  }}
                >
                  <img
                    src={`data:image/jpeg;base64,${product?.base64Image}`}
                    alt={`${product?.name}`}
                  />
                  <span>
                    <strong>Product Name: </strong> {product?.name}
                  </span>
                  <p>
                    <strong>Product Short Desc: </strong>{" "}
                    {product?.shortDescription}
                  </p>
                  <span>
                    <strong>Product Price: </strong> {product?.price}$
                  </span>
                  <span>
                    <strong>Product Category Id: </strong> {product?.categoryId}
                  </span>
                  <span>
                    <strong>Product Category name: </strong>{" "}
                    {findingCategoriesNamesForProducts(product?.categoryId)}
                  </span>
                </div>
              ))
            }
          </div>
        ) : (
          <div className="products-void">
            <span>No Products to show</span>
          </div>
        )}
      </div>
      <FooterCommon />
    </div>
  );
};

export default DashboardPage;
