import { motion } from 'framer-motion';

export default function FadeContent({ 
  children, 
  delay = 0, 
  duration = 0.8, 
  y = 25, 
  x = 0, 
  className = "", 
  style = {},
  threshold = 0.15
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
