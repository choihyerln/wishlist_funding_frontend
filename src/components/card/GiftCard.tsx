import React from "react";
import Link from "next/link";
import { grey } from "@mui/material/colors";
import { Stack, Typography } from "@mui/material";
import { CoverImage } from "@/components/image";

interface Props {
  title: string;
  image: string;
  option: string;
  content: string;
  url: string;
}

export default function GiftCard({
  title,
  image,
  option,
  content,
  url,
}: Props) {
  return (
    <Link href={url} style={{ textDecoration: "none" }}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="flex-start"
        sx={{
          border: "1px solid #e2e2e2",
          p: "10px",
          borderRadius: "5px",
          marginTop: "10px",
        }}
      >
        <CoverImage
          src={image}
          alt={title}
          parentDivStyle={{ width: "100px", height: "100px" }}
        />
        <Stack
          id="content"
          justifyContent="space-between"
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "calc(100% - 120px)",
            paddingY: "4px",
          }}
        >
          <Stack direction="column">
            <Typography
              variant="body1"
              component="div"
              fontWeight="bold"
              color={grey[800]}
              margin="none"
            >
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" margin="none">
              {option}
            </Typography>
          </Stack>
          <Typography variant="body2" color={grey[600]}>
            {content}
          </Typography>
        </Stack>
      </Stack>
    </Link>
  );
}
