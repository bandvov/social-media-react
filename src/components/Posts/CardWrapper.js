import { Box } from "@mui/material";
import React, { lazy, Suspense } from "react";
import { useInView } from "react-intersection-observer";
const LazyCard = lazy(() => import("./PostCard"));

export default function CardWrapper({ key, ...props }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box
      key={key}
      ref={ref}
      sx={{
        minHeight: "100px",
      }}
    >
      {inView ? (
        <Suspense
          fallback={
            <Box
              sx={{
                minHeight: "100px",
              }}
            >
              Loading...
            </Box>
          }
        >
          <LazyCard post={props} />
        </Suspense>
      ) : (
        <div className="h-[100px] bg-gray-200 animate-pulse"></div>
      )}
    </Box>
  );
}
