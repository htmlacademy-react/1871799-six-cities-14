import { memo } from 'react';

type TPremiumProps = {
  block: string;
}

export function Premium ({block} : TPremiumProps): JSX.Element {
  return (
    <div className={block}>
      <span>Premium</span>
    </div>
  );
}

const MemorizedPremium = memo(Premium);
export default MemorizedPremium;
