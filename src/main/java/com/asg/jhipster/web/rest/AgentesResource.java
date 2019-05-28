package com.asg.jhipster.web.rest;

import com.asg.jhipster.service.AgentesService;
import com.asg.jhipster.web.rest.errors.BadRequestAlertException;
import com.asg.jhipster.service.dto.AgentesDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.asg.jhipster.domain.Agentes}.
 */
@RestController
@RequestMapping("/api")
public class AgentesResource {

    private final Logger log = LoggerFactory.getLogger(AgentesResource.class);

    private static final String ENTITY_NAME = "agentes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AgentesService agentesService;

    public AgentesResource(AgentesService agentesService) {
        this.agentesService = agentesService;
    }

    /**
     * {@code POST  /agentes} : Create a new agentes.
     *
     * @param agentesDTO the agentesDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new agentesDTO, or with status {@code 400 (Bad Request)} if the agentes has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/agentes")
    public ResponseEntity<AgentesDTO> createAgentes(@RequestBody AgentesDTO agentesDTO) throws URISyntaxException {
        log.debug("REST request to save Agentes : {}", agentesDTO);
        if (agentesDTO.getId() != null) {
            throw new BadRequestAlertException("A new agentes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AgentesDTO result = agentesService.save(agentesDTO);
        return ResponseEntity.created(new URI("/api/agentes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /agentes} : Updates an existing agentes.
     *
     * @param agentesDTO the agentesDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated agentesDTO,
     * or with status {@code 400 (Bad Request)} if the agentesDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the agentesDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/agentes")
    public ResponseEntity<AgentesDTO> updateAgentes(@RequestBody AgentesDTO agentesDTO) throws URISyntaxException {
        log.debug("REST request to update Agentes : {}", agentesDTO);
        if (agentesDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AgentesDTO result = agentesService.save(agentesDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, agentesDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /agentes} : get all the agentes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of agentes in body.
     */
    @GetMapping("/agentes")
    public ResponseEntity<List<AgentesDTO>> getAllAgentes(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Agentes");
        Page<AgentesDTO> page = agentesService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /agentes/:id} : get the "id" agentes.
     *
     * @param id the id of the agentesDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the agentesDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/agentes/{id}")
    public ResponseEntity<AgentesDTO> getAgentes(@PathVariable Long id) {
        log.debug("REST request to get Agentes : {}", id);
        Optional<AgentesDTO> agentesDTO = agentesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(agentesDTO);
    }

    /**
     * {@code DELETE  /agentes/:id} : delete the "id" agentes.
     *
     * @param id the id of the agentesDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/agentes/{id}")
    public ResponseEntity<Void> deleteAgentes(@PathVariable Long id) {
        log.debug("REST request to delete Agentes : {}", id);
        agentesService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
