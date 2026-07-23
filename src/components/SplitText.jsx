import React from 'react';
import { motion } from 'framer-motion';

const SplitText = ({ text, className, style, delay = 0, stagger = 0.04, duration = 0.8, by = 'letters' }) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 15
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.span
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'bottom', ...style }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {by === 'words' ? (
        words.map((word, wordIdx) => (
          <motion.span
            key={wordIdx}
            variants={childVariants}
            style={{ display: 'inline-block', marginRight: '0.25em' }}
          >
            {word}
          </motion.span>
        ))
      ) : (
        words.map((word, wordIdx) => (
          <span
            key={wordIdx}
            style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
          >
            {word.split("").map((char, charIdx) => (
              <motion.span
                key={charIdx}
                variants={childVariants}
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            ))}
            {wordIdx < words.length - 1 && <span style={{ display: 'inline-block' }}>&nbsp;</span>}
          </span>
        ))
      )}
    </motion.span>
  );
};

export default SplitText;
