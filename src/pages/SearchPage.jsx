import React, { useState, useEffect, useCallback } from 'react'
import { PageLayout } from '../components/PageLayout'
import { Grid, TextField, Button, Box, Tabs, Tab } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { MyCard } from '../components/MyCard'
import { MySpinner } from '../components/MySpinner'
import { base_url } from '../utils'

export const SearchPage = () => {
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const [trigger, setTrigger] = useState(false);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const fetchSearch = useCallback(async () => {
    if (!searchText || searchText.trim().length <= 2) return;

    setLoading(true);

    try {
      const searchType = type === 0 ? "movie" : "tv";

      const url = `${base_url}search/${searchType}?api_key=${apiKey}&query=${searchText}&page=${page}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Hálózati hiba");

      const data = await response.json();

      setContent(data.results || []);
      setNumOfPages(data.total_pages || 0);

      setTrigger(true);

    } catch (error) {
      console.error("Keresési hiba:", error);
      setContent([]);
      
      setTrigger(true);
    } finally {
      setLoading(false);
    }
  }, [type, page, searchText, apiKey]);

  useEffect(() => {
    if (trigger && searchText.length > 2) {
      fetchSearch();
    }
  }, [type, page]);

  const handleManualSearch = () => {
    setPage(1);
    fetchSearch();
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);

    setTrigger(false);
  };

  return (
    <PageLayout title="Search" page={page} setPage={setPage} numOfPages={numOfPages}>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, gap: 1 }}>
        <TextField
          fullWidth
          variant="filled"
          label="Keresés..."
          value={searchText}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleManualSearch();
            }
          }}
          sx={{ maxWidth: '600px', backgroundColor: 'white', borderRadius: 1 }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleManualSearch}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Tabs
          value={type}
          onChange={(e, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          indicatorColor="secondary"
          textColor="inherit"
        >
          <Tab label="Search Movies" />
          <Tab label="Search TV Series" />
        </Tabs>
      </Box>

      {isLoading ? (
        <MySpinner />
      ) : (
        <Grid container spacing={2} justifyContent='center'>
          {content && content.map((obj) => (
            <Grid item key={obj.id}>
              <MyCard
                backdrop_path={obj.backdrop_path || obj.poster_path}
                title={obj.title || obj.name}
                overview={obj.overview}
                release_date={obj.release_date || obj.first_air_date}
                vote_average={obj.vote_average}
              />
            </Grid>
          ))}

          {content.length === 0 && trigger && !isLoading && (
            <p style={{ textAlign: 'center', width: '100%', marginTop: '20px' }}>
              Nincs találat!
            </p>
          )}
        </Grid>
      )}

    </PageLayout>
  )
}