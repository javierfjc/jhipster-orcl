package com.asg.jhipster.service;

import com.asg.jhipster.service.dto.TipoTerminalDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.asg.jhipster.domain.TipoTerminal}.
 */
public interface TipoTerminalService {

    /**
     * Save a tipoTerminal.
     *
     * @param tipoTerminalDTO the entity to save.
     * @return the persisted entity.
     */
    TipoTerminalDTO save(TipoTerminalDTO tipoTerminalDTO);

    /**
     * Get all the tipoTerminals.
     *
     * @return the list of entities.
     */
    List<TipoTerminalDTO> findAll();


    /**
     * Get the "id" tipoTerminal.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TipoTerminalDTO> findOne(Long id);

    /**
     * Delete the "id" tipoTerminal.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
