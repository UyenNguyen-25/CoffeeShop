import { useEffect, useState } from 'react';
import { Select, Slider, Button, Row, Col, Card, Typography, message, List } from 'antd';
import { coffeeOptions, coffeeSuggestions } from '@/constant/CoffeeSuggestions';

const { Option } = Select;
const { Title, Paragraph } = Typography;

const CoffeeMixer = () => {
    const [selectedCoffees, setSelectedCoffees] = useState([]);
    const [ratios, setRatios] = useState({ arabica: 0, robusta: 0, culi: 0 });
    const [description, setDescription] = useState('');
    const [total, setTotal] = useState(0)

    const handleCoffeeChange = (value) => {
        setSelectedCoffees(value);
        resetRatios();
    };

    const resetRatios = () => {
        setRatios({ arabica: 0, robusta: 0, culi: 0 });
        setDescription('');
    };

    const handleSliderChange = (value, coffee) => {
        setRatios({ ...ratios, [coffee]: value })
    };

    const handleConfirm = () => {
        if (total !== 100) {
            message.error('Tổng tỉ lệ phải bằng 100%!');
        } else {
            generateDescription();
            message.success('Công thức của bạn đã được xác nhận!');
        }
    };

    useEffect(() => {
        setTotal(ratios.arabica + ratios.robusta + ratios.culi)
        generateDescription();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ratios, selectedCoffees, total])

    const generateDescription = () => {
        const descriptionList = [];
        if (ratios.arabica) descriptionList.push(`Arabica: ${ratios.arabica}%`);
        if (ratios.robusta) descriptionList.push(`Robusta: ${ratios.robusta}%`);
        if (ratios.culi) descriptionList.push(`Culi: ${ratios.culi}%`);
        setDescription(descriptionList);
    };

    const handleReset = () => {
        resetRatios();
        setSelectedCoffees([]);
    };

    const handleSelectSuggestions = (suggestion) => {
        resetRatios();
        console.log(suggestion.ratio);
        const filteredRatiosKey = Object.keys(suggestion.ratio)
            .filter(key => suggestion.ratio[key] !== 0);

        console.log(filteredRatiosKey);

        setSelectedCoffees(filteredRatiosKey)
        setRatios(suggestion.ratio)
    }

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
        <div className="container my-10">
            <Title level={2} style={{ textAlign: 'center' }}>Bạn có thể sẽ thích</Title>
            <Row gutter={[16, 16]} justify="center" style={{ display: 'flex', flexWrap: 'wrap' }}>
                {coffeeSuggestions.map((suggestion, index) => {
                    return (
                        <Col xs={24} sm={12} lg={8} key={index} style={{ display: 'flex' }}>
                            <Card title={suggestion.name}
                                onClick={() => handleSelectSuggestions(suggestion)}
                                style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <p>{suggestion.description}</p>
                                <p className='font-semibold mt-3'>Tỷ lệ: </p>
                                {sortCoffeeRatios(suggestion.ratio)}
                            </Card>
                        </Col>
                    )
                })}
            </Row>

            <Title level={2} style={{ textAlign: 'center' }}>Tự do sáng tạo</Title>

            {/* Chọn Chủng Loại */}
            <Row justify="center" style={{ marginBottom: '20px' }}>
                <Col xs={24} sm={12} lg={8}>
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="Chọn loại cà phê"
                        value={selectedCoffees}
                        onChange={handleCoffeeChange}
                        style={{ width: '100%' }}
                        maxTagCount={3}
                    >
                        {coffeeOptions.map(option => (
                            <Option key={option.value} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                </Col>
            </Row>

            {/* Điều Chỉnh Tỉ Lệ */}
            <Row gutter={[16, 16]} justify="center">
                {selectedCoffees.includes('arabica') && (
                    <Col xs={24} sm={12} md={6}>
                        <Card title="Arabica" bordered>
                            <Slider
                                min={0}
                                max={100}
                                value={ratios.arabica}
                                onChange={(value) => handleSliderChange(value, 'arabica')}
                            />
                            <p>Tỉ lệ: {ratios.arabica}%</p>
                        </Card>
                    </Col>
                )}
                {selectedCoffees.includes('robusta') && (
                    <Col xs={24} sm={12} md={6}>
                        <Card title="Robusta" bordered>
                            <Slider
                                min={0}
                                max={100}
                                value={ratios.robusta}
                                onChange={(value) => handleSliderChange(value, 'robusta')}
                            />
                            <p>Tỉ lệ: {ratios.robusta}%</p>
                        </Card>
                    </Col>
                )}
                {selectedCoffees.includes('culi') && (
                    <Col xs={24} sm={12} md={6}>
                        <Card title="Culi" bordered>
                            <Slider
                                min={0}
                                max={100}
                                value={ratios.culi}
                                onChange={(value) => handleSliderChange(value, 'culi')}
                            />
                            <p>Tỉ lệ: {ratios.culi}%</p>
                        </Card>
                    </Col>
                )}
            </Row>

            {/* Mô tả kết quả */}
            <Row justify="center" gutter={[16, 16]} style={{ marginTop: '20px' }}>
                <Col xs={24} sm={12} lg={8}>
                    <Card>
                        <Paragraph>{
                            description.length > 0 ? (
                                <><List
                                    header={<div><strong>Công thức của bạn gồm có:</strong></div>}
                                    bordered={false}
                                    dataSource={description}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <Typography.Text>• {item}</Typography.Text>
                                        </List.Item>
                                    )}
                                />
                                    {total !== 100 && "Còn thiếu: " + (100 - total) + "%"}
                                </>
                            ) : 'Hãy điều chỉnh tỉ lệ để xem mô tả phù hợp.'}</Paragraph>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <Card>
                        <Paragraph>
                            <List
                                header={<div><strong>Thành Tiền</strong></div>}
                                bordered={false}
                                dataSource={[
                                    {
                                        title: "Tiền Hạt",
                                        amount: "50,000 VND", // Số tiền hạt
                                    },
                                    {
                                        title: "Tiền Xay",
                                        amount: "10,000 VND", // Số tiền xay
                                    },
                                    {
                                        title: "Tổng Cộng",
                                        amount: "60,000 VND", // Tổng cộng tiền
                                    },
                                ]}
                                renderItem={(item) => (
                                    <List.Item>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                            <span>{item.title}</span>
                                            <span>{item.amount}</span>
                                        </div>
                                    </List.Item>
                                )}
                            />
                            {total !== 100 && "Còn thiếu: " + (100 - total) + "%"}
                        </Paragraph>
                    </Card>
                </Col>
            </Row>

            {/* Button Confirm và Reset */}
            <Row justify="center" gutter={[16, 16]} style={{ marginTop: '20px' }}>
                <Col>
                    <Button type="primary" onClick={handleConfirm}>
                        Thanh Toán
                    </Button>
                </Col>
                <Col>
                    <Button onClick={handleReset}>
                        Làm Mới
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default CoffeeMixer;
