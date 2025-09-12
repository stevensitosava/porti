/**
 * HeroBg component that renders an animated SVG background
 * with interactive mouse movement effects
 *
 * @param {HeroBgProps} props - Component props
 * @param {string} [props.className] - Additional CSS class names
 * @returns {JSX.Element} The rendered SVG background
 */
const HeroBg = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      style={{
        background: `
          radial-gradient(circle 125vh at 50% 100%, var(--primary-400), var(--primary-500), var(--primary-600), var(--primary-700), var(--primary-800), var(--primary-900), var(--primary-950)),
          url(/assets/noise.svg) center/200px,
          var(--primary-950)
        `,
      }}
      {...props}
    />
  );
};

export default HeroBg;
