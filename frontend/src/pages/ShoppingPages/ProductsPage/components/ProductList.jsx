import { Link } from "react-router-dom";

const ProductList = ({ product }) => {
  const formatter = new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
  });
  // console.log("product list", product);
  return (<div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 w-full md:px-0 px-20">
    {Array.isArray(product) && product.map((item, index) => (
      <div key={index} className="bg-white shadow-2xl rounded-xl pb-6 w-full h-auto mx-auto">
        <img
          className="rounded-t-xl object-cover w-full md:h-auto sm:h-64 h-48"
          src={item.img[0]}
          alt={item.name}
        />
        <div className="px-6 mt-3 w-full">
          <Link
            to={`/product/${item._id}`}
            className="text-base max-sm:text-sm max-md:text-xs w-full inline-block overflow-hidden"
          >
            {item.name}
          </Link>
          <div className="flex gap-3 items-center mt-2">
            <p className="font-bold text-base">
              {formatter.format(item.price)}
            </p>
            {
              item.product_price_discount > 0 && (
                <p className="line-through text-xs text-gray-500">
                  {formatter.format(
                    Math.floor(
                      item.product_price / (1 - item.product_price_discount / 100)
                    )
                  )}
                </p>
              )
            }

            <div className="flex-grow"></div>
            {
              item.product_price_discount > 0 && (
                <p className="font-bold text-[#E44918]">
                  -{item.product_price_discount}%
                </p>
              )
            }

          </div>
        </div>
      </div>
    ))}
  </div>

  );
};

export default ProductList;
