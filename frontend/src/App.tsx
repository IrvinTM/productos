import { PaginatedProductoResponse, Producto } from "./types/types";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationNext,
  PaginationEllipsis,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
} from "./components/ui/pagination";
import Bar from "./components/Bar";
import Footer from "./components/Footer";
import Cards from "./components/Cards";
import { Button } from "./components/ui/button";
import RegisterProduct from "./components/RegisterProduct";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

function App() {
  const [page, setPage] = useState<PaginatedProductoResponse>();
  const [refresh, setRefresh] = useState(false);

  async function fetchData(pageNumber: number = 0, pageSize: number = 4) {
    const response = await fetch(
      `http://localhost:8080/api/productos?page=${pageNumber}&size=${pageSize}`
    );
    const jsonData = await response.json();
    console.log(jsonData);
    const productoResponse: PaginatedProductoResponse = jsonData;
    setPage(productoResponse);
  }

  function noMorePages(step: number): boolean {
    if (
      page?.last ||
      (page?.pageable.pageNumber ?? 1) + step > (page?.totalPages ?? 1) - 1
    ) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    fetchData(0, 4);
  }, [refresh]);

  const triggerRefresh = () => {
    setRefresh(!refresh);
  };

  const editProduct = async (product: Producto) => {
    try {
      const response = await fetch(`http://localhost:8080/api/productos`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert('Producto actualizado');
        triggerRefresh();
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('There was a problem with the update request:', error);
    }
  };

  return (
    <div>
      <Bar />
      <div className="flex justify-center pt-4 ">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>Agregar Producto</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <RegisterProduct triggerRefresh={triggerRefresh} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Cards productos={page ? page.content : []} triggerRefresh={triggerRefresh} editProduct={editProduct} />
      <Pagination className="pt-4 pb-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (page?.first) {
                  return;
                } else {
                  console.log(page?.pageable.pageNumber);
                  fetchData((page?.pageable?.pageNumber ?? 1) - 1, 4);
                }
              }}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink isActive>
              {(page?.pageable.pageNumber ?? 1) + 1}
            </PaginationLink>
          </PaginationItem>

          <PaginationLink
            onClick={() => {
              if (noMorePages(1)) {
                return;
              }
              fetchData((page?.pageable.pageNumber ?? 1) + 1, 4);
            }}
          >
            {(page?.pageable.pageNumber ?? 1) + 2}
          </PaginationLink>

          <PaginationLink
            onClick={() => {
              if (noMorePages(2)) {
                return;
              }
              fetchData((page?.pageable.pageNumber ?? 1) + 2, 4);
            }}
          >
            {(page?.pageable.pageNumber ?? 1) + 3}
          </PaginationLink>

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationLink>
            <PaginationNext
              onClick={() => {
                if (page?.last) {
                  return;
                } else {
                  fetchData((page?.pageable.pageNumber ?? 1) + 1);
                }
              }}
            />
          </PaginationLink>
        </PaginationContent>
      </Pagination>
      <Footer />
    </div>
  );
}

export default App;