import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import { useNavigate } from "react-router-dom";

const MainNavigation = () => {
  const navigate = useNavigate();

  const handleTextClick = () => {
    navigate("/");
  };

  return (
    <MainHeader>
      <h1
        style={{ margin: "35px", cursor: "pointer" }}
        onClick={handleTextClick}
      >
        Full-Stack project
      </h1>
      <nav>
        <NavLinks />
      </nav>
    </MainHeader>
  );
};
export default MainNavigation;
