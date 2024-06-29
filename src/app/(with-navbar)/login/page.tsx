"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Box, Container, IconButton, Link, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Email } from "@mui/icons-material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Logo from "@/components/logo/Logo";
import { TopFixedStack } from "@/components/layout/action-bar/TopFixedStack";
import LoginButton, {
  LoginButtonProps,
} from "@/app/(with-navbar)/login/view/LoginButton";

const LOGIN_PROVIDERS: LoginButtonProps[] = [
  {
    name: "카카오",
    url: "/api/auth/kakao",
    icon: "/images/auth/kakao_logo.png",
    bgColor: "#FDDC3F",
  },
  {
    name: "네이버",
    url: "/api/auth/naver",
    icon: "/images/auth/naver_logo.png",
    bgColor: "#00B819",
    textColor: "#FFF",
  },
  {
    name: "구글",
    url: "/api/auth/google",
    icon: "/images/auth/google_logo.png",
    bgColor: "#FFF",
    border: "1px solid #D2D5D6",
  },
  {
    name: "이메일",
    url: "/login/email",
    icon: <Email />,
    bgColor: "#FFF",
    border: "1px solid #D2D5D6",
  },
];

const Login = () => {
  const router = useRouter();

  return (
    <>
      <TopFixedStack direction="row" alignItems="center">
        <IconButton onClick={() => router.back()}>
          <ArrowBackIosNewIcon />
        </IconButton>
      </TopFixedStack>
      <StyledContainer>
        <Logo textSx={{ fontSize: "36px" }} />
        <Box sx={{ width: "80%" }}>
          {LOGIN_PROVIDERS.map((provider) => (
            <LoginButton key={`login-button-${provider.name}`} {...provider} />
          ))}
        </Box>
        <LinksContainer>
          <Link href="/signup" sx={{ textDecoration: "none" }}>
            <Typography variant="body2">회원가입</Typography>
          </Link>
          <Typography variant="body2">계정 찾기</Typography>
          <Typography variant="body2">문의하기</Typography>
        </LinksContainer>
      </StyledContainer>
    </>
  );
};

export default Login;

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "90vh",
  backgroundColor: "#fff",
  gap: "50px",
}));

const LinksContainer = styled(Box)(({ theme }) => ({
  width: "70%",
  display: "flex",
  justifyContent: "space-between",
  marginTop: "16px",
}));
