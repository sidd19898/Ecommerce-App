import {
  useEffect,
  useState
} from "react";

import {
  Container,
  Typography
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

        const data =
  await getProducts({
    search
  });

        setProducts(data.products);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  return (

    <Layout>

      <Container
        sx={{ mt: 3 }}
      >

        <Typography
          variant="h4"
          mb={3}
        >
          Products
        </Typography>
        <SearchBar
  value={search}
  onChange={setSearch}
/>

        {
          loading
            ? <Loader />
            : (
              <ProductGrid
                products={
                  products
                }
              />
            )
        }

      </Container>

    </Layout>

  );
}