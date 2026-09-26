import { motion, useReducedMotion } from 'framer-motion';
export default function ScrollReveal({children, className='', delay=0}) { const reduce=useReducedMotion(); return <motion.div className={className} initial={reduce?false:{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.18}} transition={{duration:.7,delay,ease:[.22,1,.36,1]}}>{children}</motion.div> }
