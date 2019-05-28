package com.asg.jhipster.web.rest;

import com.asg.jhipster.JhipsterOrclApp;
import com.asg.jhipster.domain.Agentes;
import com.asg.jhipster.repository.AgentesRepository;
import com.asg.jhipster.service.AgentesService;
import com.asg.jhipster.service.dto.AgentesDTO;
import com.asg.jhipster.service.mapper.AgentesMapper;
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

import com.asg.jhipster.domain.enumeration.DominioSiNo;
/**
 * Integration tests for the {@Link AgentesResource} REST controller.
 */
@SpringBootTest(classes = JhipsterOrclApp.class)
public class AgentesResourceIT {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA_ALTA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_ALTA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA_ESTADO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_ESTADO = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_TP_NUMERO = "AAAAAAAAAA";
    private static final String UPDATED_TP_NUMERO = "BBBBBBBBBB";

    private static final DominioSiNo DEFAULT_TP_REGALOS = DominioSiNo.SI;
    private static final DominioSiNo UPDATED_TP_REGALOS = DominioSiNo.NO;

    @Autowired
    private AgentesRepository agentesRepository;

    @Autowired
    private AgentesMapper agentesMapper;

    @Autowired
    private AgentesService agentesService;

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

    private MockMvc restAgentesMockMvc;

    private Agentes agentes;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AgentesResource agentesResource = new AgentesResource(agentesService);
        this.restAgentesMockMvc = MockMvcBuilders.standaloneSetup(agentesResource)
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
    public static Agentes createEntity(EntityManager em) {
        Agentes agentes = new Agentes()
            .codigo(DEFAULT_CODIGO)
            .descripcion(DEFAULT_DESCRIPCION)
            .fechaAlta(DEFAULT_FECHA_ALTA)
            .estado(DEFAULT_ESTADO)
            .fechaEstado(DEFAULT_FECHA_ESTADO)
            .tpNumero(DEFAULT_TP_NUMERO)
            .tpRegalos(DEFAULT_TP_REGALOS);
        return agentes;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Agentes createUpdatedEntity(EntityManager em) {
        Agentes agentes = new Agentes()
            .codigo(UPDATED_CODIGO)
            .descripcion(UPDATED_DESCRIPCION)
            .fechaAlta(UPDATED_FECHA_ALTA)
            .estado(UPDATED_ESTADO)
            .fechaEstado(UPDATED_FECHA_ESTADO)
            .tpNumero(UPDATED_TP_NUMERO)
            .tpRegalos(UPDATED_TP_REGALOS);
        return agentes;
    }

    @BeforeEach
    public void initTest() {
        agentes = createEntity(em);
    }

    @Test
    @Transactional
    public void createAgentes() throws Exception {
        int databaseSizeBeforeCreate = agentesRepository.findAll().size();

        // Create the Agentes
        AgentesDTO agentesDTO = agentesMapper.toDto(agentes);
        restAgentesMockMvc.perform(post("/api/agentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agentesDTO)))
            .andExpect(status().isCreated());

        // Validate the Agentes in the database
        List<Agentes> agentesList = agentesRepository.findAll();
        assertThat(agentesList).hasSize(databaseSizeBeforeCreate + 1);
        Agentes testAgentes = agentesList.get(agentesList.size() - 1);
        assertThat(testAgentes.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testAgentes.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testAgentes.getFechaAlta()).isEqualTo(DEFAULT_FECHA_ALTA);
        assertThat(testAgentes.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testAgentes.getFechaEstado()).isEqualTo(DEFAULT_FECHA_ESTADO);
        assertThat(testAgentes.getTpNumero()).isEqualTo(DEFAULT_TP_NUMERO);
        assertThat(testAgentes.getTpRegalos()).isEqualTo(DEFAULT_TP_REGALOS);
    }

    @Test
    @Transactional
    public void createAgentesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = agentesRepository.findAll().size();

        // Create the Agentes with an existing ID
        agentes.setId(1L);
        AgentesDTO agentesDTO = agentesMapper.toDto(agentes);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAgentesMockMvc.perform(post("/api/agentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agentesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Agentes in the database
        List<Agentes> agentesList = agentesRepository.findAll();
        assertThat(agentesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAgentes() throws Exception {
        // Initialize the database
        agentesRepository.saveAndFlush(agentes);

        // Get all the agentesList
        restAgentesMockMvc.perform(get("/api/agentes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(agentes.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].fechaAlta").value(hasItem(DEFAULT_FECHA_ALTA.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())))
            .andExpect(jsonPath("$.[*].fechaEstado").value(hasItem(DEFAULT_FECHA_ESTADO.toString())))
            .andExpect(jsonPath("$.[*].tpNumero").value(hasItem(DEFAULT_TP_NUMERO.toString())))
            .andExpect(jsonPath("$.[*].tpRegalos").value(hasItem(DEFAULT_TP_REGALOS.toString())));
    }
    
    @Test
    @Transactional
    public void getAgentes() throws Exception {
        // Initialize the database
        agentesRepository.saveAndFlush(agentes);

        // Get the agentes
        restAgentesMockMvc.perform(get("/api/agentes/{id}", agentes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(agentes.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.fechaAlta").value(DEFAULT_FECHA_ALTA.toString()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()))
            .andExpect(jsonPath("$.fechaEstado").value(DEFAULT_FECHA_ESTADO.toString()))
            .andExpect(jsonPath("$.tpNumero").value(DEFAULT_TP_NUMERO.toString()))
            .andExpect(jsonPath("$.tpRegalos").value(DEFAULT_TP_REGALOS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAgentes() throws Exception {
        // Get the agentes
        restAgentesMockMvc.perform(get("/api/agentes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAgentes() throws Exception {
        // Initialize the database
        agentesRepository.saveAndFlush(agentes);

        int databaseSizeBeforeUpdate = agentesRepository.findAll().size();

        // Update the agentes
        Agentes updatedAgentes = agentesRepository.findById(agentes.getId()).get();
        // Disconnect from session so that the updates on updatedAgentes are not directly saved in db
        em.detach(updatedAgentes);
        updatedAgentes
            .codigo(UPDATED_CODIGO)
            .descripcion(UPDATED_DESCRIPCION)
            .fechaAlta(UPDATED_FECHA_ALTA)
            .estado(UPDATED_ESTADO)
            .fechaEstado(UPDATED_FECHA_ESTADO)
            .tpNumero(UPDATED_TP_NUMERO)
            .tpRegalos(UPDATED_TP_REGALOS);
        AgentesDTO agentesDTO = agentesMapper.toDto(updatedAgentes);

        restAgentesMockMvc.perform(put("/api/agentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agentesDTO)))
            .andExpect(status().isOk());

        // Validate the Agentes in the database
        List<Agentes> agentesList = agentesRepository.findAll();
        assertThat(agentesList).hasSize(databaseSizeBeforeUpdate);
        Agentes testAgentes = agentesList.get(agentesList.size() - 1);
        assertThat(testAgentes.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testAgentes.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testAgentes.getFechaAlta()).isEqualTo(UPDATED_FECHA_ALTA);
        assertThat(testAgentes.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testAgentes.getFechaEstado()).isEqualTo(UPDATED_FECHA_ESTADO);
        assertThat(testAgentes.getTpNumero()).isEqualTo(UPDATED_TP_NUMERO);
        assertThat(testAgentes.getTpRegalos()).isEqualTo(UPDATED_TP_REGALOS);
    }

    @Test
    @Transactional
    public void updateNonExistingAgentes() throws Exception {
        int databaseSizeBeforeUpdate = agentesRepository.findAll().size();

        // Create the Agentes
        AgentesDTO agentesDTO = agentesMapper.toDto(agentes);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAgentesMockMvc.perform(put("/api/agentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agentesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Agentes in the database
        List<Agentes> agentesList = agentesRepository.findAll();
        assertThat(agentesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAgentes() throws Exception {
        // Initialize the database
        agentesRepository.saveAndFlush(agentes);

        int databaseSizeBeforeDelete = agentesRepository.findAll().size();

        // Delete the agentes
        restAgentesMockMvc.perform(delete("/api/agentes/{id}", agentes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Agentes> agentesList = agentesRepository.findAll();
        assertThat(agentesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Agentes.class);
        Agentes agentes1 = new Agentes();
        agentes1.setId(1L);
        Agentes agentes2 = new Agentes();
        agentes2.setId(agentes1.getId());
        assertThat(agentes1).isEqualTo(agentes2);
        agentes2.setId(2L);
        assertThat(agentes1).isNotEqualTo(agentes2);
        agentes1.setId(null);
        assertThat(agentes1).isNotEqualTo(agentes2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AgentesDTO.class);
        AgentesDTO agentesDTO1 = new AgentesDTO();
        agentesDTO1.setId(1L);
        AgentesDTO agentesDTO2 = new AgentesDTO();
        assertThat(agentesDTO1).isNotEqualTo(agentesDTO2);
        agentesDTO2.setId(agentesDTO1.getId());
        assertThat(agentesDTO1).isEqualTo(agentesDTO2);
        agentesDTO2.setId(2L);
        assertThat(agentesDTO1).isNotEqualTo(agentesDTO2);
        agentesDTO1.setId(null);
        assertThat(agentesDTO1).isNotEqualTo(agentesDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(agentesMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(agentesMapper.fromId(null)).isNull();
    }
}
