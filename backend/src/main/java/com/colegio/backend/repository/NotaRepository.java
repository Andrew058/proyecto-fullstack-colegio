package com.colegio.backend.repository;

import com.colegio.backend.model.Nota;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import jakarta.transaction.Transactional;
import java.util.List;

public interface NotaRepository extends JpaRepository<Nota, Long> {

    // ESTE ES EL IMPORTANTE (usa este en el controller)
    @Query("SELECT n FROM Nota n JOIN FETCH n.materia WHERE n.alumno.id = :id")
    List<Nota> findNotasConMateria(@Param("id") Long id);

    // LOS DEMÁS LOS DEJAS IGUAL
    List<Nota> findByAlumnoId(Long alumnoId);

    boolean existsByMateriaId(Long materiaId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Nota n WHERE n.materia.id = :materiaId")
    void deleteByMateriaId(Long materiaId);

    List<Nota> findByMateriaId(Long materiaId);

    List<Nota> findByAlumnoIdAndMateriaId(Long alumnoId, Long materiaId);
}