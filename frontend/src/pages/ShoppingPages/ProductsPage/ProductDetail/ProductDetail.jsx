import { Skeleton } from "@/components/ui/skeleton";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import ProductReviews from "../components/ProductReviews";
import { soldout } from "@/assets/logo";
import { useGetProductDetailQuery } from "@/redux/features/products/productsApiSlice";
import { useGetTypesQuery } from "@/redux/features/types/typesApiSlice";
import { Carousel, Col, ConfigProvider, Row } from "antd";

const ProductDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [detail, setDetail] = useState()
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const formatter = new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
  });
  const { data: detailProduct, isLoading: detailLoading, isError: detailError } = useGetProductDetailQuery({ id });
  const { data: typeData, isLoading: typeLoading, isError: typeError } = useGetTypesQuery()

  useEffect(() => {
    if (!detailLoading && !typeLoading) {
      setLoading(!loading)
    }
    if (detailError && typeError) {
      console.log("Cant not get detail");
    } else {
      setDetail(detailProduct?.product)
      setTypes(typeData)
      if (typeData?.length > 0) {
        setSelectedType(typeData[0]._id);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detailLoading, typeLoading]);

  const handleAddToCart = (product) => {
    const selectedTypePrice = types?.find((type) => type._id === selectedType)?.price || 0;
    dispatch(addToCart({ ...product, quantity, stock: product.quantity, typeId: selectedType, price: product.price + selectedTypePrice }));
    toast.success("Thêm vào giỏ hàng thành công!", {
      position: "top-right",
    });
  };

  const handleBuyNow = (product) => {
    dispatch(addToCart({ ...product, quantity }));
    nav("/cart");
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
    console.log("handleDecrease");
  };

  const handleIncrease = () => {
    if (quantity < detail?.quantity) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "#000000be",
          motionDurationSlow: 's'
        },
        components: {
          Carousel: {
            dotGap: 8
          },
        },
      }}
    >
      <div className="px-40 py-10 max-lg:px-10">
        {loading && Object.is(detail) && Array.isArray(types) ? (
          <>
            <div className="flex">
              <Skeleton className="w-fit h-[641px] bg-[#F5F5F6]" />
              <div className="ml-36 flex flex-col gap-y-10">
                <Skeleton className="h-8 bg-[#F5F5F6]" />
                <Skeleton className="bg-[#F5F5F6] h-7" />
                <Skeleton className="bg-[#F5F5F6] py-4 pl-7 h-14" />
                <div className="flex gap-x-10">
                  <Skeleton className="text-xl font-bold bg-[#F5F5F6] h-12 w-36" />
                  <div className="flex gap-x-0">
                    <Skeleton className="bg-[#F5F5F6] h-12 w-12" />
                    <Skeleton className="bg-[#F5F5F6] h-12 w-12" />
                    <Skeleton className="bg-[#F5F5F6] h-12 w-12" />
                  </div>
                </div>
                <div className="flex gap-x-6">
                  <Skeleton className="rounded-2xl bg-[#F5F5F6] h-[52px] w-[193px]" />
                  <Skeleton className="rounded-2xl bg-[#F5F5F6] h-[52px] w-[160px]" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-5">
              <Skeleton className="bg-[#F5F5F6] py-4 pl-7 text-2xl font-bold mt-5 h-12 w-full" />
              <Skeleton className="text-xl bg-[#F5F5F6] h-36 w-full" />
              <Skeleton className="w-[641px] h-[641px] bg-[#F5F5F6]" />
            </div>
          </>
        ) : (
          <div>
            <Row gutter={[12, 12]} justify="space-evenly">
              <Col xs={24} sm={24} md={12}>
                <Carousel autoplay
                  dotPosition={"bottom"}
                >
                  {
                    detail?.img?.map((img, index) => (
                      <img
                        key={index}
                        className=""
                        src={img}
                      />
                    ))
                  }
                </Carousel>
              </Col>
              <div className="ml-10 flex flex-col gap-y-6">
                <p className="text-xl font-bold">{detail?.name}</p>
                <div className=" text-red-600 py-2 pl-7 text-xl font-medium border-t-2 border-b-2 border-dotted">
                  {formatter?.format(detail?.price + (types?.find((type) => type._id === selectedType)?.price || 0))}
                </div>
                {/* <div className="text-xl">
                  Kho: {detail.quantity > 0 ? detail.quantity : <img className="w-1/2" src={soldout}/>}
                </div> */}

                <div className="flex gap-x-10 items-center">
                  <p className="text-sm text-[#757575] w-24">Số lượng</p>
                  <div className="flex gap-x-0 border border-[#4C2113]">
                    <button
                      className="bg-[#f7eeee] w-10 py-2 font-bold"
                      onClick={handleDecrease}
                    >
                      <MinusOutlined />
                    </button>
                    <p className="bg-[white] text-center py-2 w-10 text-base">
                      {quantity}
                    </p>
                    <button
                      className="bg-[#f7eeee] w-10 py-2 font-bold"
                      onClick={handleIncrease}
                    >
                      <PlusOutlined />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-y-5">
                  <p className="text-sm text-[#757575] w-24">Loại</p>
                  <div className="flex items-center gap-x-4">
                    {types?.map((type) => (
                      <button
                        key={type._id}
                        className={`px-4 py-1 border rounded-md text-xs ${selectedType === type._id ? " border-[#4C2113] border-2 text-[#4C2113] font-medium" : "border-gray-300"}`}
                        onClick={() => setSelectedType(type._id)}
                      >
                        {type.name} ({formatter.format(type.price)})
                      </button>
                    ))}
                  </div>
                </div>
                {
                  detail?.quantity > 0 ? (
                    <div className="flex gap-10">
                      <p className="text-sm text-[#757575] w-24">Kho: </p>
                      <p className="text-sm">{detail?.quantity}</p>
                    </div>
                  ) : (
                    <img className="w-1/2" src={soldout} />
                  )
                }
                <div className="flex flex-col gap-3">
                  <button
                    className="bg-[#ddd2c5] py-2 text-base text-[#4C2113] border border-[#4C2113] hover:bg-[#A45C23] hover:text-white"
                    onClick={() => handleAddToCart(detail)}
                    disabled={detail?.quantity === 0}
                  >
                    Thêm vào giỏ
                  </button>
                  <button
                    className="bg-[#4C2113] py-2 text-base text-white hover:bg-gray-500"
                    onClick={() => handleBuyNow(detail)}
                    disabled={detail?.quantity === 0}
                  >
                    Mua ngay
                  </button>
                </div>
              </div>
            </Row>
            <div className="flex flex-col gap-y-5">
              <div className="bg-[#F1DEBC] py-4 pl-7 text-2xl font-bold mt-5">
                MÔ TẢ SẢN PHẨM
              </div>
              <div className="text-xl">{detail?.description}</div>
              <img
                className="w-2/5 border border-gray-300 rounded-lg mx-auto"
                src={detail?.img[0]}
              />
            </div>
            <ProductReviews product={detail} />
          </div>
        )}
      </div>
    </ConfigProvider>
  );
};

export default ProductDetail;