package com.asg.jhipster.web.rest;

import com.asg.jhipster.JhipsterOrclApp;
import com.asg.jhipster.domain.TipoEnlace;
import com.asg.jhipster.repository.TipoEnlaceRepository;
import com.asg.jhipster.service.TipoEnlaceService;
import com.asg.jhipster.service.dto.TipoEnlaceDTO;
import com.asg.jhipster.service.mapper.TipoEnlaceMapper;
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
 * Integration tests for the {@Link TipoEnlaceResource} REST controller.
 */
@SpringBootTest(classes = JhipsterOrclApp.class)
public class TipoEnlaceResourceIT {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_TITULO = "AAAAAAAAAA";
    private static final String UPDATED_TITULO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private TipoEnlaceRepository tipoEnlaceRepository;

    @Autowired
    private TipoEnlaceMapper tipoEnlaceMapper;

    @Autowired
    private TipoEnlaceService tipoEnlaceService;

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

    private MockMvc restTipoEnlaceMockMvc;

    private TipoEnlace tipoEnlace;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoEnlaceResource tipoEnlaceResource = new TipoEnlaceResource(tipoEnlaceService);
        this.restTipoEnlaceMockMvc = MockMvcBuilders.standaloneSetup(tipoEnlaceResource)
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
    public static TipoEnlace createEntity(EntityManager em) {
        TipoEnlace tipoEnlace = new TipoEnlace()
            .codigo(DEFAULT_CODIGO)
            .titulo(DEFAULT_TITULO)
            .descripcion(DEFAULT_DESCRIPCION);
        return tipoEnlace;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoEnlace createUpdatedEntity(EntityManager em) {
        TipoEnlace tipoEnlace = new TipoEnlace()
            .codigo(UPDATED_CODIGO)
            .titulo(UPDATED_TITULO)
            .descripcion(UPDATED_DESCRIPCION);
        return tipoEnlace;
    }

    @BeforeEach
    public void initTest() {
        tipoEnlace = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoEnlace() throws Exception {
        int databaseSizeBeforeCreate = tipoEnlaceRepository.findAll().size();

        // Create the TipoEnlace
        TipoEnlaceDTO tipoEnlaceDTO = tipoEnlaceMapper.toDto(tipoEnlace);
        restTipoEnlaceMockMvc.perform(post("/api/tipo-enlaces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoEnlaceDTO)))
            .andExpect(status().isCreated());

        // Validate the TipoEnlace in the database
        List<TipoEnlace> tipoEnlaceList = tipoEnlaceRepository.findAll();
        assertThat(tipoEnlaceList).hasSize(databaseSizeBeforeCreate + 1);
        TipoEnlace testTipoEnlace = tipoEnlaceList.get(tipoEnlaceList.size() - 1);
        assertThat(testTipoEnlace.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testTipoEnlace.getTitulo()).isEqualTo(DEFAULT_TITULO);
        assertThat(testTipoEnlace.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createTipoEnlaceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoEnlaceRepository.findAll().size();

        // Create the TipoEnlace with an existing ID
        tipoEnlace.setId(1L);
        TipoEnlaceDTO tipoEnlaceDTO = tipoEnlaceMapper.toDto(tipoEnlace);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoEnlaceMockMvc.perform(post("/api/tipo-enlaces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoEnlaceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TipoEnlace in the database
        List<TipoEnlace> tipoEnlaceList = tipoEnlaceRepository.findAll();
        assertThat(tipoEnlaceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTipoEnlaces() throws Exception {
        // Initialize the database
        tipoEnlaceRepository.saveAndFlush(tipoEnlace);

        // Get all the tipoEnlaceList
        restTipoEnlaceMockMvc.perform(get("/api/tipo-enlaces?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoEnlace.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].titulo").value(hasItem(DEFAULT_TITULO.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }
    
    @Test
    @Transactional
    public void getTipoEnlace() throws Exception {
        // Initialize the database
        tipoEnlaceRepository.saveAndFlush(tipoEnlace);

        // Get the tipoEnlace
        restTipoEnlaceMockMvc.perform(get("/api/tipo-enlaces/{id}", tipoEnlace.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoEnlace.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.titulo").value(DEFAULT_TITULO.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTipoEnlace() throws Exception {
        // Get the tipoEnlace
        restTipoEnlaceMockMvc.perform(get("/api/tipo-enlaces/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoEnlace() throws Exception {
        // Initialize the database
        tipoEnlaceRepository.saveAndFlush(tipoEnlace);

        int databaseSizeBeforeUpdate = tipoEnlaceRepository.findAll().size();

        // Update the tipoEnlace
        TipoEnlace updatedTipoEnlace = tipoEnlaceRepository.findById(tipoEnlace.getId()).get();
        // Disconnect from session so that the updates on updatedTipoEnlace are not directly saved in db
        em.detach(updatedTipoEnlace);
        updatedTipoEnlace
            .codigo(UPDATED_CODIGO)
            .titulo(UPDATED_TITULO)
            .descripcion(UPDATED_DESCRIPCION);
        TipoEnlaceDTO tipoEnlaceDTO = tipoEnlaceMapper.toDto(updatedTipoEnlace);

        restTipoEnlaceMockMvc.perform(put("/api/tipo-enlaces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoEnlaceDTO)))
            .andExpect(status().isOk());

        // Validate the TipoEnlace in the database
        List<TipoEnlace> tipoEnlaceList = tipoEnlaceRepository.findAll();
        assertThat(tipoEnlaceList).hasSize(databaseSizeBeforeUpdate);
        TipoEnlace testTipoEnlace = tipoEnlaceList.get(tipoEnlaceList.size() - 1);
        assertThat(testTipoEnlace.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testTipoEnlace.getTitulo()).isEqualTo(UPDATED_TITULO);
        assertThat(testTipoEnlace.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoEnlace() throws Exception {
        int databaseSizeBeforeUpdate = tipoEnlaceRepository.findAll().size();

        // Create the TipoEnlace
        TipoEnlaceDTO tipoEnlaceDTO = tipoEnlaceMapper.toDto(tipoEnlace);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoEnlaceMockMvc.perform(put("/api/tipo-enlaces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoEnlaceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TipoEnlace in the database
        List<TipoEnlace> tipoEnlaceList = tipoEnlaceRepository.findAll();
        assertThat(tipoEnlaceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoEnlace() throws Exception {
        // Initialize the database
        tipoEnlaceRepository.saveAndFlush(tipoEnlace);

        int databaseSizeBeforeDelete = tipoEnlaceRepository.findAll().size();

        // Delete the tipoEnlace
        restTipoEnlaceMockMvc.perform(delete("/api/tipo-enlaces/{id}", tipoEnlace.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<TipoEnlace> tipoEnlaceList = tipoEnlaceRepository.findAll();
        assertThat(tipoEnlaceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoEnlace.class);
        TipoEnlace tipoEnlace1 = new TipoEnlace();
        tipoEnlace1.setId(1L);
        TipoEnlace tipoEnlace2 = new TipoEnlace();
        tipoEnlace2.setId(tipoEnlace1.getId());
        assertThat(tipoEnlace1).isEqualTo(tipoEnlace2);
        tipoEnlace2.setId(2L);
        assertThat(tipoEnlace1).isNotEqualTo(tipoEnlace2);
        tipoEnlace1.setId(null);
        assertThat(tipoEnlace1).isNotEqualTo(tipoEnlace2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoEnlaceDTO.class);
        TipoEnlaceDTO tipoEnlaceDTO1 = new TipoEnlaceDTO();
        tipoEnlaceDTO1.setId(1L);
        TipoEnlaceDTO tipoEnlaceDTO2 = new TipoEnlaceDTO();
        assertThat(tipoEnlaceDTO1).isNotEqualTo(tipoEnlaceDTO2);
        tipoEnlaceDTO2.setId(tipoEnlaceDTO1.getId());
        assertThat(tipoEnlaceDTO1).isEqualTo(tipoEnlaceDTO2);
        tipoEnlaceDTO2.setId(2L);
        assertThat(tipoEnlaceDTO1).isNotEqualTo(tipoEnlaceDTO2);
        tipoEnlaceDTO1.setId(null);
        assertThat(tipoEnlaceDTO1).isNotEqualTo(tipoEnlaceDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(tipoEnlaceMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(tipoEnlaceMapper.fromId(null)).isNull();
    }
}
