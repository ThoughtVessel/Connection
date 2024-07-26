"use client";

import React from 'react';

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
          <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
