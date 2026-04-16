package com.colegio.backend.model;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "materia")
@Data
public class Materia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String codigo;
    private int creditos;
}