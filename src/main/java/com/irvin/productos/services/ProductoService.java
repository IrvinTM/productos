package com.irvin.productos.services;

import com.irvin.productos.entities.Producto;
import com.irvin.productos.repositories.ProductoRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class ProductoService {
    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public Page<Producto> getAllProductos(PageRequest pageable) {
        Page page = productoRepository.findAll(pageable);
        return page;
    }

    @Transactional
    public void addProducto(Producto producto) {
        if (productoRepository.findByNombre(producto.getNombre()) != null) {
            throw new IllegalStateException("Producto con nombre " + producto.getNombre() + " ya existe");
        } else {
            productoRepository.save(producto);
        }
    }

    public void deleteProductoById(Long id) {
        productoRepository.deleteById(id);
    }

    public void updateProducto(Producto producto) {
        productoRepository.save(producto);
    }

    public void deleteProductoByName(String nombre) {
        Producto producto = productoRepository.findByNombre(nombre);
                if (producto == null) {
                    throw new IllegalStateException("Producto con nombre " + nombre + " no existe");
                } else {
                    productoRepository.deleteById(producto.getId());
                }
    }
}