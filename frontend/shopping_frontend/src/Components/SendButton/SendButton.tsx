import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

interface SendButtonProps {
  text?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const SendButton: React.FC<SendButtonProps> = ({ text, disabled, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      children={text}
      endIcon={<SendIcon />}
      disabled={disabled}
    ></Button>
  );
};

export default SendButton;
