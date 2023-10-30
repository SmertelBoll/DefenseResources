import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios";

import { alertConfirm, alertError, alertSuccess } from "../../alerts";
import { deletePost } from "../../redux/slices/PostsSlice";
import { selectIsAuth } from "../../redux/slices/AuthSlice";
import ArticleInfoBlock from "./ArticleInfoBlock";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

// these articles cannot be deleted, they are needed for a pleasant decoration of the site and display of its capabilities
const ids = [
  "644ace279845d0b6d7418ac5",
  "644ad40d9845d0b6d7418bac",
  "644ad55f9845d0b6d7418bfd",
  "644ad7059845d0b6d7418c45",
  "644aebf5ee0997d82086b51a",
];

function Article({ _id, title, tags, imageUrl, date, user, viewsCount, commentsCount, isOwner, isAdmin }) {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const deleteArticleFunc = () => {
    axios
      .delete(`/posts/${_id}`)
      .then((res) => {
        alertSuccess("The article has been successfully deleted");
        dispatch(deletePost(_id));
      })
      .catch((err) => {
        console.warn(err);
        alertError(err.response.data.title, err.response.data.message);
      });
  };

  const handleDeleteArticle = () => {
    alertConfirm("Are you sure you want to delete the article?", deleteArticleFunc);
  };

  return (
    <Box
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      sx={{
        position: "relative",
        boxShadow: 0,
        borderRadius: 2,
        overflow: "hidden",
        "&:hover": { outline: (theme) => `1px solid ${theme.palette.text.second}` },
      }}
    >
      <Link to={`/article/${_id}`}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* image */}
          {imageUrl && (
            <Box
              component="img"
              sx={{
                width: "100%",
                maxHeight: isAuth ? "40vh" : "50vh",
                objectFit: "cover",
              }}
              src={imageUrl}
            />
          )}

          {/* info */}
          <ArticleInfoBlock
            title={title}
            tags={tags}
            date={date}
            user={user}
            viewsCount={viewsCount}
            commentsCount={commentsCount}
            isAuth={isAuth}
          />
        </Box>
      </Link>

      {/* update button */}
      {(isOwner || isAdmin) && !ids.includes(_id) && (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            bgcolor: "bg.second",
            p: "3px",
            borderRadius: 2,
            opacity: isHovering ? 1 : 0,
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          <Link to={`/update/${_id}`}>
            <Tooltip title={<Typography fontSize={16}>Edit</Typography>} placement="top">
              <IconButton sx={{ color: "text.main" }}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Link>

          <Tooltip title={<Typography fontSize={16}>Delete</Typography>} placement="top">
            <IconButton sx={{ color: "text.main" }} onClick={handleDeleteArticle}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
}

export default Article;
