"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import React from "react";

export const AutoAnimate = ({
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const [parent] = useAutoAnimate();
  return (
    <div ref={parent} {...props}>
      {children}
    </div>
  );
};
