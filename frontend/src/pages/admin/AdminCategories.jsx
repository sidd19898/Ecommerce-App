import { useEffect, useState } from "react";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Stack
} from "@mui/material";

import Layout from "../../components/layout/Layout";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../../api/category.api";

export default function AdminCategories() {
  const [categories, setCategories] =
    useState([]);

  const [name, setName] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleSubmit =
    async () => {
      try {
        if (editingId) {
          await updateCategory(
            editingId,
            { name }
          );

          alert(
            "Category Updated"
          );
        } else {
          await createCategory({
            name
          });

          alert(
            "Category Created"
          );
        }

        setName("");
        setEditingId(null);

        fetchCategories();
      } catch (error) {
        console.log(error);
      }
    };

  const handleEdit =
    (category) => {
      setEditingId(
        category._id
      );

      setName(
        category.name
      );
    };

  const handleDelete =
    async (id) => {
      if (
        !window.confirm(
          "Delete this category?"
        )
      ) {
        return;
      }

      try {
        await deleteCategory(id);

        fetchCategories();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <Layout>
      <Container
        maxWidth="md"
        sx={{ mt: 5, mb: 5 }}
      >
        <Paper
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: 3
          }}
        >
          <Typography
            variant="h4"
            fontWeight={600}
            mb={3}
          >
            Manage Categories
          </Typography>

          <TextField
            fullWidth
            label="Category Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              mt: 3,
              minWidth: 220,
              height: 48
            }}
          >
            {editingId
              ? "Update Category"
              : "Create Category"}
          </Button>
        </Paper>

        <Typography
          variant="h5"
          fontWeight={600}
          sx={{
            mt: 6,
            mb: 3
          }}
        >
          Category List
        </Typography>

        <Stack spacing={3}>
          {categories.map(
            (category) => (
              <Card
                key={category._id}
                sx={{
                  borderRadius: 4,
                  boxShadow: 2
                }}
              >
                <CardContent
                  sx={{
                    px: 3,
                    py: 2.5
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems:
                        "center",
                      flexWrap: "wrap",
                      gap: 2
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={600}
                    >
                      {category.name}
                    </Typography>

                    <Box
                      sx={{
                        display:
                          "flex",
                        gap: 1.5
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleEdit(
                            category
                          )
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() =>
                          handleDelete(
                            category._id
                          )
                        }
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            )
          )}
        </Stack>
      </Container>
    </Layout>
  );
}