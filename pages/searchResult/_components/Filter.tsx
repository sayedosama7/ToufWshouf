import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { SelectChangeEvent } from '@mui/material/Select';

import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
interface Props {}
const FilterSearch: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const [select, setSelect] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelect(event.target.value as string);
  };

  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5">{t("Filter your results")}</Typography>
        <Button variant="text" sx={{ color: "primary.main" }}>
          {t("Reset")}
        </Button>
      </Stack>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        sx={{ mt: 3 }}
      >
        <FormControl sx={{ width: "100%" }} variant="outlined">
          <Select
            id="start"
            sx={{ backgroundColor: "body.light" }}
            fullWidth
            displayEmpty
            input={<OutlinedInput />}
            value={select}
            onChange={handleChange}
            placeholder="Rate"
            renderValue={(selected: any) => {
              if (selected.length === 0) {
                return <span style={{ color: "#B7B7B7" }}>Rate</span>;
              }

              return selected.join(", ");
            }}
            startAdornment={
              <InputAdornment position="start" sx={{ color: "main.lightGray" }}>
                <StarHalfRoundedIcon />
              </InputAdornment>
            }
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: "100%" }} variant="outlined">
          <Select
            id="Trip type"
            sx={{ backgroundColor: "body.light" }}
            fullWidth
            displayEmpty
            input={<OutlinedInput />}
            value={select}
            onChange={handleChange}
            placeholder="Trip type"
            renderValue={(selected: any) => {
              if (selected.length === 0) {
                return <span style={{ color: "#B7B7B7" }}>Trip type</span>;
              }

              return selected.join(", ");
            }}
            startAdornment={
              <InputAdornment position="start" sx={{ color: "main.lightGray" }}>
                <WidgetsRoundedIcon />
              </InputAdornment>
            }
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Typography variant="body2" sx={{ color: "main.payment", mb: 1 }}>
              {t("Price from")}
            </Typography>
            <TextField id="outlined-basic" variant="outlined" fullWidth type="number" />
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: "main.payment", mb: 1 }}>
              {t("To")}
            </Typography>

            <TextField id="outlined-basic" variant="outlined" fullWidth  type="number"  />
          </Box>
        </Stack>
      </Stack>
      <Button variant="contained" fullWidth sx={{ mt: 8 }} size="large" >
        {t("Search")}
      </Button>
    </Paper>
  );
};

export default FilterSearch;
