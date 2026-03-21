/**
 * ScrollReveal — reusable scroll-triggered animation wrapper.
 *
 * Usage:
 *   <ScrollReveal>content here</ScrollReveal>
 *   <ScrollReveal direction="left" delay={0.2}>...</ScrollReveal>
 *   <ScrollReveal variant="zoom">...</ScrollReveal>
 */

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { type ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';
type Variant = 'slide' | 'zoom' | 'fade' | 'flip';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  variant?: Variant;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  amount?: number; // fraction of element visible before triggering
}

const getVariants = (direction: Direction, variant: Variant): Variants => {
  const offset = 50;

  if (variant === 'zoom') {
    return {
      hidden: { opacity: 0, scale: 0.88 },
      visible: { opacity: 1, scale: 1 },
    };
  }

  if (variant === 'flip') {
    const axes: Record<Direction, object> = {
      up:    { rotateX: 25 },
      down:  { rotateX: -25 },
      left:  { rotateY: -25 },
      right: { rotateY: 25 },
    };
    return {
      hidden: { opacity: 0, ...axes[direction] },
      visible: { opacity: 1, rotateX: 0, rotateY: 0 },
    };
  }

  if (variant === 'fade') {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };
  }

  // 'slide' (default)
  const directionMap: Record<Direction, object> = {
    up:    { y: offset },
    down:  { y: -offset },
    left:  { x: offset },
    right: { x: -offset },
  };

  return {
    hidden: { opacity: 0, ...directionMap[direction] },
    visible: { opacity: 1, y: 0, x: 0 },
  };
};

export default function ScrollReveal({
  children,
  direction = 'up',
  variant = 'slide',
  delay = 0,
  duration = 0.6,
  once = true,
  className = '',
  amount = 0.15,
}: ScrollRevealProps) {
  const variants = getVariants(direction, variant);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // custom cubic ease — smooth snap
      }}
      className={className}
      style={{ transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollRevealStagger — wraps children so each child staggers in on scroll.
 */
interface StaggerProps {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: Direction;
}

export function ScrollRevealStagger({
  children,
  stagger = 0.1,
  delay = 0,
  duration = 0.55,
  className = '',
  direction = 'up',
}: StaggerProps) {
  const childVariants: Variants = {
    hidden: { opacity: 0, y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0, x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0 },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={childVariants} transition={{ duration, ease: [0.22, 1, 0.36, 1] }}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={childVariants} transition={{ duration }}>{children}</motion.div>}
    </motion.div>
  );
}
