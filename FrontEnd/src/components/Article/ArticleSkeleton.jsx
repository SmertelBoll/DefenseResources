import { Box } from "@mui/material";
import React from "react";
import SkeletonCustom from "../customMUI/SkeletonCustom";

const ArticleSkeletonBlock = () => {
  return (
    <Box sx={{ borderRadius: 2, overflow: "hidden" }}>
      <SkeletonCustom sx={{ width: "100%", height: "50vh" }} />
      <Box sx={{ p: 3 }}>
        {/* user */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <SkeletonCustom circular width={40} height={40} />
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
            <SkeletonCustom width={50} height={12} />
            <SkeletonCustom width={75} height={12} />
          </Box>
        </Box>
        {/* title */}
        <SkeletonCustom height={27} sx={{ mt: 1, ml: "56px", width: "min(267px, 50vw)" }} />
      </Box>
    </Box>
  );
};

function ArticleSkeleton({ count }) {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, id) => (
          <ArticleSkeletonBlock key={id} />
        ))}
    </>
  );
}

export default ArticleSkeleton;
