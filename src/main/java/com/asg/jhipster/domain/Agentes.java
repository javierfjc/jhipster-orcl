package com.asg.jhipster.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
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

    @OneToMany(mappedBy = "agentes")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TipoTerminal> tipoTerminals = new HashSet<>();

    @OneToMany(mappedBy = "agentes")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TipoArea> tipoAreas = new HashSet<>();

    @OneToMany(mappedBy = "agentes")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TipoAgente> tipoAgentes = new HashSet<>();

    @OneToMany(mappedBy = "agentes")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Empresas> empresas = new HashSet<>();

    @OneToMany(mappedBy = "agentes")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Almacenes> almacens = new HashSet<>();

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

    public Set<TipoTerminal> getTipoTerminals() {
        return tipoTerminals;
    }

    public Agentes tipoTerminals(Set<TipoTerminal> tipoTerminals) {
        this.tipoTerminals = tipoTerminals;
        return this;
    }

    public Agentes addTipoTerminal(TipoTerminal tipoTerminal) {
        this.tipoTerminals.add(tipoTerminal);
        tipoTerminal.setAgentes(this);
        return this;
    }

    public Agentes removeTipoTerminal(TipoTerminal tipoTerminal) {
        this.tipoTerminals.remove(tipoTerminal);
        tipoTerminal.setAgentes(null);
        return this;
    }

    public void setTipoTerminals(Set<TipoTerminal> tipoTerminals) {
        this.tipoTerminals = tipoTerminals;
    }

    public Set<TipoArea> getTipoAreas() {
        return tipoAreas;
    }

    public Agentes tipoAreas(Set<TipoArea> tipoAreas) {
        this.tipoAreas = tipoAreas;
        return this;
    }

    public Agentes addTipoArea(TipoArea tipoArea) {
        this.tipoAreas.add(tipoArea);
        tipoArea.setAgentes(this);
        return this;
    }

    public Agentes removeTipoArea(TipoArea tipoArea) {
        this.tipoAreas.remove(tipoArea);
        tipoArea.setAgentes(null);
        return this;
    }

    public void setTipoAreas(Set<TipoArea> tipoAreas) {
        this.tipoAreas = tipoAreas;
    }

    public Set<TipoAgente> getTipoAgentes() {
        return tipoAgentes;
    }

    public Agentes tipoAgentes(Set<TipoAgente> tipoAgentes) {
        this.tipoAgentes = tipoAgentes;
        return this;
    }

    public Agentes addTipoAgente(TipoAgente tipoAgente) {
        this.tipoAgentes.add(tipoAgente);
        tipoAgente.setAgentes(this);
        return this;
    }

    public Agentes removeTipoAgente(TipoAgente tipoAgente) {
        this.tipoAgentes.remove(tipoAgente);
        tipoAgente.setAgentes(null);
        return this;
    }

    public void setTipoAgentes(Set<TipoAgente> tipoAgentes) {
        this.tipoAgentes = tipoAgentes;
    }

    public Set<Empresas> getEmpresas() {
        return empresas;
    }

    public Agentes empresas(Set<Empresas> empresas) {
        this.empresas = empresas;
        return this;
    }

    public Agentes addEmpresa(Empresas empresas) {
        this.empresas.add(empresas);
        empresas.setAgentes(this);
        return this;
    }

    public Agentes removeEmpresa(Empresas empresas) {
        this.empresas.remove(empresas);
        empresas.setAgentes(null);
        return this;
    }

    public void setEmpresas(Set<Empresas> empresas) {
        this.empresas = empresas;
    }

    public Set<Almacenes> getAlmacens() {
        return almacens;
    }

    public Agentes almacens(Set<Almacenes> almacenes) {
        this.almacens = almacenes;
        return this;
    }

    public Agentes addAlmacen(Almacenes almacenes) {
        this.almacens.add(almacenes);
        almacenes.setAgentes(this);
        return this;
    }

    public Agentes removeAlmacen(Almacenes almacenes) {
        this.almacens.remove(almacenes);
        almacenes.setAgentes(null);
        return this;
    }

    public void setAlmacens(Set<Almacenes> almacenes) {
        this.almacens = almacenes;
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
