import {
  useEffect,
  useState
} from "react";

import {
  Container,
  Typography,
  Box
} from "@mui/material";

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

export default function Home() {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    fetchProducts();

  }, [search]);

  const fetchProducts =
    async () => {

      try {

        setLoading(true);

        const data =
          await getProducts({
            search
          });

        setProducts(
          data.products
        );

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
          onChange={setSearch}
        />

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

      </Container>

    </Layout>

  );

}