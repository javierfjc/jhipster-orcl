package com.asg.jhipster.web.rest;

import com.asg.jhipster.service.TipoEnlaceService;
import com.asg.jhipster.web.rest.errors.BadRequestAlertException;
import com.asg.jhipster.service.dto.TipoEnlaceDTO;

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
 * REST controller for managing {@link com.asg.jhipster.domain.TipoEnlace}.
 */
@RestController
@RequestMapping("/api")
public class TipoEnlaceResource {

    private final Logger log = LoggerFactory.getLogger(TipoEnlaceResource.class);

    private static final String ENTITY_NAME = "tipoEnlace";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoEnlaceService tipoEnlaceService;

    public TipoEnlaceResource(TipoEnlaceService tipoEnlaceService) {
        this.tipoEnlaceService = tipoEnlaceService;
    }

    /**
     * {@code POST  /tipo-enlaces} : Create a new tipoEnlace.
     *
     * @param tipoEnlaceDTO the tipoEnlaceDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoEnlaceDTO, or with status {@code 400 (Bad Request)} if the tipoEnlace has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-enlaces")
    public ResponseEntity<TipoEnlaceDTO> createTipoEnlace(@RequestBody TipoEnlaceDTO tipoEnlaceDTO) throws URISyntaxException {
        log.debug("REST request to save TipoEnlace : {}", tipoEnlaceDTO);
        if (tipoEnlaceDTO.getId() != null) {
            throw new BadRequestAlertException("A new tipoEnlace cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoEnlaceDTO result = tipoEnlaceService.save(tipoEnlaceDTO);
        return ResponseEntity.created(new URI("/api/tipo-enlaces/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-enlaces} : Updates an existing tipoEnlace.
     *
     * @param tipoEnlaceDTO the tipoEnlaceDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoEnlaceDTO,
     * or with status {@code 400 (Bad Request)} if the tipoEnlaceDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoEnlaceDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-enlaces")
    public ResponseEntity<TipoEnlaceDTO> updateTipoEnlace(@RequestBody TipoEnlaceDTO tipoEnlaceDTO) throws URISyntaxException {
        log.debug("REST request to update TipoEnlace : {}", tipoEnlaceDTO);
        if (tipoEnlaceDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoEnlaceDTO result = tipoEnlaceService.save(tipoEnlaceDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoEnlaceDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-enlaces} : get all the tipoEnlaces.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoEnlaces in body.
     */
    @GetMapping("/tipo-enlaces")
    public List<TipoEnlaceDTO> getAllTipoEnlaces() {
        log.debug("REST request to get all TipoEnlaces");
        return tipoEnlaceService.findAll();
    }

    /**
     * {@code GET  /tipo-enlaces/:id} : get the "id" tipoEnlace.
     *
     * @param id the id of the tipoEnlaceDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoEnlaceDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-enlaces/{id}")
    public ResponseEntity<TipoEnlaceDTO> getTipoEnlace(@PathVariable Long id) {
        log.debug("REST request to get TipoEnlace : {}", id);
        Optional<TipoEnlaceDTO> tipoEnlaceDTO = tipoEnlaceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoEnlaceDTO);
    }

    /**
     * {@code DELETE  /tipo-enlaces/:id} : delete the "id" tipoEnlace.
     *
     * @param id the id of the tipoEnlaceDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-enlaces/{id}")
    public ResponseEntity<Void> deleteTipoEnlace(@PathVariable Long id) {
        log.debug("REST request to delete TipoEnlace : {}", id);
        tipoEnlaceService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
