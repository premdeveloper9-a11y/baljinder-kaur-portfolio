import React, { useRef, useState } from "react";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

import "./FlipCard.css";

function FlipCard({
  front,
  back,
  axis = "y",
  flipOnClick = true,
  draggable = false,
  dragDistance = 0,
  tilt = true,
  tiltMax = 8,
  glare = true,
  glareOpacity = 0.18,
  hoverScale = 1.025,
  perspective = 1200,
  stiffness = 170,
  damping = 22,
  width = 390,
  height = 520,
  radius = 24,
  background = "#071116",
  color = "#f5f5f5",
  shadow = true,
  shadowColor = "#000000",
  shadowOpacity = 0.55,
  onFlipChange,
}) {
  const [flipped, setFlipped] = useState(false);

  const cardRef = useRef(null);

  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, {
    stiffness,
    damping,
  });

  const smoothY = useSpring(pointerY, {
    stiffness,
    damping,
  });

  const tiltX = useTransform(
    smoothY,
    [-100, 100],
    [tiltMax, -tiltMax]
  );

  const tiltY = useTransform(
    smoothX,
    [-100, 100],
    [-tiltMax, tiltMax]
  );

  const flipRotation = useSpring(flipped ? 180 : 0, {
    stiffness,
    damping,
  });

  const finalRotateX = useTransform(
    tiltX,
    (value) =>
      tilt && !reduceMotion ? value : 0
  );

  const finalRotateY = useTransform(
    [tiltY, flipRotation],
    ([tiltValue, flipValue]) =>
      (tilt && !reduceMotion ? tiltValue : 0) +
      flipValue
  );

  const glareX = useTransform(
    smoothX,
    [-100, 100],
    [0, 100]
  );

  const glareY = useTransform(
    smoothY,
    [-100, 100],
    [0, 100]
  );

  const glareBackground = useMotionTemplate`
    radial-gradient(
      circle at ${glareX}% ${glareY}%,
      rgba(255,255,255,${glareOpacity}),
      transparent 55%
    )
  `;

  const toggleFlip = () => {
    if (!flipOnClick) return;

    setFlipped((previous) => {
      const next = !previous;

      if (onFlipChange) {
        onFlipChange(next);
      }

      return next;
    });
  };

  const handlePointerMove = (event) => {
    if (!tilt || reduceMotion) return;

    const rect =
      cardRef.current?.getBoundingClientRect();

    if (!rect) return;

    const x =
      event.clientX -
      rect.left -
      rect.width / 2;

    const y =
      event.clientY -
      rect.top -
      rect.height / 2;

    pointerX.set(x);
    pointerY.set(y);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const handleDragEnd = (_, info) => {
    if (!draggable || dragDistance <= 0) return;

    const distance =
      Math.abs(info.offset.x) +
      Math.abs(info.offset.y);

    if (distance >= dragDistance) {
      toggleFlip();
    }
  };

  const shadowStyle = shadow
    ? `0 18px 40px ${shadowColor}${Math.round(
        shadowOpacity * 255
      )
        .toString(16)
        .padStart(2, "0")}`
    : "none";

  const isXAxis = axis === "x";

  return (
    <div
      ref={cardRef}
      className="flip-card"
      style={{
        width,
        height,
        perspective: `${perspective}px`,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="flip-card__shadow"
        style={{
          borderRadius: radius,
          boxShadow: shadowStyle,
        }}
      />

      <motion.div
        className="flip-card__rotor"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: radius,

          rotateX: isXAxis
            ? finalRotateX
            : 0,

          rotateY: isXAxis
            ? 0
            : finalRotateY,
        }}
        drag={
          draggable && dragDistance > 0
            ? true
            : false
        }
        dragConstraints={{
          left: -dragDistance,
          right: dragDistance,
          top: -dragDistance,
          bottom: dragDistance,
        }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        onClick={toggleFlip}
        whileHover={
          reduceMotion
            ? undefined
            : {
                scale: hoverScale,
              }
        }
      >
        {/* =========================
            FRONT
        ========================= */}

        <div
          className="flip-card__face flip-card__face--front"
          style={{
            borderRadius: radius,
            background,
            color,
          }}
        >
          {front}

          {glare && !reduceMotion && (
            <motion.div
              className="flip-card__glare"
              style={{
                borderRadius: radius,
                background: glareBackground,
              }}
            />
          )}
        </div>

        {/* =========================
            BACK
        ========================= */}

        <div
          className="flip-card__face flip-card__face--back"
          style={{
            borderRadius: radius,
            background,
            color,
          }}
        >
          <div className="flip-card__back-content">
            {back}
          </div>

          {glare && !reduceMotion && (
            <motion.div
              className="flip-card__glare"
              style={{
                borderRadius: radius,
                background: glareBackground,
              }}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default FlipCard;