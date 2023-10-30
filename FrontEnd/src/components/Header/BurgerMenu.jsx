import React, { useRef, useState } from "react";
import { Box, Drawer, Button, Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsAuth } from "../../redux/slices/AuthSlice";
import MainButton from "../Buttons/MainButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import ChangeAvatar from "../ChangeAvatar";
import axios from "../../axios";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateIcon from "@mui/icons-material/Create";
import PersonIcon from "@mui/icons-material/Person";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { alertError, alertSuccess } from "../../alerts";

const BurgerMenu = ({ sx, onClickLogout }) => {
  // auth: show information to
  //  0 - users without registration
  //  1 - registered users
  //  -1 - all users
  const navLinks = [
    { title: "Home", link: "/", auth: -1, icon: <HomeIcon />, func: null },
    { title: "Profile", link: "/profile", auth: 1, icon: <PersonIcon />, func: null },
    { title: "Log in", link: "/login", auth: 0, icon: <LoginIcon />, func: null },
    { title: "Sing up", link: "/register", auth: 0, icon: <PersonAddIcon />, func: null },
    { title: "Create a formulary", link: "/create", auth: 1, icon: <CreateIcon />, func: null },
    { title: "Upload formularies", link: "", auth: 1, icon: <UploadIcon />, func: onClickUpload },
    { title: "Download formularies", link: "", auth: 1, icon: <DownloadIcon />, func: onClickDownload },
    { title: "Log out", link: "", auth: 1, icon: <LogoutIcon />, func: onClickLogout },
  ];

  const isAuth = useSelector(selectIsAuth);
  const { data } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false); // drawer
  const [isOpenChangeAvatar, setIsOpenChangeAvatar] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDialogClose = () => {
    setIsOpenChangeAvatar(false);
  };

  function onClickDownload() {
    axios.get(`/formular`).then((res) => {
      console.log(res.data);
      if (res.data) {
        const jsonData = JSON.stringify(res.data);
        const blob = new Blob([jsonData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "data.json"; // Ім'я файлу, під яким він буде збережений
        // downloadLink.innerHTML = "Скачати файл";

        // Додайте посилання на сторінку
        downloadLink.click();
      }
    });
  }

  function onClickUpload() {
    fileInputRef.current.click();
  }

  const handleSubmit = async (data) => {
    let formData = {
      nameOfTechnique: data.nameOfTechnique,
      count: parseInt(data.count),
      state: data.state,
      regiment: data.regiment,
      battalion: data.battalion,
      company: data.company,
      platoon: data.platoon,
      section: data.section,
    };

    // створення
    axios
      .post(`/formular`, formData)
      .then((res) => {})
      .catch((err) => {
        console.warn(err);
        if (err.response.data[0]?.msg) alertError("Formular error", err.response.data[0].msg);
        else alertError(err.response.data.title, err.response.data.message);
      });
  };

  const handleFileInputChange = (event) => {
    const fileContent = event.target.files[0];
    if (fileContent) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        try {
          const jsonData = JSON.parse(fileContent);
          for (let jData of jsonData) {
            handleSubmit(jData);
          }

          alertSuccess("Formular successfully uploaded");
          handleDrawerClose();
        } catch (error) {
          console.error("Помилка при розборі JSON: " + error.message);
        }
      };
      reader.readAsText(fileContent);
    }
  };

  return (
    <Box sx={{ display: "flex", ...sx }}>
      <Button
        onClick={handleDrawerOpen}
        sx={{
          alignSelf: "center",
          p: { xs: 1, sm: 2 },
          color: "text.main",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <MenuIcon fontSize="large" />
      </Button>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleDrawerClose}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "min(80vw, 300px)",
            p: 2,
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            bgcolor: "bg.second",
          },
        }}
      >
        {/* user */}
        {isAuth && (
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            <Avatar
              src={data?.avatar}
              onClick={() => setIsOpenChangeAvatar(true)}
              sx={{ width: { xs: 50, sm: 75 }, height: { xs: 50, sm: 75 }, cursor: "pointer" }}
            />
            <ChangeAvatar onClose={handleDialogClose} open={isOpenChangeAvatar} />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{
                  display: "-webkit-box",
                  wordWrap: "break-word",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  whiteSpace: "pre-line",
                  fontSize: "24px",
                  color: "text.main",
                }}
              >
                {data?.fullName}
              </Typography>
              <Typography
                sx={{
                  display: "-webkit-box",
                  wordWrap: "break-word",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  whiteSpace: "pre-line",
                  fontSize: "24px",
                  color: "text.second",
                }}
              >
                {data?.section}
              </Typography>
            </Box>
          </Box>
        )}

        {/* navigate */}
        <Box sx={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}>
          {navLinks.map((obj) => (
            <React.Fragment key={obj.title}>
              {/* choose which buttons to show depending on authorization */}
              {(obj.auth === -1 || obj.auth == isAuth) && (
                <>
                  {/* check if you need to forward to another page */}
                  {obj.link ? (
                    <Link to={obj.link}>
                      <SecondaryButton
                        startIcon={obj.icon}
                        fullWidth
                        onClick={
                          obj.func
                            ? () => {
                                handleDrawerClose();
                                obj.func();
                              }
                            : handleDrawerClose
                        }
                        sx={{ display: "flex", justifyContent: "flex-start" }}
                      >
                        {obj.title}
                      </SecondaryButton>
                    </Link>
                  ) : (
                    <>
                      {obj.title === "Upload formularies" && (
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept=".json"
                          hidden
                          onChange={handleFileInputChange}
                        />
                      )}
                      <SecondaryButton
                        startIcon={obj.icon}
                        fullWidth
                        onClick={
                          obj.func
                            ? () => {
                                obj.func();
                                if (obj.title !== "Upload formularies") handleDrawerClose();
                              }
                            : handleDrawerClose
                        }
                        sx={{ display: "flex", justifyContent: "flex-start" }}
                      >
                        {obj.title}
                      </SecondaryButton>
                    </>
                  )}
                </>
              )}
            </React.Fragment>
          ))}
        </Box>

        <MainButton fullWidth onClick={handleDrawerClose}>
          Close
        </MainButton>
      </Drawer>
    </Box>
  );
};

export default BurgerMenu;
