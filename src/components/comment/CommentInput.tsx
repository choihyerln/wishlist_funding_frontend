import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import OutlinedInput from "@mui/material/OutlinedInput";
import useAddComment from "@/query/useAddComment";

interface Props {
  fundUuid: string;
}

export default function CommentInput({ fundUuid }: Props) {
  const [content, setContent] = useState<string>("");
  const { mutate } = useAddComment(fundUuid);

  return (
    <OutlinedInput
      placeholder="댓글 등록"
      endAdornment={
        <InputAdornment position="end" variant="filled">
          <IconButton onClick={() => mutate({ content })}>
            <ArrowCircleUpIcon />
          </IconButton>
        </InputAdornment>
      }
      onChange={(e) => setContent(e.target.value)}
      sx={{ width: "100%", mb: 4 }}
    />
  );
}
