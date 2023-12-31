import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios";
import { useTheme } from "@mui/material/styles";

import { alertError } from "../../alerts";
import { fetchRegister, selectIsAuth } from "../../redux/slices/AuthSlice";
import TextFieldCustom from "../../components/customMUI/TextFieldCustom";
import ContainerCustom from "../../components/customMUI/ContainerCustom";
import MainButton from "../../components/Buttons/MainButton";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function RegistrationForm() {
  const theme = useTheme();
  const InputBox = useMemo(
    () => TextFieldCustom(theme.palette.bg.second, theme.palette.text.main),
    [theme.palette.mode]
  );

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [localData, setLocalData] = useState({
    fullName: "",
    email: "",
    password: "",
    regiment: "",
    battalion: "",
    company: "",
    platoon: "",
    section: "",
    avatar: null,
  });
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLocalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Обробка завантаженого аватару
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    event.target.value = null;

    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);

      setLocalData((prevData) => ({
        ...prevData,
        avatar: file,
      }));
      setAvatarUrl(imageUrl);
    }
  };

  const handleDeleteAvatar = () => {
    setLocalData((prevData) => ({
      ...prevData,
      avatar: null,
    }));
    setAvatarUrl("");
  };

  const inputRef = useRef(null);

  const handleAvatarClick = () => {
    inputRef.current.click();
  };

  const setFileToBase = () => {
    return new Promise((resolve) => {
      const render = new FileReader();
      render.readAsDataURL(localData.avatar);
      render.onloadend = () => {
        const formDataImg = {
          image: render.result,
        };
        resolve(formDataImg);
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let avatar = null;
    if (localData.avatar && typeof localData.avatar !== "string") {
      const formDataImg = await setFileToBase();

      try {
        const { data } = await axios.post("/upload", formDataImg);

        avatar = data.url;
      } catch (err) {
        console.warn(err);
        alertError(err.response.data.title, err.response.data.message);
        return;
      }
    }

    let formData = {
      fullName: localData.fullName,
      email: localData.email,
      password: localData.password,
      regiment: localData.regiment,
      battalion: localData.battalion,
      company: localData.company,
      platoon: localData.platoon,
      section: localData.section,
    };

    if (avatar) formData["avatar"] = avatar;

    const resData = await dispatch(fetchRegister(formData));

    if (resData?.payload?.error) {
      const err = resData.payload.error;
      console.warn(err);

      if (err.response.data[0]) alertError("Помилка авторизації", err.response.data[0].msg);
      else alertError(err.response.data.title, err.response.data.message);
    } else {
      if (resData?.payload?.data?.token) {
        window.localStorage.setItem("token", resData.payload.data.token);
      } else {
        alertError("Упс..", "Щось пішло не так, будь ласка, повторіть спробу пізніше");
      }
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <ContainerCustom sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          maxWidth: "500px",
          width: "100%",
          boxSizing: "border-box",
          textAlign: "center",
          bgcolor: "bg.second",
          borderRadius: 2,
          my: 4,
          p: { xs: 2, sm: 3, md: 5 },
          boxShadow: 0,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography color="text.main" variant="h2">
          Створити ваш аккаунт
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}
        >
          <Box sx={{ position: "relative" }}>
            <Avatar
              onClick={handleAvatarClick}
              src={avatarUrl}
              sx={{ width: 90, height: 90, cursor: "pointer" }}
            />
            <input
              type="file"
              onChange={handleFileInputChange}
              style={{ display: "none" }}
              ref={inputRef}
              accept="image/*"
            />

            {avatarUrl && (
              <IconButton sx={{ position: "absolute", top: -25, right: -25, color: "text.main" }}>
                <HighlightOffIcon fontSize="large" onClick={handleDeleteAvatar} />
              </IconButton>
            )}
          </Box>

          <InputBox
            value={localData.fullName}
            onChange={handleInputChange}
            required
            fullWidth
            id="fullname"
            label="Повне ім'я"
            name="fullName"
            autoFocus
          />
          <InputBox
            value={localData.email}
            onChange={handleInputChange}
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
          />
          <InputBox
            value={localData.password}
            onChange={handleInputChange}
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
          />
          {/* // regiment → battalion → company → platoon → section */}

          <InputBox
            value={localData.regiment}
            onChange={handleInputChange}
            required
            fullWidth
            id="regiment"
            label="Полк"
            name="regiment"
            autoFocus
          />
          <InputBox
            value={localData.battalion}
            onChange={handleInputChange}
            required
            fullWidth
            id="battalion"
            label="Батальйон"
            name="battalion"
            autoFocus
          />
          <InputBox
            value={localData.company}
            onChange={handleInputChange}
            required
            fullWidth
            id="company"
            label="Рота"
            name="company"
            autoFocus
          />
          <InputBox
            value={localData.platoon}
            onChange={handleInputChange}
            required
            fullWidth
            id="platoon"
            label="Взвод"
            name="platoon"
            autoFocus
          />
          <InputBox
            value={localData.section}
            onChange={handleInputChange}
            required
            fullWidth
            id="section"
            label="Відділення"
            name="section"
            autoFocus
          />

          <MainButton type="submit" fullWidth sx={{ borderRadius: 1 }}>
            Зареєструватися
          </MainButton>
        </Box>
      </Box>
    </ContainerCustom>
  );
}

export default RegistrationForm;
