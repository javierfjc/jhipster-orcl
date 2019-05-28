package com.asg.jhipster.web.rest;

import com.asg.jhipster.JhipsterOrclApp;
import com.asg.jhipster.domain.TipoTerminal;
import com.asg.jhipster.repository.TipoTerminalRepository;
import com.asg.jhipster.service.TipoTerminalService;
import com.asg.jhipster.service.dto.TipoTerminalDTO;
import com.asg.jhipster.service.mapper.TipoTerminalMapper;
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

import com.asg.jhipster.domain.enumeration.DominioSiNo;
import com.asg.jhipster.domain.enumeration.DominioSiNo;
import com.asg.jhipster.domain.enumeration.TipoTerminalTipoImporte;
import com.asg.jhipster.domain.enumeration.TipoTerminalTipoImporte;
import com.asg.jhipster.domain.enumeration.TipoTerminalTipoImporte;
/**
 * Integration tests for the {@Link TipoTerminalResource} REST controller.
 */
@SpringBootTest(classes = JhipsterOrclApp.class)
public class TipoTerminalResourceIT {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_TITULO = "AAAAAAAAAA";
    private static final String UPDATED_TITULO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_PATH_ENVIO = "AAAAAAAAAA";
    private static final String UPDATED_PATH_ENVIO = "BBBBBBBBBB";

    private static final String DEFAULT_PATH_RECIBIR = "AAAAAAAAAA";
    private static final String UPDATED_PATH_RECIBIR = "BBBBBBBBBB";

    private static final Integer DEFAULT_CONTADOR = 1;
    private static final Integer UPDATED_CONTADOR = 2;

    private static final DominioSiNo DEFAULT_CONTROL_VISITAS = DominioSiNo.SI;
    private static final DominioSiNo UPDATED_CONTROL_VISITAS = DominioSiNo.NO;

    private static final DominioSiNo DEFAULT_CONTROL_COBROS = DominioSiNo.SI;
    private static final DominioSiNo UPDATED_CONTROL_COBROS = DominioSiNo.NO;

    private static final TipoTerminalTipoImporte DEFAULT_TIPO_IMPORTE_DTO_1 = TipoTerminalTipoImporte.PORCENTAJE;
    private static final TipoTerminalTipoImporte UPDATED_TIPO_IMPORTE_DTO_1 = TipoTerminalTipoImporte.IMPORTE;

    private static final TipoTerminalTipoImporte DEFAULT_TIPO_IMPORTE_DTO_2 = TipoTerminalTipoImporte.PORCENTAJE;
    private static final TipoTerminalTipoImporte UPDATED_TIPO_IMPORTE_DTO_2 = TipoTerminalTipoImporte.IMPORTE;

    private static final TipoTerminalTipoImporte DEFAULT_TIPO_IMPORTE_DTO_3 = TipoTerminalTipoImporte.PORCENTAJE;
    private static final TipoTerminalTipoImporte UPDATED_TIPO_IMPORTE_DTO_3 = TipoTerminalTipoImporte.IMPORTE;

    @Autowired
    private TipoTerminalRepository tipoTerminalRepository;

    @Autowired
    private TipoTerminalMapper tipoTerminalMapper;

    @Autowired
    private TipoTerminalService tipoTerminalService;

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

    private MockMvc restTipoTerminalMockMvc;

    private TipoTerminal tipoTerminal;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoTerminalResource tipoTerminalResource = new TipoTerminalResource(tipoTerminalService);
        this.restTipoTerminalMockMvc = MockMvcBuilders.standaloneSetup(tipoTerminalResource)
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
    public static TipoTerminal createEntity(EntityManager em) {
        TipoTerminal tipoTerminal = new TipoTerminal()
            .codigo(DEFAULT_CODIGO)
            .titulo(DEFAULT_TITULO)
            .descripcion(DEFAULT_DESCRIPCION)
            .pathEnvio(DEFAULT_PATH_ENVIO)
            .pathRecibir(DEFAULT_PATH_RECIBIR)
            .contador(DEFAULT_CONTADOR)
            .controlVisitas(DEFAULT_CONTROL_VISITAS)
            .controlCobros(DEFAULT_CONTROL_COBROS)
            .tipoImporteDto1(DEFAULT_TIPO_IMPORTE_DTO_1)
            .tipoImporteDto2(DEFAULT_TIPO_IMPORTE_DTO_2)
            .tipoImporteDto3(DEFAULT_TIPO_IMPORTE_DTO_3);
        return tipoTerminal;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoTerminal createUpdatedEntity(EntityManager em) {
        TipoTerminal tipoTerminal = new TipoTerminal()
            .codigo(UPDATED_CODIGO)
            .titulo(UPDATED_TITULO)
            .descripcion(UPDATED_DESCRIPCION)
            .pathEnvio(UPDATED_PATH_ENVIO)
            .pathRecibir(UPDATED_PATH_RECIBIR)
            .contador(UPDATED_CONTADOR)
            .controlVisitas(UPDATED_CONTROL_VISITAS)
            .controlCobros(UPDATED_CONTROL_COBROS)
            .tipoImporteDto1(UPDATED_TIPO_IMPORTE_DTO_1)
            .tipoImporteDto2(UPDATED_TIPO_IMPORTE_DTO_2)
            .tipoImporteDto3(UPDATED_TIPO_IMPORTE_DTO_3);
        return tipoTerminal;
    }

    @BeforeEach
    public void initTest() {
        tipoTerminal = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoTerminal() throws Exception {
        int databaseSizeBeforeCreate = tipoTerminalRepository.findAll().size();

        // Create the TipoTerminal
        TipoTerminalDTO tipoTerminalDTO = tipoTerminalMapper.toDto(tipoTerminal);
        restTipoTerminalMockMvc.perform(post("/api/tipo-terminals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoTerminalDTO)))
            .andExpect(status().isCreated());

        // Validate the TipoTerminal in the database
        List<TipoTerminal> tipoTerminalList = tipoTerminalRepository.findAll();
        assertThat(tipoTerminalList).hasSize(databaseSizeBeforeCreate + 1);
        TipoTerminal testTipoTerminal = tipoTerminalList.get(tipoTerminalList.size() - 1);
        assertThat(testTipoTerminal.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testTipoTerminal.getTitulo()).isEqualTo(DEFAULT_TITULO);
        assertThat(testTipoTerminal.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testTipoTerminal.getPathEnvio()).isEqualTo(DEFAULT_PATH_ENVIO);
        assertThat(testTipoTerminal.getPathRecibir()).isEqualTo(DEFAULT_PATH_RECIBIR);
        assertThat(testTipoTerminal.getContador()).isEqualTo(DEFAULT_CONTADOR);
        assertThat(testTipoTerminal.getControlVisitas()).isEqualTo(DEFAULT_CONTROL_VISITAS);
        assertThat(testTipoTerminal.getControlCobros()).isEqualTo(DEFAULT_CONTROL_COBROS);
        assertThat(testTipoTerminal.getTipoImporteDto1()).isEqualTo(DEFAULT_TIPO_IMPORTE_DTO_1);
        assertThat(testTipoTerminal.getTipoImporteDto2()).isEqualTo(DEFAULT_TIPO_IMPORTE_DTO_2);
        assertThat(testTipoTerminal.getTipoImporteDto3()).isEqualTo(DEFAULT_TIPO_IMPORTE_DTO_3);
    }

    @Test
    @Transactional
    public void createTipoTerminalWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoTerminalRepository.findAll().size();

        // Create the TipoTerminal with an existing ID
        tipoTerminal.setId(1L);
        TipoTerminalDTO tipoTerminalDTO = tipoTerminalMapper.toDto(tipoTerminal);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoTerminalMockMvc.perform(post("/api/tipo-terminals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoTerminalDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TipoTerminal in the database
        List<TipoTerminal> tipoTerminalList = tipoTerminalRepository.findAll();
        assertThat(tipoTerminalList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTipoTerminals() throws Exception {
        // Initialize the database
        tipoTerminalRepository.saveAndFlush(tipoTerminal);

        // Get all the tipoTerminalList
        restTipoTerminalMockMvc.perform(get("/api/tipo-terminals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoTerminal.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].titulo").value(hasItem(DEFAULT_TITULO.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].pathEnvio").value(hasItem(DEFAULT_PATH_ENVIO.toString())))
            .andExpect(jsonPath("$.[*].pathRecibir").value(hasItem(DEFAULT_PATH_RECIBIR.toString())))
            .andExpect(jsonPath("$.[*].contador").value(hasItem(DEFAULT_CONTADOR)))
            .andExpect(jsonPath("$.[*].controlVisitas").value(hasItem(DEFAULT_CONTROL_VISITAS.toString())))
            .andExpect(jsonPath("$.[*].controlCobros").value(hasItem(DEFAULT_CONTROL_COBROS.toString())))
            .andExpect(jsonPath("$.[*].tipoImporteDto1").value(hasItem(DEFAULT_TIPO_IMPORTE_DTO_1.toString())))
            .andExpect(jsonPath("$.[*].tipoImporteDto2").value(hasItem(DEFAULT_TIPO_IMPORTE_DTO_2.toString())))
            .andExpect(jsonPath("$.[*].tipoImporteDto3").value(hasItem(DEFAULT_TIPO_IMPORTE_DTO_3.toString())));
    }
    
    @Test
    @Transactional
    public void getTipoTerminal() throws Exception {
        // Initialize the database
        tipoTerminalRepository.saveAndFlush(tipoTerminal);

        // Get the tipoTerminal
        restTipoTerminalMockMvc.perform(get("/api/tipo-terminals/{id}", tipoTerminal.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoTerminal.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.titulo").value(DEFAULT_TITULO.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.pathEnvio").value(DEFAULT_PATH_ENVIO.toString()))
            .andExpect(jsonPath("$.pathRecibir").value(DEFAULT_PATH_RECIBIR.toString()))
            .andExpect(jsonPath("$.contador").value(DEFAULT_CONTADOR))
            .andExpect(jsonPath("$.controlVisitas").value(DEFAULT_CONTROL_VISITAS.toString()))
            .andExpect(jsonPath("$.controlCobros").value(DEFAULT_CONTROL_COBROS.toString()))
            .andExpect(jsonPath("$.tipoImporteDto1").value(DEFAULT_TIPO_IMPORTE_DTO_1.toString()))
            .andExpect(jsonPath("$.tipoImporteDto2").value(DEFAULT_TIPO_IMPORTE_DTO_2.toString()))
            .andExpect(jsonPath("$.tipoImporteDto3").value(DEFAULT_TIPO_IMPORTE_DTO_3.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTipoTerminal() throws Exception {
        // Get the tipoTerminal
        restTipoTerminalMockMvc.perform(get("/api/tipo-terminals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoTerminal() throws Exception {
        // Initialize the database
        tipoTerminalRepository.saveAndFlush(tipoTerminal);

        int databaseSizeBeforeUpdate = tipoTerminalRepository.findAll().size();

        // Update the tipoTerminal
        TipoTerminal updatedTipoTerminal = tipoTerminalRepository.findById(tipoTerminal.getId()).get();
        // Disconnect from session so that the updates on updatedTipoTerminal are not directly saved in db
        em.detach(updatedTipoTerminal);
        updatedTipoTerminal
            .codigo(UPDATED_CODIGO)
            .titulo(UPDATED_TITULO)
            .descripcion(UPDATED_DESCRIPCION)
            .pathEnvio(UPDATED_PATH_ENVIO)
            .pathRecibir(UPDATED_PATH_RECIBIR)
            .contador(UPDATED_CONTADOR)
            .controlVisitas(UPDATED_CONTROL_VISITAS)
            .controlCobros(UPDATED_CONTROL_COBROS)
            .tipoImporteDto1(UPDATED_TIPO_IMPORTE_DTO_1)
            .tipoImporteDto2(UPDATED_TIPO_IMPORTE_DTO_2)
            .tipoImporteDto3(UPDATED_TIPO_IMPORTE_DTO_3);
        TipoTerminalDTO tipoTerminalDTO = tipoTerminalMapper.toDto(updatedTipoTerminal);

        restTipoTerminalMockMvc.perform(put("/api/tipo-terminals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoTerminalDTO)))
            .andExpect(status().isOk());

        // Validate the TipoTerminal in the database
        List<TipoTerminal> tipoTerminalList = tipoTerminalRepository.findAll();
        assertThat(tipoTerminalList).hasSize(databaseSizeBeforeUpdate);
        TipoTerminal testTipoTerminal = tipoTerminalList.get(tipoTerminalList.size() - 1);
        assertThat(testTipoTerminal.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testTipoTerminal.getTitulo()).isEqualTo(UPDATED_TITULO);
        assertThat(testTipoTerminal.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testTipoTerminal.getPathEnvio()).isEqualTo(UPDATED_PATH_ENVIO);
        assertThat(testTipoTerminal.getPathRecibir()).isEqualTo(UPDATED_PATH_RECIBIR);
        assertThat(testTipoTerminal.getContador()).isEqualTo(UPDATED_CONTADOR);
        assertThat(testTipoTerminal.getControlVisitas()).isEqualTo(UPDATED_CONTROL_VISITAS);
        assertThat(testTipoTerminal.getControlCobros()).isEqualTo(UPDATED_CONTROL_COBROS);
        assertThat(testTipoTerminal.getTipoImporteDto1()).isEqualTo(UPDATED_TIPO_IMPORTE_DTO_1);
        assertThat(testTipoTerminal.getTipoImporteDto2()).isEqualTo(UPDATED_TIPO_IMPORTE_DTO_2);
        assertThat(testTipoTerminal.getTipoImporteDto3()).isEqualTo(UPDATED_TIPO_IMPORTE_DTO_3);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoTerminal() throws Exception {
        int databaseSizeBeforeUpdate = tipoTerminalRepository.findAll().size();

        // Create the TipoTerminal
        TipoTerminalDTO tipoTerminalDTO = tipoTerminalMapper.toDto(tipoTerminal);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoTerminalMockMvc.perform(put("/api/tipo-terminals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoTerminalDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TipoTerminal in the database
        List<TipoTerminal> tipoTerminalList = tipoTerminalRepository.findAll();
        assertThat(tipoTerminalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoTerminal() throws Exception {
        // Initialize the database
        tipoTerminalRepository.saveAndFlush(tipoTerminal);

        int databaseSizeBeforeDelete = tipoTerminalRepository.findAll().size();

        // Delete the tipoTerminal
        restTipoTerminalMockMvc.perform(delete("/api/tipo-terminals/{id}", tipoTerminal.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<TipoTerminal> tipoTerminalList = tipoTerminalRepository.findAll();
        assertThat(tipoTerminalList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoTerminal.class);
        TipoTerminal tipoTerminal1 = new TipoTerminal();
        tipoTerminal1.setId(1L);
        TipoTerminal tipoTerminal2 = new TipoTerminal();
        tipoTerminal2.setId(tipoTerminal1.getId());
        assertThat(tipoTerminal1).isEqualTo(tipoTerminal2);
        tipoTerminal2.setId(2L);
        assertThat(tipoTerminal1).isNotEqualTo(tipoTerminal2);
        tipoTerminal1.setId(null);
        assertThat(tipoTerminal1).isNotEqualTo(tipoTerminal2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoTerminalDTO.class);
        TipoTerminalDTO tipoTerminalDTO1 = new TipoTerminalDTO();
        tipoTerminalDTO1.setId(1L);
        TipoTerminalDTO tipoTerminalDTO2 = new TipoTerminalDTO();
        assertThat(tipoTerminalDTO1).isNotEqualTo(tipoTerminalDTO2);
        tipoTerminalDTO2.setId(tipoTerminalDTO1.getId());
        assertThat(tipoTerminalDTO1).isEqualTo(tipoTerminalDTO2);
        tipoTerminalDTO2.setId(2L);
        assertThat(tipoTerminalDTO1).isNotEqualTo(tipoTerminalDTO2);
        tipoTerminalDTO1.setId(null);
        assertThat(tipoTerminalDTO1).isNotEqualTo(tipoTerminalDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(tipoTerminalMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(tipoTerminalMapper.fromId(null)).isNull();
    }
}
