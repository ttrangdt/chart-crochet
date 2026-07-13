"use client";

import React from "react";
import { Breadcrumb, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { patternStyles } from "./PatternDetail.styles";
import { Pattern } from "../types/patterns.types";

type PatternDetailHeaderProps = {
  pattern: Pattern;
};

export default function PatternDetailHeader({ pattern }: PatternDetailHeaderProps) {
  return (
    <div style={patternStyles.headerWrapper}>
      <Breadcrumb
        style={{ fontSize: "15px" }}
        items={[
          {
            title: (
              <Link href="/patterns" style={{ color: "var(--pink-light)" }}>
                Kho Chart
              </Link>
            ),
          },
          {
            title: (
              <span style={patternStyles.breadcrumbTitle}>
                {pattern.name}
              </span>
            ),
          },
        ]}
      />
      <Link href="/patterns">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          style={patternStyles.backButton}
        >
          Trở Về Kho
        </Button>
      </Link>
    </div>
  );
}
