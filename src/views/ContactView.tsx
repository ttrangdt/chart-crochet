"use client";
import { Typography, Input, Button, Form, Tooltip } from "antd";
import {
  SendOutlined,
  MailOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TikTokOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default function ContactView() {
  return (
    <div
      className="animate-fade-in-up"
      style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}
    >
      <div
        style={{
          background: "var(--bg-card)",
          maxWidth: "650px",
          width: "100%",
          padding: "50px",
          borderRadius: "40px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
          border: "2px solid var(--border-soft)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              fontSize: "50px",
              color: "var(--pink-dark)",
              marginBottom: "10px",
            }}
          >
            <MailOutlined />
          </div>
          <Title
            level={2}
            style={{
              color: "var(--text-main)",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            GỬI LỜI CHÀO TỚI TIỆM
          </Title>
          <Paragraph
            style={{
              color: "var(--text-sub)",
              marginTop: "15px",
              fontSize: "16px",
              background: "var(--panel-bg)",
              padding: "15px",
              borderRadius: "15px",
              display: "inline-block",
            }}
          >
            "Bạn đang loay hoay vòng tròn ma thuật? Gặp khó khăn khi móc?
            <br /> Nhắn tin cho mình nhé!"
          </Paragraph>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <Tooltip title="Group chém gió học móc">
            <div
              className="hover-card"
              style={{
                width: "50px",
                height: "50px",
                background: "#1877F2",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                color: "#fff",
                fontSize: "24px",
              }}
            >
              <FacebookOutlined />
            </div>
          </Tooltip>
          <Tooltip title="Gallery ảnh xinh xỉu">
            <div
              className="hover-card"
              style={{
                width: "50px",
                height: "50px",
                background:
                  "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                color: "#fff",
                fontSize: "24px",
              }}
            >
              <InstagramOutlined />
            </div>
          </Tooltip>
          <Tooltip title="Video gỡ rối 1 phút">
            <div
              className="hover-card"
              style={{
                width: "50px",
                height: "50px",
                background: "#000",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                color: "#fff",
                fontSize: "24px",
              }}
            >
              <TikTokOutlined />
            </div>
          </Tooltip>
        </div>

        <Form layout="vertical">
          <Form.Item
            label={
              <span style={{ fontWeight: "bold", color: "var(--text-main)" }}>
                Tên của bạn
              </span>
            }
          >
            <Input
              size="large"
              style={{
                borderRadius: "16px",
                border: "2px solid var(--border-soft)",
                padding: "10px 15px",
                background: "var(--bg-card)",
                color: "var(--text-main)",
              }}
              placeholder="Ví dụ: Rose Nguyễn..."
            />
          </Form.Item>

          <Form.Item
            label={
              <span style={{ fontWeight: "bold", color: "var(--text-main)" }}>
                Địa chỉ Email (Để tiệm phản hồi)
              </span>
            }
          >
            <Input
              size="large"
              type="email"
              style={{
                borderRadius: "16px",
                border: "2px solid var(--border-soft)",
                padding: "10px 15px",
                background: "var(--bg-card)",
                color: "var(--text-main)",
              }}
              placeholder="rose@gmail.com..."
            />
          </Form.Item>

          <Form.Item
            label={
              <span style={{ fontWeight: "bold", color: "var(--text-main)" }}>
                Câu hỏi của bạn
              </span>
            }
          >
            <TextArea
              rows={5}
              style={{
                borderRadius: "16px",
                border: "2px solid var(--border-soft)",
                padding: "15px",
                background: "var(--bg-card)",
                color: "var(--text-main)",
              }}
              placeholder="Mình không hiểu cách làm ở dòng R4 phần Đầu..."
            />
          </Form.Item>

          <Button
            type="primary"
            size="large"
            block
            className="wow-button"
            style={{
              borderRadius: "20px",
              height: "60px",
              fontWeight: "bold",
              fontSize: "18px",
              border: "none",
              marginTop: "20px",
            }}
          >
            GỬI ĐI THÔI
          </Button>
        </Form>
      </div>
    </div>
  );
}
