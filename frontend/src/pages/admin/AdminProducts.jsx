import {
  useEffect,
  useState
} from "react";

import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";

import Layout
from "../../components/layout/Layout";

import {
  getProducts
} from "../../api/product.api";

import {
  getCategories
} from "../../api/category.api";

import {
  createProduct,
  deleteProduct,
  updateProduct
} from "../../api/adminProduct.api";

import {
  uploadImage
} from "../../api/upload.api";

export default function AdminProducts() {

    const [editingId,
  setEditingId] =
  useState(null);

  const [products,
    setProducts] =
    useState([]);

  const [categories,
    setCategories] =
    useState([]);

  const [name,
    setName] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [price,
    setPrice] =
    useState("");

  const [category,
    setCategory] =
    useState("");

  const [stock,
    setStock] =
    useState("");

  const [image,
  setImage] =
  useState("");

const [uploading,
  setUploading] =
  useState(false);

  useEffect(() => {

    fetchProducts();
    fetchCategories();

  }, []);


const handleEdit =
  (product) => {

    setEditingId(
      product._id
    );

    setName(
      product.name
    );

    setDescription(
      product.description
    );

    setPrice(
      product.price
    );

    setStock(
      product.stock
    );

    setImage(
      product.images?.[0] || ""
    );

    setCategory(
      product.category?._id
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };

const handleUpdate =
  async () => {

    try {

      await updateProduct(
        editingId,
        {
          name,
          description,
          price:
            Number(price),
          stock:
            Number(stock),
          category,
          images: [image]
        }
      );

      alert(
        "Product updated"
      );

      setEditingId(
        null
      );

      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory("");
      setImage("");

      fetchProducts();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message
      );

    }

  };

  
const handleImageUpload =
  async (e) => {

    try {

      setUploading(true);

      const file =
        e.target.files[0];

      const data =
        await uploadImage(
          file
        );

      setImage(
        data.imageUrl
      );

    } catch (error) {

      console.log(error);

      alert(
        "Image upload failed"
      );

    } finally {

      setUploading(false);

    }

  };


  const fetchProducts =
    async () => {

      try {

        const data =
          await getProducts();

        setProducts(
          data.products
        );

      } catch (error) {

        console.log(error);

      }

    };

  const fetchCategories =
    async () => {

      try {

        const data =
          await getCategories();

        setCategories(data);

      } catch (error) {

        console.log(error);

      }

    };

  const handleCreate =
    async () => {

      try {

        await createProduct({
          name,
          description,
          price:
            Number(price),
          category,
          stock:
            Number(stock),
          images: [image]
        });

        alert(
          "Product created successfully"
        );

        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setStock("");
        setImage("");

        fetchProducts();

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||
          "Failed to create product"
        );

      }

    };

  const handleDelete =
    async (id) => {

      try {

        await deleteProduct(id);

        fetchProducts();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <Layout>

      <Container
        maxWidth="lg"
        sx={{ mt: 4 }}
      >

        <Typography
          variant="h4"
          mb={3}
        >
          Manage Products
        </Typography>

        <Card sx={{ mb: 4 }}>

          <CardContent>

            <Typography
              variant="h6"
              mb={2}
            >
              Create Product
            </Typography>

            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              type="number"
              label="Price"
              value={price}
              onChange={(e) =>
                setPrice(
                  e.target.value
                )
              }
              sx={{ mb: 2 }}
            />

            <FormControl
              fullWidth
              sx={{ mb: 2 }}
            >

              <InputLabel>
                Category
              </InputLabel>

              <Select
                value={category}
                label="Category"
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
              >

                {
                  categories.map(
                    (cat) => (

                      <MenuItem
                        key={cat._id}
                        value={cat._id}
                      >
                        {cat.name}
                      </MenuItem>

                    )
                  )
                }

              </Select>

            </FormControl>

            <TextField
              fullWidth
              type="number"
              label="Stock"
              value={stock}
              onChange={(e) =>
                setStock(
                  e.target.value
                )
              }
              sx={{ mb: 2 }}
            />

            <Button
  component="label"
  variant="outlined"
  sx={{ mb: 2 }}
>

  Upload Image

  <input
    hidden
    type="file"
    accept="image/*"
    onChange={
      handleImageUpload
    }
  />

</Button>


{
  uploading && (

    <Typography>
      Uploading...
    </Typography>

  )
}

{
  image && (

    <Box mb={2}>

      <img
        src={image}
        alt="Preview"
        style={{
          width: 200,
          borderRadius: 8
        }}
      />

    </Box>

  )
}
{
  editingId ? (

    <Button
      variant="contained"
      color="warning"
      onClick={
        handleUpdate
      }
    >
      Update Product
    </Button>

  ) : (

    <Button
      variant="contained"
      onClick={
        handleCreate
      }
    >
      Create Product
    </Button>

  )
}

          </CardContent>

        </Card>

        <Typography
          variant="h5"
          mb={2}
        >
          Product List
        </Typography>

        <Grid
          container
          spacing={2}
        >

          {
            products.map(
              (product) => (

                <Grid
                  key={product._id}
                  size={{
                    xs: 12,
                    sm: 6,
                    md: 4
                  }}
                >

                  <Card>

                    <CardContent>

                      <Box
                        display="flex"
                        flexDirection="column"
                        gap={1}
                      >

                        <img
  src={product.images?.[0]}
  alt={product.name}
  style={{
    width: "100%",
    height: "200px",
    objectFit: "contain",
    backgroundColor: "#f5f5f5"
  }}
/>

                        <Typography
                          variant="h6"
                        >
                          {
                            product.name
                          }
                        </Typography>

                        <Typography>
                          ₹
                          {
                            product.price
                          }
                        </Typography>

                        <Typography>
                          Stock:
                          {" "}
                          {
                            product.stock
                          }
                        </Typography>

                        <Typography>
                          Category:
                          {" "}
                          {
                            product.category?.name
                          }
                        </Typography>


                        <Button
  variant="contained"
  onClick={() =>
    handleEdit(
      product
    )
  }
>
  Edit
</Button>

                        <Button
                          color="error"
                          variant="outlined"
                          onClick={() =>
                            handleDelete(
                              product._id
                            )
                          }
                        >
                          Delete
                        </Button>

                      </Box>

                    </CardContent>

                  </Card>

                </Grid>

              )
            )
          }

        </Grid>

      </Container>

    </Layout>

  );

}