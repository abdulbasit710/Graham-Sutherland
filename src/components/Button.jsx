import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
export default function Button({to, href, children, variant='gold', className=''}) {
  const cls = `button button--${variant} ${className}`;
  const content = <>{children}<ArrowUpRight size={16}/></>;
  if (href) return <a className={cls} href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
  return <Link className={cls} to={to}>{content}</Link>;
}
