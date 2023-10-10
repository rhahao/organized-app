import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useMenuCard from './useMenuCard';

const MenuCard = ({ menu }) => {
  const { title, links, visible, handleAction, theme } = useMenuCard({ menu });

  return (
    <>
      {visible && (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Paper elevation={8}>
            <Box sx={{ padding: '10px', backgroundColor: theme.mainColor, borderRadius: '10px 10px 0 0' }}>
              <Typography textAlign="center" sx={{ color: 'white', fontSize: '20px' }}>
                {title}
              </Typography>
            </Box>
            <Box
              sx={{
                padding: '10px',
                height: '280px',
                maxHeight: '280px',
                overflow: 'auto',
                borderTop: 'none',
              }}
            >
              <List>
                {links.map((link) => (
                  <Box key={`menu-child-${link.title}`}>
                    {link.visible && (
                      <ListItem disablePadding>
                        <ListItemButton onClick={() => handleAction(link)}>
                          <ListItemIcon>{link.icon}</ListItemIcon>
                          <ListItemText primary={link.title} />
                        </ListItemButton>
                      </ListItem>
                    )}
                  </Box>
                ))}
              </List>
            </Box>
          </Paper>
        </Grid>
      )}
    </>
  );
};

MenuCard.propTypes = {
  menu: PropTypes.object,
};

export default MenuCard;
