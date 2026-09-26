import Header from './Header'; import Footer from './Footer'; import BackToTop from './BackToTop';
export default function PageLayout({children}){return <><Header/><main>{children}</main><Footer/><BackToTop/></>}
