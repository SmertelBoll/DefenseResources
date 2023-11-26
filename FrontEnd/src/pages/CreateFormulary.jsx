import React, { useMemo, useState } from "react";
import { Autocomplete, Box, MenuItem, Select, TextField } from "@mui/material";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import axios from "../axios";

import { alertSuccess, alertError, alertConfirm } from "../alerts";
import { useSelector } from "react-redux";
import ContainerCustom from "../components/customMUI/ContainerCustom";
import TextFieldCustom from "../components/customMUI/TextFieldCustom";
import MainButton from "../components/Buttons/MainButton";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const stateArray = [
  "Нова техніка",
  "Техніка в експлуатації",
  "Техніка потребує ремонту",
  "Знищене",
  "У резерві",
];

const weapon = [
  "Танк Т-64 БВ",
  "Танк Т-64 БМ «Булат»",
  "Танк Т-84",
  "Зенітний ракетний комплекс 9А33 «Оса АКМ»",
  "Зенітний гарматно-ракетний комплекс 9К35 «Стріла-10М»",
  "Зенітний гарматно-ракетний комплекс 9К22 «Тунгуска»",
  "ПТРК «Штурм-С» (9П149)",
  "ПТРК «Конкурс» (9П148)",
  "РСЗВ 9К58 «Смерч»",
  "РСЗВ 9К57 «Ураган»",
  "РСЗВ 9К51 «Град»",
  "УАЗ-469",
  "УАЗ-3151",
  "ГАЗ-66",
  "ЗІЛ-131",
  "УРАЛ-4320",
  "УРАЛ-43202",
  "КАМАЗ-4310",
  "КАМАЗ-5320",
  "КРАЗ-250",
  "КРАЗ-257",
  "КРАЗ-260",
  "УАЗ-452А",
  "УАЗ-3962",
  "МАЗ-537",
  "МАЗ-543",
  "МТ-ЛБ",
  "ГМ-352",
  "ГМ-355",
  "ГМ-579",
  "ГМ-577",
  "ГМ-569",
  "ГМ-567",
  "ЗІЛ-135ЛМ",
  "Броньована ремонтно-евакуаційна машина БРЕМ-1",
  "БТР-70",
  "БТР-80",
  "БРМ-1К",
  "БРДМ-2",
  "БТР-Д",
  "БМП-1",
  "БМП-2",
  "БМД-1П",
  "БМД-2",
  "Самохідна гаубиця 2С5 «Гіацинт-С»",
  "Самохідна гаубиця 2С19 «МСТА-С»",
  "Самохідна гаубиця 2С3 «Акація»",
  "Самохідна гаубиця 2С1 «Гвоздика»",
  "Гаубиця 2А65 «МСТА-Б»",
  "Гаубиця Д-30",
  "Протитанкова гармата МТ-12 «Рапіра»",
  "РК ТР 9К79 «Точка» (9К79-1 «Точка-У»)",
];

function CreateFormulary({ update }) {
  const theme = useTheme();
  const InputBox = useMemo(
    () => TextFieldCustom(theme.palette.bg.second, theme.palette.text.main),
    [theme.palette.mode]
  );

  const [localData, setLocalData] = useState({
    nameOfTechnique: "",
    count: "",
    state: stateArray[0],
  });

  const { id } = useParams(); // if update
  const { data: userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setLocalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let formData = {
      nameOfTechnique: localData.nameOfTechnique,
      count: parseInt(localData.count),
      state: localData.state,
    };

    // створення
    axios
      .post(`/formular`, formData)
      .then((res) => {
        alertSuccess("Формуляр успішно створений");
        window.localStorage.removeItem("inputData");
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
        {/* The name of the technique */}

        <Autocomplete
          value={localData.nameOfTechnique}
          onChange={(event, value) => {
            setLocalData((prevData) => ({
              ...prevData,
              nameOfTechnique: value,
            }));
          }}
          options={weapon}
          fullWidth
          required
          id="nameOfTechnique"
          name="nameOfTechnique"
          sx={{ width: "100%" }}
          renderInput={(params) => <TextField {...params} label="Військова техніка" variant="outlined" />}
        />

        {/* count */}
        <InputBox
          value={localData.count}
          onChange={onChangeInput}
          required
          fullWidth
          id="count"
          placeholder="Кількість..."
          name="count"
          // inputProps={{ style: { fontSize: 24 } }} // font size of input text
          // InputLabelProps={{ style: { fontSize: 24 } }} // font size of input label
          // sx={{ "& .MuiOutlinedInput-notchedOutline": { borderRadius: "8px" } }}
        />
        <Select
          value={localData.state}
          onChange={onChangeInput}
          fullWidth
          required
          id="state"
          name="state"
          // sx={{ width: "100%", fontSize: 24, "& .MuiSelect-outlined": { borderRadius: "8px" } }}
        >
          {stateArray.map((item) => (
            <MenuItem value={item} sx={{ fontSize: 24 }}>
              {item}
            </MenuItem>
          ))}
        </Select>

        <MainButton type="submit">{update ? "Оновити" : "Створити"} формуляр</MainButton>
      </Box>
    </ContainerCustom>
  );
}

export default CreateFormulary;
