import { useState, useEffect, useRef, useCallback } from "react";
import { Grid, Card, CardContent, Typography, Container, Box } from "@mui/material";
import { listChapters } from "./utils/api";
import { data } from "./data";

function App() {
  const [quran, setQuran] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(null);
  const [highlightedVerseIndex, setHighlightedVerseIndex] = useState(0);

  const surahRef = useRef();

  useEffect(() => {
    const fetchWholeQuranAsync = async () => {
      // const wholeQuran = await fetchWholeQuran();
      const fetchChapters = await listChapters();
      setChapters(fetchChapters);
      setQuran(data);
    };

    fetchWholeQuranAsync();
  }, []);

  const handleChapterClick = (index) => {
    setCurrentChapterIndex(index);
    setHighlightedVerseIndex(0);
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        if (highlightedVerseIndex < quran.surahs[currentChapterIndex].ayahs.length - 1) {
          setHighlightedVerseIndex((prevIndex) => prevIndex + 1);
          if (surahRef.current) {
            surahRef.current.scrollTop = 0;
          }
        } else {
          if (currentChapterIndex < quran.surahs.length - 1) {
            setCurrentChapterIndex((prevIndex) => prevIndex + 1);
            setHighlightedVerseIndex(0);
          }
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (highlightedVerseIndex > 0) {
          setHighlightedVerseIndex((prevIndex) => prevIndex - 1);
          if (surahRef.current) {
            surahRef.current.scrollTop = 0;
          }
        } else {
          if (currentChapterIndex > 0) {
            const prevIndex = currentChapterIndex - 1;
            setCurrentChapterIndex((prevIndex) => prevIndex - 1);
            setHighlightedVerseIndex(quran.surahs[prevIndex].ayahs.length - 1);
            // scroll to the bottom
            if (surahRef.current) {
              console.log("comong here....", surahRef.current.scrollHeight);

              surahRef.current.scrollTop = -100000;
            }
          }
        }
      }
    },
    [currentChapterIndex, highlightedVerseIndex, quran]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  console.log("🚀 ~ App ~ currentChapterIndex:", currentChapterIndex);
  console.log("🚀 ~ App ~ quran.surahs[currentChapterIndex].ayahs:", quran?.surahs?.[currentChapterIndex]?.ayahs);

  if (!quran) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {currentChapterIndex === null && (
        <Container maxWidth="xl">
          <Grid container gap={2} justifyContent="center" py={2}>
            {chapters.map((chapter, index) => (
              <Grid
                item
                key={chapter.id}
                xs={12}
                sm={6}
                md={3}
                component={Card}
                onClick={() => handleChapterClick(index)}
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between">
                    <div className="surah_number">
                      <span>{index + 1}</span>
                    </div>
                    <Box display="flex" flexDirection="column" alignItems="center">
                      <Typography variant="h3" className="surah_names" textAlign="center">
                        {String(chapter.id).padStart(3, "0")}
                        surah
                      </Typography>
                      <Typography variant="body2" className="mehr-nastaliq">
                        {chapter.verses_count} آیات - {chapter.revelation_place === "makkah" ? "Makki" : "Madni"}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    {chapter.name_simple} <span className="mehr-nastaliq">({chapter.translated_name.name})</span>
                  </Typography>
                </CardContent>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
      {currentChapterIndex !== null && (
        <>
          <div>
            <h1 className="surah-names">{quran.surahs[currentChapterIndex].name}</h1>
            <p>Juz: {quran.surahs[currentChapterIndex].juz}</p>
            <p>Verses: {quran.surahs[currentChapterIndex].ayahs.length}</p>
          </div>
          <div ref={surahRef} tabIndex={0}>
            {/* .slice((currentPage - 1) * linesPerPage, (currentPage - 1) * linesPerPage + linesPerPage) */}
            {quran.surahs[currentChapterIndex].ayahs.map((verse, index) => (
              <Typography
                key={index}
                style={{
                  background: index === highlightedVerseIndex ? "yellow" : "transparent",
                }}
              >
                {verse.text}
              </Typography>
            ))}
          </div>
          {/* <div>
            <Pagination
              count={Math.ceil(quran.surahs[currentChapterIndex].ayahs.length / linesPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div> */}
        </>
      )}
    </>
  );
}

export default App;
