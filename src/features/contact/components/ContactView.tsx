"use client";

import React, { useState } from "react";
import { Typography, Input, Button, Form, Tooltip, notification } from "antd";
import {
  MailOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TikTokOutlined,
  UserOutlined,
  SendOutlined,
} from "@ant-design/icons";
import styles from "./ContactView.module.css";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default function ContactView() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      notification.success({
        message: "Gửi lời chào thành công! 🌸",
        description: `Cảm ơn ${values.name || "bạn"} đã gửi thư. Tiệm Len Nhỏ sẽ phản hồi lại bạn qua email ${values.email} trong thời gian sớm nhất!`,
        placement: "topRight",
        duration: 5,
      });
      form.resetFields();
    }, 1200);
  };

  return (
    <div className={`animate-fade-in-up ${styles.container}`}>
      <div className={styles.card}>
        {/* Thanh ruy băng sắc màu trang trí phần đầu */}
        <div className={styles.banner} />

        <div className={styles.headerTextGroup}>
          <div className={styles.headerIcon}>
            <MailOutlined />
          </div>
          <Title level={2} className={styles.title}>
            GỬI LỜI CHÀO TỚI TIỆM
          </Title>
          <Paragraph className={styles.paragraph}>
            "Bạn đang loay hoay vòng tròn ma thuật? Gặp khó khăn khi móc?
            <br /> Nhắn tin cho mình nhé!"
          </Paragraph>
        </div>

        {/* Cụm mạng xã hội */}
        <div className={styles.socialGroup}>
          <Tooltip title="Group chém gió học móc">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialBtn} ${styles.facebook}`}
            >
              <FacebookOutlined />
            </a>
          </Tooltip>
          <Tooltip title="Gallery ảnh xinh xỉu">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialBtn} ${styles.instagram}`}
            >
              <InstagramOutlined />
            </a>
          </Tooltip>
          <Tooltip title="Video gỡ rối 1 phút">
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialBtn} ${styles.tiktok}`}
            >
              <TikTokOutlined />
            </a>
          </Tooltip>
        </div>

        <Form 
          form={form} 
          layout="vertical" 
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <Form.Item
            name="name"
            label={
              <span className={styles.inputLabel}>
                Tên của bạn
              </span>
            }
            rules={[{ required: true, message: "Vui lòng nhập tên của bạn nhé!" }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined style={{ color: "var(--text-sub)", opacity: 0.5 }} />}
              className={styles.formInput}
              placeholder="Ví dụ: Rose Nguyễn..."
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={
              <span className={styles.inputLabel}>
                Địa chỉ Email (Để tiệm phản hồi)
              </span>
            }
            rules={[
              { required: true, message: "Vui lòng nhập địa chỉ email!" },
              { type: "email", message: "Email không phù hợp định dạng rồi!" }
            ]}
          >
            <Input
              size="large"
              type="email"
              prefix={<MailOutlined style={{ color: "var(--text-sub)", opacity: 0.5 }} />}
              className={styles.formInput}
              placeholder="rose@gmail.com..."
            />
          </Form.Item>

          <Form.Item
            name="message"
            label={
              <span className={styles.inputLabel}>
                Câu hỏi của bạn
              </span>
            }
            rules={[{ required: true, message: "Vui lòng nhập lời nhắn gửi tới tiệm!" }]}
          >
            <TextArea
              rows={5}
              className={styles.formInput}
              placeholder="Mình không hiểu cách làm ở dòng R4 phần Đầu..."
            />
          </Form.Item>

          <Button
            type="primary"
            size="large"
            block
            htmlType="submit"
            loading={loading}
            className={`wow-button ${styles.submitBtn}`}
            icon={<SendOutlined />}
          >
            GỬI ĐI THÔI
          </Button>
        </Form>
      </div>
    </div>
  );
}
