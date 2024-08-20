import { motion, useSpring, useTransform } from "framer-motion";

type Props = {
  minWidth: number;
  maxWidth: number;
  distanceMagnify: number;

  diff: number;
};

export default function BoxItem({
  minWidth,
  maxWidth,
  distanceMagnify,
  diff,
}: Props) {
  const diffVal = useTransform(() => diff);

  const widthSync = useTransform(
    diffVal,
    [-distanceMagnify, 0, distanceMagnify],
    [minWidth, maxWidth, minWidth],
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      style={{ width }}
      className="shrink-0 h-[40px] bg-red-500"
    ></motion.div>
  );
}
