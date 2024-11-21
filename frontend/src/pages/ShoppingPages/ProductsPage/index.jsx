import { useEffect, useState } from "react";
// import Filter from "./components/filter";
import ProductList from "./components/ProductList";
// import Pagination from "./components/Pagination";
import usePagination from "./util/usePagination";
import { Skeleton } from "antd";
import bgImg from "./../../../assets/cf.jpg"
import { useGetProductsQuery } from "@/redux/features/products/productsApiSlice";

export default function ProductsPage() {
  const [sort, setSort] = useState();
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const { data: productsData, isLoading } = useGetProductsQuery()
  const { paginatedItems } =
    usePagination(displayedProducts);

  useEffect(() => {
    let filteredProducts = !isLoading && productsData && [...productsData];

    if (sort) {
      filteredProducts.sort((a, b) => {
        if (sort === "lowToHigh") {
          return a.price - b.price;
        } else if (sort === "highToLow") {
          return b.price - a.price;
        }
        return 0;
      });
    }

    setDisplayedProducts(filteredProducts);
  }, [productsData, sort, isLoading]);


  const handleSort = (option) => {
    setSort(option);
  };

  return (
    <div className="">
      <img src="https://file.hstatic.net/200000379831/collection/product_group_-_coffee_bean_54d6a0132f19462b86f1387318c35449.png" />
      <div className="w-full flex flex-col gap-y-3 lg:px-20 py-1">
        <div className="bg-white h-fit rounded-lg py-4 mt-5 max-md:w-screen overflow-x-auto">
          {!isLoading && productsData && <div className="flex gap-5 ml-4 max-md:overflow-x-auto max-md:flex-nowrap overflow-none">
            <button
              className={`border border-[#D1D4D5] rounded-lg px-3 py-1 text-base max-sm:text-sm max-md:text-xs min-w-fit ${!sort ? "bg-[#4C2113] text-white" : ""
                }`}
              onClick={() => handleSort()}
            >
              Tất cả
            </button>
            <button
              className={`border border-[#D1D4D5] rounded-lg px-3 py-1 text-base max-sm:text-sm max-md:text-xs min-w-fit ${sort === "lowToHigh" ? "bg-[#4C2113] text-white" : ""
                }`}
              onClick={() => handleSort("lowToHigh")}
            >
              Giá Thấp - Cao
            </button>
            <button
              className={`border border-[#D1D4D5] rounded-lg px-3 py-1 text-base max-sm:text-sm max-md:text-xs min-w-fit ${sort === "highToLow" ? "bg-[#4C2113] text-white" : ""
                }`}
              onClick={() => handleSort("highToLow")}
            >
              Giá Cao - Thấp
            </button>
          </div>}
        </div>
        <div className="mt-4 mb-7 px-2 sm:px-4 lg:px-0">
          {!isLoading ? (
            <>
              <ProductList product={paginatedItems} />
              {/* <Pagination
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              product={displayedProducts.length}
            /> */}
            </>
          ) : (
            <Skeleton />
          )}
        </div>
      </div>
      <div
        className="w-[100%] h-[270px] flex items-center justify-center grayscale"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          // opacity: 0.8,
        }}
      >
        <div className="flex justify-around w-full text-white">
          <div className="flex flex-col items-center">
            <img
              className="w-12 h-12"
              src="https://theme.hstatic.net/200000379831/1000865837/14/home_counters_3_fa.png?v=249"
            />
            <p className="text-xl font-bold">ĐẬM ĐÀ</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="w-12 h-12"
              src="https://theme.hstatic.net/200000379831/1000865837/14/home_counters_2_fa.png?v=249"
            />
            <p className="text-xl font-bold">TINH TẾ</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="w-12 h-12"
              src="https://theme.hstatic.net/200000379831/1000865837/14/home_counters_3_fa.png?v=249"
            />
            <p className="text-xl font-bold">BỪNG TỈNH</p>
          </div>
        </div>
      </div>

    </div>
  );
}
