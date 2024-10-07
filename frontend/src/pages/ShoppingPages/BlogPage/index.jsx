import { popularPosts } from '@/constants/Post';
import { Layout, Row, Col, Card, List, Image, Typography, Skeleton } from 'antd';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

const { Content } = Layout;

export default function BlogPage() {
    const [selectedBlog, setSelectedBlog] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const handleSelectBlog = (blog) => {
        setSelectedBlog(blog)
        setIsLoading(true)
        // console.log(selectedBlog);
    }

    const handleBackToList = () => {
        setSelectedBlog();
    }

    useEffect(() => {
        if (isLoading) {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
    }, [isLoading, selectedBlog])

    return (
        <Content style={{ padding: '50px', paddingTop: 10 }}>
            <Row gutter={16}>
                {/* Sidebar */}
                <Col xs={24} md={10} lg={8}>
                    {/* Popular Posts */}
                    <Card title="Bài Viết Nổi Bật" style={{ marginTop: 16 }}>
                        <List
                            itemLayout="horizontal"
                            dataSource={popularPosts}
                            renderItem={(item) => (
                                <List.Item className=' hover:scale-105' onClick={() => handleSelectBlog(item)}>
                                    <List.Item.Meta
                                        avatar={<Image
                                            src={item.avatar}
                                            preview={false}
                                            alt="hat_ca_phe"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                objectFit: 'cover',
                                            }}
                                            className="md:w-16 md:h-16"
                                        />}
                                        title={<p>{item.title}</p>}
                                        description={<p>{item.createBy} - {item.createDate}</p>}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>

                {/* Main Content */}
                <Col xs={24} md={14} lg={16}>
                    <div style={{ marginTop: 16 }}>
                        {/* New Posts */}
                        {selectedBlog ?
                            !isLoading ?
                                <Card>
                                    <button
                                        onClick={() => handleBackToList()}
                                    >
                                        <ArrowLeft strokeWidth={2.25} size={20} />
                                    </button>
                                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                                        <Typography.Title level={2}
                                            style={{ textAlign: 'center' }}>{selectedBlog.title}</Typography.Title>
                                        {selectedBlog.children.map((child, index) => (
                                            <Row key={index}>
                                                {child?.headerSection && <Typography.Title level={4} style={{ marginTop: 10, marginBottom: 20 }}>{child.headerSection}</Typography.Title>}
                                                {child?.imageSection && <Col span={24}>
                                                    <Image
                                                        preview
                                                        src={child?.imageSection}
                                                        alt={`step-${index + 1}`}
                                                        width="100%"
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                </Col>}
                                                <Col span={24}>
                                                    <Typography.Paragraph style={{ lineHeight: 1.8 }}>
                                                        {child?.sectionContent()}
                                                    </Typography.Paragraph>
                                                </Col>
                                            </Row>
                                        ))}
                                    </div>
                                </Card>
                                : <Skeleton />
                            : <Card title="Bài Viết Mới" styles={{ header: { fontSize: '22px' } }}>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={popularPosts}
                                    renderItem={(item) => (
                                        <List.Item
                                            onClick={() => handleSelectBlog(item)}
                                            style={{ paddingLeft: 15, paddingRight: 15 }}>
                                            <Row gutter={[16, 16]} align="top" justify={"center"} style={{ width: "100%" }}>
                                                {/* Hình ảnh */}
                                                <Col xs={24} sm={8} md={6}>
                                                    <Image
                                                        src={item.avatar}
                                                        preview={false}
                                                        alt="hat_ca_phe"
                                                        style={{
                                                            width: '100%',
                                                            height: "auto",
                                                            aspectRatio: '4 / 3',
                                                            objectFit: 'cover',
                                                        }}
                                                        className="rounded-md shadow-md"
                                                    />
                                                </Col>

                                                {/* Nội dung */}
                                                <Col xs={24} sm={16} md={18}>
                                                    <Typography.Link
                                                        style={{
                                                            margin: 0,
                                                            fontSize: "22px",
                                                            color: "#000",
                                                            transition: "color 0.3s ease"
                                                        }}
                                                        onClick={() => handleSelectBlog(item)}
                                                        onMouseEnter={(e) => e.target.style.color = "#a18b65"}
                                                        onMouseLeave={(e) => e.target.style.color = "#000"}
                                                    >
                                                        {item.title}
                                                    </Typography.Link>

                                                    <Typography.Text type="secondary" style={{ display: "block", paddingTop: 8, paddingBottom: 15 }}>
                                                        {item.createBy} / {item.createDate}
                                                    </Typography.Text>

                                                    <Typography.Paragraph ellipsis={{ rows: 2 }}>
                                                        {item.description}
                                                    </Typography.Paragraph>
                                                </Col>
                                            </Row>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        }
                    </div>
                </Col>
            </Row>
        </Content>
    )
}