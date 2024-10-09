const nodemailer = require("nodemailer");
const Product = require("../model/Product");
require("dotenv").config();

const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`;
const CLIENT_ID = `${process.env.CLIENT_ID}`;
const CLIENT_SECRET = `${process.env.CLIENT_SECRET}`;
const APP_PASSWORD = `${process.env.APP_PASSWORD}`;

const logo =
  "https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-6/460918299_1975855619520959_2794212375283475338_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHGi8kwuK2b8EyCBAYpd73alZF5aPDURaeVkXlo8NRFp7r3TyTyF46gxyayBFhhLnV2CIH89f7S4R9ZQFKssgbs&_nc_ohc=AarlQ3pTnKoQ7kNvgHOLdzZ&_nc_ht=scontent.fsgn5-13.fna&_nc_gid=ABb_dRWnAw4S-TNFR6-Qiel&oh=00_AYDkbEehfMRX7hghivsfhpcF_i07VpsCd1ChOwenfafOyg&oe=67015784";

  const sendMail = async (to, order) => {
    try {
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: SENDER_MAIL,
          pass: APP_PASSWORD,
        },
      });
  
      await order.populate({
        path: "orderItems",
        populate: [
          { path: "productId", select: "name img" },
          { path: "typeId", select: "name" },
        ],
      });
      console.log("order", order);

      for (const item of order.orderItems) {
        if (item.isMix && item.mixDetails) {
          for (const mixItem of item.mixDetails) {
            const product = await Product.findById(mixItem.productId).select('name');
            mixItem.productName = product.name; 
          }
        }
      }
  
      const orderItemsHtml = order.orderItems
        .map((item) => {
          if (item.mixDetails && item.mixDetails.length > 0) {
            const mixDetailsHtml = item.mixDetails
              .map(
                (mixItem) => `
                <div style="padding-left: 30px;">
                  <p style="font-weight: 500;">${mixItem.productName} (${mixItem.percentage}%)</p>
                </div>
              `
              )
              .join("");
  
            return `
            <div style="display: flex; justify-content: space-around;">
              <img style="width: 150px;" src="https://product.hstatic.net/200000379831/product/brazil_-_cerrado__1___1__18349eda14094bd8a376a54bb2297553_large.png" />
              <div>
              <p style="padding-left: 30px">Cà phê trộn</p>
                <p style="color: darkgrey; padding-left: 30px">x ${item.quantity}</p>
                
                <div style="padding-left: 30px;">Các thành phần mix:</div>
                ${mixDetailsHtml}
              </div>
              <p style="font-weight: 600;">${item.price}₫</p>
            </div>`;
          } else {
            return `
            <div style="display: flex; justify-content: space-around;">
              <img style="width: 150px;" src=${item.productId.img[0]} />
              <div>
                <p style="font-weight: 600; padding-left: 30px">${item.productId.name}</p>
                <p style="color: darkgrey; padding-left: 30px">x ${item.quantity}</p>
                <p style="padding-left: 30px">Phân loại: ${item.typeId.name}</p>
              </div>
              <p style="font-weight: 600;">${item.price}₫</p>
            </div>`;
          }
        })
        .join("");
  
      const shippingFeeHtml =
        order.shippingFee > 0
          ? `+${order.shippingFee.toLocaleString("vi-VN")}₫`
          : "0₫";
  
      const mailOptions = {
        from: SENDER_MAIL,
        to: to,
        subject: "HOA ĐẤT - Đơn hàng mới",
        html: `
          <div
          style="background-color:#F3F3F3; max-width: full; margin: 50px auto; padding: 30px; text-align: center; font-size: 120%; border-radius: 10px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); position: relative;">
          <img src="${logo}" alt="Hoa Dat Logo" style="max-width: 100px; height: auto; display: block; margin: 0 auto; border-radius: 50%;" />
          <div style="background-color: #4C2113; padding-top: 10px;">
              <p style="color: white; font-size: 2cap; font-weight: bold;">Đơn hàng mới #${order.orderCode}</p>
              <p style="color: #b99e89; padding-bottom: 40px;">Cảm ơn bạn đã quan tâm sản phẩm của Hoa Đất.</p>
          </div>
          <div style="background-color: white;">
              <div style="padding: 20px; text-align: left; font-size: medium;">
                  <p style="font-size: larger; font-weight: 600; font-size: x-large;">Chào ${order.fullName},</p>
                  <p>Đơn hàng của bạn đã được nhận và sẽ được xử lý ngay khi bạn xác nhận thanh toán.</p>
                  <p>Để theo dõi tình trạng đơn hàng hoặc cần giải đáp thắc mắc xin vui lòng liên hệ hotline: 0962167328.
                  </p>
              </div>
              <div style="padding: 20px; text-align: left; font-size: medium; height: full;">
                  <div style="display: flex; gap: 20px; align-items: center; ">
                      <p style="font-size: larger; font-weight: 600; font-size: x-large;">Thông tin đơn hàng #${order.orderCode}</p>
                      <div
                          style="display: flex; align-items: center; justify-content: center; border: darkgrey; border-width: 1px; border-style: solid; width: 200px; height: fit-content; padding: 7px;">
                          <p style="margin: 0;">Ngày đặt hàng: ${new Date(order.createdAt).toLocaleDateString("vi-VN")}</p>
                      </div>
                  </div>
                  <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                      <tr>
                          <td style="font-weight: bold; padding: 10px 0;">Khách hàng:</td>
                          <td style="font-weight: 500; padding: 10px 0;">${order.fullName}</td>
                      </tr>
                      <tr>
                          <td style="font-weight: bold; padding: 10px 0;">Email:</td>
                          <td style="font-weight: 500; padding: 10px 0;">${order.email}</td>
                      </tr>
                      <tr>
                          <td style="font-weight: bold; padding: 10px 0;">Số điện thoại:</td>
                          <td style="font-weight: 500; padding: 10px 0;">${order.phoneNumber}</td>
                      </tr>
                      <tr>
                          <td style="font-weight: bold; padding: 10px 0;">Tình trạng:</td>
                          <td style="font-weight: 500; padding: 10px 0;">Đã xử lý</td>
                      </tr>
                      <tr>
                          <td style="font-weight: bold; padding: 10px 0;">Địa chỉ giao hàng:</td>
                          <td style="font-weight: 500; padding: 10px 0;">${order.shippingAddress}</td>
                      </tr>
                  </table>
              </div>
              <div style="padding: 20px; text-align: left; font-size: medium;">
                  <p style="font-size: larger; font-weight: 600; font-size: x-large;">Chi tiết đơn hàng #${order.orderCode}</p>
                  ${orderItemsHtml}
              </div>
              <div style="border: rgb(214, 213, 213); border-style: solid; border-width: 1px; width: 90%; margin: auto;"></div>
              <table style="width: 100%; margin-top: 20px; border-collapse: collapse; margin-left: 50px;">
                  <tr>
                      <td style="padding: 10px 0; text-align: left;">Tổng giá trị sản phẩm:</td>
                      <td style="padding: 10px 0; text-align: left;">${order.totalPrice.toLocaleString("vi-VN")}₫</td>
                  </tr>
                  <tr>
                      <td style="padding: 10px 0; text-align: left;">Phí vận chuyển:</td>
                      <td style="padding: 10px 0; text-align: left;">${shippingFeeHtml}</td>
                  </tr>
                  <tr>
                      <td style="padding: 10px 0; text-align: left;">Giảm giá:</td>
                      <td style="padding: 10px 0; text-align: left;">${order.discountAmount}</td>
                  </tr>
                  <tr>
                      <td style="padding: 10px 0; font-weight: bold; text-align: left;">Tổng thanh toán:</td>
                      <td style="padding: 10px 0; font-weight: bold; text-align: left; color: red;">${order.totalPrice.toLocaleString("vi-VN")}₫</td>
                  </tr>
              </table>
              <button style="padding: 15px; background-color: #4C2113; color: white; font-weight: 600; width: 250px; border: 0; border-radius: 20px; font-size: medium; margin: 20px;">Xác nhận đơn hàng</button>
          </div>
      </div>
      `,
      };
  
      await transport.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email", error);
      throw new Error(error);
    }
  };
  

module.exports = sendMail;
