import { Link } from "react-router-dom";

const ProductList = (props) => {
  const { product } = props;
  const formatter = new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-md:px-20 max-sm:px-5">
      {Array.isArray(product) && product.map((item, index) => (
        <Link key={index} to={`/product/${item?._id}`}>
          <div className="bg-white shadow-2xl rounded-xl pb-4 transition-transform duration-300 hover:scale-105">
            <img
              className="rounded-t-xl object-cover w-full h-48"
              src={item.img[0]}
              alt={item.name}
              onMouseOver={e => {
                e.currentTarget.src = item.img[1] || item.img[0];
              }}
              onMouseOut={e => {
                e.currentTarget.src = item.img[0];
              }}
            />
            <div className="px-4 mt-3">
              <div className="text-base overflow-hidden text-ellipsis whitespace-nowrap">
                {item.name}
              </div>
              <div className="flex items-center mt-2">
                <p className="font-bold text-base">
                  {formatter.format(item.price)}
                </p>
                {item.product_price_discount > 0 && (
                  <p className="line-through text-xs text-gray-500 ml-2">
                    {formatter.format(
                      Math.floor(
                        item.product_price / (1 - item.product_price_discount / 100)
                      )
                    )}
                  </p>
                )}
                <div className="flex-grow"></div>
                {item.product_price_discount > 0 && (
                  <p className="font-bold text-[#E44918]">
                    -{item.product_price_discount}%
                  </p>
                )}
              </div>
              <div className="flex justify-between">
              <p className="mt-2 text-sm text-gray-600">
                Loại: {item.code}
              </p>
              <p className="mt-2 text-sm bg-[#F1DEBC] text-[#4C2113] w-fit py-1 px-3 rounded-lg font-semibold">
                {item.category == "phamay" ? "Pha Máy" : "Pha Phin"}
              </p>
              </div>
              <button className="mt-2 bg-[#4C2113] text-white py-1 px-4 rounded">
                Xem thêm
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
