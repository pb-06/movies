import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box } from '@mui/material';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


export const MyCard = ({ backdrop_path, title, overview, release_date, vote_average }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const imageUrl = backdrop_path
        ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
        : "https://via.placeholder.com/300x160?text=No+Image";

    return (
        <Card sx={{ width: 400, display: 'flex', flexDirection: 'column', height: '100%', borderRadius: 4 }}>
            {/* Kép */}
            <CardMedia
                component="img"
                height="200"
                image={imageUrl}
                alt={title}
            />

            {/* Tartalom */}
            <CardContent sx={{ flexGrow: 1, pb: 4 }}>
                {/* Cím */}
                <Typography variant="h5" component="div" noWrap sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                    {title}
                </Typography>

                {/* Leírás - max 3 sor */}
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        mb: 4,
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3, // 3 sor után vág
                    }}
                >
                    {overview || "Nincs elérhető leírás."}
                </Typography>

                {/* Dátum és Értékelés */}
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', mt: 'auto' }}>
                    <Typography
                        variant="body1"
                        sx={{ fontWeight: 'bold', color: 'text.primary', marginBottom: 1 }}
                    >
                        Megjelenés: <span style={{ fontWeight: 'normal' }}>{release_date}</span>
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ fontWeight: 'bold' }}
                    >
                        Értékelés: <span style={{ fontWeight: 'normal' }}>{vote_average?.toFixed(1)} / 10</span>
                    </Typography>
                </Box>
            </CardContent>

            {/* Gomb alul */}
            <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                    size="medium"
                    variant="contained"
                    fullWidth
                    sx={{ textTransform: 'none', borderRadius: 4 }}
                    onClick={handleClickOpen}
                >
                    Adatlap megtekintése
                </Button>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        {title}
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            {overview}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Bezárás
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </CardActions>
        </Card>
    );
};

export default MyCard;