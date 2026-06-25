import {
  useEffect,
  useState
} from "react";

import {
  Container,
  Typography,
  Box,
  Button
} from "@mui/material";

import Pagination
from "@mui/material/Pagination";

import SearchBar
from "../../components/common/SearchBar";

import Layout
from "../../components/layout/Layout";

import Loader
from "../../components/common/Loader";

import ProductGrid
from "../../components/product/ProductGrid";

import {
  getProducts
} from "../../api/product.api";

import {
  getCategories
} from "../../api/category.api";

export default function Home() {

  const [categories, setCategories] =
  useState([]);

const [
  selectedCategory,
  setSelectedCategory
] = useState("");

const [page, setPage] =
  useState(1);

const [pages, setPages] =
  useState(1);

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

    useEffect(() => {
  fetchCategories();
}, []);

  useEffect(() => {

    fetchProducts();

  }, [search,selectedCategory,page]);




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



  const fetchProducts =
    async () => {

      try {

        setLoading(true);

const data =
  await getProducts({
    search,
    category:
      selectedCategory,
      page
  });

        setProducts(
          data.products
        );

        setPages(data.pages);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

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
          sx={{
            mb: 3,
            fontWeight: 600
          }}
        >
          Products
        </Typography>

        <SearchBar
  value={search}
  onChange={(value) => {
    setSearch(value);
    setPage(1);
  }}
/>

        <Box
  sx={{
    display: "flex",
    gap: 1,
    flexWrap: "wrap",
    mt: 2,
    mb: 3
  }}
>
  <Button
  variant={
    !selectedCategory
      ? "contained"
      : "outlined"
  }
  onClick={() => {
    setSelectedCategory("");
    setPage(1);
  }}
>
  All
</Button>

  {categories.map(
    (category) => (
      <Button
        key={category._id}
        variant={
          selectedCategory ===
          category._id
            ? "contained"
            : "outlined"
        }
        onClick={() => {
          setSelectedCategory(
            category._id
          );

           setPage(1);
        }}
      >
        {category.name}
      </Button>
    )
  )}
</Box>

        <Box sx={{ mt: 3 }}>

          {
            loading
              ? (
                <Loader />
              )
              : (
                <ProductGrid
                  products={
                    products
                  }
                />
              )
          }

        </Box>

        <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    mt: 4,
    mb: 4
  }}
>
  <Pagination
    count={pages}
    page={page}
    color="primary"
    onChange={(
      event,
      value
    ) =>
      setPage(value)
    }
  />
</Box>

      </Container>

    </Layout>

  );

}