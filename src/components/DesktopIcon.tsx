import "../styles/DesktopIcon.css";

interface IconProps {
  type: string;
  label: string;
  icon: string;
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function DesktopIcon(props: IconProps) {
  return (
    <div className="desktop-icon" onDoubleClick={props.onDoubleClick}>
      <img src={props.icon} alt={`${props.type} icon`} />
      <p>{props.label}</p>
    </div>
  );
}
