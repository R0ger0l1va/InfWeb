import ThemeChangeButton from "../theme/changeThemeButton";

import { SidebarTrigger } from "../ui/sidebar";

function NavBar() {
    
  return (
    <>
      <nav className=" flex  justify-between ">
       <SidebarTrigger/> NAVBAR <ThemeChangeButton/>
      </nav>
    </>
  );
}

export default NavBar;
