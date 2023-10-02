import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useDashboard from './useDashboard';
import { MenuCard } from './components';

const DashboardMenu = () => {
  const { dashboardMenus } = useDashboard();

  return (
    <Box>
      <Grid container spacing={2}>
        {dashboardMenus.map((menu) => (
          <MenuCard key={`menu-item-${menu.title}`} menu={menu} />
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardMenu;
