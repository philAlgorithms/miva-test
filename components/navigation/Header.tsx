import Link from 'next/link';

export interface IHeader extends React.ComponentPropsWithoutRef<'header'> {}

const Header: React.FC<IHeader> = ({ className, children, ...headerProps }) => {
  return (
    <header className={`bg-white ${className}`} {...headerProps}>
      <nav
        className="mx-auto flex items-center justify-between pt-12 lg:pt-16 py-3 pb-2 md:py-6 border-b-[2px] border-gray-400"
        aria-label="Global"
      >
        <Link href="/" className="flex flex-row items-center gap-x-1 lg:flex-1">
          <span className="font-satoshi-variable font-medium md:font-bold text-sm md:text-lg text-gray-900">
            MIVA UNIVERSITY
          </span>
        </Link>
        <div className="flex lg:gap-x-scale-desktop-39 items-center">
          {/* <Link href="/login" className="">
            Login
          </Link> */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
