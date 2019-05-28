package com.asg.jhipster.web.rest;

import com.asg.jhipster.service.TipoAreaService;
import com.asg.jhipster.web.rest.errors.BadRequestAlertException;
import com.asg.jhipster.service.dto.TipoAreaDTO;

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
 * REST controller for managing {@link com.asg.jhipster.domain.TipoArea}.
 */
@RestController
@RequestMapping("/api")
public class TipoAreaResource {

    private final Logger log = LoggerFactory.getLogger(TipoAreaResource.class);

    private static final String ENTITY_NAME = "tipoArea";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoAreaService tipoAreaService;

    public TipoAreaResource(TipoAreaService tipoAreaService) {
        this.tipoAreaService = tipoAreaService;
    }

    /**
     * {@code POST  /tipo-areas} : Create a new tipoArea.
     *
     * @param tipoAreaDTO the tipoAreaDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoAreaDTO, or with status {@code 400 (Bad Request)} if the tipoArea has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-areas")
    public ResponseEntity<TipoAreaDTO> createTipoArea(@RequestBody TipoAreaDTO tipoAreaDTO) throws URISyntaxException {
        log.debug("REST request to save TipoArea : {}", tipoAreaDTO);
        if (tipoAreaDTO.getId() != null) {
            throw new BadRequestAlertException("A new tipoArea cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoAreaDTO result = tipoAreaService.save(tipoAreaDTO);
        return ResponseEntity.created(new URI("/api/tipo-areas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-areas} : Updates an existing tipoArea.
     *
     * @param tipoAreaDTO the tipoAreaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoAreaDTO,
     * or with status {@code 400 (Bad Request)} if the tipoAreaDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoAreaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-areas")
    public ResponseEntity<TipoAreaDTO> updateTipoArea(@RequestBody TipoAreaDTO tipoAreaDTO) throws URISyntaxException {
        log.debug("REST request to update TipoArea : {}", tipoAreaDTO);
        if (tipoAreaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoAreaDTO result = tipoAreaService.save(tipoAreaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoAreaDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-areas} : get all the tipoAreas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoAreas in body.
     */
    @GetMapping("/tipo-areas")
    public List<TipoAreaDTO> getAllTipoAreas() {
        log.debug("REST request to get all TipoAreas");
        return tipoAreaService.findAll();
    }

    /**
     * {@code GET  /tipo-areas/:id} : get the "id" tipoArea.
     *
     * @param id the id of the tipoAreaDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoAreaDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-areas/{id}")
    public ResponseEntity<TipoAreaDTO> getTipoArea(@PathVariable Long id) {
        log.debug("REST request to get TipoArea : {}", id);
        Optional<TipoAreaDTO> tipoAreaDTO = tipoAreaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoAreaDTO);
    }

    /**
     * {@code DELETE  /tipo-areas/:id} : delete the "id" tipoArea.
     *
     * @param id the id of the tipoAreaDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-areas/{id}")
    public ResponseEntity<Void> deleteTipoArea(@PathVariable Long id) {
        log.debug("REST request to delete TipoArea : {}", id);
        tipoAreaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
