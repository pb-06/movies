import React, { useEffect, useState } from 'react';
import { Stack, CircularProgress } from '@mui/material';
import { getGenres } from '../utils';
import { SingleChip } from './SingleChip';

export const Genres = ({ type, selectedGenres, setSelectedGenres, setPage }) => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getGenres({ queryKey: ['genres', type] })
            .then((data) => {
                setGenres(data.genres || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [type]);

    const handleToggle = (id) => {
        if (selectedGenres.includes(id)) {
            setSelectedGenres(selectedGenres.filter((genreId) => genreId !== id));
        } else {
            setSelectedGenres([...selectedGenres, id]);
        }
        setPage(1);
    };

    if (loading) return <CircularProgress color="secondary" size={20} sx={{ display: 'block', mx: 'auto' }} />;

    return (
        <Stack direction="row" flexWrap="wrap" justifyContent="center" sx={{ mb: 2, gap: 1, maxWidth: 1000, mx: 'auto' }}>
            {genres.map((genre) => (
                <SingleChip
                    key={genre.id}
                    id={genre.id}
                    label={genre.name}
                    selected={selectedGenres.includes(genre.id)}
                    onToggle={() => handleToggle(genre.id)}
                />
            ))}
        </Stack>
    );
};

export default Genres;