import { SvgIcon, SxProps, Theme } from '@mui/material';

type IconProps = {
  color?: string;
  width?: number;
  height?: number;
  sx?: SxProps<Theme>;
  className?: string;
};

const IconS21Page = ({
  color = '#222222',
  width = 24,
  height = 24,
  sx = {},
  className,
}: IconProps) => {
  return (
    <SvgIcon
      className={`organized-icon-s21-page ${className}`}
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
          id="mask0_3437_99781"
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="25"
        >
          <rect y="0.000488281" width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_3437_99781)">
          <path
            d="M18 18.0582C18.4166 18.0582 18.7708 17.9123 19.0625 17.6207C19.3541 17.329 19.5 16.9748 19.5 16.5582C19.5 16.1415 19.3541 15.7873 19.0625 15.4957C18.7708 15.204 18.4166 15.0582 18 15.0582C17.5833 15.0582 17.2291 15.204 16.9375 15.4957C16.6458 15.7873 16.5 16.1415 16.5 16.5582C16.5 16.9748 16.6458 17.329 16.9375 17.6207C17.2291 17.9123 17.5833 18.0582 18 18.0582ZM18 21.0582C18.5 21.0582 18.9666 20.9415 19.4 20.7082C19.8333 20.4748 20.1916 20.1498 20.475 19.7332C20.0916 19.4998 19.6916 19.329 19.275 19.2207C18.8583 19.1123 18.4333 19.0582 18 19.0582C17.5666 19.0582 17.1416 19.1123 16.725 19.2207C16.3083 19.329 15.9083 19.4998 15.525 19.7332C15.8083 20.1498 16.1666 20.4748 16.6 20.7082C17.0333 20.9415 17.5 21.0582 18 21.0582ZM5.3077 20.5004C4.80898 20.5004 4.38302 20.3238 4.02982 19.9706C3.67661 19.6174 3.5 19.1915 3.5 18.6927V5.30819C3.5 4.80947 3.67661 4.38351 4.02982 4.03031C4.38302 3.6771 4.80898 3.50049 5.3077 3.50049H18.6923C19.191 3.50049 19.6169 3.6771 19.9701 4.03031C20.3233 4.38351 20.5 4.80947 20.5 5.30819V11.6331C20.2538 11.528 20.0073 11.4389 19.7605 11.3659C19.5137 11.2928 19.2602 11.2344 19 11.1909V5.30819C19 5.23126 18.9679 5.16073 18.9038 5.09661C18.8397 5.03251 18.7692 5.00046 18.6923 5.00046H5.3077C5.23077 5.00046 5.16024 5.03251 5.09612 5.09661C5.03202 5.16073 4.99997 5.23126 4.99997 5.30819V18.6927C4.99997 18.7697 5.03202 18.8402 5.09612 18.9043C5.16024 18.9684 5.23077 19.0005 5.3077 19.0005H11.1654C11.2025 19.2774 11.2577 19.5392 11.3307 19.786C11.4038 20.0328 11.4929 20.271 11.5981 20.5004H5.3077ZM4.99997 19.0005V5.00046V11.1909V11.1159V19.0005ZM7.25 16.6351H11.2673C11.3109 16.3748 11.3756 16.1213 11.4615 15.8745C11.5474 15.6277 11.641 15.3812 11.7423 15.1351H7.25V16.6351ZM7.25 12.7504H13.5904C14.0212 12.3851 14.4808 12.079 14.9692 11.8322C15.4577 11.5854 15.9807 11.4101 16.5384 11.3062V11.2505H7.25V12.7504ZM7.25 8.86584H16.75V7.36586H7.25V8.86584ZM18 22.5581C16.7513 22.5581 15.6891 22.1203 14.8135 21.2447C13.9378 20.369 13.5 19.3069 13.5 18.0582C13.5 16.8094 13.9378 15.7473 14.8135 14.8716C15.6891 13.996 16.7513 13.5582 18 13.5582C19.2487 13.5582 20.3109 13.996 21.1865 14.8716C22.0621 15.7473 22.5 16.8094 22.5 18.0582C22.5 19.3069 22.0621 20.369 21.1865 21.2447C20.3109 22.1203 19.2487 22.5581 18 22.5581Z"
            fill={color}
          />
        </g>
      </svg>
    </SvgIcon>
  );
};

export default IconS21Page;