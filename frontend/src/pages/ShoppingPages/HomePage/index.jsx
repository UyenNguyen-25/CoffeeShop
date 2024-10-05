import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from '../../../assets/bg.jpg';
import { Button, Card, Carousel, Col, Image, Row, Typography } from "antd";
import hatCapheImg from "@/assets/image_hat_cafe.jpg"
import nongDanImg from "@/assets/image_nongdan.jpg"
import { coffeeSuggestions } from "@/constant/CoffeeSuggestions";

export default function HomePage() {
  const nav = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const sortCoffeeRatios = (coffeeRatios) => {
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const sortedRatios = Object.entries(coffeeRatios)
      .sort(([, a], [, b]) => b - a)  // Sắp xếp theo giá trị từ lớn đến bé
      .map(([key, value]) => [capitalize(key), value]); // Viết hoa chữ cái đầu của key

    return sortedRatios.map(([key, value]) => {
      return <p key={key} className={`${value > 0 ? "visible" : "invisible"}`}>{key}: {value}%</p>;
    })
  }

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Swiper Section */}
      <Carousel autoplay
        dotPosition={"bottom"}
        className="relative h-fit w-full"
      >
        <div className="relative h-fit w-full">
          <img
            className="object-cover w-full h-full max-md:object-fill min-h-96"
            src={bg}
            alt="Landing Page"
          />
          <div className="absolute inset-0 flex flex-col items-start justify-center pl-4 sm:pl-10 lg:pl-[150px] text-white bg-opacity-50 bg-black">
            <h1 className="text-xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
              Welcome to Coffee Haven!
            </h1>
            <p className="text-xs md:text-lg lg:text-xl mt-2 md:mt-5 lg:mt-10 drop-shadow-md">
              Coffee Shop is the place where you can get flavorful coffee strains <br />
              from global elite brands and roasters at very affordable price.
            </p>

            <button
              className="text-xs md:text-lg lg:text-xl tracking-wider border border-transparent bg-[#E44918] hover:bg-[#d63e12] rounded-full text-white px-5 sm:px-7 pt-2 pb-3 mt-3 md:mt-5 lg:mt-8 transition duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => nav("/products?page=1&per_page=8")}
            >
              CÀ PHÊ NGAY
            </button>
            <button
              className="text-xs md:text-lg lg:text-xl tracking-wider border border-transparent bg-[#77483ab5] hover:bg-[#d6af12ac] rounded-3xl text-white px-5 sm:px-7 pt-2 pb-3 mt-3 md:mt-5 lg:mt-8 transition duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => nav("/dashboard")}
            >
              Chuyển đến trang quản lý <br />
              (dành cho nhân viên)
            </button>
          </div>
        </div>
        {/* Add more SwiperSlides as needed */}
      </Carousel>

      <Row gutter={[10, 10]} justify={"space-evenly"} align={"middle"} className="py-16 bg-white">
        <Col xs={20} md={10}>
          <Image
            preview={false}
            height={"auto"}
            src={hatCapheImg}
            className="max-sm:max-w-full max-sm:h-auto mr-16"
            alt="hat_ca_phe"
          />
        </Col>
        <Col xs={20} md={12} lg={9}>
          <div style={{ color: "#664228", lineHeight: 1.3 }}>
            <p className="font-bold md:text-2xl text-lg max-md:mt-3">HOA ĐẤT</p>
            <p className="font-bold md:text-2xl text-lg">Và câu chuyện truyền cảm hứng</p>
            <p className="md:text-base text-[14px] mt-3">
              Vào năm 2018, giữa những cánh đồng cà phê bạt ngàn của vùng đất Tây Nguyên, một giấc mơ lớn bắt đầu chớm nở. Hoa Đất không chỉ là một thương hiệu cà phê, mà là sự kết tinh từ tình yêu và niềm đam mê dành cho từng hạt cà phê nguyên chất của người sáng lập. Với mong muốn mang đến cho mọi người những tách cà phê thực sự &quot;sạch&quot; nguyên bản và đậm đà hương vị của tự nhiên, Hoa Đất ra đời như một hành trình kết nối giữa thiên nhiên, con người, và niềm tự hào về những giá trị truyền thống. Năm 2024, Hoa Đất quyết định làm điều mà không nhiều thương hiệu dám làm: Cho phép khách hàng tự &quot;mix&quot; cà phê theo tỷ lệ mong muốn, để mỗi tách cà phê mang đậm dấu ấn cá nhân. Từ những bước đi nhỏ bé, Hoa Đất không ngừng lớn mạnh. Đó là hành trình dài từ tình yêu với cà phê, với đất mẹ Tây Nguyên, và mong muốn mang đến một trải nghiệm cà phê nguyên chất, thuần khiết cho mỗi người.
            </p>
          </div>
        </Col>
      </Row>

      <Row gutter={[10, 10]} justify={"center"} align={"middle"} className="py-16 bg-[#E6D3B3] flex-row-reverse">
        <Col xs={20} md={10}>
          <Image
            preview={false}
            height={"auto"}
            src={nongDanImg}
            className="max-sm:max-w-full max-sm:h-auto bg-[#E6D3B3] md:rounded-[74px] rounded-[12%]"
            alt="nong_dan"
          />
        </Col>
        <Col xs={20} md={12} lg={11}>
          <div className="pr-16">
            <div style={{ color: "#664228", lineHeight: 1.3 }}>
              <p className="font-bold md:text-2xl text-lg max-md:mt-3">Sứ mệnh</p>
              <p className="md:text-base text-[14px] my-3">
                Mang đến những tách cà phê nguyên chất, đậm đà từ thiên nhiên, nhằm mang lại trải nghiệm tuyệt vời cho khách hàng. Sự kết nối giữa nông dân và người tiêu dùng giúp tạo ra giá trị bền vững, lâu dài            </p>
            </div>
            <div style={{ color: "#664228", lineHeight: 1.3 }}>
              <p className="font-bold md:text-2xl text-lg max-md:mt-3">Tầm nhìn</p>
              <p className="md:text-base text-[14px] my-3">
                Hướng đến trở thành thương hiệu cà phê uy tín hàng đầu tại Việt Nam, được khách hàng yêu thích vì chất lượng. Chúng tôi mong muốn đưa hương vị cà phê Việt ra thế giới và mở rộng thị trường quốc tế.
              </p>
            </div>
            <div style={{ color: "#664228", lineHeight: 1.3 }}>
              <p className="font-bold md:text-2xl text-lg max-md:mt-3">Giá trị cốt lõi</p>
              <p className="md:text-base text-[14px] mt-3">
                Luôn đề cao chất lượng sản phẩm, sáng tạo trong trải nghiệm và bền vững trong quy trình từ sản xuất đến tiêu dùng. Chúng tôi cam kết mang lại lợi ích cho cả nông dân và khách hàng.</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[0, 30]} justify="center" style={{ display: 'flex', flexWrap: 'wrap', padding: "50px", width: "100%" }}>
        <Row gutter={[0, 0]}>
          <Col xs={24}>
            <Typography.Title style={{ color: "#664228", textAlign: "center", fontWeight: 700 }}>
              “MIX” CÀ PHÊ THEO SỞ THÍCH
            </Typography.Title>
          </Col>
          <Col xs={24}>
            <Typography.Paragraph style={{ color: "#664228", textAlign: "center" }}>
              Tính năng mix cà phê theo sở thích cho phép khách hàng tùy chỉnh tỷ lệ giữa các loại hạt cà phê như robusta mạnh mẽ, arabica dịu nhẹ, và cả culi đặc trưng với hương vị đậm đà. Khách hàng có thể tạo ra tách cà phê hoàn hảo theo đúng khẩu vị cá nhân, từ độ đậm, chua đến hương thơm. Sự linh hoạt này mang đến trải nghiệm độc đáo và cá nhân hóa, giúp mỗi tách cà phê đều trở thành tác phẩm riêng biệt.
            </Typography.Paragraph>
          </Col>
        </Row>
        <Col xs={24}>
          <Typography.Title style={{ color: "#664228", fontStyle: "italic", textAlign: "center" }}>
            Bảng gợi ý kết hợp cà phê
          </Typography.Title>
        </Col>

        {coffeeSuggestions.map((suggestion, index) => {
          return (
            <Col xs={24} sm={12} lg={8} key={index} style={{ display: 'flex', justifyContent: 'center' }}>
              <Card title={suggestion.name}
                style={{
                  flex: 1,
                  maxWidth: '70%',
                  minWidth: "65%",
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#B28A62',
                  color: 'white',
                  cursor: 'pointer',
                  boxShadow: '4px 4px 2px rgba(0, 0, 0, 0.2)',
                  border: "none"
                }}
                styles={{
                  header: {
                    color: 'white',
                    textAlign: 'center',
                    textWrap: "nowrap",
                    whiteSpace: 'normal',
                    wordWrap: 'break-word'
                  }
                }}
              >
                <p>{suggestion.description}</p>
                <p className='font-semibold mt-3'>Tỷ lệ: </p>
                {sortCoffeeRatios(suggestion.ratio)}
              </Card>
            </Col>
          )
        })}

        <Row>
          <Col>
            <Button className="font-bold lg:text-3xl sm:text-2xl text-lg h-fit bg-transparent border-[#B28A62] text-[#B28A62] my-5" onClick={() => nav("/mix-coffee")}> TRẢI NGHIỆM NGAY</Button>
          </Col>
        </Row>
      </Row>
    </div>

  );
}
