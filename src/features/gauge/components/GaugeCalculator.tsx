"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  InputNumber,
  Select,
  Typography,
  Divider,
  Row,
  Col,
  Table,
  Button,
  Tooltip,
  Alert,
  Tabs,
  Space,
  Tag,
} from "antd";
import {
  CalculatorOutlined,
  InfoCircleOutlined,
  TableOutlined,
  ExperimentOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

type PatternProps = {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  image_url: string;
  materials: string[];
  tools: string[];
};

type GaugeCalculatorProps = {
  pattern?: PatternProps;
};

// Chuẩn quốc tế về len sợi & kim móc tương ứng
const YARN_WEIGHT_DATA = [
  {
    key: "0",
    weight: "0 - Lace (Chỉ mảnh)",
    ply: "2 ply",
    hook: "0.6mm - 1.5mm",
    projects: "Doilies, khăn trải bàn ren, hoa tai mỏng mảnh",
  },
  {
    key: "1",
    weight: "1 - Super Fine (Mịn)",
    ply: "3 or 4 ply",
    hook: "1.5mm - 2.25mm",
    projects: "Tất (socks), đồ em bé sơ sinh, amigurumi tí hon",
  },
  {
    key: "2",
    weight: "2 - Fine (Nhẹ)",
    ply: "5 ply / Sport",
    hook: "2.25mm - 3.25mm",
    projects: "Amigurumi nhỏ, khăn quàng cổ nhẹ, áo len mỏng",
  },
  {
    key: "3",
    weight: "3 - Light (Vừa nhỏ)",
    ply: "8 ply / DK / Yarn Jeans",
    hook: "3.25mm - 4.5mm",
    projects: "Thú bông Amigurumi (chuẩn), mũ ấm, áo len trẻ em",
  },
  {
    key: "4",
    weight: "4 - Medium (Trung bình)",
    ply: "10 ply / Worsted / Milk 125g",
    hook: "4.5mm - 5.5mm",
    projects: "Chăn ấm, khăn quàng dày, áo khoác, túi xách tiện ích",
  },
  {
    key: "5",
    weight: "5 - Bulky (Dày)",
    ply: "12 ply / Chunky / Velvet (Nhung)",
    hook: "5.5mm - 8.0mm",
    projects: "Thú ôm khổng lồ, thảm trang trí phòng khách, mũ len dày cộp",
  },
  {
    key: "6",
    weight: "6 - Super Bulky (Rất dày)",
    ply: "Nhung đũa / Chenille",
    hook: "8.0mm - 12.0mm",
    projects: "Chăn tay dệt thô, gối nằm hơi rộng, gấu bông size bự",
  },
  {
    key: "7",
    weight: "7 - Jumbo (Siêu bự)",
    ply: "Len sợi khổng lồ (Chunky tube)",
    hook: "12.0mm - 20.0mm+",
    projects: "Giường thú cưng, chăn siêu bự phong cách Bắc Âu",
  },
];

export default function GaugeCalculator({ pattern }: GaugeCalculatorProps) {
  // Swatch 10x10 đơn (X) của người dùng
  const [swatchWidth, setSwatchWidth] = useState<number>(3.5); // cm
  const [swatchHeight, setSwatchHeight] = useState<number>(3.5); // cm

  // Swatch chuẩn tham chiếu (thường Milk Cotton kim 2.5mm cho 10x10 ô đơn là khoảng 3.5cm - 4.0cm)
  // Kích thước mong muốn/nguyên bản của chart
  const [originalHeight, setOriginalHeight] = useState<number>(15); // cm
  const [originalWidth, setOriginalWidth] = useState<number>(10); // cm
  const [originalYarn, setOriginalYarn] = useState<string>("Milk Cotton 50g (2.5mm)");

  // Loại len mới người dùng chọn
  const [targetYarn, setTargetYarn] = useState<string>("Nhung Chenille (5.0mm)");

  // Kết quả tính toán
  const [scaleFactor, setScaleFactor] = useState<number>(1.0);
  const [calculatedHeight, setCalculatedHeight] = useState<number>(15);
  const [calculatedWidth, setCalculatedWidth] = useState<number>(10);
  const [yarnMultiplier, setYarnMultiplier] = useState<number>(1.0);

  // Tính toán mọi thông số khi kích thước swatch / gốc thay đổi
  useEffect(() => {
    // Giả định Swatch tác giả chuẩn 10x10: 3.5cm x 3.5cm
    const defaultAuthorSwatchWidth = 3.5;
    const defaultAuthorSwatchHeight = 3.5;

    // Tỉ lệ scale thực tế = swatch người dùng / swatch tác giả
    const scaleW = swatchWidth / defaultAuthorSwatchWidth;
    const scaleH = swatchHeight / defaultAuthorSwatchHeight;
    const avgScale = (scaleW + scaleH) / 2;

    setScaleFactor(avgScale);
    setCalculatedWidth(Number((originalWidth * scaleW).toFixed(1)));
    setCalculatedHeight(Number((originalHeight * scaleH).toFixed(1)));

    // Công thức tính lượng len (Yardage multiplier %):
    // Đối với Amigurumi 3D, thể tích và khối lượng sợi tỉ lệ lũy thừa 3 theo hằng số scale
    // Thể tích = width * depth * height -> (scale)^3
    const volRatio = Math.pow(avgScale, 3);
    setYarnMultiplier(Number(volRatio.toFixed(2)));
  }, [swatchWidth, swatchHeight, originalHeight, originalWidth]);

  // Nếu có pattern prop, đặt lại kích thước gốc mặc định phù hợp
  useEffect(() => {
    if (pattern) {
      if (pattern.name.includes("Móc Khóa") || pattern.name.includes("Khóa")) {
        setOriginalHeight(7);
        setOriginalWidth(5);
        setOriginalYarn("Jeans Yarn (2.0mm)");
      } else if (pattern.name.includes("Súp Lơ") || pattern.name.includes("Cải")) {
        setOriginalHeight(12);
        setOriginalWidth(10);
        setOriginalYarn("Milk Cotton 50g (2.5mm)");
      } else {
        setOriginalHeight(18);
        setOriginalWidth(12);
        setOriginalYarn("Milk Cotton 125g (3.0mm)");
      }
    }
  }, [pattern]);

  // Dữ liệu cho bảng tra cứu len
  const columns = [
    {
      title: <span style={{ color: "var(--pink-dark)", fontWeight: "bold" }}>Trọng lượng len (Yarn Weight)</span>,
      dataIndex: "weight",
      key: "weight",
      render: (text: string) => <Text strong style={{ color: "var(--text-main)" }}>{text}</Text>,
    },
    {
      title: <span style={{ color: "var(--pink-dark)", fontWeight: "bold" }}>Số sợi chập (Ply)</span>,
      dataIndex: "ply",
      key: "ply",
      render: (text: string) => <Text style={{ color: "var(--text-main)" }}>{text}</Text>,
    },
    {
      title: <span style={{ color: "var(--pink-dark)", fontWeight: "bold" }}>Kim móc khuyên dùng</span>,
      dataIndex: "hook",
      key: "hook",
      render: (text: string) => <Tag color="pink" style={{ fontWeight: "bold" }}>{text}</Tag>,
    },
    {
      title: <span style={{ color: "var(--pink-dark)", fontWeight: "bold" }}>Ứng dụng phù hợp</span>,
      dataIndex: "projects",
      key: "projects",
      render: (text: string) => <Text style={{ color: "var(--text-sub)", fontSize: "13px" }}>{text}</Text>,
    },
  ];

  return (
    <Card
      style={{
        borderRadius: "24px",
        background: "var(--bg-card)",
        border: "1px solid var(--border-soft)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
        overflow: "hidden",
      }}
      styles={{ body: { padding: "24px" } }}
    >
      <Tabs
        defaultActiveKey="calc"
        centered
        items={[
          {
            key: "calc",
            label: (
              <span>
                <CalculatorOutlined /> Máy Tính Swatch & Size
              </span>
            ),
            children: (
              <div>
                <Title
                  level={4}
                  style={{
                    color: "var(--pink-dark)",
                    marginTop: "10px",
                    marginBottom: "8px",
                  }}
                >
                  📐 Quy Đổi Kích Thước Thành Phẩm
                </Title>
                <Paragraph style={{ color: "var(--text-sub)", fontSize: "13px" }}>
                  Móc thử một mảnh nhỏ **10 ô đơn (X) rộng × 10 dòng cao** bằng loại len & kim của bạn. Đo chính xác chiều dài/rộng rồi nhập vào máy tính dưới đây:
                </Paragraph>

                <Row gutter={[20, 20]} style={{ marginTop: "15px" }}>
                  <Col xs={24} sm={12}>
                    <div style={{ background: "var(--panel-bg)", padding: "16px", borderRadius: "16px", border: "1px solid var(--border-soft)" }}>
                      <Text strong style={{ color: "var(--text-main)", display: "block", marginBottom: "8px" }}>
                        🛠 Mảnh đan của bạn (Gauge 10x10)
                      </Text>
                      <Space direction="vertical" style={{ width: "100%" }} size="middle">
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                            <Text style={{ fontSize: "13px", color: "var(--text-sub)" }}>Chiều rộng (cm):</Text>
                            <Tooltip title="Đo ngang 10 mũi X">
                              <InfoCircleOutlined style={{ color: "var(--text-sub)", fontSize: "12px" }} />
                            </Tooltip>
                          </div>
                          <InputNumber
                            min={1}
                            max={20}
                            step={0.1}
                            value={swatchWidth}
                            onChange={(val) => val && setSwatchWidth(val)}
                            style={{ width: "100%", borderRadius: "10px" }}
                          />
                        </div>

                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                            <Text style={{ fontSize: "13px", color: "var(--text-sub)" }}>Chiều cao (cm):</Text>
                            <Tooltip title="Đo dọc 10 hàng móc">
                              <InfoCircleOutlined style={{ color: "var(--text-sub)", fontSize: "12px" }} />
                            </Tooltip>
                          </div>
                          <InputNumber
                            min={1}
                            max={20}
                            step={0.1}
                            value={swatchHeight}
                            onChange={(val) => val && setSwatchHeight(val)}
                            style={{ width: "100%", borderRadius: "10px" }}
                          />
                        </div>

                        <div>
                          <Text style={{ fontSize: "13px", color: "var(--text-sub)", display: "block", marginBottom: "4px" }}>Sợi len mới muốn móc:</Text>
                          <Select
                            value={targetYarn}
                            onChange={(val) => setTargetYarn(val)}
                            style={{ width: "100%" }}
                            dropdownStyle={{ borderRadius: "12px" }}
                            options={[
                              { value: "Lace Cotton (1.0mm)", label: "Chỉ Lace mảnh (~1.0mm)" },
                              { value: "Jeans Yarn (2.0mm)", label: "Yarn Jeans Cổ Điển (~2.0mm)" },
                              { value: "Milk Cotton 50g (2.5mm)", label: "Milk Cotton 50g (~2.5mm)" },
                              { value: "Milk Cotton 125g (3.0mm)", label: "Milk Cotton 125g (~3.0mm)" },
                              { value: "Nhung Chenille (5.0mm)", label: "Nhung Sợi Xù bự (~5.0mm)" },
                              { value: "Nhung Đũa Bự (8.0mm)", label: "Nhung Đũa khổng lồ (~8.0mm)" },
                            ]}
                          />
                        </div>
                      </Space>
                    </div>
                  </Col>

                  <Col xs={24} sm={12}>
                    <div style={{ background: "var(--panel-bg)", padding: "16px", borderRadius: "16px", border: "1px solid var(--border-soft)", height: "100%" }}>
                      <Text strong style={{ color: "var(--text-main)", display: "block", marginBottom: "8px" }}>
                        🌸 Thông số gốc trong Chart
                      </Text>
                      <Space direction="vertical" style={{ width: "100%" }} size="middle">
                        <div>
                          <Text style={{ fontSize: "13px", color: "var(--text-sub)", display: "block", marginBottom: "4px" }}>Cao gốc mong muốn (cm):</Text>
                          <InputNumber
                            min={1}
                            max={100}
                            value={originalHeight}
                            onChange={(val) => val && setOriginalHeight(val)}
                            style={{ width: "100%", borderRadius: "10px" }}
                          />
                        </div>

                        <div>
                          <Text style={{ fontSize: "13px", color: "var(--text-sub)", display: "block", marginBottom: "4px" }}>Rộng gốc mong muốn (cm):</Text>
                          <InputNumber
                            min={1}
                            max={100}
                            value={originalWidth}
                            onChange={(val) => val && setOriginalWidth(val)}
                            style={{ width: "100%", borderRadius: "10px" }}
                          />
                        </div>

                        <div>
                          <Text style={{ fontSize: "13px", color: "var(--text-sub)", display: "block", marginBottom: "4px" }}>Sợi gợi ý trong chart:</Text>
                          <Select
                            value={originalYarn}
                            onChange={(val) => setOriginalYarn(val)}
                            style={{ width: "100%" }}
                            options={[
                              { value: "Jeans Yarn (2.0mm)", label: "Yarn Jeans (~2.0mm)" },
                              { value: "Milk Cotton 50g (2.5mm)", label: "Milk Cotton 50g (~2.5mm)" },
                              { value: "Milk Cotton 125g (3.0mm)", label: "Milk Cotton 125g (~3.0mm)" },
                              { value: "Nhung Chenille (5.0mm)", label: "Nhung Sợi Xù (~5.0mm)" },
                            ]}
                          />
                        </div>
                      </Space>
                    </div>
                  </Col>
                </Row>

                <Divider style={{ margin: "20px 0", borderColor: "var(--border-soft)" }} />

                {/* Kết quả dự báo */}
                <div style={{ background: "var(--pink-light)", padding: "20px", borderRadius: "20px", border: "1px solid var(--border-soft)" }}>
                  <Title level={5} style={{ color: "var(--pink-dark)", margin: "0 0 12px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <ExperimentOutlined /> Dự Đoán Thành Phẩm Thực Tế:
                  </Title>

                  <Row gutter={[16, 16]}>
                    <Col xs={12} sm={6}>
                      <Text style={{ color: "var(--text-sub)", fontSize: "12px", display: "block" }}>TỈ LỆ TĂNG SIZE</Text>
                      <Text strong style={{ fontSize: "20px", color: "var(--pink-dark)" }}>
                        {scaleFactor === 1 ? "1.0x (Bằng Gốc)" : `${scaleFactor.toFixed(2)}x`}
                      </Text>
                    </Col>
                    <Col xs={12} sm={6}>
                      <Text style={{ color: "var(--text-sub)", fontSize: "12px", display: "block" }}>CHIỀU CAO MỚI</Text>
                      <Text strong style={{ fontSize: "20px", color: "var(--pink-dark)" }}>
                        ~ {calculatedHeight} cm
                      </Text>
                      <Text style={{ color: "var(--text-sub)", fontSize: "11px", display: "block" }}>Gốc: {originalHeight} cm</Text>
                    </Col>
                    <Col xs={12} sm={6}>
                      <Text style={{ color: "var(--text-sub)", fontSize: "12px", display: "block" }}>CHIỀU RỘNG MỚI</Text>
                      <Text strong style={{ fontSize: "20px", color: "var(--pink-dark)" }}>
                        ~ {calculatedWidth} cm
                      </Text>
                      <Text style={{ color: "var(--text-sub)", fontSize: "11px", display: "block" }}>Gốc: {originalWidth} cm</Text>
                    </Col>
                    <Col xs={12} sm={6}>
                      <Text style={{ color: "var(--text-sub)", fontSize: "12px", display: "block" }}>LƯỢNG LEN CẦN THIẾT</Text>
                      <Text strong style={{ fontSize: "20px", color: "var(--pink-dark)" }}>
                        {yarnMultiplier === 1 ? "Bằng Gốc" : `x${yarnMultiplier}`}
                      </Text>
                      <Tooltip title="Tính theo công thức thể tích 3D để tránh thiếu len giữa chừng khi móc thú bông phóng lớn!">
                        <QuestionCircleOutlined style={{ fontSize: "12px", marginLeft: "4px", color: "var(--text-sub)" }} />
                      </Tooltip>
                    </Col>
                  </Row>

                  <Alert
                    type="info"
                    showIcon
                    style={{ marginTop: "15px", borderRadius: "12px" }}
                    message={
                      <span style={{ fontSize: "12px", color: "var(--text-main)" }}>
                        {scaleFactor > 1.2
                          ? `💡 Bông móc to bự hơn gốc! Dự đoán bạn cần mua nhiều hơn khoảng ${(yarnMultiplier * 100 - 100).toFixed(0)}% chiều dài len cuộn để làm đầy thú bông.`
                          : scaleFactor < 0.8
                          ? "💡 Thành phẩm sẽ nhỏ nhẹ xinh xắn hơn! Bạn có thể sử dụng len vụn thừa ở nhà để móc mà không lo thiếu."
                          : "💡 Gauge của bạn rất chuẩn với ý đồ thiết kế của tác giả! Thành phẩm ra lò sẽ cực kỳ đều đặn."}
                      </span>
                    }
                  />
                </div>
              </div>
            ),
          },
          {
            key: "sheet",
            label: (
              <span>
                <TableOutlined /> Tra Cứu Len Sợi & Cỡ Kim
              </span>
            ),
            children: (
              <div>
                <Title
                  level={4}
                  style={{
                    color: "var(--pink-dark)",
                    marginTop: "10px",
                    marginBottom: "12px",
                  }}
                >
                  🧵 Bảng Quy Chiếu Chuẩn Len Quốc Tế
                </Title>
                <Paragraph style={{ color: "var(--text-sub)", fontSize: "13px" }}>
                  Mỗi loại len có kích thước khác nhau cần kim tương thích tương ứng. Tra cứu bảng nhanh dưới đây để chọn len chính xác:
                </Paragraph>

                <Table
                  dataSource={YARN_WEIGHT_DATA}
                  columns={columns}
                  pagination={false}
                  bordered
                  size="middle"
                  style={{ marginTop: "15px", overflowX: "auto" }}
                />
              </div>
            ),
          },
        ]}
      />
    </Card>
  );
}
