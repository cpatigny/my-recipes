import './Block.scss';

interface BlockProps {
  className?: string;
  children: React.ReactNode;
}

const Block = ({ className, children }: BlockProps) => {
  return (
    <div className={`block ${className ?? ''}`}>
      { children }
    </div>
  );
};

export default Block;
