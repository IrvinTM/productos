package com.irvin.productos.repositories;

import com.irvin.productos.entities.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    Producto findByNombre(String nombre);
    Void deleteByNombre(String nombre);
}