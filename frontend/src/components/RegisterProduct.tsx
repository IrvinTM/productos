'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface RegisterProductProps {
  triggerRefresh: () => void;
}

export default function RegisterProduct({ triggerRefresh }: RegisterProductProps) {
  const [product, setProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduct(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setProduct(prev => ({ ...prev, categoria: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8080/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
  
      if (response.status === 201) {
        alert('Producto creado');
        console.log('Producto added successfully');
        
        setProduct({ nombre: '', descripcion: '', precio: '', categoria: '' });

        triggerRefresh();
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('There was a problem with the post request:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Registrar Producto</h2>
      
      <div className="space-y-2">
        <Label htmlFor="nombre">Nombre</Label>
        <Input
          id="nombre"
          name="nombre"
          value={product.nombre}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="descripcion">Descripción</Label>
        <Textarea
          id="descripcion"
          name="descripcion"
          value={product.descripcion}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="precio">Precio</Label>
        <Input
          id="precio"
          name="precio"
          type="number"
          step="0.01"
          value={product.precio}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="categoria">Categoría</Label>
        <Select onValueChange={handleSelectChange} value={product.categoria}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Electrónica">Electrónica</SelectItem>
            <SelectItem value="Ropa">Ropa</SelectItem>
            <SelectItem value="Hogar">Hogar</SelectItem>
            <SelectItem value="Deportes">Deportes</SelectItem>
            <SelectItem value="Libros">Libros</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button type="submit" className="w-full">Registrar Producto</Button>
    </form>
  )
}