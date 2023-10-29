import React, { useState, useEffect, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import TextField from '@mui/material/TextField';
import searchIcon from '../../Assets/Search/search.svg';
import { useNavigate, useLocation } from "react-router-dom";
import MovieSearchCard from "../MovieSearchCard/MovieSearchCard";
import { AUTH_TOKEN } from "../../helpers/helpers";

const pages = [
  {
    name: 'Movies',
    to: "movies"
  },
  {
    name: 'TV',
    to: "tv"
  },
]
const settings = ['Profile', 'Logout', "Create Movie"];


const Header = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [genres, setGenres] = useState({});
  const inputRef = useRef(null);
  const location = useLocation();



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
      if (anchorElNav && !anchorElNav.contains(event.target)) {
        handleCloseNavMenu();
      }
      if (anchorElUser && !anchorElUser.contains(event.target)) {
        handleCloseUserMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [anchorElNav, anchorElUser, inputRef]);
  


  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    };
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        const genres = {};
        response.genres.forEach((genre) => {
          genres[genre.id] = genre.name;
        });
        setGenres(genres);
      })
      .catch((err) => console.error(err));
  }, []);
  
    useEffect(() => {
    setSearchOpen(false);
    setSearchData(null);
  }, [location.pathname]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleSearchIconClick = (event) => {
    if(isSearchOpen === false) {
      setSearchOpen(true);
    } else {
      try{
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTJkZGMzMDQxNzhhNzRmYzJmM2VhZTBkNjFjZjRhNiIsInN1YiI6IjY0ZjYwMWE1ZTBjYTdmMDEyZWI0YTQyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nZyLiOf8OSawJuRNcNysdqymZRozN43fWndBy3zdfhs'
          }
        };
        
        fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`, options)
          .then(response => response.json())
          .then(response => setSearchData(response))
          .catch(err => console.error(err));
      } catch (e){
        console.error(e);
      }
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setSearchOpen(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setSearchOpen(false);
  };

  const onNavigate = (to) => {
    handleCloseNavMenu();
    navigate(to);
  }

  const handleCreateMovieClick = () => {
    navigate('/create-movie');
  };

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: '#111111', height: '70px' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="body1"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                '@media (max-width: 992px)': {
                  fontSize: "17px",
                },
                '@media (max-width: 480px)': {
                  fontSize: "13px",
                }
              }}
            >
              CEVCODE
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={() => onNavigate(page.to)}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                '@media (max-width: 992px)': {
                  fontSize: "17px",
                },
                '@media (max-width: 480px)': {
                  fontSize: "13px",
                },
              }}
            >
              CEVCODE
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => onNavigate(page.to)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
            <Box ref={inputRef} sx={{ display: 'flex', alignItems: 'center', position: "relative", paddingTop: "10px" }}>
            {isSearchOpen && (
              <TextField
                id="filled-search"
                label="Search field"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="filled"
                fullWidth
                sx={{ backgroundColor: '#ffffff', color: '#000000',}}
              />
            )}

            <IconButton className="search-icon" onClick={handleSearchIconClick}>
              <img src={searchIcon} alt="Search" />
            </IconButton>
            <Box
              sx={{
                position: 'absolute',
                width: "100%",
                top: '65px',
                right: '0px',
                zIndex: 9999,
                maxHeight: '400px',
                overflowY: 'scroll',
                scrollbarWidth: 'thin',
                background: "#FFFFFF",
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                },
              }}>
            {isSearchOpen && searchData && searchData.results && searchData.results.length > 0 && (
              searchData.results.map((movie, index) => (
                <MovieSearchCard movie={movie} key={index} genres={genres} voteAverage={movie.vote_average} sx={{ display: "flex" }} />
              ))
            )}
            </Box>
          </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={setting === 'Create Movie' ? handleCreateMovieClick : handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>

  );
};

export default Header;