package com.asg.jhipster.web.rest;

import com.asg.jhipster.service.TipoAgenteService;
import com.asg.jhipster.web.rest.errors.BadRequestAlertException;
import com.asg.jhipster.service.dto.TipoAgenteDTO;

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
 * REST controller for managing {@link com.asg.jhipster.domain.TipoAgente}.
 */
@RestController
@RequestMapping("/api")
public class TipoAgenteResource {

    private final Logger log = LoggerFactory.getLogger(TipoAgenteResource.class);

    private static final String ENTITY_NAME = "tipoAgente";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoAgenteService tipoAgenteService;

    public TipoAgenteResource(TipoAgenteService tipoAgenteService) {
        this.tipoAgenteService = tipoAgenteService;
    }

    /**
     * {@code POST  /tipo-agentes} : Create a new tipoAgente.
     *
     * @param tipoAgenteDTO the tipoAgenteDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoAgenteDTO, or with status {@code 400 (Bad Request)} if the tipoAgente has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-agentes")
    public ResponseEntity<TipoAgenteDTO> createTipoAgente(@RequestBody TipoAgenteDTO tipoAgenteDTO) throws URISyntaxException {
        log.debug("REST request to save TipoAgente : {}", tipoAgenteDTO);
        if (tipoAgenteDTO.getId() != null) {
            throw new BadRequestAlertException("A new tipoAgente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoAgenteDTO result = tipoAgenteService.save(tipoAgenteDTO);
        return ResponseEntity.created(new URI("/api/tipo-agentes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-agentes} : Updates an existing tipoAgente.
     *
     * @param tipoAgenteDTO the tipoAgenteDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoAgenteDTO,
     * or with status {@code 400 (Bad Request)} if the tipoAgenteDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoAgenteDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-agentes")
    public ResponseEntity<TipoAgenteDTO> updateTipoAgente(@RequestBody TipoAgenteDTO tipoAgenteDTO) throws URISyntaxException {
        log.debug("REST request to update TipoAgente : {}", tipoAgenteDTO);
        if (tipoAgenteDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoAgenteDTO result = tipoAgenteService.save(tipoAgenteDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoAgenteDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-agentes} : get all the tipoAgentes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoAgentes in body.
     */
    @GetMapping("/tipo-agentes")
    public List<TipoAgenteDTO> getAllTipoAgentes() {
        log.debug("REST request to get all TipoAgentes");
        return tipoAgenteService.findAll();
    }

    /**
     * {@code GET  /tipo-agentes/:id} : get the "id" tipoAgente.
     *
     * @param id the id of the tipoAgenteDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoAgenteDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-agentes/{id}")
    public ResponseEntity<TipoAgenteDTO> getTipoAgente(@PathVariable Long id) {
        log.debug("REST request to get TipoAgente : {}", id);
        Optional<TipoAgenteDTO> tipoAgenteDTO = tipoAgenteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoAgenteDTO);
    }

    /**
     * {@code DELETE  /tipo-agentes/:id} : delete the "id" tipoAgente.
     *
     * @param id the id of the tipoAgenteDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-agentes/{id}")
    public ResponseEntity<Void> deleteTipoAgente(@PathVariable Long id) {
        log.debug("REST request to delete TipoAgente : {}", id);
        tipoAgenteService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
