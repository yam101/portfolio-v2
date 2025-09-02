declare module 'react-chrome-dino' {
  import { ComponentType } from 'react';
  
  export interface ChromeDinoProps {
    className?: string;
    style?: React.CSSProperties;
  }
  
  const ChromeDino: ComponentType<ChromeDinoProps>;
  export default ChromeDino;
}
