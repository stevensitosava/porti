import ScrollFill, { type ScrollFillProps } from '@/components/ui/scroll-fill';
import AboutStat from './about-stat';

const AboutStats = (props: Omit<ScrollFillProps, 'renderContent'>) => {
  return (
    <ScrollFill
      {...props}
      renderContent={({ isActive }) => (
        <div className="flex gap-10">
          <AboutStat number={3} desc="Years of Experience" isActive={isActive} />
          <AboutStat number={25} desc="Projects Completed" isActive={isActive} />
        </div>
      )}
    />
  );
};

export default AboutStats;
