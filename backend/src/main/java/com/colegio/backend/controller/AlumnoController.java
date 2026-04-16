package com.colegio.backend.controller;
import com.colegio.backend.model.Alumno;
import com.colegio.backend.repository.AlumnoRepository;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/alumnos")
public class AlumnoController {

    private final AlumnoRepository repo;

    public AlumnoController(AlumnoRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Alumno> listar() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Alumno obtenerPorId(@PathVariable Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));
    }

    @PostMapping
    public Alumno crear(@RequestBody Alumno alumno) {
        return repo.save(alumno);
    }

    @PutMapping("/{id}")
    public Alumno actualizar(@PathVariable Long id, @RequestBody Alumno alumno) {
        alumno.setId(id);
        return repo.save(alumno);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Alumno no encontrado");
        }
        repo.deleteById(id);
    }
}