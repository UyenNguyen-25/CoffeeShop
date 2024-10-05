import { Spin } from "antd";
import { ArcElement, BarElement, CategoryScale, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useGetUsersQuery } from "@/redux/features/users/usersApiSlice";
import { useGetOrderByMonthQuery, useGetOrdersQuery } from "@/redux/features/orders/ordersApiSlice";
import { useGetProductsQuery, useGetSoldProductsQuery } from "@/redux/features/products/productsApiSlice";

// Chart.register(ChartDataLabels);
Chart.register(
  LineController,
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  ArcElement,
  Legend,
  Title,
)

const Dashboard = () => {
  const [chartData, setChartData] = useState({});
  const [doughnutData, setDoughnutData] = useState({});
  const { data: user, isLoading: userLoading } = useGetUsersQuery({});
  const { data: order, isLoading: orderLoading } = useGetOrdersQuery({})
  const { data: product, isLoading: productLoading } = useGetProductsQuery({})
  const { data: productData, isLoading: isProductDataLoading, isError: isProductDataError } = useGetSoldProductsQuery()
  const { data: orderData, isLoading: isOrderDataLoading, isError: isOrderDataError } = useGetOrderByMonthQuery()
  const [isLoading, setIsLoading] = useState(true)

  const getTypeName = (type) => {
    switch (type) {
      case "type1":
        return "Sữa bột pha sẳn";
      case "type2":
        return "Sữa bột công thức";
      case "type3":
        return "Sữa tươi";
      case "type4":
        return "Sữa hạt dinh dưỡng";
      default:
        return type;
    }
  };
  const chart = () => {
    const labelList = orderData?.map((data) => data?._id?.month);
    const dataValue = orderData?.map((data) => data?.totalOrders);
    setChartData({
      labels: labelList,
      datasets: [
        {
          label: "Number of order ",
          data: dataValue,
          backgroundColor: [
            "#5932EA"
          ],
          borderWidth: 2
        }
      ]
    })

  };
  const chart2 = () => {
    setDoughnutData({
      labels: productData?.map(data => getTypeName(data?._id)),
      datasets: [
        {
          label: 'Sold Products by Type',
          data: productData?.map(data => data?.totalQuantity),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          borderWidth: 1,
        },
      ],
    });
  }

  const chartRef = useRef(null);
  const chartRef2 = useRef(null);

  useEffect(() => {
    const chartInstance = chartRef.current;

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartData]);
  useEffect(() => {
    const chartInstance2 = chartRef2.current;

    return () => {
      if (chartInstance2) {
        chartInstance2.destroy();
      }
    };
  }, [doughnutData]);


  useEffect(() => {
    if (!isOrderDataLoading && !isProductDataLoading) {
      setIsLoading(false);
    }
    if (isOrderDataError) {
      console.log("Have Problem In OrderData")
    } else chart()

    if (isProductDataError) {
      console.log("Have Problem In ProductData")
    } else chart2()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOrderDataError, isOrderDataLoading, isProductDataError, isProductDataLoading,])

  return <div>
    <h2 className="text-2xl font-bold mb-4">Bảng Điều Khiển</h2>
    <div className="text-center mt-6">
      <div className="flex flex-row text-lg gap-6">
        <div className="basis-1/3 flex bg-white px-6 py-3 rounded-xl">
          <div className="flex flex-col">
            <div className="text-left ">Tài Khoản</div>
            <div className="text-left text-xl mt-1 font-semibold">{!userLoading ? user?.length : 0}</div>
          </div>
          <div className="flex-grow"></div>
          <svg className="" width="79" height="82" viewBox="0 0 89 82" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.842657" fillRule="evenodd" clipRule="evenodd" d="M0 40.88V58.76C0 71.4625 10.2975 81.76 23 81.76H44.34H65.68C78.3825 81.76 88.68 71.4625 88.68 58.76V40.88V23C88.68 10.2975 78.3825 0 65.68 0H44.34H23C10.2975 0 0 10.2975 0 23V40.88Z" fill="#8280FF" />
            <path opacity="0.587821" fillRule="evenodd" clipRule="evenodd" d="M31.2375 31C31.2375 35.4183 34.5461 39 38.6275 39C42.7089 39 46.0175 35.4183 46.0175 31C46.0175 26.5817 42.7089 23 38.6275 23C34.5461 23 31.2375 26.5817 31.2375 31ZM49.7125 39C49.7125 42.3137 52.194 45 55.255 45C58.3161 45 60.7975 42.3137 60.7975 39C60.7975 35.6863 58.3161 33 55.255 33C52.194 33 49.7125 35.6863 49.7125 39Z" fill="white" />
            <path fillRule="evenodd" clipRule="evenodd" d="M38.5967 43C29.8739 43 22.7173 47.853 22.0012 57.3984C21.9622 57.9184 22.8807 59 23.3441 59H53.8633C55.2511 59 55.2727 57.7909 55.2511 57.4C54.7098 47.5864 47.4423 43 38.5967 43ZM54.518 47.001C56.8369 50.3434 58.2109 54.4979 58.211 58.9998H65.3349C66.3372 58.9998 66.3528 58.093 66.3372 57.7998C65.9505 50.5199 60.8116 47.0754 54.518 47.001Z" fill="white" />
          </svg>
        </div>
        <div className="basis-1/3 flex bg-white px-6 py-3 rounded-xl">
          <div className="flex flex-col">
            <div className="text-left ">Sản Phẩm</div>
            <div className="text-left text-xl mt-1 font-semibold">{!productLoading ? product?.length : 0}</div>
          </div>
          <div className="flex-grow"></div>
          <svg width="83" height="82" viewBox="0 0 93 82" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.21" fillRule="evenodd" clipRule="evenodd" d="M0.43335 41.1181V59.0001C0.43335 71.7026 10.7308 82.0001 23.4334 82.0001H46.251H69.0687C81.7713 82.0001 92.0687 71.7026 92.0687 59V41.1181V23.2361C92.0687 10.5335 81.7712 0.236084 69.0687 0.236084H46.251H23.4333C10.7308 0.236084 0.43335 10.5336 0.43335 23.2361V41.1181Z" fill="#FEC53D" />
            <path fillRule="evenodd" clipRule="evenodd" d="M23.3422 33.3729L43.0445 43.5227C43.2567 43.632 43.4791 43.7109 43.7056 43.761V63.446L24.7473 53.4351C23.8764 52.9752 23.3422 52.1393 23.3422 51.2362V33.3729ZM69.16 33.1031V51.2363C69.16 52.1393 68.6257 52.9753 67.7548 53.4352L48.7965 63.4461V43.5886C48.8427 43.5681 48.8885 43.5461 48.9338 43.5227L69.16 33.1031Z" fill="#FEC53D" />
            <path opacity="0.499209" fillRule="evenodd" clipRule="evenodd" d="M23.9611 28.4466C24.2017 28.1755 24.5055 27.9463 24.8596 27.778L44.9048 18.2516C45.7463 17.8517 46.7557 17.8517 47.5972 18.2516L67.6424 27.778C67.9154 27.9077 68.1585 28.0737 68.3658 28.2671L46.3883 39.5889C46.2438 39.6633 46.1106 39.7485 45.9891 39.8427C45.8677 39.7485 45.7345 39.6633 45.59 39.5889L23.9611 28.4466Z" fill="#FEC53D" />
          </svg>
        </div>
        <div className="basis-1/3 flex bg-white px-6 py-3 rounded-xl">
          <div className="flex flex-col">
            <div className="text-left ">Đơn Hàng</div>
            <div className="text-left text-xl mt-1 font-semibold">{!orderLoading ? order?.length : 0}</div>
          </div>
          <div className="flex-grow"></div>
          <svg width="79" height="82" viewBox="0 0 89 82" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.21" fillRule="evenodd" clipRule="evenodd" d="M0 41.1181V59.0001C0 71.7026 10.2974 82.0001 23 82.0001H44.3397H65.6794C78.3819 82.0001 88.6794 71.7026 88.6794 59V41.1181V23.2361C88.6794 10.5335 78.382 0.236084 65.6794 0.236084H44.3397H23C10.2975 0.236084 0 10.5336 0 23.2361V41.1181Z" fill="#4AD991" />
            <path d="M34.375 21C33.2147 21 32.1019 21.4109 31.2814 22.1423C30.4609 22.8737 30 23.8657 30 24.9V56.1C30 57.1343 30.4609 58.1263 31.2814 58.8577C32.1019 59.5891 33.2147 60 34.375 60H60.625C61.7853 60 62.8981 59.5891 63.7186 58.8577C64.5391 58.1263 65 57.1343 65 56.1V32.7L51.875 21H34.375ZM34.375 24.9H49.6875V34.65H60.625V56.1H34.375V24.9ZM38.75 40.5V44.4H56.25V40.5H38.75ZM38.75 48.3V52.2H49.6875V48.3H38.75Z" fill="#4AD991" />
          </svg>
        </div>
      </div>
      <div className="flex flex-row gap-6 mt-6">
        <div className="basis-2/3 bg-white rounded-xl px-6 py-3">
          <div className="text-lg font-bold text-left">Tổng Quan</div>
          {isLoading ? <div className="h-full flex justify-center items-center"><Spin /></div> :
            chartData.labels && chartData.labels.length > 0 ? (
              <Bar
                ref={chartRef}
                data={chartData}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Orders Per Month",
                      font: { weight: 'bold', size: 16 }
                    },
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Month'
                      }
                    }
                  },
                  borderRadius: 20
                }}
              />
            ) : (
              <p>Chưa có dữ liệu</p>

            )
          }

        </div>
        <div className="basis-1/3 bg-white rounded-xl px-6 py-3">
          <div className="text-lg font-bold text-left">Sản Phẩm Bán Chạy</div>
          {
            doughnutData?.labels && doughnutData?.labels?.length > 0 ? (
              <Doughnut
                ref={chartRef2}
                data={doughnutData}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Sold Products by Type",
                      font: { weight: 'bold', size: 16 }
                    },
                    legend: {
                      position: 'right'
                    }
                  }
                }}
              />
            ) : (
              <p>Đang tải...</p>
            )
          }
        </div>
      </div>
    </div>
  </div>;
};

export default Dashboard;
