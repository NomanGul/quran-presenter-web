import React from "react";
import { Typography } from "@mui/material";

const FixedHeader = ({ surahName, juzNumber, verseNumber }) => {
  return (
    <div>
      <Typography variant="h4">{surahName}</Typography>
      <Typography variant="h6">Juz {juzNumber}</Typography>
      <Typography variant="subtitle1">Verse {verseNumber}</Typography>
    </div>
  );
};

export default FixedHeader;
