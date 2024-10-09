/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/redux/features/cart/cartSlice";
import { Alert, Button, Input, message, Popconfirm, Space } from "antd";
import AddAddress from "./AddAddress";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants/apiConfig";
import cart from "../../../assets/cart.png";
import EditAddress from "./EditAddress";
import { Trash2 } from "lucide-react";
import { coffeeOptions } from "@/constants/CoffeeSuggestions";

const CartPage = () => {
  const nav = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [shippingAddress, setShippingAddress] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [discount, setDiscount] = useState();
  const [types, setTypes] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState();
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const formatter = new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
  });


  const temporaryTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shippingFee = shippingInfo?.fee || 0;

  useEffect(() => {
    setTotalAmount(temporaryTotal + shippingFee);
  }, [temporaryTotal, shippingFee]);

  const handleApply = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/promotion/promotion-code/${discount}`);
      const promotionCode = response.data;
      setDiscountAmount(temporaryTotal * promotionCode.discount);

      if (promotionCode) {
        const isCodeValid = new Date(promotionCode.expireDate) > new Date();

        if (isCodeValid) {
          setTotalAmount(temporaryTotal * (1 - promotionCode.discount) + shippingFee);
          setIsDiscountApplied(true);
          message.success('Discount applied successfully!');
        } else {
          setIsDiscountApplied(false);
          message.error('Discount code has expired.');
        }
      } else {
        setIsDiscountApplied(false);
        message.error('Invalid discount code.');
      }
    } catch (error) {
      console.error("Error fetching discount code:", error);
      message.error("Failed to apply discount code.");
      setIsDiscountApplied(false);
    }
  };

  // console.log('cart', cartItems)

  useEffect(() => {
    const storedAddress = localStorage.getItem('shippingAddress');
    if (storedAddress) {
      setShippingAddress(JSON.parse(storedAddress));
    }
  }, []);

  useEffect(() => {
    if (shippingAddress) {
      setShippingInfo({
        fee: shippingAddress.shippingFee,
      });
    }
  }, [shippingAddress]);

  useEffect(() => {
    const storedShippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));
    if (storedShippingInfo) {
      setShippingInfo(storedShippingInfo);
    }
  }, []);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/type/get-all-type`);
        setTypes(response.data);
      } catch (error) {
        console.error("Fail to fetch types", error);
      }
    };
    fetchTypes();
  }, []);

  const handleDecrease = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleIncrease = async (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const confirm = (productId) => {
    console.log(productId);
    dispatch(removeFromCart(productId));
  };
  const cancel = (e) => {
    console.log(e);
  };

  const handlePayment = async () => {
    if (!shippingAddress) {
      message.error("Vui lòng thêm địa chỉ giao hàng");
      return;
    }

    const orderItems = cartItems.map((item) => {
      if (item.isMix) {
        return {
          productId: null,
          quantity: item.quantity,
          price: item.price,
          isMix: true,
          mixDetails: item.mixDetails.map((mixDetail) => ({
            productId: mixDetail.productId,
            percentage: mixDetail.percentage
          })),
          typeId: null
        };
      } else {
        return {
          productId: item._id,
          quantity: item.quantity,
          price: item.price,
          isMix: false,
          mixDetails: null,
          typeId: item.typeId
        };
      }
    });

    const orderData = {
      email: shippingAddress.email,
      phoneNumber: shippingAddress.phone,
      fullName: shippingAddress.name,
      shippingFee,
      totalPrice: temporaryTotal,
      orderItems: orderItems,
      payment_method: paymentMethod,
      shippingAddress: shippingAddress.fullAddress,
      discountAmount: discountAmount
    };

    console.log('order data', orderData);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/order/create-order`, orderData
      );
      // console.log('response', response)

      if (response.status === 201) {
        if (paymentMethod === "COD") {
          message.success("Đặt hàng thành công!");
          dispatch(clearCart());
          nav(`/order-confirmation?orderId=${response.data._id}`);
        } else if (paymentMethod === "momo") {
          const payosData = {
            orderId: response.data._id,
            amount: response.data.totalPrice,
            // amount: 2000,
          };
          // console.log('payosData', payosData);
          const payosResponse = await axios.post(`${BASE_URL}/api/payment/create-payment`, payosData);
          console.log('payosResponse', payosResponse);
          if (payosResponse.data && payosResponse.data.payUrl) {
            window.location.href = payosResponse.data.payUrl;
            dispatch(clearCart());
          } else {
            // console.error("Thanh toán PayOS không thành công:", payosResponse.data);
            message.error("Thanh toán PayOS không thành công");
          }
        }
      } else {
        message.error("Đặt hàng thất bại, vui lòng thử lại");
      }
    } catch (error) {
      // console.error("Lỗi khi đặt hàng:", error);
      message.error("Đặt hàng thất bại, vui lòng thử lại");
    }
  };

  return (
    <div className="py-9 px-6 md:px-24">
      <h1 className="text-2xl font-semibold pb-5">Giỏ Hàng</h1>
      {cartItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <img src={cart} className="w-2/3 md:w-1/5 mx-auto mb-10" alt="Empty cart" />
          <h1 className="text-xl font-semibold mb-6">Giỏ hàng hiện đang trống...</h1>
          <button
            className="text-base border border-transparent bg-[#E44918] hover:bg-[#d63e12] rounded-full text-white px-6 py-3 mt-6 transition duration-300 transform hover:scale-105 shadow-lg"
            onClick={() => nav("/products?page=1&per_page=8")}
          >
            Tiếp tục mua sắm
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Phần sản phẩm trong giỏ */}
          <div className="w-full lg:w-3/5 bg-white py-9 px-6 shadow-lg rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-48 md:w-[300px] text-base text-[#8B8B8B] text-left">Sản phẩm</TableHead>
                  <TableHead className="w-24 md:w-[100px] text-base text-[#8B8B8B] text-center">Đơn giá</TableHead>
                  <TableHead className="w-24 md:w-[100px] text-base text-[#8B8B8B] text-center">Số lượng</TableHead>
                  <TableHead className="w-36 md:w-[150px] text-base text-[#8B8B8B] text-center">Thành tiền</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.isMix ? item.mixDetails[0].productId : item._id} className="align-middle">
                    <TableCell className="flex items-center gap-3">
                      {item.isMix ? (
                        // Rendering mixed coffee item
                        <div>
                          <p className="font-normal text-base text-left">Cà phê trộn:</p>
                          {item.mixDetails.map((mix, index) => (
                            <div key={index} className="flex items-center gap-1">
                              <span>{coffeeOptions.find(option => option.id === mix.productId)?.label || "Không xác định"}: {mix.percentage}%</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        // Rendering regular product item
                        <div className="flex items-center">
                          <img className="w-24 h-24 object-cover" src={item.img[0]} alt={item.name} />
                          <div className="flex flex-col gap-3">
                            <p className="w-full flex items-center font-normal text-base text-left">{item.name}</p>
                            <div className="text-[rgba(0,0,0,.54)]">
                              <p>Phân Loại Hàng:</p>
                              <p>{types.find(type => type._id === item?.typeId)?.name || "Không xác định"}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-base font-semibold text-center">{formatter.format(item.price)}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex gap-x-0">
                        <button
                          className="bg-[#E5E9EB] w-7 py-1 rounded-l-full font-bold"
                          onClick={() => handleDecrease(item.isMix ? item.mixDetails[0].productId : item._id)}
                        >
                          <MinusOutlined />
                        </button>
                        <p className="bg-[#E5E9EB] text-center py-1 w-7 text-base">
                          {item.quantity}
                        </p>
                        <button
                          className="bg-[#E5E9EB] w-7 py-1 rounded-r-full font-bold"
                          onClick={() => handleIncrease(item.isMix ? item.mixDetails[0].productId : item._id)}
                        >
                          <PlusOutlined />
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="text-base font-semibold text-center">
                      <div className="flex gap-2 items-center">
                        <span>{formatter.format(item.price * item.quantity)}</span>
                        <Popconfirm
                          title="Xóa sản phẩm khỏi giỏ hàng?"
                          onConfirm={() => confirm(item.isMix ? item.mixDetails[0].productId : item._id)}
                          onCancel={cancel}
                          okText="Ok"
                          cancelText="Hủy"
                        >
                          <button className="ml-4 text-red-600">
                            <Trash2 color="#FF0000" />
                          </button>
                        </Popconfirm>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </div>

          {/* Phần thanh toán và địa chỉ */}
          <div className="flex flex-col gap-6 w-full lg:w-1/3">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              {shippingAddress ? (
                <>
                  <div className="flex gap-12">
                    <h1 className="text-xl font-bold mb-2">Địa Chỉ Nhận Hàng</h1>
                    <EditAddress setShippingAddress={setShippingAddress} shippingAddress={shippingAddress} />
                  </div>
                  <div className="flex justify-center gap-3 p-3 rounded-lg">
                    <div>
                      <div className="flex gap-2 mb-1">
                        <p className="text-lg font-semibold">{shippingAddress?.name} | </p>
                        <p className="text-lg text-orange-600 font-bold">{shippingAddress?.phone}</p>
                      </div>
                      <p className="my-3">Email: {shippingAddress?.email}</p>
                      <p>{shippingAddress?.fullAddress}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-xl font-bold mb-4">Địa Chỉ Nhận Hàng</h1>
                  <div className="flex justify-center gap-3 p-3">
                    <AddAddress setShippingAddress={setShippingAddress} />
                  </div>
                </>
              )}
            </div>

            <div className="rounded-lg bg-white p-6 shadow-lg flex flex-col gap-2">
              <p className="text-xl font-bold mb-2">Mã giảm giá</p>
              <Space.Compact style={{ width: '100%' }}>
                <Input placeholder="Nhập mã giảm giá" onChange={(e) => setDiscount(e.target.value)} />
                <Button className=" bg-[#4C2113] text-[white] hover:bg-[#9e472a]" onClick={handleApply}>Áp dụng</Button>
              </Space.Compact>
              {isDiscountApplied ? (
                <Alert message="Đã giảm giá" type="success" showIcon />
              ) : (
                <Alert message="Chưa áp dụng" type="error" showIcon />
              )}
            </div>

            <div className="rounded-lg bg-white p-6 shadow-lg flex flex-col gap-2">
              <p className="text-xl font-bold mb-2">Phương thức thanh toán</p>
              <div>
                <input
                  type="radio"
                  id="COD"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
                <label htmlFor="COD" className="ml-2 cursor-pointer">Thanh toán khi nhận hàng</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="momo"
                  name="paymentMethod"
                  value="momo"
                  checked={paymentMethod === "momo"}
                  onChange={() => setPaymentMethod("momo")}
                />
                <label htmlFor="momo" className="ml-2 cursor-pointer">Thanh toán qua Ngân hàng</label>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-lg">
              <Table>
                <TableBody className="text-base">
                  <TableRow>
                    <TableCell className="text-[#8B8B8B]">Tính tạm</TableCell>
                    <TableCell>{formatter.format(temporaryTotal)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-[#8B8B8B]">Phí vận chuyển</TableCell>
                    <TableCell>+{formatter.format(shippingFee)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-[#8B8B8B]">Giảm giá</TableCell>
                    <TableCell>{isDiscountApplied ? `-${formatter.format(temporaryTotal * 0.1)}` : formatter.format(0)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-[#8B8B8B]">Tổng tiền</TableCell>
                    <TableCell>{formatter.format(totalAmount)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <button className="bg-[#4C2113] hover:bg-[#d46e4b] text-white rounded-lg w-full py-3 font-semibold mt-4" onClick={handlePayment}>
                ĐẶT HÀNG
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;