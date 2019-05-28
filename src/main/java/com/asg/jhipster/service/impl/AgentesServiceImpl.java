package com.asg.jhipster.service.impl;

import com.asg.jhipster.service.AgentesService;
import com.asg.jhipster.domain.Agentes;
import com.asg.jhipster.repository.AgentesRepository;
import com.asg.jhipster.service.dto.AgentesDTO;
import com.asg.jhipster.service.mapper.AgentesMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Agentes}.
 */
@Service
@Transactional
public class AgentesServiceImpl implements AgentesService {

    private final Logger log = LoggerFactory.getLogger(AgentesServiceImpl.class);

    private final AgentesRepository agentesRepository;

    private final AgentesMapper agentesMapper;

    public AgentesServiceImpl(AgentesRepository agentesRepository, AgentesMapper agentesMapper) {
        this.agentesRepository = agentesRepository;
        this.agentesMapper = agentesMapper;
    }

    /**
     * Save a agentes.
     *
     * @param agentesDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public AgentesDTO save(AgentesDTO agentesDTO) {
        log.debug("Request to save Agentes : {}", agentesDTO);
        Agentes agentes = agentesMapper.toEntity(agentesDTO);
        agentes = agentesRepository.save(agentes);
        return agentesMapper.toDto(agentes);
    }

    /**
     * Get all the agentes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<AgentesDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Agentes");
        return agentesRepository.findAll(pageable)
            .map(agentesMapper::toDto);
    }


    /**
     * Get one agentes by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<AgentesDTO> findOne(Long id) {
        log.debug("Request to get Agentes : {}", id);
        return agentesRepository.findById(id)
            .map(agentesMapper::toDto);
    }

    /**
     * Delete the agentes by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Agentes : {}", id);
        agentesRepository.deleteById(id);
    }
}
