import { Avatar, Box, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import TagButton from "../Buttons/TagButton";

import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

function ArticleInfoBlock({ title, text, tags, date, user, viewsCount, commentsCount, isAuth }) {
  const yearMonthDay = date.split("T")[0];

  return (
    <Box sx={{ bgcolor: "bg.second", p: { xs: 2, sm: 3 } }}>
      {/* user */}
      <Box sx={{ display: "flex" }}>
        <Avatar src={user.avatar} sx={{ mr: 2 }} />

        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography
            variant="desc1"
            sx={{
              color: "text.main",
              display: "-webkit-box",
              wordWrap: "break-word",
              wordBreak: "break-all",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
          >
            {user.fullName}
          </Typography>

          <Typography variant="desc2" color="text.second">
            {yearMonthDay}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          ml: { xs: 0, sm: "56px" },
          mt: { xs: 1, sm: 0 },
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {/* title */}
        <Typography
          variant="h2"
          sx={{
            color: "text.main",
            display: "-webkit-box",
            wordWrap: "break-word",
            wordBreak: "break-all",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: text ? "auto" : isAuth ? 2 : { xs: 2, md: 1 },
          }}
        >
          {title}
        </Typography>

        {/* tags */}
        <Box
          sx={{
            display: "flex",
            gap: "0 16px",
            flexWrap: "wrap",
          }}
        >
          {tags.map((name, id) => (
            <TagButton key={`${id}_${name}`}>#{name}</TagButton>
          ))}
        </Box>

        {/* fullText */}
        {text && (
          <>
            <Divider />
            <Box sx={{ py: 2, color: "text.main" }}>
              <ReactMarkdown children={text} />
            </Box>
          </>
        )}

        {/* views and comments */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", color: "text.second" }}>
            <VisibilityOutlinedIcon />
            <Typography>{viewsCount}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", color: "text.second" }}>
            <CommentOutlinedIcon />
            <Typography>{commentsCount}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ArticleInfoBlock;
