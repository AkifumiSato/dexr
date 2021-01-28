import { React } from "../../../deps.ts";

const Layout: React.FC = ({ children }) => (
  <html lang="ja">
    <head>
      <title>Hello, Dexr</title>
    </head>
    <body>
      {children}
    </body>
  </html>
);

export default Layout;
