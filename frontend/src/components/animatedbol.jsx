import { motion as Motion } from "motion/react"
const AnimatedBlob = ({ delay = 0, size = "400px", color = "from-purple-500 to-purple-700" }) => {
  return (
    <Motion.div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                  bg-gradient-to-br ${color} opacity-20 blur-3xl rounded-full`}
      style={{ width: size, height: size }}
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay: delay,
      }}
    />
  );
};

export default AnimatedBlob;