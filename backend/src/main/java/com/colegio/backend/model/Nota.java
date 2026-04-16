package com.colegio.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@Entity
@Table(name = "nota")
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private double valor;

    @Column(updatable = false)
    private LocalDate fechaRegistro;

    @ManyToOne(optional = false)
    @JoinColumn(name = "alumno_id", nullable = false)
    @JsonIgnoreProperties("notas")
    private Alumno alumno;

    @ManyToOne(optional = false)
    @JoinColumn(name = "materia_id", nullable = false)
    private Materia materia;

    @PrePersist
    public void prePersist() {
        this.fechaRegistro = LocalDate.now();
    }
}