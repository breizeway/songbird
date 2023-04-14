import React, { PropsWithChildren } from "react";


interface ILayoutProps {
  //
};

const Layout = ({ children }: PropsWithChildren<ILayoutProps>): JSX.Element => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default Layout