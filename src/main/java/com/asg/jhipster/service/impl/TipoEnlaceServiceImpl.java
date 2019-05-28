package com.asg.jhipster.service.impl;

import com.asg.jhipster.service.TipoEnlaceService;
import com.asg.jhipster.domain.TipoEnlace;
import com.asg.jhipster.repository.TipoEnlaceRepository;
import com.asg.jhipster.service.dto.TipoEnlaceDTO;
import com.asg.jhipster.service.mapper.TipoEnlaceMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link TipoEnlace}.
 */
@Service
@Transactional
public class TipoEnlaceServiceImpl implements TipoEnlaceService {

    private final Logger log = LoggerFactory.getLogger(TipoEnlaceServiceImpl.class);

    private final TipoEnlaceRepository tipoEnlaceRepository;

    private final TipoEnlaceMapper tipoEnlaceMapper;

    public TipoEnlaceServiceImpl(TipoEnlaceRepository tipoEnlaceRepository, TipoEnlaceMapper tipoEnlaceMapper) {
        this.tipoEnlaceRepository = tipoEnlaceRepository;
        this.tipoEnlaceMapper = tipoEnlaceMapper;
    }

    /**
     * Save a tipoEnlace.
     *
     * @param tipoEnlaceDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public TipoEnlaceDTO save(TipoEnlaceDTO tipoEnlaceDTO) {
        log.debug("Request to save TipoEnlace : {}", tipoEnlaceDTO);
        TipoEnlace tipoEnlace = tipoEnlaceMapper.toEntity(tipoEnlaceDTO);
        tipoEnlace = tipoEnlaceRepository.save(tipoEnlace);
        return tipoEnlaceMapper.toDto(tipoEnlace);
    }

    /**
     * Get all the tipoEnlaces.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<TipoEnlaceDTO> findAll() {
        log.debug("Request to get all TipoEnlaces");
        return tipoEnlaceRepository.findAll().stream()
            .map(tipoEnlaceMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one tipoEnlace by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TipoEnlaceDTO> findOne(Long id) {
        log.debug("Request to get TipoEnlace : {}", id);
        return tipoEnlaceRepository.findById(id)
            .map(tipoEnlaceMapper::toDto);
    }

    /**
     * Delete the tipoEnlace by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipoEnlace : {}", id);
        tipoEnlaceRepository.deleteById(id);
    }
}
