import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

const ChapterList = ({ chapters, onChapterClick }) => {
  return (
    <div>
      <h2>Chapters</h2>
      <List component="nav" sx={{ listStyle: "decimal", pl: 4 }}>
        {chapters.map((chapter) => (
          <ListItem key={chapter.id} onClick={() => onChapterClick(chapter.id)} sx={{ display: "list-item" }}>
            <ListItemText primary={`${chapter.name_arabic} (${chapter.verses_count})`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ChapterList;
