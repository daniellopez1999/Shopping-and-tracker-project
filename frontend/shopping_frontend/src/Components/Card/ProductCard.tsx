import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import React from 'react';
interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  image,
}) => {
  return (
    <Card sx={{ minWidth: 345, maxWidth: 345, maxHeight: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="150" image={image} alt={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default ProductCard;
