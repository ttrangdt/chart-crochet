"use client";
import { Typography, Row, Col, Card, Button, Tabs, Badge } from "antd";
import { LinkOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function AccessoriesView() {
  const allProducts = [
    {
      id: "p1",
      name: "Set len Milk bò 50g - Palette màu Pastel",
      price: "15.000 ₫",
      category: "len",
      img: "https://images.unsplash.com/photo-1584839818816-1f6920f666f7?q=80&w=400&auto=format&fit=crop",
      status: "Còn hàng",
    },
    {
      id: "p2",
      name: "Set Len Xù Lông Cừu siêu mềm",
      price: "35.000 ₫",
      category: "len",
      img: "https://images.unsplash.com/photo-1596489381678-75899990b79e?q=80&w=400&auto=format&fit=crop",
      status: "Còn hàng",
    },
    {
      id: "p3",
      name: "Kim móc cán dẻo nhựa ABS",
      price: "45.000 ₫",
      category: "kim",
      img: "https://images.unsplash.com/photo-1616788258356-0eaeb3f67554?q=80&w=400&auto=format&fit=crop",
      status: "Còn hàng",
    },
    {
      id: "p4",
      name: "Set Kim 2 đầu nhôm rẻ",
      price: "15.000 ₫",
      category: "kim",
      img: "https://images.unsplash.com/photo-1590422744383-8a3dcb1437fd?q=80&w=800&auto=format&fit=crop",
      status: "Sắp hết",
    },
    {
      id: "p5",
      name: "Mắt thú chốt an toàn đen 10mm (10đôi)",
      price: "45.000 ₫",
      category: "phukien",
      img: "https://images.unsplash.com/photo-1620021660143-690240d99a32?q=80&w=400&auto=format&fit=crop",
      status: "Còn hàng",
    },
    {
      id: "p6",
      name: "Bông gòn bi nhồi thú loại 1",
      price: "40.000 ₫",
      category: "phukien",
      img: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=400&auto=format&fit=crop",
      status: "Còn hàng",
    },
  ];

  const renderProductGrid = (categoryFilter: string) => {
    const products =
      categoryFilter === "all"
        ? allProducts
        : allProducts.filter((p) => p.category === categoryFilter);
    return (
      <Row gutter={[24, 32]} style={{ paddingTop: "20px" }}>
        {products.map((p) => (
          <Col xs={24} sm={12} md={8} lg={6} key={p.id}>
            <Card
              className="hover-card"
              cover={
                <div
                  style={{ overflow: "hidden", borderRadius: "20px 20px 0 0" }}
                >
                  <img
                    src={p.img}
                    className="card-image"
                    style={{
                      height: "240px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              }
              style={{
                borderRadius: "20px",
                border: "1px solid var(--border-soft)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                background: "var(--bg-card)",
              }}
              styles={{ body: { padding: "20px" } }}
            >
              <Badge
                status={p.status === "Còn hàng" ? "success" : "warning"}
                text={
                  <Text style={{ fontSize: "12px", color: "var(--text-sub)" }}>
                    {p.status}
                  </Text>
                }
                style={{ marginBottom: "10px", display: "block" }}
              />
              <Title
                level={5}
                style={{
                  color: "var(--text-main)",
                  marginBottom: "15px",
                  fontWeight: "bold",
                  height: "45px",
                }}
              >
                {p.name}
              </Title>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <Text
                  style={{
                    fontWeight: "900",
                    color: "var(--pink-dark)",
                    fontSize: "22px",
                  }}
                >
                  {p.price}
                </Text>
                <Button
                  type="primary"
                  size="large"
                  block
                  style={{
                    background: "#EE4D2D",
                    border: "none",
                    borderRadius: "12px",
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                  icon={<LinkOutlined />}
                >
                  Khám phá Shopee
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <div className="animate-fade-in-up">
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
          padding: "60px 40px",
          background:
            "linear-gradient(135deg, var(--pink-light) 0%, var(--pink-dark) 100%)",
          borderRadius: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          border: "3px solid var(--border-soft)",
        }}
      >
        <Title
          level={1}
          style={{
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: "2px",
            margin: 0,
          }}
        >
          CỬA TIỆM PHỤ KIỆN
        </Title>
        <Text
          style={{
            color: "#fff",
            fontSize: "16px",
            fontStyle: "italic",
            marginTop: "10px",
            display: "inline-block",
          }}
        >
          Mọi thứ bạn cần để bắt đầu hành trình ma thuật với len sợi.
        </Text>
      </div>
      <Tabs
        defaultActiveKey="all"
        centered
        size="large"
        items={[
          {
            key: "all",
            label: "Tất cả sản phẩm",
            children: renderProductGrid("all"),
          },
          { key: "len", label: "Len Sợi", children: renderProductGrid("len") },
          { key: "kim", label: "Kim Móc", children: renderProductGrid("kim") },
          {
            key: "phukien",
            label: "Phụ kiện khác",
            children: renderProductGrid("phukien"),
          },
        ]}
      />
    </div>
  );
}
