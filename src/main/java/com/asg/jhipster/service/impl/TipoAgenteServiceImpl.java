package com.asg.jhipster.service.impl;

import com.asg.jhipster.service.TipoAgenteService;
import com.asg.jhipster.domain.TipoAgente;
import com.asg.jhipster.repository.TipoAgenteRepository;
import com.asg.jhipster.service.dto.TipoAgenteDTO;
import com.asg.jhipster.service.mapper.TipoAgenteMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link TipoAgente}.
 */
@Service
@Transactional
public class TipoAgenteServiceImpl implements TipoAgenteService {

    private final Logger log = LoggerFactory.getLogger(TipoAgenteServiceImpl.class);

    private final TipoAgenteRepository tipoAgenteRepository;

    private final TipoAgenteMapper tipoAgenteMapper;

    public TipoAgenteServiceImpl(TipoAgenteRepository tipoAgenteRepository, TipoAgenteMapper tipoAgenteMapper) {
        this.tipoAgenteRepository = tipoAgenteRepository;
        this.tipoAgenteMapper = tipoAgenteMapper;
    }

    /**
     * Save a tipoAgente.
     *
     * @param tipoAgenteDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public TipoAgenteDTO save(TipoAgenteDTO tipoAgenteDTO) {
        log.debug("Request to save TipoAgente : {}", tipoAgenteDTO);
        TipoAgente tipoAgente = tipoAgenteMapper.toEntity(tipoAgenteDTO);
        tipoAgente = tipoAgenteRepository.save(tipoAgente);
        return tipoAgenteMapper.toDto(tipoAgente);
    }

    /**
     * Get all the tipoAgentes.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<TipoAgenteDTO> findAll() {
        log.debug("Request to get all TipoAgentes");
        return tipoAgenteRepository.findAll().stream()
            .map(tipoAgenteMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one tipoAgente by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TipoAgenteDTO> findOne(Long id) {
        log.debug("Request to get TipoAgente : {}", id);
        return tipoAgenteRepository.findById(id)
            .map(tipoAgenteMapper::toDto);
    }

    /**
     * Delete the tipoAgente by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipoAgente : {}", id);
        tipoAgenteRepository.deleteById(id);
    }
}
