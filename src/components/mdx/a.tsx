const A = ({ children, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
  <a target="_blank" rel="noopener noreferrer" {...props}>
    {children}
  </a>
);

export default A;
