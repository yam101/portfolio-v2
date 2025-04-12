import "../styles/DesktopIcon.css";

interface IconProps {
  type: string;
  label: string;
  icon: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function DesktopIcon(props: IconProps) {
  return (
    <div className="desktop-icon" onClick={props.onClick}>
      <img src={props.icon} alt={`${props.type} icon`} />
      <p>{props.label}</p>
    </div>
  );
}
