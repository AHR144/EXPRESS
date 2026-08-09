import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Avatar,
  Button,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from '@material-ui/core';
import { cyan } from '@material-ui/core/colors';
import Wallpaper from '@material-ui/icons/Wallpaper';

const styles = () => ({
  subheader: {
    fontSize: 24,
    backgroundColor: cyan[600],
    color: '#FFFFFF',
  },
  form: {
    padding: 16,
  },
  actions: {
    justifyContent: 'flex-end',
    padding: 16,
  },
});

const Products = (props) => {
  const { classes, products, title, description, price, onChange, onSubmit, saving } = props;

  return (
    <div>
      <h2 style={{ paddingBottom: '15px' }}>Your Products</h2>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardHeader title="Add a product" />
            <Divider />
            <form onSubmit={onSubmit}>
              <CardContent>
                <TextField
                  name="title"
                  label="Title"
                  value={title}
                  onChange={onChange}
                  fullWidth
                  required
                  margin="normal"
                />
                <TextField
                  name="description"
                  label="Description"
                  value={description}
                  onChange={onChange}
                  fullWidth
                  multiline
                  margin="normal"
                />
                <TextField
                  name="price"
                  label="Price"
                  type="number"
                  value={price}
                  onChange={onChange}
                  fullWidth
                  margin="normal"
                />
              </CardContent>
              <Divider />
              <CardActions className={classes.actions}>
                <Button type="submit" color="primary" variant="contained" disabled={saving}>
                  {saving ? 'Saving...' : 'Add Product'}
                </Button>
              </CardActions>
            </form>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card>
            <CardHeader title="My Products" />
            <Divider />
            <CardContent>
              {products.length === 0 ? (
                <p>You don&apos;t have any products yet - add your first one.</p>
              ) : (
                <List>
                  {products.map((item, i) => (
                    <ListItem divider={i < products.length - 1} key={item.id}>
                      <ListItemIcon>
                        <Avatar>
                          <Wallpaper />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        secondary={`${item.description || ''}${item.price ? ' · $' + item.price : ''}`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

Products.propTypes = {
  classes: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default withStyles(styles)(Products);
