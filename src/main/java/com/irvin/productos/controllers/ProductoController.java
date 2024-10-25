package com.irvin.productos.controllers;

import com.irvin.productos.entities.Producto;
import com.irvin.productos.repositories.ProductoRepository;
import com.irvin.productos.services.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    private final ProductoService productoService;

    @Autowired
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    public Page<Producto> getAllProductos(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return productoService.getAllProductos(PageRequest.of(page, size));
    }
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public void addProducto(@RequestBody Producto producto) {
        productoService.addProducto(producto);
    }

    @PutMapping
    public void updateProducto(@RequestBody Producto producto) {
        productoService.updateProducto(producto);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping(path = "{nombre}")
    public void deleteProductoByName(@PathVariable("nombre") String nombre) {
        productoService.deleteProductoByName(nombre);
    }


}
