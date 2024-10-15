export interface IFormError extends React.ComponentPropsWithoutRef<'div'> {}

const FormError: React.FC<IFormError> = ({
  className,
  children,
  ...divProps
}) => {
  return (
    <div
      className={`text-red-600 text-xs desktop:text-scale-desktop-12 desktop:leading-scale-desktop-16 ${className}`}
      {...divProps}
    >
      {children}
    </div>
  );
};

export default FormError;
