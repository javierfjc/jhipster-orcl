package com.asg.jhipster.service.impl;

import com.asg.jhipster.service.TipoTerminalService;
import com.asg.jhipster.domain.TipoTerminal;
import com.asg.jhipster.repository.TipoTerminalRepository;
import com.asg.jhipster.service.dto.TipoTerminalDTO;
import com.asg.jhipster.service.mapper.TipoTerminalMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link TipoTerminal}.
 */
@Service
@Transactional
public class TipoTerminalServiceImpl implements TipoTerminalService {

    private final Logger log = LoggerFactory.getLogger(TipoTerminalServiceImpl.class);

    private final TipoTerminalRepository tipoTerminalRepository;

    private final TipoTerminalMapper tipoTerminalMapper;

    public TipoTerminalServiceImpl(TipoTerminalRepository tipoTerminalRepository, TipoTerminalMapper tipoTerminalMapper) {
        this.tipoTerminalRepository = tipoTerminalRepository;
        this.tipoTerminalMapper = tipoTerminalMapper;
    }

    /**
     * Save a tipoTerminal.
     *
     * @param tipoTerminalDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public TipoTerminalDTO save(TipoTerminalDTO tipoTerminalDTO) {
        log.debug("Request to save TipoTerminal : {}", tipoTerminalDTO);
        TipoTerminal tipoTerminal = tipoTerminalMapper.toEntity(tipoTerminalDTO);
        tipoTerminal = tipoTerminalRepository.save(tipoTerminal);
        return tipoTerminalMapper.toDto(tipoTerminal);
    }

    /**
     * Get all the tipoTerminals.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<TipoTerminalDTO> findAll() {
        log.debug("Request to get all TipoTerminals");
        return tipoTerminalRepository.findAll().stream()
            .map(tipoTerminalMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one tipoTerminal by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TipoTerminalDTO> findOne(Long id) {
        log.debug("Request to get TipoTerminal : {}", id);
        return tipoTerminalRepository.findById(id)
            .map(tipoTerminalMapper::toDto);
    }

    /**
     * Delete the tipoTerminal by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipoTerminal : {}", id);
        tipoTerminalRepository.deleteById(id);
    }
}
