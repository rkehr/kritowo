import Logo from "./Logo";
import Menu from "./Menu";

export default function Header() {
  return (
    <div className="flex flex-row grow-0 justify-between items-baseline p-8 sticky top-0 backdrop-blur-md z-15">
      <Logo />
      <Menu showOnMobile={false} />
    </div>
  );
}
