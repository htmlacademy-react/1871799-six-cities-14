import MemorizedLogo from '../../ui/logo';
import { DataFooter } from './footer-data';

export function Footer(): JSX.Element {
  return (
    <footer className="footer container">
      <MemorizedLogo classNameLinks={DataFooter.classNameLinks} classNameImages={DataFooter.classNameImages} width={DataFooter.width} height={DataFooter.height}/>
    </footer>
  );
}
