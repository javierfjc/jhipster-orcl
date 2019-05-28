package com.asg.jhipster.web.rest;

import com.asg.jhipster.JhipsterOrclApp;
import com.asg.jhipster.domain.Almacenes;
import com.asg.jhipster.repository.AlmacenesRepository;
import com.asg.jhipster.service.AlmacenesService;
import com.asg.jhipster.service.dto.AlmacenesDTO;
import com.asg.jhipster.service.mapper.AlmacenesMapper;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.asg.jhipster.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link AlmacenesResource} REST controller.
 */
@SpringBootTest(classes = JhipsterOrclApp.class)
public class AlmacenesResourceIT {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_TITULO = "AAAAAAAAAA";
    private static final String UPDATED_TITULO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA_ALTA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_ALTA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA_ESTADO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_ESTADO = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private AlmacenesRepository almacenesRepository;

    @Autowired
    private AlmacenesMapper almacenesMapper;

    @Autowired
    private AlmacenesService almacenesService;

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

    private MockMvc restAlmacenesMockMvc;

    private Almacenes almacenes;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AlmacenesResource almacenesResource = new AlmacenesResource(almacenesService);
        this.restAlmacenesMockMvc = MockMvcBuilders.standaloneSetup(almacenesResource)
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
    public static Almacenes createEntity(EntityManager em) {
        Almacenes almacenes = new Almacenes()
            .codigo(DEFAULT_CODIGO)
            .titulo(DEFAULT_TITULO)
            .fechaAlta(DEFAULT_FECHA_ALTA)
            .estado(DEFAULT_ESTADO)
            .fechaEstado(DEFAULT_FECHA_ESTADO);
        return almacenes;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Almacenes createUpdatedEntity(EntityManager em) {
        Almacenes almacenes = new Almacenes()
            .codigo(UPDATED_CODIGO)
            .titulo(UPDATED_TITULO)
            .fechaAlta(UPDATED_FECHA_ALTA)
            .estado(UPDATED_ESTADO)
            .fechaEstado(UPDATED_FECHA_ESTADO);
        return almacenes;
    }

    @BeforeEach
    public void initTest() {
        almacenes = createEntity(em);
    }

    @Test
    @Transactional
    public void createAlmacenes() throws Exception {
        int databaseSizeBeforeCreate = almacenesRepository.findAll().size();

        // Create the Almacenes
        AlmacenesDTO almacenesDTO = almacenesMapper.toDto(almacenes);
        restAlmacenesMockMvc.perform(post("/api/almacenes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(almacenesDTO)))
            .andExpect(status().isCreated());

        // Validate the Almacenes in the database
        List<Almacenes> almacenesList = almacenesRepository.findAll();
        assertThat(almacenesList).hasSize(databaseSizeBeforeCreate + 1);
        Almacenes testAlmacenes = almacenesList.get(almacenesList.size() - 1);
        assertThat(testAlmacenes.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testAlmacenes.getTitulo()).isEqualTo(DEFAULT_TITULO);
        assertThat(testAlmacenes.getFechaAlta()).isEqualTo(DEFAULT_FECHA_ALTA);
        assertThat(testAlmacenes.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testAlmacenes.getFechaEstado()).isEqualTo(DEFAULT_FECHA_ESTADO);
    }

    @Test
    @Transactional
    public void createAlmacenesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = almacenesRepository.findAll().size();

        // Create the Almacenes with an existing ID
        almacenes.setId(1L);
        AlmacenesDTO almacenesDTO = almacenesMapper.toDto(almacenes);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAlmacenesMockMvc.perform(post("/api/almacenes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(almacenesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Almacenes in the database
        List<Almacenes> almacenesList = almacenesRepository.findAll();
        assertThat(almacenesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAlmacenes() throws Exception {
        // Initialize the database
        almacenesRepository.saveAndFlush(almacenes);

        // Get all the almacenesList
        restAlmacenesMockMvc.perform(get("/api/almacenes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(almacenes.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].titulo").value(hasItem(DEFAULT_TITULO.toString())))
            .andExpect(jsonPath("$.[*].fechaAlta").value(hasItem(DEFAULT_FECHA_ALTA.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())))
            .andExpect(jsonPath("$.[*].fechaEstado").value(hasItem(DEFAULT_FECHA_ESTADO.toString())));
    }
    
    @Test
    @Transactional
    public void getAlmacenes() throws Exception {
        // Initialize the database
        almacenesRepository.saveAndFlush(almacenes);

        // Get the almacenes
        restAlmacenesMockMvc.perform(get("/api/almacenes/{id}", almacenes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(almacenes.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.titulo").value(DEFAULT_TITULO.toString()))
            .andExpect(jsonPath("$.fechaAlta").value(DEFAULT_FECHA_ALTA.toString()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()))
            .andExpect(jsonPath("$.fechaEstado").value(DEFAULT_FECHA_ESTADO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAlmacenes() throws Exception {
        // Get the almacenes
        restAlmacenesMockMvc.perform(get("/api/almacenes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAlmacenes() throws Exception {
        // Initialize the database
        almacenesRepository.saveAndFlush(almacenes);

        int databaseSizeBeforeUpdate = almacenesRepository.findAll().size();

        // Update the almacenes
        Almacenes updatedAlmacenes = almacenesRepository.findById(almacenes.getId()).get();
        // Disconnect from session so that the updates on updatedAlmacenes are not directly saved in db
        em.detach(updatedAlmacenes);
        updatedAlmacenes
            .codigo(UPDATED_CODIGO)
            .titulo(UPDATED_TITULO)
            .fechaAlta(UPDATED_FECHA_ALTA)
            .estado(UPDATED_ESTADO)
            .fechaEstado(UPDATED_FECHA_ESTADO);
        AlmacenesDTO almacenesDTO = almacenesMapper.toDto(updatedAlmacenes);

        restAlmacenesMockMvc.perform(put("/api/almacenes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(almacenesDTO)))
            .andExpect(status().isOk());

        // Validate the Almacenes in the database
        List<Almacenes> almacenesList = almacenesRepository.findAll();
        assertThat(almacenesList).hasSize(databaseSizeBeforeUpdate);
        Almacenes testAlmacenes = almacenesList.get(almacenesList.size() - 1);
        assertThat(testAlmacenes.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testAlmacenes.getTitulo()).isEqualTo(UPDATED_TITULO);
        assertThat(testAlmacenes.getFechaAlta()).isEqualTo(UPDATED_FECHA_ALTA);
        assertThat(testAlmacenes.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testAlmacenes.getFechaEstado()).isEqualTo(UPDATED_FECHA_ESTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingAlmacenes() throws Exception {
        int databaseSizeBeforeUpdate = almacenesRepository.findAll().size();

        // Create the Almacenes
        AlmacenesDTO almacenesDTO = almacenesMapper.toDto(almacenes);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAlmacenesMockMvc.perform(put("/api/almacenes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(almacenesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Almacenes in the database
        List<Almacenes> almacenesList = almacenesRepository.findAll();
        assertThat(almacenesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAlmacenes() throws Exception {
        // Initialize the database
        almacenesRepository.saveAndFlush(almacenes);

        int databaseSizeBeforeDelete = almacenesRepository.findAll().size();

        // Delete the almacenes
        restAlmacenesMockMvc.perform(delete("/api/almacenes/{id}", almacenes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Almacenes> almacenesList = almacenesRepository.findAll();
        assertThat(almacenesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Almacenes.class);
        Almacenes almacenes1 = new Almacenes();
        almacenes1.setId(1L);
        Almacenes almacenes2 = new Almacenes();
        almacenes2.setId(almacenes1.getId());
        assertThat(almacenes1).isEqualTo(almacenes2);
        almacenes2.setId(2L);
        assertThat(almacenes1).isNotEqualTo(almacenes2);
        almacenes1.setId(null);
        assertThat(almacenes1).isNotEqualTo(almacenes2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AlmacenesDTO.class);
        AlmacenesDTO almacenesDTO1 = new AlmacenesDTO();
        almacenesDTO1.setId(1L);
        AlmacenesDTO almacenesDTO2 = new AlmacenesDTO();
        assertThat(almacenesDTO1).isNotEqualTo(almacenesDTO2);
        almacenesDTO2.setId(almacenesDTO1.getId());
        assertThat(almacenesDTO1).isEqualTo(almacenesDTO2);
        almacenesDTO2.setId(2L);
        assertThat(almacenesDTO1).isNotEqualTo(almacenesDTO2);
        almacenesDTO1.setId(null);
        assertThat(almacenesDTO1).isNotEqualTo(almacenesDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(almacenesMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(almacenesMapper.fromId(null)).isNull();
    }
}
