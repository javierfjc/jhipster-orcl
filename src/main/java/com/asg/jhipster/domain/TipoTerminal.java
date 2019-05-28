package com.asg.jhipster.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.asg.jhipster.domain.enumeration.DominioSiNo;

import com.asg.jhipster.domain.enumeration.TipoTerminalTipoImporte;

/**
 * A TipoTerminal.
 */
@Entity
@Table(name = "tipo_terminal")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TipoTerminal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "path_envio")
    private String pathEnvio;

    @Column(name = "path_recibir")
    private String pathRecibir;

    @Column(name = "contador")
    private Integer contador;

    @Enumerated(EnumType.STRING)
    @Column(name = "control_visitas")
    private DominioSiNo controlVisitas;

    @Enumerated(EnumType.STRING)
    @Column(name = "control_cobros")
    private DominioSiNo controlCobros;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_importe_dto_1")
    private TipoTerminalTipoImporte tipoImporteDto1;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_importe_dto_2")
    private TipoTerminalTipoImporte tipoImporteDto2;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_importe_dto_3")
    private TipoTerminalTipoImporte tipoImporteDto3;

    @OneToMany(mappedBy = "tipoTerminal")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Agentes> agentes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("tipoTerminals")
    private TipoEnlace tipoEnlace;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public TipoTerminal codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getTitulo() {
        return titulo;
    }

    public TipoTerminal titulo(String titulo) {
        this.titulo = titulo;
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public TipoTerminal descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getPathEnvio() {
        return pathEnvio;
    }

    public TipoTerminal pathEnvio(String pathEnvio) {
        this.pathEnvio = pathEnvio;
        return this;
    }

    public void setPathEnvio(String pathEnvio) {
        this.pathEnvio = pathEnvio;
    }

    public String getPathRecibir() {
        return pathRecibir;
    }

    public TipoTerminal pathRecibir(String pathRecibir) {
        this.pathRecibir = pathRecibir;
        return this;
    }

    public void setPathRecibir(String pathRecibir) {
        this.pathRecibir = pathRecibir;
    }

    public Integer getContador() {
        return contador;
    }

    public TipoTerminal contador(Integer contador) {
        this.contador = contador;
        return this;
    }

    public void setContador(Integer contador) {
        this.contador = contador;
    }

    public DominioSiNo getControlVisitas() {
        return controlVisitas;
    }

    public TipoTerminal controlVisitas(DominioSiNo controlVisitas) {
        this.controlVisitas = controlVisitas;
        return this;
    }

    public void setControlVisitas(DominioSiNo controlVisitas) {
        this.controlVisitas = controlVisitas;
    }

    public DominioSiNo getControlCobros() {
        return controlCobros;
    }

    public TipoTerminal controlCobros(DominioSiNo controlCobros) {
        this.controlCobros = controlCobros;
        return this;
    }

    public void setControlCobros(DominioSiNo controlCobros) {
        this.controlCobros = controlCobros;
    }

    public TipoTerminalTipoImporte getTipoImporteDto1() {
        return tipoImporteDto1;
    }

    public TipoTerminal tipoImporteDto1(TipoTerminalTipoImporte tipoImporteDto1) {
        this.tipoImporteDto1 = tipoImporteDto1;
        return this;
    }

    public void setTipoImporteDto1(TipoTerminalTipoImporte tipoImporteDto1) {
        this.tipoImporteDto1 = tipoImporteDto1;
    }

    public TipoTerminalTipoImporte getTipoImporteDto2() {
        return tipoImporteDto2;
    }

    public TipoTerminal tipoImporteDto2(TipoTerminalTipoImporte tipoImporteDto2) {
        this.tipoImporteDto2 = tipoImporteDto2;
        return this;
    }

    public void setTipoImporteDto2(TipoTerminalTipoImporte tipoImporteDto2) {
        this.tipoImporteDto2 = tipoImporteDto2;
    }

    public TipoTerminalTipoImporte getTipoImporteDto3() {
        return tipoImporteDto3;
    }

    public TipoTerminal tipoImporteDto3(TipoTerminalTipoImporte tipoImporteDto3) {
        this.tipoImporteDto3 = tipoImporteDto3;
        return this;
    }

    public void setTipoImporteDto3(TipoTerminalTipoImporte tipoImporteDto3) {
        this.tipoImporteDto3 = tipoImporteDto3;
    }

    public Set<Agentes> getAgentes() {
        return agentes;
    }

    public TipoTerminal agentes(Set<Agentes> agentes) {
        this.agentes = agentes;
        return this;
    }

    public TipoTerminal addAgente(Agentes agentes) {
        this.agentes.add(agentes);
        agentes.setTipoTerminal(this);
        return this;
    }

    public TipoTerminal removeAgente(Agentes agentes) {
        this.agentes.remove(agentes);
        agentes.setTipoTerminal(null);
        return this;
    }

    public void setAgentes(Set<Agentes> agentes) {
        this.agentes = agentes;
    }

    public TipoEnlace getTipoEnlace() {
        return tipoEnlace;
    }

    public TipoTerminal tipoEnlace(TipoEnlace tipoEnlace) {
        this.tipoEnlace = tipoEnlace;
        return this;
    }

    public void setTipoEnlace(TipoEnlace tipoEnlace) {
        this.tipoEnlace = tipoEnlace;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoTerminal)) {
            return false;
        }
        return id != null && id.equals(((TipoTerminal) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TipoTerminal{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", titulo='" + getTitulo() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", pathEnvio='" + getPathEnvio() + "'" +
            ", pathRecibir='" + getPathRecibir() + "'" +
            ", contador=" + getContador() +
            ", controlVisitas='" + getControlVisitas() + "'" +
            ", controlCobros='" + getControlCobros() + "'" +
            ", tipoImporteDto1='" + getTipoImporteDto1() + "'" +
            ", tipoImporteDto2='" + getTipoImporteDto2() + "'" +
            ", tipoImporteDto3='" + getTipoImporteDto3() + "'" +
            "}";
    }
}
