import { SvgIcon, SxProps, Theme } from '@mui/material';

type IconProps = {
  color?: string;
  width?: number;
  height?: number;
  sx?: SxProps<Theme>;
  className?: string;
};

const IconPersonSearch = ({
  color = '#222222',
  width = 24,
  height = 24,
  sx = {},
  className,
}: IconProps) => {
  return (
    <SvgIcon
      className={`organized-icon-person-search ${className}`}
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
          id="mask0_5245_188733"
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="25"
        >
          <rect y="0.000488281" width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_5245_188733)">
          <path
            d="M11 11.6928C10.0375 11.6928 9.21354 11.3501 8.52813 10.6647C7.84271 9.97928 7.5 9.15533 7.5 8.19285C7.5 7.23035 7.84271 6.4064 8.52813 5.721C9.21354 5.03558 10.0375 4.69287 11 4.69287C11.9625 4.69287 12.7864 5.03558 13.4718 5.721C14.1572 6.4064 14.5 7.23035 14.5 8.19285C14.5 9.15533 14.1572 9.97928 13.4718 10.6647C12.7864 11.3501 11.9625 11.6928 11 11.6928ZM11 10.1928C11.55 10.1928 12.0208 9.99701 12.4125 9.60535C12.8041 9.21368 13 8.74285 13 8.19285C13 7.64285 12.8041 7.17201 12.4125 6.78035C12.0208 6.38868 11.55 6.19285 11 6.19285C10.45 6.19285 9.97914 6.38868 9.58747 6.78035C9.19581 7.17201 8.99997 7.64285 8.99997 8.19285C8.99997 8.74285 9.19581 9.21368 9.58747 9.60535C9.97914 9.99701 10.45 10.1928 11 10.1928ZM21.6576 22.712L18.7269 19.7812C18.3897 19.9941 18.0339 20.1607 17.6596 20.2812C17.2852 20.4018 16.8994 20.462 16.502 20.462C15.3981 20.462 14.4615 20.0767 13.6923 19.3059C12.9231 18.5352 12.5385 17.5993 12.5385 16.4982C12.5385 15.3972 12.9238 14.4621 13.6946 13.6928C14.4653 12.9236 15.4012 12.539 16.5022 12.539C17.6033 12.539 18.5384 12.9242 19.3077 13.6945C20.0769 14.4648 20.4615 15.4001 20.4615 16.5005C20.4615 16.8992 20.4012 17.2858 20.2807 17.6601C20.1602 18.0345 19.9935 18.3903 19.7807 18.7274L22.7115 21.6582L21.6576 22.712ZM16.5 18.962C17.1936 18.962 17.7772 18.7252 18.2509 18.2515C18.7246 17.7778 18.9615 17.1941 18.9615 16.5005C18.9615 15.8069 18.7246 15.2233 18.2509 14.7496C17.7772 14.2759 17.1936 14.039 16.5 14.039C15.8064 14.039 15.2227 14.2759 14.749 14.7496C14.2753 15.2233 14.0385 15.8069 14.0385 16.5005C14.0385 17.1941 14.2753 17.7778 14.749 18.2515C15.2227 18.7252 15.8064 18.962 16.5 18.962ZM3.5 19.3082V17.1005C3.5 16.6044 3.63045 16.1483 3.89135 15.7322C4.15225 15.3162 4.51026 14.9928 4.96537 14.7621C5.75127 14.3672 6.69839 14.0166 7.80672 13.7101C8.91506 13.4037 10.1288 13.2762 11.4481 13.3275C11.2994 13.5634 11.1703 13.8062 11.0608 14.0561C10.9513 14.306 10.8644 14.565 10.8 14.8332C9.70386 14.846 8.70642 14.9912 7.8077 15.2688C6.90897 15.5463 6.19614 15.8236 5.66922 16.1005C5.45767 16.2031 5.29325 16.3437 5.17595 16.5223C5.05863 16.7009 4.99997 16.8937 4.99997 17.1005V17.8082H10.6846C10.7423 18.0723 10.8212 18.3309 10.9211 18.5841C11.0211 18.8373 11.1391 19.0787 11.275 19.3082H3.5Z"
            fill={color}
          />
        </g>
      </svg>
    </SvgIcon>
  );
};

export default IconPersonSearch;