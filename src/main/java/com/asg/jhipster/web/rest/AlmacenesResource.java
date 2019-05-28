package com.asg.jhipster.web.rest;

import com.asg.jhipster.service.AlmacenesService;
import com.asg.jhipster.web.rest.errors.BadRequestAlertException;
import com.asg.jhipster.service.dto.AlmacenesDTO;

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
 * REST controller for managing {@link com.asg.jhipster.domain.Almacenes}.
 */
@RestController
@RequestMapping("/api")
public class AlmacenesResource {

    private final Logger log = LoggerFactory.getLogger(AlmacenesResource.class);

    private static final String ENTITY_NAME = "almacenes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AlmacenesService almacenesService;

    public AlmacenesResource(AlmacenesService almacenesService) {
        this.almacenesService = almacenesService;
    }

    /**
     * {@code POST  /almacenes} : Create a new almacenes.
     *
     * @param almacenesDTO the almacenesDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new almacenesDTO, or with status {@code 400 (Bad Request)} if the almacenes has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/almacenes")
    public ResponseEntity<AlmacenesDTO> createAlmacenes(@RequestBody AlmacenesDTO almacenesDTO) throws URISyntaxException {
        log.debug("REST request to save Almacenes : {}", almacenesDTO);
        if (almacenesDTO.getId() != null) {
            throw new BadRequestAlertException("A new almacenes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AlmacenesDTO result = almacenesService.save(almacenesDTO);
        return ResponseEntity.created(new URI("/api/almacenes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /almacenes} : Updates an existing almacenes.
     *
     * @param almacenesDTO the almacenesDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated almacenesDTO,
     * or with status {@code 400 (Bad Request)} if the almacenesDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the almacenesDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/almacenes")
    public ResponseEntity<AlmacenesDTO> updateAlmacenes(@RequestBody AlmacenesDTO almacenesDTO) throws URISyntaxException {
        log.debug("REST request to update Almacenes : {}", almacenesDTO);
        if (almacenesDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AlmacenesDTO result = almacenesService.save(almacenesDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, almacenesDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /almacenes} : get all the almacenes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of almacenes in body.
     */
    @GetMapping("/almacenes")
    public List<AlmacenesDTO> getAllAlmacenes() {
        log.debug("REST request to get all Almacenes");
        return almacenesService.findAll();
    }

    /**
     * {@code GET  /almacenes/:id} : get the "id" almacenes.
     *
     * @param id the id of the almacenesDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the almacenesDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/almacenes/{id}")
    public ResponseEntity<AlmacenesDTO> getAlmacenes(@PathVariable Long id) {
        log.debug("REST request to get Almacenes : {}", id);
        Optional<AlmacenesDTO> almacenesDTO = almacenesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(almacenesDTO);
    }

    /**
     * {@code DELETE  /almacenes/:id} : delete the "id" almacenes.
     *
     * @param id the id of the almacenesDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/almacenes/{id}")
    public ResponseEntity<Void> deleteAlmacenes(@PathVariable Long id) {
        log.debug("REST request to delete Almacenes : {}", id);
        almacenesService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
