/**
 * @interface PortfolioBgProps
 * @extends React.SVGAttributes<SVGElement>
 */
interface PortfolioBgProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  /** The fill color for the background rectangle. */
  color?: string;
}

/**
 * Renders a SVG background component with a dynamic fill color and a noise filter.
 * It's designed to be used as a background for sections, providing a subtle textured look.
 *
 * @param {PortfolioBgProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered SVG background component.
 */
const PortfolioBg = ({ color = '#000', ...props }: PortfolioBgProps) => {
  return (
    <div
      style={{
        background: `
        linear-gradient(135deg, transparent, rgba(0,0,0,.25)),
        url(/assets/noise.svg) center/200px,
        ${color}
      `,
      }}
      {...props}
    />
  );
};

export default PortfolioBg;
