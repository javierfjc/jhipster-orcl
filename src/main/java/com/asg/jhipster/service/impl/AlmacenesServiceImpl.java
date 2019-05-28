package com.asg.jhipster.service.impl;

import com.asg.jhipster.service.AlmacenesService;
import com.asg.jhipster.domain.Almacenes;
import com.asg.jhipster.repository.AlmacenesRepository;
import com.asg.jhipster.service.dto.AlmacenesDTO;
import com.asg.jhipster.service.mapper.AlmacenesMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Almacenes}.
 */
@Service
@Transactional
public class AlmacenesServiceImpl implements AlmacenesService {

    private final Logger log = LoggerFactory.getLogger(AlmacenesServiceImpl.class);

    private final AlmacenesRepository almacenesRepository;

    private final AlmacenesMapper almacenesMapper;

    public AlmacenesServiceImpl(AlmacenesRepository almacenesRepository, AlmacenesMapper almacenesMapper) {
        this.almacenesRepository = almacenesRepository;
        this.almacenesMapper = almacenesMapper;
    }

    /**
     * Save a almacenes.
     *
     * @param almacenesDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public AlmacenesDTO save(AlmacenesDTO almacenesDTO) {
        log.debug("Request to save Almacenes : {}", almacenesDTO);
        Almacenes almacenes = almacenesMapper.toEntity(almacenesDTO);
        almacenes = almacenesRepository.save(almacenes);
        return almacenesMapper.toDto(almacenes);
    }

    /**
     * Get all the almacenes.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<AlmacenesDTO> findAll() {
        log.debug("Request to get all Almacenes");
        return almacenesRepository.findAll().stream()
            .map(almacenesMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one almacenes by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<AlmacenesDTO> findOne(Long id) {
        log.debug("Request to get Almacenes : {}", id);
        return almacenesRepository.findById(id)
            .map(almacenesMapper::toDto);
    }

    /**
     * Delete the almacenes by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Almacenes : {}", id);
        almacenesRepository.deleteById(id);
    }
}
