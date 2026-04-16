package com.colegio.backend.controller;

import com.colegio.backend.model.Materia;
import com.colegio.backend.repository.MateriaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/materias")
public class MateriaController {

    private final MateriaRepository repo;

    public MateriaController(MateriaRepository repo) {
        this.repo = repo;
    }

    // LISTAR
    @GetMapping
    public List<Materia> listar() {
        return repo.findAll();
    }

    // OBTENER POR ID
    @GetMapping("/{id}")
    public Materia obtener(@PathVariable Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Materia no encontrada"));
    }

    // CREAR
    @PostMapping
    public Materia crear(@RequestBody Materia materia) {
        return repo.save(materia);
    }

    // ACTUALIZAR
    @PutMapping("/{id}")
    public Materia actualizar(@PathVariable Long id, @RequestBody Materia materia) {
        materia.setId(id);
        return repo.save(materia);
    }

    @DeleteMapping("/{id}")
public void eliminar(@PathVariable Long id) {
    repo.deleteById(id);
}
}