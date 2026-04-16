package com.colegio.backend.controller;

import com.colegio.backend.model.Nota;
import com.colegio.backend.repository.NotaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notas") // 👈 IMPORTANTE
@CrossOrigin(origins = "http://localhost:5173")
public class NotaController {

    private final NotaRepository notaRepository;

    public NotaController(NotaRepository notaRepository) {
        this.notaRepository = notaRepository;
    }

    @PostMapping
    public Nota crear(@RequestBody Nota nota) {
        return notaRepository.save(nota);
    }

    // 🔥 ESTE ES EL QUE TE FALTA / FALLA
    @GetMapping("/alumno/{id}")
    public List<Nota> notasPorAlumno(@PathVariable Long id) {
        return notaRepository.findNotasConMateria(id);
    }

    @GetMapping
    public List<Nota> listar() {
        return notaRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        notaRepository.deleteById(id);
    }
}