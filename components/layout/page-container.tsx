import React, { PropsWithChildren } from "react";

export const PageContainer = ({ children }: PropsWithChildren) => {
  return <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 lg:px-12 container">{children}</main>;
};
