package com.asg.jhipster.service;

import com.asg.jhipster.service.dto.AlmacenesDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.asg.jhipster.domain.Almacenes}.
 */
public interface AlmacenesService {

    /**
     * Save a almacenes.
     *
     * @param almacenesDTO the entity to save.
     * @return the persisted entity.
     */
    AlmacenesDTO save(AlmacenesDTO almacenesDTO);

    /**
     * Get all the almacenes.
     *
     * @return the list of entities.
     */
    List<AlmacenesDTO> findAll();


    /**
     * Get the "id" almacenes.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AlmacenesDTO> findOne(Long id);

    /**
     * Delete the "id" almacenes.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
