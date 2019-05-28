package com.asg.jhipster.service;

import com.asg.jhipster.service.dto.EmpresasDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.asg.jhipster.domain.Empresas}.
 */
public interface EmpresasService {

    /**
     * Save a empresas.
     *
     * @param empresasDTO the entity to save.
     * @return the persisted entity.
     */
    EmpresasDTO save(EmpresasDTO empresasDTO);

    /**
     * Get all the empresas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<EmpresasDTO> findAll(Pageable pageable);


    /**
     * Get the "id" empresas.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<EmpresasDTO> findOne(Long id);

    /**
     * Delete the "id" empresas.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
