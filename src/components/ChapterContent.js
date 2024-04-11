import React from "react";
import { Typography } from "@mui/material";

const ChapterContent = ({ verses }) => {
  return (
    <div>
      <h2>Chapter Content</h2>
      {verses.map((verse) => (
        <Typography key={verse.id} variant="body1" gutterBottom>
          {verse.text}
        </Typography>
      ))}
    </div>
  );
};

export default ChapterContent;
