import React from "react";
import SectionTitle from "@/app/(with-navbar)/signup/view/SectionTitle";
import ProfileImageField from "@/app/(with-navbar)/signup/view/input/ProfileImageField";
import BirthdayField from "@/app/(with-navbar)/signup/view/input/BirthdayField";
import AccountField from "@/app/(with-navbar)/signup/view/input/AccountField";

export default function ExtraInfoForm() {
  return (
    <>
      <SectionTitle>추가 정보를 입력해주세요.</SectionTitle>
      <ProfileImageField />
      <BirthdayField />
      <AccountField />
    </>
  );
}
