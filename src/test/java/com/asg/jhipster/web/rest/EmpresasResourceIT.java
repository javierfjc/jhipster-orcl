package com.asg.jhipster.web.rest;

import com.asg.jhipster.JhipsterOrclApp;
import com.asg.jhipster.domain.Empresas;
import com.asg.jhipster.repository.EmpresasRepository;
import com.asg.jhipster.service.EmpresasService;
import com.asg.jhipster.service.dto.EmpresasDTO;
import com.asg.jhipster.service.mapper.EmpresasMapper;
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
 * Integration tests for the {@Link EmpresasResource} REST controller.
 */
@SpringBootTest(classes = JhipsterOrclApp.class)
public class EmpresasResourceIT {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_TITULO = "AAAAAAAAAA";
    private static final String UPDATED_TITULO = "BBBBBBBBBB";

    private static final String DEFAULT_CIF = "AAAAAAAAAA";
    private static final String UPDATED_CIF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA_ALTA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_ALTA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA_ESTADO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_ESTADO = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_EXCLUSIVA = "AAAAAAAAAA";
    private static final String UPDATED_EXCLUSIVA = "BBBBBBBBBB";

    @Autowired
    private EmpresasRepository empresasRepository;

    @Autowired
    private EmpresasMapper empresasMapper;

    @Autowired
    private EmpresasService empresasService;

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

    private MockMvc restEmpresasMockMvc;

    private Empresas empresas;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmpresasResource empresasResource = new EmpresasResource(empresasService);
        this.restEmpresasMockMvc = MockMvcBuilders.standaloneSetup(empresasResource)
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
    public static Empresas createEntity(EntityManager em) {
        Empresas empresas = new Empresas()
            .codigo(DEFAULT_CODIGO)
            .descripcion(DEFAULT_DESCRIPCION)
            .titulo(DEFAULT_TITULO)
            .cif(DEFAULT_CIF)
            .fechaAlta(DEFAULT_FECHA_ALTA)
            .estado(DEFAULT_ESTADO)
            .fechaEstado(DEFAULT_FECHA_ESTADO)
            .exclusiva(DEFAULT_EXCLUSIVA);
        return empresas;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Empresas createUpdatedEntity(EntityManager em) {
        Empresas empresas = new Empresas()
            .codigo(UPDATED_CODIGO)
            .descripcion(UPDATED_DESCRIPCION)
            .titulo(UPDATED_TITULO)
            .cif(UPDATED_CIF)
            .fechaAlta(UPDATED_FECHA_ALTA)
            .estado(UPDATED_ESTADO)
            .fechaEstado(UPDATED_FECHA_ESTADO)
            .exclusiva(UPDATED_EXCLUSIVA);
        return empresas;
    }

    @BeforeEach
    public void initTest() {
        empresas = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmpresas() throws Exception {
        int databaseSizeBeforeCreate = empresasRepository.findAll().size();

        // Create the Empresas
        EmpresasDTO empresasDTO = empresasMapper.toDto(empresas);
        restEmpresasMockMvc.perform(post("/api/empresas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(empresasDTO)))
            .andExpect(status().isCreated());

        // Validate the Empresas in the database
        List<Empresas> empresasList = empresasRepository.findAll();
        assertThat(empresasList).hasSize(databaseSizeBeforeCreate + 1);
        Empresas testEmpresas = empresasList.get(empresasList.size() - 1);
        assertThat(testEmpresas.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testEmpresas.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testEmpresas.getTitulo()).isEqualTo(DEFAULT_TITULO);
        assertThat(testEmpresas.getCif()).isEqualTo(DEFAULT_CIF);
        assertThat(testEmpresas.getFechaAlta()).isEqualTo(DEFAULT_FECHA_ALTA);
        assertThat(testEmpresas.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testEmpresas.getFechaEstado()).isEqualTo(DEFAULT_FECHA_ESTADO);
        assertThat(testEmpresas.getExclusiva()).isEqualTo(DEFAULT_EXCLUSIVA);
    }

    @Test
    @Transactional
    public void createEmpresasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = empresasRepository.findAll().size();

        // Create the Empresas with an existing ID
        empresas.setId(1L);
        EmpresasDTO empresasDTO = empresasMapper.toDto(empresas);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmpresasMockMvc.perform(post("/api/empresas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(empresasDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Empresas in the database
        List<Empresas> empresasList = empresasRepository.findAll();
        assertThat(empresasList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEmpresas() throws Exception {
        // Initialize the database
        empresasRepository.saveAndFlush(empresas);

        // Get all the empresasList
        restEmpresasMockMvc.perform(get("/api/empresas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(empresas.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].titulo").value(hasItem(DEFAULT_TITULO.toString())))
            .andExpect(jsonPath("$.[*].cif").value(hasItem(DEFAULT_CIF.toString())))
            .andExpect(jsonPath("$.[*].fechaAlta").value(hasItem(DEFAULT_FECHA_ALTA.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())))
            .andExpect(jsonPath("$.[*].fechaEstado").value(hasItem(DEFAULT_FECHA_ESTADO.toString())))
            .andExpect(jsonPath("$.[*].exclusiva").value(hasItem(DEFAULT_EXCLUSIVA.toString())));
    }
    
    @Test
    @Transactional
    public void getEmpresas() throws Exception {
        // Initialize the database
        empresasRepository.saveAndFlush(empresas);

        // Get the empresas
        restEmpresasMockMvc.perform(get("/api/empresas/{id}", empresas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(empresas.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.titulo").value(DEFAULT_TITULO.toString()))
            .andExpect(jsonPath("$.cif").value(DEFAULT_CIF.toString()))
            .andExpect(jsonPath("$.fechaAlta").value(DEFAULT_FECHA_ALTA.toString()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()))
            .andExpect(jsonPath("$.fechaEstado").value(DEFAULT_FECHA_ESTADO.toString()))
            .andExpect(jsonPath("$.exclusiva").value(DEFAULT_EXCLUSIVA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmpresas() throws Exception {
        // Get the empresas
        restEmpresasMockMvc.perform(get("/api/empresas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmpresas() throws Exception {
        // Initialize the database
        empresasRepository.saveAndFlush(empresas);

        int databaseSizeBeforeUpdate = empresasRepository.findAll().size();

        // Update the empresas
        Empresas updatedEmpresas = empresasRepository.findById(empresas.getId()).get();
        // Disconnect from session so that the updates on updatedEmpresas are not directly saved in db
        em.detach(updatedEmpresas);
        updatedEmpresas
            .codigo(UPDATED_CODIGO)
            .descripcion(UPDATED_DESCRIPCION)
            .titulo(UPDATED_TITULO)
            .cif(UPDATED_CIF)
            .fechaAlta(UPDATED_FECHA_ALTA)
            .estado(UPDATED_ESTADO)
            .fechaEstado(UPDATED_FECHA_ESTADO)
            .exclusiva(UPDATED_EXCLUSIVA);
        EmpresasDTO empresasDTO = empresasMapper.toDto(updatedEmpresas);

        restEmpresasMockMvc.perform(put("/api/empresas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(empresasDTO)))
            .andExpect(status().isOk());

        // Validate the Empresas in the database
        List<Empresas> empresasList = empresasRepository.findAll();
        assertThat(empresasList).hasSize(databaseSizeBeforeUpdate);
        Empresas testEmpresas = empresasList.get(empresasList.size() - 1);
        assertThat(testEmpresas.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testEmpresas.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testEmpresas.getTitulo()).isEqualTo(UPDATED_TITULO);
        assertThat(testEmpresas.getCif()).isEqualTo(UPDATED_CIF);
        assertThat(testEmpresas.getFechaAlta()).isEqualTo(UPDATED_FECHA_ALTA);
        assertThat(testEmpresas.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testEmpresas.getFechaEstado()).isEqualTo(UPDATED_FECHA_ESTADO);
        assertThat(testEmpresas.getExclusiva()).isEqualTo(UPDATED_EXCLUSIVA);
    }

    @Test
    @Transactional
    public void updateNonExistingEmpresas() throws Exception {
        int databaseSizeBeforeUpdate = empresasRepository.findAll().size();

        // Create the Empresas
        EmpresasDTO empresasDTO = empresasMapper.toDto(empresas);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmpresasMockMvc.perform(put("/api/empresas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(empresasDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Empresas in the database
        List<Empresas> empresasList = empresasRepository.findAll();
        assertThat(empresasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEmpresas() throws Exception {
        // Initialize the database
        empresasRepository.saveAndFlush(empresas);

        int databaseSizeBeforeDelete = empresasRepository.findAll().size();

        // Delete the empresas
        restEmpresasMockMvc.perform(delete("/api/empresas/{id}", empresas.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Empresas> empresasList = empresasRepository.findAll();
        assertThat(empresasList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Empresas.class);
        Empresas empresas1 = new Empresas();
        empresas1.setId(1L);
        Empresas empresas2 = new Empresas();
        empresas2.setId(empresas1.getId());
        assertThat(empresas1).isEqualTo(empresas2);
        empresas2.setId(2L);
        assertThat(empresas1).isNotEqualTo(empresas2);
        empresas1.setId(null);
        assertThat(empresas1).isNotEqualTo(empresas2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmpresasDTO.class);
        EmpresasDTO empresasDTO1 = new EmpresasDTO();
        empresasDTO1.setId(1L);
        EmpresasDTO empresasDTO2 = new EmpresasDTO();
        assertThat(empresasDTO1).isNotEqualTo(empresasDTO2);
        empresasDTO2.setId(empresasDTO1.getId());
        assertThat(empresasDTO1).isEqualTo(empresasDTO2);
        empresasDTO2.setId(2L);
        assertThat(empresasDTO1).isNotEqualTo(empresasDTO2);
        empresasDTO1.setId(null);
        assertThat(empresasDTO1).isNotEqualTo(empresasDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(empresasMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(empresasMapper.fromId(null)).isNull();
    }
}
