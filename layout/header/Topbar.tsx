import {
  AppBar,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  Zoom,
  useScrollTrigger,
} from "@mui/material";
import React, { FunctionComponent } from "react";
import { Call } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import MenuCoin from "@/layout/header/MenuCoin";
import { useAppSelector, useAppDispatch } from "@/hooks/useStore";
import { getLanguage, toggleLanguage } from "@/store/languageSlice";
import { ClientStorage } from "@/hooks/useLocalStroge";
import IsAuthPages from "@/hooks/auth/useIsAuthPages";

interface PropsComponent {
  IsLogin?:boolean
}
const Topbar: FunctionComponent<PropsComponent> = ({IsLogin = true}) => {
  const { t } = useTranslation();
  const router = useRouter();

  const language = useAppSelector(getLanguage);
  const dispatch = useAppDispatch();

  const changeLanguage = () => {
    switch (language) {
      case "en":
        dispatch(toggleLanguage("ar"));
        ClientStorage.set("language", "ar");
        break;
      case "ar":
        dispatch(toggleLanguage("en"));
        ClientStorage.set("language", "en");

        break;
    }
  };

  return (
    <HideOnScroll>
      <AppBar
        sx={{
          flexGrow: 1,
          backgroundColor: "body.main",
          color: "body.light",
          boxShadow: "unset !important",
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            sx={{ py: 0.5 }}
          >
            <Grid item xs={6} sx={{ pl: "unset !important" }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Call />
                <Typography variant="h3">19341</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1.5}
                justifyContent="end"
              >
                <MenuCoin />
                <Button
                  variant="text"
                  onClick={changeLanguage}
                  sx={{
                    fontFamily: "Cairo , sans-serif",
                    color: "body.light",
                    fontWeight: 500,
                  }}
                >
                  {t("العربيه")}
                </Button>
                {
                  IsLogin ? (

                    <Button
                    variant="contained"
                    onClick={() => router.push("/login")}
                    >
                  {t("Logout")}
                </Button>
                  ):(
                    <Button
                    variant="contained"
                    onClick={() => router.push("/")}
                    >
                  {t("Sign in")}
                </Button>

                  )
                }
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Topbar;

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    threshold: 0,
    target: window ? window() : undefined,
  });

  return (
    <Zoom appear={false} in={IsAuthPages() ? true : !trigger}>
      {children}
    </Zoom>
  );
}
