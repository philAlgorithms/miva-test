export interface IBaseTemplate extends React.ComponentPropsWithoutRef<'div'> {}

const BaseTemplate: React.FC<IBaseTemplate> = ({ className, ...divProps }) => {
  return <div className={`${className}`} {...divProps}></div>;
};

export default BaseTemplate;
