import React, { useEffect, useMemo, useState } from "react";
import { Box, MenuItem, Select } from "@mui/material";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import axios from "../axios";

import { alertSuccess, alertError, alertConfirm } from "../alerts";
import { useDispatch, useSelector } from "react-redux";
import ContainerCustom from "../components/customMUI/ContainerCustom";
import TextFieldCustom from "../components/customMUI/TextFieldCustom";
import MainButton from "../components/Buttons/MainButton";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { fetchAuthMe } from "../redux/slices/AuthSlice";

function Profile() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const InputBox = useMemo(
    () => TextFieldCustom(theme.palette.bg.second, theme.palette.text.main),
    [theme.palette.mode]
  );

  const [localData, setLocalData] = useState({
    fullName: "",
    regiment: "",
    battalion: "",
    company: "",
    platoon: "",
    section: "",
  });

  const { data: userData, isLoaded: isLoadedDataUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setLocalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setLocalData({
      fullName: userData?.fullName,
      regiment: userData?.regiment,
      battalion: userData?.battalion,
      company: userData?.company,
      platoon: userData?.platoon,
      section: userData?.section,
    });
  }, [userData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // оновлення
    axios
      .patch(`/auth/update`, localData)
      .then((res) => {
        alertSuccess("Дані користувача успішно оновлені");
        dispatch(fetchAuthMe());
        navigate("/");
      })
      .catch((err) => {
        console.warn(err);
        if (err.response.data[0]?.msg) alertError("Помилка формуляру", err.response.data[0].msg);
        else alertError(err.response.data.title, err.response.data.message);
      });
  };

  const handleBack = () => {
    alertConfirm("Ви впевнені, що хочете вийти? Ваші зміни не збережуться", () => {
      navigate(-1);
    });
  };

  if (!userData) return <Navigate to="/" />;

  return (
    <ContainerCustom paddingY sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <MainButton startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ alignSelf: "start" }}>
        Назад
      </MainButton>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          bgcolor: "bg.second",
          p: 3,
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          boxShadow: 0,
        }}
      >
        {/* The full name of the technique */}
        Повне ім'я
        <InputBox
          value={localData.fullName}
          onChange={onChangeInput}
          required
          fullWidth
          id="fullName"
          placeholder="Введіть повне ім'я..."
          name="fullName"
          autoFocus
          inputProps={{ style: { fontSize: 24 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 24 } }} // font size of input label
          sx={{ "& .MuiOutlinedInput-notchedOutline": { borderRadius: "8px" } }}
        />
        Військова частина
        <InputBox
          value={localData.regiment}
          onChange={onChangeInput}
          required
          fullWidth
          id="regiment"
          placeholder="Введіть полк..."
          name="regiment"
          label="Полк"
          inputProps={{ style: { fontSize: 24 } }} // font size of input text
          InputLabelProps={{
            style: {
              fontSize: 24,
              backgroundColor: theme.palette.bg.second,
              padding: "0 5px 0 0",
              marginTop: "-1px",
            },
          }} // font size of input label
          sx={{ "& .MuiOutlinedInput-notchedOutline": { borderRadius: "8px" } }}
        />
        <InputBox
          value={localData.battalion}
          onChange={onChangeInput}
          required
          fullWidth
          id="battalion"
          placeholder="Введіть батальйон..."
          name="battalion"
          label="Батальйон"
          inputProps={{ style: { fontSize: 24 } }} // font size of input text
          InputLabelProps={{
            style: {
              fontSize: 24,
              backgroundColor: theme.palette.bg.second,
              padding: "0 5px 0 0",
              marginTop: "-1px",
            },
          }} // font size of input label
          sx={{ "& .MuiOutlinedInput-notchedOutline": { borderRadius: "8px" } }}
        />
        <InputBox
          value={localData.company}
          onChange={onChangeInput}
          required
          fullWidth
          id="company"
          placeholder="Введіть роту..."
          name="company"
          label="Рота"
          inputProps={{ style: { fontSize: 24 } }} // font size of input text
          InputLabelProps={{
            style: {
              fontSize: 24,
              backgroundColor: theme.palette.bg.second,
              padding: "0 5px 0 0",
              marginTop: "-1px",
            },
          }} // font size of input label
          sx={{ "& .MuiOutlinedInput-notchedOutline": { borderRadius: "8px" } }}
        />
        <InputBox
          value={localData.platoon}
          onChange={onChangeInput}
          required
          fullWidth
          id="platoon"
          placeholder="Введіть взвод..."
          name="platoon"
          label="Взвод"
          inputProps={{ style: { fontSize: 24 } }} // font size of input text
          InputLabelProps={{
            style: {
              fontSize: 24,
              backgroundColor: theme.palette.bg.second,
              padding: "0 5px 0 0",
              marginTop: "-1px",
            },
          }} // font size of input label
          sx={{ "& .MuiOutlinedInput-notchedOutline": { borderRadius: "8px" } }}
        />
        <InputBox
          value={localData.section}
          onChange={onChangeInput}
          required
          fullWidth
          id="section"
          placeholder="Введіть відділення..."
          name="section"
          label="Відділення"
          inputProps={{ style: { fontSize: 24 } }} // font size of input text
          InputLabelProps={{
            style: {
              fontSize: 24,
              backgroundColor: theme.palette.bg.second,
              padding: "0 5px 0 0",
              marginTop: "-1px",
            },
          }} // font size of input label
          sx={{ "& .MuiOutlinedInput-notchedOutline": { borderRadius: "8px" } }}
        />
        <MainButton type="submit">Зберегти</MainButton>
      </Box>
    </ContainerCustom>
  );
}

export default Profile;
