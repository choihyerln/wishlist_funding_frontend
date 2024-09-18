"use client";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IconButton, Link } from "@mui/material";
import { ArrowBackIosNew as ArrowBackIosNewIcon } from "@mui/icons-material";
import { CreateUserForm, UpdateUserDto, UserDto } from "@/types/User";
import { TopFixedStack } from "@/components/layout/action-bar/TopFixedStack";
import {
  Container,
  FormContainer,
  NextButton,
} from "@/app/(with-navbar)/signup/styles";
import RequiredInfoForm from "@/app/(with-navbar)/signup/oauth/view/RequiredInfoForm";
import ExtraInfoForm from "@/app/(with-navbar)/signup/oauth/view/ExtraInfoForm";
import useUpdateSignUpUser from "@/query/useUpdateSignUpUser";
import { useCookie } from "@/hook/useCookie";
import useAddAccount from "@/query/useAddAccount";
import { CreateAccountDto } from "@/types/Account";

const DEFAULT_CREATE_USER_DTO: CreateUserForm = {
  userEmail: "",
  userPw: "",
  userName: "",
  userNick: "",
  userPhone: "",
};

const USER_DEFAULT_IMG_ID = 24;

export default function OAuthSignUpPage() {
  const methods = useForm<CreateUserForm>({
    defaultValues: DEFAULT_CREATE_USER_DTO,
  });

  const user = useCookie<UserDto>("user");

  useEffect(() => {
    if (user) {
      methods.reset({
        userName: user.userName,
        userNick: user.userNick,
        userPhone: user.userPhone,
        userImg: user.userImg,
        userBirth: user.userBirth ?? new Date(),
      });
    }
  }, [user, methods]);

  const { handleSubmit } = methods;

  const { mutate: updateUser } = useUpdateSignUpUser();
  const { mutateAsync: registerAccount } = useAddAccount();

  const onSubmit = async (data: CreateUserForm) => {
    let {
      userPw,
      userName,
      userNick,
      userPhone,
      userBirth,
      userAccBank,
      userAccNum,
      userImg,
      defaultImgId,
    } = data;

    try {
      if (userAccBank && userAccNum && user?.userId) {
        await createAccount({
          userId: user?.userId,
          bank: userAccBank,
          accNum: userAccNum,
        });
      }

      if (!userImg) {
        defaultImgId = USER_DEFAULT_IMG_ID;
      }

      const dto: UpdateUserDto = {
        userNick,
        userPw,
        userName,
        userPhone,
        userBirth,
        userImg,
        defaultImgId,
      };

      updateUser(dto);
    } catch (error) {
      console.error("OAuth 회원가입 에러 발생", error);
    }
  };

  const createAccount = async (dto: CreateAccountDto): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      registerAccount(dto, {
        onSuccess: (accId: number) => resolve(accId),
        onError: (error) => reject(error),
      });
    });
  };

  return (
    <FormProvider {...methods}>
      <form>
        <Container>
          <TopFixedStack direction="row" alignItems="center">
            <Link href="/login" sx={{ textDecoration: "none" }}>
              <IconButton>
                <ArrowBackIosNewIcon />
              </IconButton>
            </Link>
          </TopFixedStack>
          <FormContainer>
            <RequiredInfoForm />
            <ExtraInfoForm />
            <NextButton
              variant="contained"
              color="secondary"
              onClick={handleSubmit(onSubmit)}
              fullWidth
            >
              완료
            </NextButton>
          </FormContainer>
        </Container>
      </form>
    </FormProvider>
  );
}
