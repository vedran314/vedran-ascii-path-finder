"use client";
import React from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

type CardCompactProps = {
  title: string;
  id: string;
  description: string;
  content?: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  handleOnClick: (id: string) => void;
};

const CardCompact = ({
  id,
  title,
  description,
  content,
  className,
  children,
  footer,
  handleOnClick,
}: CardCompactProps) => {
  return (
    <Card className={className} onClick={() => handleOnClick(id)} id={id}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <div
        className="flex justify-center border-2 border-gray-100 ml-6 mr-6 mb-6 rounded-md bg-gray-50 dark:bg-gray-300
"
      >
        <CardContent className="p-6 h-[212px]">{content}</CardContent>
      </div>
      <div>{children}</div>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export { CardCompact };
