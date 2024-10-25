import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Producto } from "@/types/types";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface CardProps {
  productos: Producto[];
  triggerRefresh: () => void;
  editProduct: (product: Producto) => void;
}

export default function Cards({ productos, triggerRefresh, editProduct }: CardProps) {
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null);

  const handleEdit = (product: Producto) => {
    setEditingProduct(product);
  };

  const handleSave = () => {
    if (editingProduct) {
      editProduct(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editingProduct) {
      const { name, value } = e.target;
      setEditingProduct({ ...editingProduct, [name]: value });
    }
  };

  const handleDelete = async (nombre: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/productos/${nombre}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 204) {
        alert('Producto borrado');
        // Trigger refresh
        triggerRefresh();
      } else {
        alert('Hubo un problema al borrar el producto');
      }
  
    } catch (error) {
      console.error('There was a problem with the delete request:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <div className="flex flex-wrap -mx-2 min-w-[400px]">
        {productos.map((producto: Producto, index: number) => (
          <div key={index} className="w-full sm:w-1/2 px-2 mb-4">
            <Card className="h-full text-center">
              <CardHeader>
                <CardTitle>{producto.nombre}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center content-center items-center flex-col">
                <p>{producto.descripcion}</p>
                <CardFooter>
                  <p className="text-lg font-bold">${producto.precio}</p>
                </CardFooter>
                <div className="flex gap-2">
                  <Button onClick={() => handleEdit(producto)}>
                    Editar
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger><Button>Borrar</Button></AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Estas seguro que deseas borrar este producto?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          No se puede deshacer esta acción.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>
                          <Button onClick={() => handleDelete(producto.nombre)}>
                            Borrar
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </div>
        ))}
      </div>

      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
            <div className="space-y-2">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                value={editingProduct.nombre}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={editingProduct.descripcion}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="precio">Precio</label>
              <input
                id="precio"
                name="precio"
                type="number"
                step="0.01"
                value={editingProduct.precio}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="categoria">Categoría</label>
              <input
                id="categoria"
                name="categoria"
                value={editingProduct.categoria}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={() => setEditingProduct(null)}>Cancelar</Button>
              <Button onClick={handleSave}>Guardar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}