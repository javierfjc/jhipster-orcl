package com.asg.jhipster.web.rest;

import com.asg.jhipster.JhipsterOrclApp;
import com.asg.jhipster.domain.TipoArea;
import com.asg.jhipster.repository.TipoAreaRepository;
import com.asg.jhipster.service.TipoAreaService;
import com.asg.jhipster.service.dto.TipoAreaDTO;
import com.asg.jhipster.service.mapper.TipoAreaMapper;
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
 * Integration tests for the {@Link TipoAreaResource} REST controller.
 */
@SpringBootTest(classes = JhipsterOrclApp.class)
public class TipoAreaResourceIT {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_TITULO = "AAAAAAAAAA";
    private static final String UPDATED_TITULO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private TipoAreaRepository tipoAreaRepository;

    @Autowired
    private TipoAreaMapper tipoAreaMapper;

    @Autowired
    private TipoAreaService tipoAreaService;

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

    private MockMvc restTipoAreaMockMvc;

    private TipoArea tipoArea;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoAreaResource tipoAreaResource = new TipoAreaResource(tipoAreaService);
        this.restTipoAreaMockMvc = MockMvcBuilders.standaloneSetup(tipoAreaResource)
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
    public static TipoArea createEntity(EntityManager em) {
        TipoArea tipoArea = new TipoArea()
            .codigo(DEFAULT_CODIGO)
            .titulo(DEFAULT_TITULO)
            .descripcion(DEFAULT_DESCRIPCION);
        return tipoArea;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoArea createUpdatedEntity(EntityManager em) {
        TipoArea tipoArea = new TipoArea()
            .codigo(UPDATED_CODIGO)
            .titulo(UPDATED_TITULO)
            .descripcion(UPDATED_DESCRIPCION);
        return tipoArea;
    }

    @BeforeEach
    public void initTest() {
        tipoArea = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoArea() throws Exception {
        int databaseSizeBeforeCreate = tipoAreaRepository.findAll().size();

        // Create the TipoArea
        TipoAreaDTO tipoAreaDTO = tipoAreaMapper.toDto(tipoArea);
        restTipoAreaMockMvc.perform(post("/api/tipo-areas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoAreaDTO)))
            .andExpect(status().isCreated());

        // Validate the TipoArea in the database
        List<TipoArea> tipoAreaList = tipoAreaRepository.findAll();
        assertThat(tipoAreaList).hasSize(databaseSizeBeforeCreate + 1);
        TipoArea testTipoArea = tipoAreaList.get(tipoAreaList.size() - 1);
        assertThat(testTipoArea.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testTipoArea.getTitulo()).isEqualTo(DEFAULT_TITULO);
        assertThat(testTipoArea.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createTipoAreaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoAreaRepository.findAll().size();

        // Create the TipoArea with an existing ID
        tipoArea.setId(1L);
        TipoAreaDTO tipoAreaDTO = tipoAreaMapper.toDto(tipoArea);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoAreaMockMvc.perform(post("/api/tipo-areas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoAreaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TipoArea in the database
        List<TipoArea> tipoAreaList = tipoAreaRepository.findAll();
        assertThat(tipoAreaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTipoAreas() throws Exception {
        // Initialize the database
        tipoAreaRepository.saveAndFlush(tipoArea);

        // Get all the tipoAreaList
        restTipoAreaMockMvc.perform(get("/api/tipo-areas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoArea.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].titulo").value(hasItem(DEFAULT_TITULO.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }
    
    @Test
    @Transactional
    public void getTipoArea() throws Exception {
        // Initialize the database
        tipoAreaRepository.saveAndFlush(tipoArea);

        // Get the tipoArea
        restTipoAreaMockMvc.perform(get("/api/tipo-areas/{id}", tipoArea.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoArea.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.titulo").value(DEFAULT_TITULO.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTipoArea() throws Exception {
        // Get the tipoArea
        restTipoAreaMockMvc.perform(get("/api/tipo-areas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoArea() throws Exception {
        // Initialize the database
        tipoAreaRepository.saveAndFlush(tipoArea);

        int databaseSizeBeforeUpdate = tipoAreaRepository.findAll().size();

        // Update the tipoArea
        TipoArea updatedTipoArea = tipoAreaRepository.findById(tipoArea.getId()).get();
        // Disconnect from session so that the updates on updatedTipoArea are not directly saved in db
        em.detach(updatedTipoArea);
        updatedTipoArea
            .codigo(UPDATED_CODIGO)
            .titulo(UPDATED_TITULO)
            .descripcion(UPDATED_DESCRIPCION);
        TipoAreaDTO tipoAreaDTO = tipoAreaMapper.toDto(updatedTipoArea);

        restTipoAreaMockMvc.perform(put("/api/tipo-areas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoAreaDTO)))
            .andExpect(status().isOk());

        // Validate the TipoArea in the database
        List<TipoArea> tipoAreaList = tipoAreaRepository.findAll();
        assertThat(tipoAreaList).hasSize(databaseSizeBeforeUpdate);
        TipoArea testTipoArea = tipoAreaList.get(tipoAreaList.size() - 1);
        assertThat(testTipoArea.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testTipoArea.getTitulo()).isEqualTo(UPDATED_TITULO);
        assertThat(testTipoArea.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoArea() throws Exception {
        int databaseSizeBeforeUpdate = tipoAreaRepository.findAll().size();

        // Create the TipoArea
        TipoAreaDTO tipoAreaDTO = tipoAreaMapper.toDto(tipoArea);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoAreaMockMvc.perform(put("/api/tipo-areas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoAreaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TipoArea in the database
        List<TipoArea> tipoAreaList = tipoAreaRepository.findAll();
        assertThat(tipoAreaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoArea() throws Exception {
        // Initialize the database
        tipoAreaRepository.saveAndFlush(tipoArea);

        int databaseSizeBeforeDelete = tipoAreaRepository.findAll().size();

        // Delete the tipoArea
        restTipoAreaMockMvc.perform(delete("/api/tipo-areas/{id}", tipoArea.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<TipoArea> tipoAreaList = tipoAreaRepository.findAll();
        assertThat(tipoAreaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoArea.class);
        TipoArea tipoArea1 = new TipoArea();
        tipoArea1.setId(1L);
        TipoArea tipoArea2 = new TipoArea();
        tipoArea2.setId(tipoArea1.getId());
        assertThat(tipoArea1).isEqualTo(tipoArea2);
        tipoArea2.setId(2L);
        assertThat(tipoArea1).isNotEqualTo(tipoArea2);
        tipoArea1.setId(null);
        assertThat(tipoArea1).isNotEqualTo(tipoArea2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoAreaDTO.class);
        TipoAreaDTO tipoAreaDTO1 = new TipoAreaDTO();
        tipoAreaDTO1.setId(1L);
        TipoAreaDTO tipoAreaDTO2 = new TipoAreaDTO();
        assertThat(tipoAreaDTO1).isNotEqualTo(tipoAreaDTO2);
        tipoAreaDTO2.setId(tipoAreaDTO1.getId());
        assertThat(tipoAreaDTO1).isEqualTo(tipoAreaDTO2);
        tipoAreaDTO2.setId(2L);
        assertThat(tipoAreaDTO1).isNotEqualTo(tipoAreaDTO2);
        tipoAreaDTO1.setId(null);
        assertThat(tipoAreaDTO1).isNotEqualTo(tipoAreaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(tipoAreaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(tipoAreaMapper.fromId(null)).isNull();
    }
}
