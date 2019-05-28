package com.asg.jhipster.web.rest;

import com.asg.jhipster.JhipsterOrclApp;
import com.asg.jhipster.domain.TipoAgente;
import com.asg.jhipster.repository.TipoAgenteRepository;
import com.asg.jhipster.service.TipoAgenteService;
import com.asg.jhipster.service.dto.TipoAgenteDTO;
import com.asg.jhipster.service.mapper.TipoAgenteMapper;
import com.asg.jhipster.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.asg.jhipster.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link TipoAgenteResource} REST controller.
 */
@SpringBootTest(classes = JhipsterOrclApp.class)
public class TipoAgenteResourceIT {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_TITULO = "AAAAAAAAAA";
    private static final String UPDATED_TITULO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private TipoAgenteRepository tipoAgenteRepository;

    @Autowired
    private TipoAgenteMapper tipoAgenteMapper;

    @Autowired
    private TipoAgenteService tipoAgenteService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTipoAgenteMockMvc;

    private TipoAgente tipoAgente;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoAgenteResource tipoAgenteResource = new TipoAgenteResource(tipoAgenteService);
        this.restTipoAgenteMockMvc = MockMvcBuilders.standaloneSetup(tipoAgenteResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoAgente createEntity(EntityManager em) {
        TipoAgente tipoAgente = new TipoAgente()
            .codigo(DEFAULT_CODIGO)
            .titulo(DEFAULT_TITULO)
            .descripcion(DEFAULT_DESCRIPCION);
        return tipoAgente;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoAgente createUpdatedEntity(EntityManager em) {
        TipoAgente tipoAgente = new TipoAgente()
            .codigo(UPDATED_CODIGO)
            .titulo(UPDATED_TITULO)
            .descripcion(UPDATED_DESCRIPCION);
        return tipoAgente;
    }

    @BeforeEach
    public void initTest() {
        tipoAgente = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoAgente() throws Exception {
        int databaseSizeBeforeCreate = tipoAgenteRepository.findAll().size();

        // Create the TipoAgente
        TipoAgenteDTO tipoAgenteDTO = tipoAgenteMapper.toDto(tipoAgente);
        restTipoAgenteMockMvc.perform(post("/api/tipo-agentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoAgenteDTO)))
            .andExpect(status().isCreated());

        // Validate the TipoAgente in the database
        List<TipoAgente> tipoAgenteList = tipoAgenteRepository.findAll();
        assertThat(tipoAgenteList).hasSize(databaseSizeBeforeCreate + 1);
        TipoAgente testTipoAgente = tipoAgenteList.get(tipoAgenteList.size() - 1);
        assertThat(testTipoAgente.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testTipoAgente.getTitulo()).isEqualTo(DEFAULT_TITULO);
        assertThat(testTipoAgente.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createTipoAgenteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoAgenteRepository.findAll().size();

        // Create the TipoAgente with an existing ID
        tipoAgente.setId(1L);
        TipoAgenteDTO tipoAgenteDTO = tipoAgenteMapper.toDto(tipoAgente);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoAgenteMockMvc.perform(post("/api/tipo-agentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoAgenteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TipoAgente in the database
        List<TipoAgente> tipoAgenteList = tipoAgenteRepository.findAll();
        assertThat(tipoAgenteList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTipoAgentes() throws Exception {
        // Initialize the database
        tipoAgenteRepository.saveAndFlush(tipoAgente);

        // Get all the tipoAgenteList
        restTipoAgenteMockMvc.perform(get("/api/tipo-agentes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoAgente.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].titulo").value(hasItem(DEFAULT_TITULO.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }
    
    @Test
    @Transactional
    public void getTipoAgente() throws Exception {
        // Initialize the database
        tipoAgenteRepository.saveAndFlush(tipoAgente);

        // Get the tipoAgente
        restTipoAgenteMockMvc.perform(get("/api/tipo-agentes/{id}", tipoAgente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoAgente.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.titulo").value(DEFAULT_TITULO.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTipoAgente() throws Exception {
        // Get the tipoAgente
        restTipoAgenteMockMvc.perform(get("/api/tipo-agentes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoAgente() throws Exception {
        // Initialize the database
        tipoAgenteRepository.saveAndFlush(tipoAgente);

        int databaseSizeBeforeUpdate = tipoAgenteRepository.findAll().size();

        // Update the tipoAgente
        TipoAgente updatedTipoAgente = tipoAgenteRepository.findById(tipoAgente.getId()).get();
        // Disconnect from session so that the updates on updatedTipoAgente are not directly saved in db
        em.detach(updatedTipoAgente);
        updatedTipoAgente
            .codigo(UPDATED_CODIGO)
            .titulo(UPDATED_TITULO)
            .descripcion(UPDATED_DESCRIPCION);
        TipoAgenteDTO tipoAgenteDTO = tipoAgenteMapper.toDto(updatedTipoAgente);

        restTipoAgenteMockMvc.perform(put("/api/tipo-agentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoAgenteDTO)))
            .andExpect(status().isOk());

        // Validate the TipoAgente in the database
        List<TipoAgente> tipoAgenteList = tipoAgenteRepository.findAll();
        assertThat(tipoAgenteList).hasSize(databaseSizeBeforeUpdate);
        TipoAgente testTipoAgente = tipoAgenteList.get(tipoAgenteList.size() - 1);
        assertThat(testTipoAgente.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testTipoAgente.getTitulo()).isEqualTo(UPDATED_TITULO);
        assertThat(testTipoAgente.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoAgente() throws Exception {
        int databaseSizeBeforeUpdate = tipoAgenteRepository.findAll().size();

        // Create the TipoAgente
        TipoAgenteDTO tipoAgenteDTO = tipoAgenteMapper.toDto(tipoAgente);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoAgenteMockMvc.perform(put("/api/tipo-agentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoAgenteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TipoAgente in the database
        List<TipoAgente> tipoAgenteList = tipoAgenteRepository.findAll();
        assertThat(tipoAgenteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoAgente() throws Exception {
        // Initialize the database
        tipoAgenteRepository.saveAndFlush(tipoAgente);

        int databaseSizeBeforeDelete = tipoAgenteRepository.findAll().size();

        // Delete the tipoAgente
        restTipoAgenteMockMvc.perform(delete("/api/tipo-agentes/{id}", tipoAgente.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<TipoAgente> tipoAgenteList = tipoAgenteRepository.findAll();
        assertThat(tipoAgenteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoAgente.class);
        TipoAgente tipoAgente1 = new TipoAgente();
        tipoAgente1.setId(1L);
        TipoAgente tipoAgente2 = new TipoAgente();
        tipoAgente2.setId(tipoAgente1.getId());
        assertThat(tipoAgente1).isEqualTo(tipoAgente2);
        tipoAgente2.setId(2L);
        assertThat(tipoAgente1).isNotEqualTo(tipoAgente2);
        tipoAgente1.setId(null);
        assertThat(tipoAgente1).isNotEqualTo(tipoAgente2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoAgenteDTO.class);
        TipoAgenteDTO tipoAgenteDTO1 = new TipoAgenteDTO();
        tipoAgenteDTO1.setId(1L);
        TipoAgenteDTO tipoAgenteDTO2 = new TipoAgenteDTO();
        assertThat(tipoAgenteDTO1).isNotEqualTo(tipoAgenteDTO2);
        tipoAgenteDTO2.setId(tipoAgenteDTO1.getId());
        assertThat(tipoAgenteDTO1).isEqualTo(tipoAgenteDTO2);
        tipoAgenteDTO2.setId(2L);
        assertThat(tipoAgenteDTO1).isNotEqualTo(tipoAgenteDTO2);
        tipoAgenteDTO1.setId(null);
        assertThat(tipoAgenteDTO1).isNotEqualTo(tipoAgenteDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(tipoAgenteMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(tipoAgenteMapper.fromId(null)).isNull();
    }
}
