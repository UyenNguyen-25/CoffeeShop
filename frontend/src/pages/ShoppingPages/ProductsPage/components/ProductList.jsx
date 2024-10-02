import { Link } from "react-router-dom";

const ProductList = ({ product }) => {
  const formatter = new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
  });
  // console.log("product list", product);
  return (
    <div className="grid grid-cols-5 gap-4 mt-4 mb-7">
      {Array.isArray(product) && product.map((item, index) => (
        <div key={index} className="bg-white shadow-2xl rounded-xl h-[350px]">
          <img
            className="rounded-t-xl "
            src={item.img[0]}
            alt={item.name}
          />
          <div className="px-6 mt-3">
            <Link
              to={`/product/${item._id}`}
              className="text-base whitespace-nowrap overflow-ellipsis w-[200px] inline-block overflow-hidden"
            >
              {item.name}
            </Link>
            <div className="flex gap-3">
              <p className="font-bold my-1 text-base">
                {formatter.format(item.price)}
              </p>
              {
                item.product_price_discount > 0 && (
                  <p className="my-4 line-through text-xs">
                    {formatter.format(
                      Math.floor(
                        item.product_price / (1 - item.product_price_discount / 100)
                      )
                    )}
                  </p>
                )
              }

              <div className="flex flex-grow"></div>
              {
                item.product_price_discount > 0 && (
                  <p className="font-bold my-4 text-[#E44918]">
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
