"use client";

import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  Box,
  TextField,
  styled,
  Button,
  ButtonGroup,
  Tooltip,
  IconButton,
} from "@mui/material";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import addComma from "@/utils/addComma";
import { ChangeEvent, useState } from "react";
import { red } from "@mui/material/colors";
import GiftDto from "@/types/GiftDto";
import GiftItem from "@/components/GiftItem";
import { AddBox } from "@mui/icons-material";
import { DetailActionBar } from "@/components/layout/action-bar";
import useFundingCreateQuery from "@/query/useFundingCreatQuery";
import { CreateFundingDto } from "@/types/CreateFundingDto";

export default function FundingCreationPage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [pub, setPub] = useState<boolean>(true);
  const [endDate, setEndDate] = useState(dayjs());
  const [theme, setTheme] = useState<string>("");
  const [formDataList, setFormDataList] = useState<GiftDto[]>([]);
  const { mutate } = useFundingCreateQuery();

  const CustomButtonGroup = styled(ButtonGroup)({
    marginTop: "15px",
    marginBottom: "15px",
    "& .MuiButton-outlined": {
      borderColor: red[100],
      margin: "5px",
      borderRadius: "20px",
    },
    "& .MuiButton-outlined:hover": {
      borderColor: red[300],
      backgroundColor: red[300],
      color: "#fff",
    },
  });

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    let strVal = inputVal.replaceAll(",", "");
    setAmount(Number(strVal));
  };

  const handlePublicityChange = (isPublic: boolean) => {
    setPub(isPublic);
  };

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    if (date) {
      const endDateToServer: Dayjs = date;
      setEndDate(endDateToServer);
    }
  };

  const handleAddForm = () => {
    const newFormDataList = [
      ...formDataList,
      { giftUrl: "", giftOpt: "", giftCont: "" },
    ];
    setFormDataList(newFormDataList);
  };

  const handleChange = (index: number, key: keyof GiftDto, value: string) => {
    const newFormDataList = [...formDataList];
    newFormDataList[index][key] = value;
    setFormDataList(newFormDataList);
  };

  const body: CreateFundingDto = {
    fundTitle: title,
    fundCont: content,
    fundPubl: pub,
    fundTheme: theme,
    fundGoal: amount,
    endAt: endDate.toDate(),
    fundImg:
      "https://img.danawa.com/prod_img/500000/924/538/img/28538924_1.jpg?_v=20231006030836",
    gifts: formDataList,
  };

  const handleSubmit = () => {
    mutate(body);
  };

  return (
    <>
      <h2>펀딩 개설</h2>
      {/*제목/내용*/}
      <Box>
        <TextField
          fullWidth
          label="제목"
          value={title}
          onChange={handleTitleChange}
        />
        <TextField
          fullWidth
          label="내용"
          multiline
          rows={4}
          margin="normal"
          value={content}
          onChange={handleContChange}
        />
      </Box>

      {/*공개범위*/}
      <ButtonGroup fullWidth>
        {["전체공개", "친구공개"].map((label, index) => (
          <Button
            key={index}
            onClick={() => handlePublicityChange(index === 0)}
            variant={pub === (index === 0) ? "contained" : "outlined"}
          >
            {label}
          </Button>
        ))}
      </ButtonGroup>

      {/*마감기한*/}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DemoItem label="마감기한">
            <DatePicker
              value={endDate}
              onChange={handleEndDateChange}
              disablePast
              views={["year", "month", "day"]}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>

      {/*테마*/}
      <CustomButtonGroup fullWidth>
        {[
          { label: "생일", value: "Birthday" },
          { label: "기념일", value: "Anniversary" },
          { label: "후원", value: "Donation" },
        ].map((themes, index) => (
          <Button key={index} onClick={() => handleThemeChange(themes.value)}>
            {themes.label}
          </Button>
        ))}
      </CustomButtonGroup>

      {/*금액*/}
      <Box marginTop="10px">
        <TextField
          fullWidth
          label="금액"
          type="text"
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            onChange: handleAmountChange,
          }}
          value={addComma(amount) || 0}
        />
      </Box>

      {/*gift item*/}
      <div>
        <h5>ITEMS</h5>
        <Tooltip title="addItem" onClick={handleAddForm}>
          <IconButton>
            <AddBox />
          </IconButton>
        </Tooltip>
        {formDataList.map((formData, index) => (
          <GiftItem
            key={index}
            index={index}
            formData={formData}
            handleChange={handleChange}
          />
        ))}
      </div>
      <DetailActionBar buttonText="작성하기" handleSubmit={handleSubmit} />
    </>
  );
}
