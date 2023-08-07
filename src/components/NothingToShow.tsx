interface NothingToShowProps {
  message: string;
  src: string;
  alt: string;
  className: string;
  children?: React.ReactNode;
}

export const NothingToShow = ({
  message, src, alt, className = '', children,
}: NothingToShowProps) => (
  <div className={className}>
    <img src={src} alt={alt}/>
    <p>{ message }</p>
    { children }
  </div>
);
