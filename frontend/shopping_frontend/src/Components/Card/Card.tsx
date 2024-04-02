import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
interface BasicCardProps {
  reference: string;
  title: string;
  description?: string;
  image: string;
}

const BasicCard: React.FC<BasicCardProps> = ({
  reference,
  title,
  description,
  image,
}) => {
  return (
    <Link
      to={`${reference}`}
      style={{ textDecoration: 'none', textAlign: 'center' }}
    >
      <Card sx={{ minWidth: 345, maxWidth: 345, maxHeight: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            image={image}
            alt={image}
            style={{ objectFit: 'contain' }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            {description && (
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};
export default BasicCard;
