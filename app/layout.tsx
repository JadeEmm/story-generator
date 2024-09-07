// app/layout.tsx
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <head>
        <title>Story Generator App</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};

export default Layout;
