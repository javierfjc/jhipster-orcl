package com.asg.jhipster.service;

import com.asg.jhipster.service.dto.TipoAreaDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.asg.jhipster.domain.TipoArea}.
 */
public interface TipoAreaService {

    /**
     * Save a tipoArea.
     *
     * @param tipoAreaDTO the entity to save.
     * @return the persisted entity.
     */
    TipoAreaDTO save(TipoAreaDTO tipoAreaDTO);

    /**
     * Get all the tipoAreas.
     *
     * @return the list of entities.
     */
    List<TipoAreaDTO> findAll();


    /**
     * Get the "id" tipoArea.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TipoAreaDTO> findOne(Long id);

    /**
     * Delete the "id" tipoArea.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
