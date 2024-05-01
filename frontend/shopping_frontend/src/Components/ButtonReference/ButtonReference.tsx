import { useNavigate } from 'react-router-dom';
import React from 'react';
interface ButtonReferenceProps {
  reference: string;
  text: string;
  props: any;
}

const ButtonReference: React.FC<ButtonReferenceProps> = ({
  reference,
  text,
  props,
}) => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate(`${reference}`, { state: props });
  };

  return <button onClick={redirect}>{text}</button>;
};
export default ButtonReference;
