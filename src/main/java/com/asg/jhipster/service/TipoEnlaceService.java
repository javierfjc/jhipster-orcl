package com.asg.jhipster.service;

import com.asg.jhipster.service.dto.TipoEnlaceDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.asg.jhipster.domain.TipoEnlace}.
 */
public interface TipoEnlaceService {

    /**
     * Save a tipoEnlace.
     *
     * @param tipoEnlaceDTO the entity to save.
     * @return the persisted entity.
     */
    TipoEnlaceDTO save(TipoEnlaceDTO tipoEnlaceDTO);

    /**
     * Get all the tipoEnlaces.
     *
     * @return the list of entities.
     */
    List<TipoEnlaceDTO> findAll();


    /**
     * Get the "id" tipoEnlace.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TipoEnlaceDTO> findOne(Long id);

    /**
     * Delete the "id" tipoEnlace.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
