import { SvgIcon, SxProps, Theme } from '@mui/material';

type IconProps = {
  color?: string;
  width?: number;
  height?: number;
  sx?: SxProps<Theme>;
};

const IconHistory = ({
  color = '#222222',
  width = 24,
  height = 24,
  sx = {},
}: IconProps) => {
  return (
    <SvgIcon
      id="organized-icon-history"
      sx={{ width: `${width}px`, height: `${height}px`, ...sx }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_2473_21943"
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="25"
        >
          <rect y="0.000488281" width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_2473_21943)">
          <path
            d="M8.05835 16.7697C8.30918 16.7697 8.51921 16.6848 8.68843 16.5152C8.85766 16.3455 8.94228 16.1352 8.94228 15.8844C8.94228 15.6336 8.85743 15.4235 8.68775 15.2543C8.51808 15.0851 8.30783 15.0005 8.057 15.0005C7.80617 15.0005 7.59613 15.0853 7.4269 15.255C7.25768 15.4247 7.17308 15.6349 7.17308 15.8857C7.17308 16.1366 7.25791 16.3466 7.42758 16.5158C7.59726 16.6851 7.80752 16.7697 8.05835 16.7697ZM8.05835 12.8851C8.30918 12.8851 8.51921 12.8002 8.68843 12.6306C8.85766 12.4609 8.94228 12.2506 8.94228 11.9998C8.94228 11.749 8.85743 11.5389 8.68775 11.3697C8.51808 11.2005 8.30783 11.1159 8.057 11.1159C7.80617 11.1159 7.59613 11.2007 7.4269 11.3704C7.25768 11.54 7.17308 11.7503 7.17308 12.0011C7.17308 12.252 7.25791 12.462 7.42758 12.6312C7.59726 12.8005 7.80752 12.8851 8.05835 12.8851ZM8.05835 9.00046C8.30918 9.00046 8.51921 8.91562 8.68843 8.74594C8.85766 8.57627 8.94228 8.36602 8.94228 8.11519C8.94228 7.86436 8.85743 7.65432 8.68775 7.48509C8.51808 7.31586 8.30783 7.23124 8.057 7.23124C7.80617 7.23124 7.59613 7.31608 7.4269 7.48576C7.25768 7.65545 7.17308 7.86571 7.17308 8.11654C7.17308 8.36737 7.25791 8.5774 7.42758 8.74661C7.59726 8.91585 7.80752 9.00046 8.05835 9.00046ZM11.0961 16.6351H16.7884V15.1351H11.0961V16.6351ZM11.0961 12.7504H16.7884V11.2505H11.0961V12.7504ZM11.0961 8.86584H16.7884V7.36586H11.0961V8.86584ZM5.3077 20.5004C4.80257 20.5004 4.375 20.3254 4.025 19.9754C3.675 19.6254 3.5 19.1979 3.5 18.6927V5.30819C3.5 4.80306 3.675 4.37549 4.025 4.02549C4.375 3.67549 4.80257 3.50049 5.3077 3.50049H18.6923C19.1974 3.50049 19.625 3.67549 19.975 4.02549C20.325 4.37549 20.5 4.80306 20.5 5.30819V18.6927C20.5 19.1979 20.325 19.6254 19.975 19.9754C19.625 20.3254 19.1974 20.5004 18.6923 20.5004H5.3077ZM5.3077 19.0005H18.6923C18.7692 19.0005 18.8397 18.9684 18.9038 18.9043C18.9679 18.8402 19 18.7697 19 18.6927V5.30819C19 5.23126 18.9679 5.16073 18.9038 5.09661C18.8397 5.03251 18.7692 5.00046 18.6923 5.00046H5.3077C5.23077 5.00046 5.16024 5.03251 5.09612 5.09661C5.03202 5.16073 4.99997 5.23126 4.99997 5.30819V18.6927C4.99997 18.7697 5.03202 18.8402 5.09612 18.9043C5.16024 18.9684 5.23077 19.0005 5.3077 19.0005Z"
            fill={color}
          />
        </g>
      </svg>
    </SvgIcon>
  );
};

export default IconHistory;