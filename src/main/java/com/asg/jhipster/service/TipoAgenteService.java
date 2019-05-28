package com.asg.jhipster.service;

import com.asg.jhipster.service.dto.TipoAgenteDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.asg.jhipster.domain.TipoAgente}.
 */
public interface TipoAgenteService {

    /**
     * Save a tipoAgente.
     *
     * @param tipoAgenteDTO the entity to save.
     * @return the persisted entity.
     */
    TipoAgenteDTO save(TipoAgenteDTO tipoAgenteDTO);

    /**
     * Get all the tipoAgentes.
     *
     * @return the list of entities.
     */
    List<TipoAgenteDTO> findAll();


    /**
     * Get the "id" tipoAgente.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TipoAgenteDTO> findOne(Long id);

    /**
     * Delete the "id" tipoAgente.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
