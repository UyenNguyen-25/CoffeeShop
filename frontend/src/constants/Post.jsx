import logoImg from "@/assets/logo.jpg"
import { format } from "date-fns";

export const popularPosts = [
  {
    title: "Hoa Đất - Cà phê từ tự nhiên, tinh túy từ mỗi hạt cà phê",
    avatar: logoImg,
    description:
      "Từ bao đời nay, cà phê đã trở thành một phần không thể thiếu trong đời sống người Việt. Một ly cà phê buổi sáng không chỉ là thức uống giúp tỉnh táo mà còn là khoảng thời gian thưởng thức, suy ngẫm. Với nhiều người, cà phê là nét văn hóa đặc trưng, là nơi mà cuộc trò chuyện được bắt đầu, câu chuyện được sẻ chia. Nhưng ít ai biết, trước khi trở thành thứ hương vị quen thuộc, mỗi hạt cà phê đã phải trải qua một hành trình dài từ khi còn là hạt giống bé nhỏ cho đến khi thành ly cà phê thơm ngon.",
    createBy: "Admin",
    createDate: format(new Date("1/10/2024"), "dd.MM.yyy"),
    children: [
      {
        headerSection: "🌱 Cà phê - Nét văn hóa đậm đà của người Việt",
        sectionContent: () => (
          <>
            <p>
              Từ bao đời nay, cà phê đã trở thành một phần không thể thiếu trong đời sống người Việt. Một ly cà phê buổi sáng không chỉ là thức uống giúp tỉnh táo mà còn là khoảng thời gian thưởng thức, suy ngẫm. Với nhiều người, cà phê là nét văn hóa đặc trưng, là nơi mà cuộc trò chuyện được bắt đầu, câu chuyện được sẻ chia. Nhưng ít ai biết, trước khi trở thành thứ hương vị quen thuộc, mỗi hạt cà phê đã phải trải qua một hành trình dài từ khi còn là hạt giống bé nhỏ cho đến khi thành ly cà phê thơm ngon.
            </p>
            <p>
              Từ việc ươm mầm, chăm sóc, đến đơm hoa kết trái, từng công đoạn đều được người nông dân nâng niu, chăm chút với tất cả tâm huyết. Sau đó, từng hạt cà phê được thu hoạch cẩn thận, qua tay những người công nhân khéo léo để chọn lọc và đóng gói. Chính sự tận tâm trong từng giai đoạn đã mang đến những hạt cà phê nguyên chất, chất lượng cao, sẵn sàng mang lại trải nghiệm tuyệt vời cho người thưởng thức.
            </p>
          </>
        ),
        imageSection: logoImg,
      },
      {
        headerSection: "☕ Hoa Đất - Tỉ mỉ trong từng hạt cà phê",
        sectionContent: () => (
          <>
            <p>
              Tại xưởng cà phê Hoa Đất, chúng tôi luôn đặt chất lượng lên hàng đầu. Từng hạt cà phê đều được lựa chọn kỹ lưỡng, trải qua quy trình rang xay tỉ mỉ, đảm bảo giữ trọn hương vị tự nhiên. Khách hàng của Hoa Đất không chỉ được thưởng thức những hạt cà phê nguyên chất mà còn có cơ hội trải nghiệm những sự kết hợp hương vị độc đáo, được tạo ra bởi sự hòa quyện giữa các loại cà phê khác nhau. Đây là điểm đặc biệt mà chúng tôi tự hào mang lại, giúp bạn không chỉ thưởng thức một ly cà phê mà còn là một hành trình khám phá vị giác.            </p>
            <p>
              Tại Hoa Đất, bạn có thể dễ dàng tùy chỉnh tỉ lệ giữa các dòng cà phê khác nhau, từ cà phê phin truyền thống đậm đà đến những hương vị nhẹ nhàng hơn, phù hợp với sở thích và phong cách cá nhân. Chúng tôi tin rằng, mỗi người đều xứng đáng có một ly cà phê riêng biệt, mang đậm dấu ấn cá nhân.            </p>
          </>
        ),
        imageSection: "",
      },
      {
        headerSection: "🚩 Khám phá cà phê sạch tại Hoa Đất",
        sectionContent: () => (
          <>
            <p>
              Sự độc đáo không chỉ đến từ hương vị, mà còn từ cách mà Hoa Đất tiếp cận quy trình sản xuất. Chúng tôi cam kết mang đến những hạt cà phê sạch, không chất bảo quản, tốt cho sức khỏe người tiêu dùng. Hoa Đất tin rằng, sức khỏe của khách hàng là ưu tiên hàng đầu, và mỗi sản phẩm từ xưởng đều phản ánh triết lý đó.            </p>
            <p>
              Với tôn chỉ luôn đặt chất lượng và sự hài lòng của khách hàng lên trước tiên, Hoa Đất không ngừng cải tiến quy trình sản xuất và mang đến những sản phẩm cà phê sạch, an toàn. Chúng tôi tin rằng, sự tận tâm và tâm huyết trong từng hạt cà phê sẽ mang đến cho bạn những trải nghiệm tuyệt vời, không chỉ về vị giác mà còn về tinh thần.</p>
            <p>
              Hãy ghé thăm xưởng cà phê Hoa Đất để khám phá thêm nhiều điều thú vị về cà phê và tự tạo cho mình những trải nghiệm riêng biệt nhé!
            </p>
          </>
        ),
        imageSection: "",
      },
      {
        headerSection: "📞 Liên hệ với chúng tôi:",
        sectionContent: () => (
          <ul>
            <li>Hotline: 0962167328</li>
            <li>Email: hoadat@gmail.com</li>
          </ul>
        ),
        imageSection: "",
      },
    ],
  },
  {
    title: "Hành trình khám phá những hạt cà phê đậm chất tại Hoa Đất",
    avatar:
      "https://cdn.britannica.com/16/138916-050-93D18857/coffee-beans-ground-paper-bags.jpg?w=400&h=300&c=crop",
    description: "Thưởng thức cà phê không chỉ đơn giản là việc nhâm nhi một ly thức uống mà còn là hành trình khám phá những hương vị phong phú, độc đáo đến từ từng loại hạt. Mỗi loại cà phê đều có nét quyến rũ riêng, đánh thức mọi giác quan và mang lại những trải nghiệm tuyệt vời. Tại Hoa Đất, chúng tôi tự hào giới thiệu đến bạn ba loại hạt cà phê đặc trưng, mỗi loại mang một câu chuyện riêng và hương vị độc đáo, hứa hẹn sẽ khiến bạn mê mẩn ngay từ lần đầu thưởng thức.",
    createBy: "Admin",
    createDate: format(new Date("3/10/2024"), "dd.MM.yyy"),
    children: [
      {
        headerSection:
          "",
        sectionContent: () => (
          <>
            <p>
              Thưởng thức cà phê không chỉ đơn giản là việc nhâm nhi một ly thức
              uống mà còn là hành trình khám phá những hương vị phong phú, độc
              đáo đến từ từng loại hạt. Mỗi loại cà phê đều có nét quyến rũ
              riêng, đánh thức mọi giác quan và mang lại những trải nghiệm tuyệt
              vời. Tại Hoa Đất, chúng tôi tự hào giới thiệu đến bạn ba loại hạt
              cà phê đặc trưng, mỗi loại mang một câu chuyện riêng và hương vị
              độc đáo, hứa hẹn sẽ khiến bạn mê mẩn ngay từ lần đầu thưởng thức.
            </p>
            <p>
              Dưới đây là ba loại cà phê nổi bật tại Hoa Đất mà bạn không thể bỏ
              lỡ:
            </p>
          </>
        ),
        imageSection: "",
      },
      {
        headerSection: "☕ Robusta - Đậm đà, mạnh mẽ và tỉnh táo",
        sectionContent: () => (
          <>
            <p>
              Đối với những người yêu thích sự mạnh mẽ, dứt khoát trong hương
              vị, hạt Robusta chính là sự lựa chọn lý tưởng. Robusta được biết
              đến với hàm lượng caffeine cao hơn so với các loại hạt cà phê
              khác, mang đến vị đắng đậm và một chút hương đất đặc trưng. Đây là
              loại cà phê hoàn hảo cho những người cần sự tỉnh táo để bắt đầu
              ngày mới hoặc nạp lại năng lượng vào buổi chiều.
            </p>
            <p>
              Với <strong>Robusta</strong>, bạn có thể pha chế theo nhiều cách
              như cà phê sữa đá, cà phê đen đá hoặc thậm chí là espresso để đánh
              thức mọi giác quan. Đặc biệt, Robusta rất được ưa chuộng khi kết
              hợp với sữa để tạo nên những ly cà phê sữa đá đậm đà, đặc trưng
              của người Việt.
            </p>
          </>
        ),
        imageSection:
          "https://baristaschool.vn/wp-content/uploads/2021/05/robusta.png",
      },
      {
        headerSection: "☕ Arabica - Tinh tế, nhẹ nhàng và sành điệu",
        sectionContent: () => (
          <>
            <p>
              Nếu bạn là người yêu thích sự tinh tế và nhẹ nhàng, thì hạt
              <strong>Arabica</strong> chắc chắn sẽ làm hài lòng bạn. Với hương
              vị chủ đạo là sự kết hợp giữa vị chua nhẹ, ngọt ngào, và đôi khi
              mang theo mùi hương trái cây hoặc hoa, Arabica được mệnh danh là
              loại cà phê &quot;thượng hạng&quot;.
            </p>
            <p>
              Sự dịu dàng của Arabica làm cho nó trở thành lựa chọn phổ biến
              trong các phương pháp pha chế thủ công như{" "}
              <strong>pour-over</strong>, <strong>phin</strong> hay{" "}
              <strong>cold brew</strong>. Một ly Arabica vào buổi sáng không chỉ
              giúp bạn tỉnh táo mà còn mang lại cảm giác thư thái, thanh
              nhã.Hương vị mềm mại của nó gợi nhớ đến sự ngọt ngào, lãng mạn như
              &quot;nàng tiểu thư mới yêu&quot;, phù hợp cho những ai yêu thích
              trải nghiệm cà phê sành điệu.
            </p>
          </>
        ),
        imageSection:
          "https://thoidaicoffee.vn/wp-content/uploads/2022/08/tim-hieu-ve-arabica-nu-hoang-the-gioi-ca-phe.jpg",
      },
      {
        headerSection: "☕ Culi - Độc đáo, hiếm có và quyến rũ",
        sectionContent: () => (
          <>
            <p>
              Cuối cùng, không thể không nhắc đến hạt <strong>Culi</strong>, một
              loại cà phê đột biến tự nhiên mang đến hương vị độc đáo và hiếm
              có. Điểm đặc biệt của hạt Culi là sự kết hợp hoàn hảo giữa vị
              đắng, chua và ngọt, tạo ra một hương vị cân bằng, trọn vẹn.
            </p>
            <p>
              Với hình dáng hạt tròn đầy và hương vị đậm đà,{" "}
              <strong>Culi</strong> thường được rang xay và thưởng thức riêng
              biệt để giữ trọn vẹn sự độc đáo của nó. Đây là lựa chọn tuyệt vời
              cho những ai yêu thích trải nghiệm khác biệt, mong muốn khám phá
              sự mới lạ trong mỗi ly cà phê.
            </p>
          </>
        ),
        imageSection:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq928TzBx7gXuEfWgWSwYHg2fleFTUbcrU7A&s",
      },
      {
        headerSection: "✨ Cà phê sạch, nguyên chất - Đặc quyền tại Hoa Đất",
        sectionContent: () => (
          <>
            <p>
              Ngoài ba loại hạt cà phê đặc trưng, Hoa Đất còn mang đến cho bạn
              cơ hội thưởng thức những ly cà phê nguyên chất, không hóa chất hay
              chất bảo quản, đảm bảo tốt cho sức khỏe. Chúng tôi không chỉ chú
              trọng vào việc mang đến những hạt cà phê chất lượng cao mà còn cam
              kết mang lại giá trị bền vững cho người tiêu dùng thông qua sản
              phẩm sạch và an toàn.
            </p>
            <p>
              <strong>Quyền lợi đặc biệt dành cho bạn tại Hoa Đất: </strong> Khi
              thưởng thức cà phê tại Hoa Đất, bạn sẽ được tận hưởng những chương
              trình khuyến mãi hấp dẫn và quyền lợi đặc biệt mà chỉ khách hàng
              trung thành mới có được. Hãy theo dõi các bài viết tiếp theo để
              khám phá thêm nhiều điều thú vị nhé!Khi thưởng thức cà phê tại Hoa
              Đất, bạn sẽ được tận hưởng những chương trình khuyến mãi hấp dẫn
              và quyền lợi đặc biệt mà chỉ khách hàng trung thành mới có được.
              Hãy theo dõi các bài viết tiếp theo để khám phá thêm nhiều điều
              thú vị nhé!
            </p>
          </>
        ),
        imageSection: "",
      },
      {
        headerSection: "📞 Liên hệ với chúng tôi:",
        sectionContent: () => (
          <ul>
            <li>Hotline: 0962167328</li>
            <li>Email: hoadat@gmail.com</li>
          </ul>
        ),
        imageSection: "",
      },
    ],
  },
  {
    title: "Giới trẻ Việt và cà phê: Không chỉ là thức uống, mà còn là lối sống!",
    avatar: "https://images2.thanhnien.vn/zoom/686_429/Uploaded/lethanh/2023_01_04/z4012417390034-da3befc84b995af40a301342e1c4169d-5160.jpg",
    description: "Cà phê đã trở thành một phần không thể thiếu trong cuộc sống hàng ngày của giới trẻ Việt Nam, không chỉ đơn thuần là một thức uống để bắt đầu ngày mới mà còn là một biểu tượng gắn liền với lối sống hiện đại, năng động và sáng tạo. Mỗi ly cà phê đều mang theo những câu chuyện, những khoảnh khắc đặc biệt mà bất kỳ ai trong chúng ta đều có thể nhận thấy trong đời sống hàng ngày.",
    createBy: "Admin",
    createDate: format(new Date("5/10/2024"), "dd.MM.yyy"),
    children: [
      {
        headerSection: "",
        sectionContent: () => <p>Cà phê đã trở thành một phần không thể thiếu trong cuộc sống hàng ngày của giới trẻ Việt Nam, không chỉ đơn thuần là một thức uống để bắt đầu ngày mới mà còn là một biểu tượng gắn liền với lối sống hiện đại, năng động và sáng tạo. Mỗi ly cà phê đều mang theo những câu chuyện, những khoảnh khắc đặc biệt mà bất kỳ ai trong chúng ta đều có thể nhận thấy trong đời sống hàng ngày.</p>,
        imageSection: "",
      }
      , {
        headerSection: "☕ Ly cà phê năng lượng buổi sáng",
        sectionContent: () => <p>Khi những tia nắng đầu tiên xuất hiện, nhiều bạn trẻ Việt Nam khởi động một ngày mới bằng một ly cà phê đậm đà. Đó là sự đồng hành tuyệt vời để sạc lại năng lượng, giúp tinh thần tỉnh táo và sẵn sàng đối diện với lịch trình bận rộn của công việc và học tập. Đôi khi, chỉ cần một ly cà phê sữa đá vội vã trên đường đến văn phòng hay trường học, đã đủ để khơi nguồn cảm hứng cho ngày mới đầy năng lượng.</p>,
        imageSection: "https://sakos.vn/wp-content/uploads/2024/09/diem-qua-top-5-dia-diem-ca-phe-bet-noi-tieng-thu-hut-gioi-tre-tai-sai-gon-2-1.jpg",
      },
      {
        headerSection: "☕ Ly cà phê đồng hành cùng deadline",
        sectionContent: () => <p>Trong cuộc sống hối hả, những cuộc gặp gỡ bạn bè lâu ngày luôn là khoảnh khắc đáng trân trọng. Và cà phê chính là cầu nối hoàn hảo để tạo nên không gian thư giãn và gắn kết ấy. Ngồi dưới tán cây xanh mát, nhâm nhi ly cà phê cùng những câu chuyện, tiếng cười giòn tan, đó là cách giới trẻ Việt Nam tận hưởng những khoảnh khắc giản dị mà đầy ý nghĩa.</p>,
        imageSection: "https://images2.thanhnien.vn/zoom/686_429/Uploaded/lethanh/2023_01_04/z4012417390034-da3befc84b995af40a301342e1c4169d-5160.jpg",
      },
      {
        headerSection: "☕ Ly cà phê thư giãn và sống ảo",
        sectionContent: () => <p>Trong những khoảnh khắc cần thư giãn sau giờ làm việc, nhiều bạn trẻ chọn cà phê là nơi để tận hưởng khoảng lặng, ngồi ngắm đường phố và không quên lưu lại vài bức ảnh &quot;sống ảo&quot;. Các quán cà phê phong cách và hiện đại đã trở thành điểm đến yêu thích, nơi mà các bạn trẻ không chỉ đến để thưởng thức đồ uống mà còn để chụp những tấm hình đẹp, gói trọn khoảnh khắc yên bình vào trong từng tách cà phê.</p>,
        imageSection: "https://photo.znews.vn/w660/Uploaded/kbfoplb/2023_05_01/DSC_7396_zing.jpg",
      },
      {
        headerSection: "☕ Ly cà phê ấm áp cùng gia đình",
        sectionContent: () => <p>Những buổi tối lạnh giá hay cuối tuần yên bình, ly cà phê nóng chính là chất xúc tác tuyệt vời cho những cuộc trò chuyện đầy ấm áp cùng người thân yêu. Không chỉ là một thức uống, cà phê còn mang đến cảm giác gần gũi, giúp mọi người dễ dàng sẻ chia những câu chuyện, ký ức bên nhau.</p>,
        imageSection: "https://huyenthoaiviet.vn/file/ca-phe-gia-dinh-529f.jpg",
      },
      {
        headerSection: "Cà phê – Một phần không thể thiếu trong lối sống của giới trẻ Việt",
        sectionContent: () => <p>Với giới trẻ Việt Nam, cà phê không chỉ là món đồ uống đơn thuần mà đã trở thành một phần không thể thiếu trong lối sống. Từng khoảnh khắc quanh tách cà phê, dù là những buổi sáng hối hả, những cuộc gặp gỡ thân tình hay những giây phút thư giãn một mình, đều góp phần tạo nên một lối sống đầy màu sắc, năng động và phong phú.</p>,
        imageSection: "",
      },
      {
        headerSection: "Bạn có câu chuyện nào cùng tách cà phê của mình?",
        sectionContent: () => <p>Hãy chia sẻ với Hoa Đất những trải nghiệm thú vị của bạn nhé! Chúng tôi rất mong được lắng nghe và đồng hành cùng bạn trên hành trình thưởng thức cà phê đầy ý nghĩa.</p>,
        imageSection: "",
      },
      {
        headerSection: "📞 Liên hệ với chúng tôi:",
        sectionContent: () => (
          <ul>
            <li>Hotline: 0962167328</li>
            <li>Email: hoadat@gmail.com</li>
          </ul>
        ),
        imageSection: "",
      },
    ],
  },
];
