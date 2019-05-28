package com.asg.jhipster.service.impl;

import com.asg.jhipster.service.TipoAreaService;
import com.asg.jhipster.domain.TipoArea;
import com.asg.jhipster.repository.TipoAreaRepository;
import com.asg.jhipster.service.dto.TipoAreaDTO;
import com.asg.jhipster.service.mapper.TipoAreaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link TipoArea}.
 */
@Service
@Transactional
public class TipoAreaServiceImpl implements TipoAreaService {

    private final Logger log = LoggerFactory.getLogger(TipoAreaServiceImpl.class);

    private final TipoAreaRepository tipoAreaRepository;

    private final TipoAreaMapper tipoAreaMapper;

    public TipoAreaServiceImpl(TipoAreaRepository tipoAreaRepository, TipoAreaMapper tipoAreaMapper) {
        this.tipoAreaRepository = tipoAreaRepository;
        this.tipoAreaMapper = tipoAreaMapper;
    }

    /**
     * Save a tipoArea.
     *
     * @param tipoAreaDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public TipoAreaDTO save(TipoAreaDTO tipoAreaDTO) {
        log.debug("Request to save TipoArea : {}", tipoAreaDTO);
        TipoArea tipoArea = tipoAreaMapper.toEntity(tipoAreaDTO);
        tipoArea = tipoAreaRepository.save(tipoArea);
        return tipoAreaMapper.toDto(tipoArea);
    }

    /**
     * Get all the tipoAreas.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<TipoAreaDTO> findAll() {
        log.debug("Request to get all TipoAreas");
        return tipoAreaRepository.findAll().stream()
            .map(tipoAreaMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one tipoArea by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TipoAreaDTO> findOne(Long id) {
        log.debug("Request to get TipoArea : {}", id);
        return tipoAreaRepository.findById(id)
            .map(tipoAreaMapper::toDto);
    }

    /**
     * Delete the tipoArea by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipoArea : {}", id);
        tipoAreaRepository.deleteById(id);
    }
}
