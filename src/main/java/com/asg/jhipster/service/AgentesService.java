package com.asg.jhipster.service;

import com.asg.jhipster.service.dto.AgentesDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.asg.jhipster.domain.Agentes}.
 */
public interface AgentesService {

    /**
     * Save a agentes.
     *
     * @param agentesDTO the entity to save.
     * @return the persisted entity.
     */
    AgentesDTO save(AgentesDTO agentesDTO);

    /**
     * Get all the agentes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AgentesDTO> findAll(Pageable pageable);


    /**
     * Get the "id" agentes.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AgentesDTO> findOne(Long id);

    /**
     * Delete the "id" agentes.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
