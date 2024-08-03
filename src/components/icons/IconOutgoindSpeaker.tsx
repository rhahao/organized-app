import { SvgIcon, SxProps, Theme } from '@mui/material';

type IconProps = {
  color?: string;
  width?: number;
  height?: number;
  sx?: SxProps<Theme>;
};

const IconOutgoindSpeaker = ({
  color = '#222222',
  width = 24,
  height = 24,
  sx = {},
}: IconProps) => {
  return (
    <SvgIcon
      id="organized-icon-outgoind-speaker"
      sx={{ width: `${width}px`, height: `${height}px`, ...sx }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.72184 21.998L9.83144 27.2035C10.0878 27.5282 10.0324 27.9992 9.70767 28.2555C9.38299 28.5118 8.91199 28.4564 8.65566 28.1318L3.69474 21.8479C3.26388 21.3022 3.65261 20.5 4.34795 20.5H27.652C28.3474 20.5 28.7361 21.3022 28.3052 21.8479L23.3443 28.1318C23.088 28.4564 22.617 28.5118 22.2923 28.2555C21.9676 27.9992 21.9122 27.5282 22.1685 27.2035L26.2781 21.998H5.72184Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.8144 6.56729C12.1381 5.55463 13.4151 3.58447 16.0315 3.58447C18.6386 3.58447 19.9636 5.54219 20.3153 6.54697C20.3482 6.64089 20.3618 6.73386 20.3618 6.82104V9.91621C20.3618 10.1052 20.2975 10.2885 20.1794 10.4361L18.5896 12.4234V12.7221L24.0028 15.8056C24.2626 15.9536 24.4231 16.2296 24.4231 16.5287V18.954C24.4231 19.3677 24.0877 19.703 23.6741 19.703C23.2604 19.703 22.925 19.3677 22.925 18.954V16.9157L17.5119 13.8323C17.2521 13.6842 17.0916 13.4082 17.0916 13.1091V12.1898C17.0916 12.0009 17.1559 11.8175 17.274 11.6699L18.8638 9.68266V6.94337C18.5845 6.26661 17.6897 5.0825 16.0315 5.0825C14.3756 5.0825 13.5257 6.26495 13.2731 6.93243V9.70472L14.7049 11.7026C14.8062 11.8439 14.8607 12.0135 14.8607 12.1874V13.1094C14.8607 13.4068 14.7019 13.6817 14.4443 13.8303L9.10106 16.9129V18.954C9.10106 19.3677 8.76571 19.703 8.35204 19.703C7.93837 19.703 7.60303 19.3677 7.60303 18.954V16.5284C7.60303 16.231 7.76175 15.9562 8.01938 15.8075L13.3626 12.7249V12.4013L11.9308 10.4035C11.8295 10.2621 11.7751 10.0926 11.7751 9.91866V6.81989C11.7751 6.73986 11.7865 6.65441 11.8144 6.56729ZM16.0315 14.8452C16.4452 14.8452 16.7805 15.1806 16.7805 15.5942V18.954C16.7805 19.3677 16.4452 19.703 16.0315 19.703C15.6179 19.703 15.2825 19.3677 15.2825 18.954V15.5942C15.2825 15.1806 15.6179 14.8452 16.0315 14.8452Z"
          fill={color}
        />
        <path
          d="M17.3857 28.0094V23.6422C17.3857 23.4761 17.5764 23.3824 17.7079 23.4838L20.5388 25.6674C20.6426 25.7475 20.6426 25.9041 20.5388 25.9842L17.7079 28.1678C17.5764 28.2692 17.3857 28.1755 17.3857 28.0094Z"
          fill={color}
        />
        <path
          d="M11.2558 25.8256C11.2558 25.4146 11.5889 25.0815 11.9999 25.0815H17.7639C18.1749 25.0815 18.5081 25.4146 18.5081 25.8256C18.5081 26.2366 18.1749 26.5697 17.7639 26.5697H11.9999C11.5889 26.5697 11.2558 26.2366 11.2558 25.8256Z"
          fill={color}
        />
      </svg>
    </SvgIcon>
  );
};

export default IconOutgoindSpeaker;