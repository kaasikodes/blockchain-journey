import { APP_ROUTES } from "@/contsants";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Menubar, MenubarMenu, MenubarTrigger } from "../ui/menubar";
import { Toaster } from "../ui/toaster";
interface IProps {
  children: React.ReactNode;
}

export const Root = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <div className="flex flex-col gap-4 min-h-screen gradient-bg-welcome">
      <div className="flex justify-center">
        <MenubarDemo isAuthenicated />
      </div>
      <>{children}</>
      <Toaster />
    </div>
  );
};

interface IMenuBarBrops {
  isAuthenicated?: boolean;
}

export const MenubarDemo: React.FC<IMenuBarBrops> = ({
  isAuthenicated = false,
}) => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <Link to={APP_ROUTES.home}>Home</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link to={APP_ROUTES.users}>Users</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link to={APP_ROUTES.bank}>Bank</Link>
        </MenubarTrigger>
      </MenubarMenu>

      {isAuthenicated ? (
        <MenubarMenu>
          <MenubarTrigger>
            <Link to={APP_ROUTES.profile("PUT USER ID HERE").path}>
              Profile
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
      ) : (
        <MenubarMenu>
          <MenubarTrigger>Connect</MenubarTrigger>
        </MenubarMenu>
      )}
    </Menubar>
  );
};
export default Layout;
