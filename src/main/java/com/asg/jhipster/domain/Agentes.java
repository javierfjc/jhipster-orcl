package com.asg.jhipster.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.asg.jhipster.domain.enumeration.DominioSiNo;

/**
 * A Agentes.
 */
@Entity
@Table(name = "agentes")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Agentes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "fecha_alta")
    private LocalDate fechaAlta;

    @Column(name = "estado")
    private String estado;

    @Column(name = "fecha_estado")
    private LocalDate fechaEstado;

    @Column(name = "tp_numero")
    private String tpNumero;

    @Enumerated(EnumType.STRING)
    @Column(name = "tp_regalos")
    private DominioSiNo tpRegalos;

    @ManyToOne
    @JsonIgnoreProperties("agentes")
    private TipoTerminal tipoTerminal;

    @ManyToOne
    @JsonIgnoreProperties("agentes")
    private TipoArea tipoArea;

    @ManyToOne
    @JsonIgnoreProperties("agentes")
    private TipoAgente tipoAgente;

    @ManyToOne
    @JsonIgnoreProperties("agentes")
    private Empresas empresa;

    @ManyToOne
    @JsonIgnoreProperties("agentes")
    private Almacenes almacen;

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

    public Agentes codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Agentes descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public LocalDate getFechaAlta() {
        return fechaAlta;
    }

    public Agentes fechaAlta(LocalDate fechaAlta) {
        this.fechaAlta = fechaAlta;
        return this;
    }

    public void setFechaAlta(LocalDate fechaAlta) {
        this.fechaAlta = fechaAlta;
    }

    public String getEstado() {
        return estado;
    }

    public Agentes estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public LocalDate getFechaEstado() {
        return fechaEstado;
    }

    public Agentes fechaEstado(LocalDate fechaEstado) {
        this.fechaEstado = fechaEstado;
        return this;
    }

    public void setFechaEstado(LocalDate fechaEstado) {
        this.fechaEstado = fechaEstado;
    }

    public String getTpNumero() {
        return tpNumero;
    }

    public Agentes tpNumero(String tpNumero) {
        this.tpNumero = tpNumero;
        return this;
    }

    public void setTpNumero(String tpNumero) {
        this.tpNumero = tpNumero;
    }

    public DominioSiNo getTpRegalos() {
        return tpRegalos;
    }

    public Agentes tpRegalos(DominioSiNo tpRegalos) {
        this.tpRegalos = tpRegalos;
        return this;
    }

    public void setTpRegalos(DominioSiNo tpRegalos) {
        this.tpRegalos = tpRegalos;
    }

    public TipoTerminal getTipoTerminal() {
        return tipoTerminal;
    }

    public Agentes tipoTerminal(TipoTerminal tipoTerminal) {
        this.tipoTerminal = tipoTerminal;
        return this;
    }

    public void setTipoTerminal(TipoTerminal tipoTerminal) {
        this.tipoTerminal = tipoTerminal;
    }

    public TipoArea getTipoArea() {
        return tipoArea;
    }

    public Agentes tipoArea(TipoArea tipoArea) {
        this.tipoArea = tipoArea;
        return this;
    }

    public void setTipoArea(TipoArea tipoArea) {
        this.tipoArea = tipoArea;
    }

    public TipoAgente getTipoAgente() {
        return tipoAgente;
    }

    public Agentes tipoAgente(TipoAgente tipoAgente) {
        this.tipoAgente = tipoAgente;
        return this;
    }

    public void setTipoAgente(TipoAgente tipoAgente) {
        this.tipoAgente = tipoAgente;
    }

    public Empresas getEmpresa() {
        return empresa;
    }

    public Agentes empresa(Empresas empresas) {
        this.empresa = empresas;
        return this;
    }

    public void setEmpresa(Empresas empresas) {
        this.empresa = empresas;
    }

    public Almacenes getAlmacen() {
        return almacen;
    }

    public Agentes almacen(Almacenes almacenes) {
        this.almacen = almacenes;
        return this;
    }

    public void setAlmacen(Almacenes almacenes) {
        this.almacen = almacenes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Agentes)) {
            return false;
        }
        return id != null && id.equals(((Agentes) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Agentes{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", fechaAlta='" + getFechaAlta() + "'" +
            ", estado='" + getEstado() + "'" +
            ", fechaEstado='" + getFechaEstado() + "'" +
            ", tpNumero='" + getTpNumero() + "'" +
            ", tpRegalos='" + getTpRegalos() + "'" +
            "}";
    }
}
