import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import ContainerCustom from "../components/customMUI/ContainerCustom";

import { useSelector } from "react-redux";
import { selectIsAuth } from "../redux/slices/AuthSlice";
import axios from "../axios";
import MainButton from "../components/Buttons/MainButton";

const columnLabels = {
  regiment: "Полк",
  battalion: "Батальйон",
  company: "Рота",
  platoon: "Взвод",
  section: "Відділення",
  nameOfTechnique: "Військава техніка",
  count: "Кількість",
  state: "Стан",
};
const nameOfMilitaryBases = ["regiment", "battalion", "company", "platoon", "section"];
const nameOfInput = ["Regiment", "Battalion", "Company", "Platoon", "Section", "Military equipment", "State"];
const nameOfInput_placeholder = {
  Regiment: "Полк",
  Battalion: "Батальйон",
  Company: "Рота",
  Platoon: "Взвод",
  Section: "Відділення",
  "Military equipment": "Військова техніка",
  State: "Стан",
};
const columnsToDisplay = [
  "regiment",
  "battalion",
  "company",
  "platoon",
  "section",
  "nameOfTechnique",
  "count",
  "state",
];
const rowsPerPage = 5;

function HomePage({ filteredFormulars, setFilteredFormulars }) {
  const isAuth = useSelector(selectIsAuth);
  const [options, setOptions] = useState({
    state: ["Нова техніка", "Техніка в експлуатації", "Техніка потребує ремонту", "Знищене", "У резерві"],
    // state: ["New equipment", "Equipment in use", "Equipment Needs repair", "Destroyed", "Inactive"],
    regiment: [],
    battalion: [],
    company: [],
    platoon: [],
    section: [],
    nameOfTechnique: [
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
    ],
  });
  const [localData, setLocalData] = useState({
    state: "",
    regiment: "",
    battalion: "",
    company: "",
    platoon: "",
    section: "",
    nameOfTechnique: "",
  });
  // const [filteredFormulars, setFilteredFormulars] = useState([]);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    for (let name of nameOfMilitaryBases) {
      axios.get(`/formular/${name}`).then((res) => {
        setOptions((prev) => ({
          ...prev,
          [name]: res.data,
        }));
        handleSearch();
      });
    }
  }, []);

  const handleSearch = () => {
    setPage(0);
    axios
      .post("/formular/filtered", {
        ...localData,
        state: localData.state ? localData.state : "",
      })
      .then((res) => {
        setFilteredFormulars(res.data);
      });
  };

  return (
    <ContainerCustom paddingY sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* buttons */}

      {isAuth ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {nameOfInput.slice(0, -2).map((name) => (
              <Autocomplete
                value={localData.name}
                onChange={(event, value) => {
                  setLocalData((prevData) => ({
                    ...prevData,
                    [name.toLowerCase()]: value,
                  }));
                }}
                options={options[name.toLowerCase()]}
                fullWidth
                required
                id={name.toLowerCase()}
                name={name.toLowerCase()}
                sx={{ width: "220px" }}
                key={name}
                renderInput={(params) => (
                  <TextField {...params} label={nameOfInput_placeholder[name]} variant="outlined" />
                )}
              />
            ))}
            <Autocomplete
              value={localData.nameOfTechnique}
              onChange={(event, value) => {
                setLocalData((prevData) => ({
                  ...prevData,
                  nameOfTechnique: value,
                }));
              }}
              options={options.nameOfTechnique}
              fullWidth
              required
              id="nameOfTechnique"
              name="nameOfTechnique"
              sx={{ width: "220px" }}
              renderInput={(params) => <TextField {...params} label="Віськова техніка" variant="outlined" />}
            />
            <Autocomplete
              value={localData.state}
              onChange={(event, value) => {
                setLocalData((prevData) => ({
                  ...prevData,
                  state: value,
                }));
              }}
              options={options.state}
              fullWidth
              required
              id="state"
              name="state"
              sx={{ width: "220px" }}
              renderInput={(params) => <TextField {...params} label="Стан" variant="outlined" />}
            />
            <MainButton sx={{ width: "220px" }} onClick={handleSearch}>
              Пошук
            </MainButton>
          </Box>

          <div>
            <TablePagination
              component="div"
              count={filteredFormulars.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[]}
            />
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {columnsToDisplay.map((column) => (
                      <TableCell key={column}>{columnLabels[column]}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredFormulars
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((item, index) => (
                      <TableRow key={index}>
                        {columnsToDisplay.map((column) => (
                          <TableCell
                            key={column}
                            style={{ whiteSpace: item[column] === "У резерві" ? "nowrap" : "wrap" }}
                          >
                            {item[column]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      ) : (
        <Box sx={{ paddingTop: "50px" }}>
          <Typography sx={{ textAlign: "center" }} variant="h2">
            Увійдіть, щоб користуватися сервісом
          </Typography>
        </Box>
      )}
    </ContainerCustom>
  );
}

export default HomePage;
