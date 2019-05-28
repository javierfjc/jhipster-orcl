package com.asg.jhipster.web.rest;

import com.asg.jhipster.service.TipoTerminalService;
import com.asg.jhipster.web.rest.errors.BadRequestAlertException;
import com.asg.jhipster.service.dto.TipoTerminalDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.asg.jhipster.domain.TipoTerminal}.
 */
@RestController
@RequestMapping("/api")
public class TipoTerminalResource {

    private final Logger log = LoggerFactory.getLogger(TipoTerminalResource.class);

    private static final String ENTITY_NAME = "tipoTerminal";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoTerminalService tipoTerminalService;

    public TipoTerminalResource(TipoTerminalService tipoTerminalService) {
        this.tipoTerminalService = tipoTerminalService;
    }

    /**
     * {@code POST  /tipo-terminals} : Create a new tipoTerminal.
     *
     * @param tipoTerminalDTO the tipoTerminalDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoTerminalDTO, or with status {@code 400 (Bad Request)} if the tipoTerminal has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-terminals")
    public ResponseEntity<TipoTerminalDTO> createTipoTerminal(@RequestBody TipoTerminalDTO tipoTerminalDTO) throws URISyntaxException {
        log.debug("REST request to save TipoTerminal : {}", tipoTerminalDTO);
        if (tipoTerminalDTO.getId() != null) {
            throw new BadRequestAlertException("A new tipoTerminal cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoTerminalDTO result = tipoTerminalService.save(tipoTerminalDTO);
        return ResponseEntity.created(new URI("/api/tipo-terminals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-terminals} : Updates an existing tipoTerminal.
     *
     * @param tipoTerminalDTO the tipoTerminalDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoTerminalDTO,
     * or with status {@code 400 (Bad Request)} if the tipoTerminalDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoTerminalDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-terminals")
    public ResponseEntity<TipoTerminalDTO> updateTipoTerminal(@RequestBody TipoTerminalDTO tipoTerminalDTO) throws URISyntaxException {
        log.debug("REST request to update TipoTerminal : {}", tipoTerminalDTO);
        if (tipoTerminalDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoTerminalDTO result = tipoTerminalService.save(tipoTerminalDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoTerminalDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-terminals} : get all the tipoTerminals.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoTerminals in body.
     */
    @GetMapping("/tipo-terminals")
    public List<TipoTerminalDTO> getAllTipoTerminals() {
        log.debug("REST request to get all TipoTerminals");
        return tipoTerminalService.findAll();
    }

    /**
     * {@code GET  /tipo-terminals/:id} : get the "id" tipoTerminal.
     *
     * @param id the id of the tipoTerminalDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoTerminalDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-terminals/{id}")
    public ResponseEntity<TipoTerminalDTO> getTipoTerminal(@PathVariable Long id) {
        log.debug("REST request to get TipoTerminal : {}", id);
        Optional<TipoTerminalDTO> tipoTerminalDTO = tipoTerminalService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoTerminalDTO);
    }

    /**
     * {@code DELETE  /tipo-terminals/:id} : delete the "id" tipoTerminal.
     *
     * @param id the id of the tipoTerminalDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-terminals/{id}")
    public ResponseEntity<Void> deleteTipoTerminal(@PathVariable Long id) {
        log.debug("REST request to delete TipoTerminal : {}", id);
        tipoTerminalService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
